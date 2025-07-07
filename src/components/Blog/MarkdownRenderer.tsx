import { ASSETS } from "@/shared/Constants";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import CheckIcon from "@mui/icons-material/CheckBoxRounded";
import ContentCopyIcon from "@mui/icons-material/ContentCopyRounded";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (text: string, language: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(language);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      // className="prose prose-sm max-w-none font-apple"
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mt-10 mb-6">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-bold mt-6 mb-3">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-xl font-bold mt-6 mb-3">{children}</h4>
        ),
        h5: ({ children }) => (
          <h5 className="text-lg font-bold mt-6 mb-3">{children}</h5>
        ),
        h6: ({ children }) => (
          <h6 className="text-base font-bold mt-6 mb-3">{children}</h6>
        ),
        p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
        a: ({ href, children }) => (
          <a
            href={href}
            className="inline-flex items-center gap-1 text-pink hover:text-pink/80 transition-colors duration-200 underline decoration-pink/30 hover:decoration-pink/60 underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
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
        // Enhanced code blocks with copy functionality
        code: ({ children, className }) => {
          const match = /language-(\w+)/.exec(className || "");
          const language = match ? match[1] : "";

          if (language) {
            const codeString = String(children).replace(/\n$/, "");
            const isCopied = copiedCode === language;

            return (
              <div className="relative group">
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={() => copyToClipboard(codeString, language)}
                    className="p-2 rounded-md bg-gray-800/80 hover:bg-gray-700/80 transition-colors duration-200 text-white"
                    title="Copy code"
                  >
                    {isCopied ? (
                      <CheckIcon className="w-4 h-4 text-green-300" />
                    ) : (
                      <ContentCopyIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <SyntaxHighlighter
                  style={oneDark}
                  language={language}
                  PreTag="div"
                  className="rounded-xl !mt-0"
                  customStyle={{
                    margin: 0,
                    borderRadius: "0.75rem",
                    fontSize: "0.875rem",
                  }}
                  showLineNumbers={true}
                  lineNumberStyle={{
                    color: "#6b7280",
                    fontSize: "0.75rem",
                  }}
                >
                  {codeString}
                </SyntaxHighlighter>
              </div>
            );
          }

          return (
            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-sm font-mono text-pink border border-gray-200 dark:border-gray-700">
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4">
            {children}
          </pre>
        ),
        img: ({ src, alt, ...props }) => {
          // Handle different image URL patterns
          let imageSrc = src;

          return (
            <span className="my-6 flex justify-center">
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
            </span>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
