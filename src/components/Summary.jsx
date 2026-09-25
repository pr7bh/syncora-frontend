import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

function Summary({ summary, animate = true, onComplete }) {
  const [displayedSummary, setDisplayedSummary] = useState("");
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!summary) {
      setDisplayedSummary("");
      return;
    }

    // Existing meeting → show immediately
    if (!animate) {
      setDisplayedSummary(summary);
      onCompleteRef.current?.();
      return;
    }

    // New meeting → typing animation
    setDisplayedSummary("");

    const words = summary.split(/(\s+)/);
    let index = 0;

    const interval = setInterval(() => {
      if (index >= words.length) {
        clearInterval(interval);
        onCompleteRef.current?.();
        return;
      }

      setDisplayedSummary((prev) => prev + words[index]);
      index++;
    }, 25);

    return () => clearInterval(interval);
  }, [summary, animate]);

  return (
    <section>
      <h2
        className="
          mb-3 text-xl font-semibold
          text-gray-900 dark:text-gray-100
        "
      >
        Summary
      </h2>

      <div
        className="
          rounded-2xl border border-gray-200
          bg-white p-6 shadow-sm
          transition-colors duration-300
          dark:border-gray-800 dark:bg-gray-900
        "
      >
        <div
          className="
            text-[15px] leading-7
            text-gray-700 dark:text-gray-300
          "
        >
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2
                  className="
                    mb-3 mt-6 first:mt-0
                    text-base font-semibold
                    text-gray-900 dark:text-gray-100
                  "
                >
                  {children}
                </h2>
              ),

              strong: ({ children }) => (
                <strong className="font-semibold text-gray-900 dark:text-gray-100">
                  {children}
                </strong>
              ),

              ul: ({ children }) => (
                <ul
                  className="
                    mb-4 ml-5 list-disc space-y-2
                    marker:text-gray-400
                    dark:marker:text-gray-600
                  "
                >
                  {children}
                </ul>
              ),

              li: ({ children }) => (
                <li className="pl-1 leading-7">
                  {children}
                </li>
              ),

              p: ({ children }) => (
                <p className="mb-4 last:mb-0 leading-7">
                  {children}
                </p>
              ),

              hr: () => (
                <hr
                  className="
                    my-5
                    border-gray-200 dark:border-gray-800
                  "
                />
              ),
            }}
          >
            {displayedSummary}
          </ReactMarkdown>

          {/* Cursor only during animation */}
          {animate && displayedSummary.length < summary.length && (
            <span
              className="
                ml-1 inline-block h-4 w-0.5
                translate-y-0.5
                animate-pulse
                bg-gray-500 dark:bg-gray-400
              "
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default Summary;