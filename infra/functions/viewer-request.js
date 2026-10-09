// CloudFront Function (cloudfront-js-2.0), viewer-request.
// 1. www.<apex> -> 301 to the apex, keeping path and query string.
// 2. Pretty URLs: /path/ and /path -> /path/index.html (S3 has no directory index).
// The apex is injected by Terraform via templatefile().
var APEX = "${apex}";

function handler(event) {
  var request = event.request;
  var host = request.headers.host && request.headers.host.value;

  if (host === "www." + APEX) {
    var qs = buildQueryString(request.querystring);
    return {
      statusCode: 301,
      statusDescription: "Moved Permanently",
      headers: {
        location: { value: "https://" + APEX + request.uri + qs },
        "cache-control": { value: "max-age=3600" },
      },
    };
  }

  var uri = request.uri;
  if (uri.endsWith("/")) {
    request.uri = uri + "index.html";
  } else if (uri.lastIndexOf(".") <= uri.lastIndexOf("/")) {
    // Last path segment has no extension, so it's a page, not a file.
    request.uri = uri + "/index.html";
  }

  return request;
}

function buildQueryString(querystring) {
  var parts = [];
  for (var key in querystring) {
    var entry = querystring[key];
    if (entry.multiValue) {
      for (var i = 0; i < entry.multiValue.length; i++) {
        parts.push(key + "=" + entry.multiValue[i].value);
      }
    } else {
      parts.push(key + (entry.value === "" ? "" : "=" + entry.value));
    }
  }
  return parts.length ? "?" + parts.join("&") : "";
}
