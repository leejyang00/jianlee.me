import { ASSETS } from "@/shared/Constants";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      // className="prose prose-sm max-w-none font-apple"
      components={{
        h1: ({ children }) => (
          <h1 className="text-2xl font-bold mt-10 mb-6">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-bold mt-8 mb-4">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-bold mt-6 mb-3">{children}</h3>
        ),
        p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-pink hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside mb-4 space-y-1">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="ml-4">{children}</li>,
        strong: ({ children }) => (
          <strong className="font-bold">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
            {children}
          </blockquote>
        ),
        code: ({ children }) => (
          <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4">
            {children}
          </pre>
        ),
        img: ({ src, alt, ...props }) => {
          // Handle different image URL patterns
          let imageSrc = src;

          // // If it's a relative path starting with /images/, prepend the CloudFront URL
          // if (src?.startsWith("/images/")) {
          //   imageSrc = `${ASSETS.IMAGES}${src.substring(7)}`; // Remove '/images/' prefix
          // }
          // // If it's already a full URL, use it as is
          // else if (src?.startsWith("http")) {
          //   imageSrc = src;
          // }
          // // If it's a relative path without /images/, assume it's in the images folder
          // else if (src && !src.startsWith("http")) {
          //   imageSrc = `${ASSETS.IMAGES}/${src}`;
          // }

          return (
            <div className="my-6 flex justify-center">
              <img
                src={ASSETS.IMAGES + imageSrc}
                alt={alt || "Blog image"}
                className="max-w-full h-auto rounded-lg shadow-md"
                loading="lazy"
                onError={(e) => {
                  // Fallback for broken images
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  console.warn(`Failed to load image: ${src}`);
                }}
                {...props}
              />
            </div>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
