import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  markdownFilesQueryOptions,
  markdownContentQueryOptions,
  uploadMarkdownFile,
  deleteMarkdownFile,
} from "../lib/api";
import MarkdownRenderer from "./Blog/MarkdownRenderer";

interface MarkdownFile {
  name: string;
  id: string;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
  metadata: {
    eTag: string;
    size: number;
    mimetype: string;
    cacheControl: string;
    lastModified: string;
    contentLength: number;
    httpStatusCode: number;
  };
}

// interface MarkdownContent {
//   filename: string;
//   content: string;
//   size: number;
//   lastModified: number;
// }

export const MarkdownBlog: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  // Fetch list of markdown files
  const {
    data: files,
    isLoading: filesLoading,
    error: filesError,
    refetch: refetchFiles,
  } = useQuery(markdownFilesQueryOptions);

  // Fetch content of selected file
  const {
    data: content,
    isLoading: contentLoading,
    error: contentError,
  } = useQuery(markdownContentQueryOptions(selectedFile || ""));

  // Handle file upload
  const handleUpload = async () => {
    if (!uploadFile) return;

    try {
      await uploadMarkdownFile(uploadFile);
      setUploadFile(null);
      refetchFiles();
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  // Handle file deletion
  const handleDelete = async (filename: string) => {
    try {
      await deleteMarkdownFile(filename);
      if (selectedFile === filename) {
        setSelectedFile(null);
      }
      refetchFiles();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (filesLoading) return <div>Loading markdown files...</div>;
  if (filesError) return <div>Error loading files: {filesError.message}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Markdown Blog</h1>

      {/* Upload Section */}
      <div className="mb-8 p-4 border rounded-lg bg-gray-700">
        <h2 className="text-xl font-semibold mb-4">Upload New Post</h2>
        <div className="flex gap-4 items-center">
          <input
            type="file"
            accept=".md"
            onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
            className="border rounded px-3 py-2"
          />
          <button
            onClick={handleUpload}
            disabled={!uploadFile}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Upload
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* File List */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Blog Posts</h2>
          <div className="space-y-2">
            {files?.map((file: MarkdownFile) => (
              <div
                key={file.id}
                className={`p-3 border rounded cursor-pointer hover:bg-gray-50 ${
                  selectedFile === file.name ? "bg-blue-50 border-blue-300" : ""
                }`}
                onClick={() => setSelectedFile(file.name)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium">{file.name}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(file.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(file.name);
                    }}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Display */}
        <div className="lg:col-span-2 ">
          <h2 className="text-xl font-semibold mb-4">Content</h2>
          {!selectedFile ? (
            <div className="text-gray-400 text-center py-8">
              Select a file to view its content
            </div>
          ) : contentLoading ? (
            <div>Loading content...</div>
          ) : contentError ? (
            <div>Error loading content: {contentError.message}</div>
          ) : content ? (
            <div className="bg-gray-600 rounded-lg shadow-sm border">
              <div className="mb-4 p-4 bg-gray-800 border-b rounded-t-lg">
                <h3 className="font-semibold text-lg">{content.filename}</h3>
                <p className="text-sm text-gray-600">
                  Size: {content.size} bytes | Last modified:{" "}
                  {new Date(content.lastModified).toLocaleString()}
                </p>
              </div>
              <div className="p-6">
                <MarkdownRenderer content={content.content} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
