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
      {/* Heading */}
      <h2
        className="
          mb-3
          text-xl
          font-semibold
          text-white
        "
      >
        Summary
      </h2>

      {/* Glass Summary Card */}
      <div
        className="
          rounded-2xl
          border border-white/10
          bg-white/6
          p-6
          shadow-[0_8px_32px_rgba(0,0,0,0.25)]
          backdrop-blur-xl
          transition-all
          duration-300
          hover:border-white/15
          hover:bg-white/8
        "
      >
        <div
          className="
            text-[15px]
            leading-7
            text-white/70
          "
        >
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2
                  className="
                    mb-3
                    mt-6
                    first:mt-0
                    text-base
                    font-semibold
                    text-white
                  "
                >
                  {children}
                </h2>
              ),

              strong: ({ children }) => (
                <strong
                  className="
                    font-semibold
                    text-white
                  "
                >
                  {children}
                </strong>
              ),

              ul: ({ children }) => (
                <ul
                  className="
                    mb-4
                    ml-5
                    list-disc
                    space-y-2
                    marker:text-white/40
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
                    border-white/10
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
                ml-1
                inline-block
                h-4
                w-0.5
                translate-y-0.5
                animate-pulse
                bg-purple-300/80
              "
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default Summary;