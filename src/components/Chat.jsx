import { useEffect, useRef, useState } from "react";

import ReactMarkdown from "react-markdown";
import SpecularButton from "./SpecularButton";

import { ArrowUp, Bot, Copy, Check } from "lucide-react";

function Chat({
  chatHistory,

  question,

  setQuestion,

  askQuestion,

  chatLoading,
}) {
  const messagesEndRef = useRef(null);

  const [displayedMessages, setDisplayedMessages] = useState({});

  const [copiedIndex, setCopiedIndex] = useState(null);

  // Scroll to latest message

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chatHistory, chatLoading]);

  useEffect(() => {
    const lastIndex = chatHistory.length - 1;

    if (lastIndex < 0) {
      return;
    }

    const lastMessage = chatHistory[lastIndex];

    if (lastMessage.role !== "assistant") {
      return;
    }

    // Don't re-animate an already displayed message

    if (displayedMessages[lastIndex] === lastMessage.content) {
      return;
    }

    const words = lastMessage.content.split(/(\s+)/);

    let currentIndex = 0;

    setDisplayedMessages((prev) => ({
      ...prev,

      [lastIndex]: "",
    }));

    const interval = setInterval(() => {
      if (currentIndex >= words.length) {
        clearInterval(interval);

        setDisplayedMessages((prev) => ({
          ...prev,

          [lastIndex]: lastMessage.content,
        }));

        return;
      }

      const nextWord = words[currentIndex];

      setDisplayedMessages((prev) => ({
        ...prev,

        [lastIndex]: (prev[lastIndex] || "") + nextWord,
      }));

      currentIndex++;
    }, 25);

    return () => clearInterval(interval);
  }, [chatHistory]);

  const copyMessage = async (content, index) => {
    try {
      await navigator.clipboard.writeText(content);

      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 1500);
    } catch {
      // Ignore clipboard errors
    }
  };

  const handleKeyDown = (e) => {
    // Enter → send

    // Shift + Enter → new line

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (!chatLoading && question.trim()) {
        askQuestion();
      }
    }
  };

  return (
    <section className="mt-10 mb-10">
      {/* Header */}

      <div className="mb-5">
        <h2 className="text-xl font-semibold text-white">Ask Questions</h2>

        <p className="mt-1 text-sm text-white/45">
          Ask anything about this meeting or related topics.
        </p>
      </div>

      {/* Chat container */}

      <div
        className="
    overflow-hidden
    rounded-2xl
    border border-white/10
    bg-white/6
    shadow-[0_8px_32px_rgba(0,0,0,0.25)]
    backdrop-blur-xl
    transition-all duration-300
    hover:border-white/15
    hover:bg-white/8
  "
      >
        {/* Messages */}
        <div className="chat-scrollbar min-h-87.5 overflow-y-auto px-5 py-6 sm:px-8">
          {chatHistory.length === 0 && !chatLoading && (
            <div className="flex min-h-75 flex-col items-center justify-center text-center">
              <div
                className="
            mb-4 flex h-12 w-12
            items-center justify-center
            rounded-full
            border border-white/10
            bg-white/8
            text-white/80
            shadow-inner
            backdrop-blur-md
          "
              >
                <Bot size={22} />
              </div>

              <h3 className="font-medium text-white">Ask anything</h3>

              <p className="mt-1 max-w-sm text-sm text-white/40">
                Ask questions about the meeting, or ask me to explain something
                related to the discussion.
              </p>
            </div>
          )}

          <div className="space-y-7">
            {chatHistory.map((message, index) => {
              const isUser = message.role === "user";

              return (
                <div
                  key={index}
                  className={`flex w-full ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {isUser ? (
                    /* User message */

                    <div
                      className="

                        max-w-[80%]

                        rounded-2xl

                        rounded-br-md

                        bg-gray-100

                        px-4

                        py-3

                        text-sm

                        text-gray-900

                        dark:bg-purple-900

                        dark:text-gray-100

                      "
                    >
                      <p className="whitespace-pre-wrap leading-6">
                        {message.role === "assistant"
                          ? (displayedMessages[index] ?? message.content)
                          : message.content}
                      </p>
                    </div>
                  ) : (
                    /* AI message */

                    <div className="group flex w-full gap-3">
                      {/* AI icon */}

                      <div
                        className="

                          mt-1

                          flex h-8 w-8

                          shrink-0

                          items-center

                          justify-center

                          rounded-full

                          bg-gray-900

                          text-white

                          dark:bg-white

                          dark:text-black

                        "
                      >
                        <Bot size={16} />
                      </div>

                      {/* AI content */}

                      <div className="min-w-0 max-w-[90%]">
                        <div
                          className="

                            text-[15px]

                            leading-7

                            text-gray-800

                            dark:text-gray-200

                          "
                        >
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => (
                                <p className="mb-4 last:mb-0">{children}</p>
                              ),

                              strong: ({ children }) => (
                                <strong
                                  className="

                                    font-semibold

                                    text-gray-950

                                    dark:text-white

                                  "
                                >
                                  {children}
                                </strong>
                              ),

                              h1: ({ children }) => (
                                <h1 className="mb-3 mt-5 text-xl font-semibold first:mt-0">
                                  {children}
                                </h1>
                              ),

                              h2: ({ children }) => (
                                <h2 className="mb-3 mt-5 text-lg font-semibold first:mt-0">
                                  {children}
                                </h2>
                              ),

                              h3: ({ children }) => (
                                <h3 className="mb-2 mt-4 font-semibold first:mt-0">
                                  {children}
                                </h3>
                              ),

                              ul: ({ children }) => (
                                <ul
                                  className="

                                    mb-4

                                    ml-5

                                    list-disc

                                    space-y-1

                                  "
                                >
                                  {children}
                                </ul>
                              ),

                              ol: ({ children }) => (
                                <ol
                                  className="

                                    mb-4

                                    ml-5

                                    list-decimal

                                    space-y-1

                                  "
                                >
                                  {children}
                                </ol>
                              ),

                              li: ({ children }) => (
                                <li className="pl-1">{children}</li>
                              ),

                              blockquote: ({ children }) => (
                                <blockquote
                                  className="

                                    my-4

                                    border-l-2

                                    border-gray-300

                                    pl-4

                                    text-gray-600

                                    dark:border-gray-700

                                    dark:text-gray-400

                                  "
                                >
                                  {children}
                                </blockquote>
                              ),

                              code: ({ inline, children }) =>
                                inline ? (
                                  <code
                                    className="

                                      rounded-md

                                      bg-gray-100

                                      px-1.5

                                      py-0.5

                                      font-mono

                                      text-[13px]

                                      dark:bg-gray-800

                                    "
                                  >
                                    {children}
                                  </code>
                                ) : (
                                  <code>{children}</code>
                                ),

                              pre: ({ children }) => (
                                <pre
                                  className="

                                    my-4

                                    overflow-x-auto

                                    rounded-xl

                                    bg-gray-950

                                    p-4

                                    text-sm

                                    text-gray-100

                                  "
                                >
                                  {children}
                                </pre>
                              ),

                              hr: () => (
                                <hr
                                  className="

                                    my-5

                                    border-gray-200

                                    dark:border-gray-800

                                  "
                                />
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>

                        {/* Copy button */}

                        <button
                          onClick={() =>
                            copyMessage(
                              message.content,

                              index,
                            )
                          }
                          className="

                            mt-2

                            flex

                            items-center

                            gap-1.5

                            rounded-md

                            px-2

                            py-1

                            text-xs

                            text-gray-400

                            opacity-0

                            transition

                            hover:bg-gray-100

                            hover:text-gray-700

                            group-hover:opacity-100

                            dark:hover:bg-gray-800

                            dark:hover:text-gray-200

                          "
                        >
                          {copiedIndex === index ? (
                            <>
                              <Check size={13} />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Thinking indicator */}

            {chatLoading && (
              <div className="flex gap-3">
                <div
                  className="

                    mt-1

                    flex h-8 w-8 shrink-0

                    items-center justify-center

                    rounded-full

                    bg-gray-900

                    text-white

                    dark:bg-white

                    dark:text-black

                  "
                >
                  <Bot size={16} />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <div className="flex items-center gap-1.5 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-300/60" />

                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-300/60 [animation-delay:150ms]" />

                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-300/60 [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}

        <div
          className="
    border-t
    border-white/10
    bg-white/3
    p-4
    backdrop-blur-xl
  "
        >
          <div
            className="
      flex
      items-end
      gap-2
      rounded-2xl
      border
      border-white/10
      bg-white/6
      p-2
      shadow-[0_8px_32px_rgba(0,0,0,0.2)]
      backdrop-blur-xl
      transition-all
      duration-300
      focus-within:border-white/20
      focus-within:bg-white/8
      focus-within:shadow-[0_0_25px_rgba(168,85,247,0.08)]
    "
          >
            <textarea
              rows={1}
              placeholder="Ask anything..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={chatLoading}
              className="
        max-h-32
        min-h-11
        flex-1
        resize-none
        bg-transparent
        px-3
        py-2.5
        text-sm
        text-white/90
        outline-none
        placeholder:text-white/35
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
            />

            <SpecularButton
              type="button"
              onClick={askQuestion}
              disabled={chatLoading || !question.trim()}
              title="Send"
              size="sm"
              radius={12}
              tint="#ffffff"
              tintOpacity={0.08}
              blur={8}
              textColor="#ffffff"
              lineColor="#ffffff"
              baseColor="#000000"
              intensity={0.85}
              shineSize={10}
              shineFade={40}
              thickness={1}
              speed={0.35}
              followMouse
              proximity={120}
              autoAnimate={false}
              className="
        h-10
        w-10
        shrink-0
        disabled:cursor-not-allowed
        disabled:opacity-30
      "
            >
              <div className="flex h-full w-full items-center justify-center">
                <ArrowUp size={18} />
              </div>
            </SpecularButton>
          </div>

          <p className="mt-2 text-center text-[11px] text-white/30">
            Enter to send · Shift + Enter for a new line
          </p>
        </div>
      </div>
    </section>
  );
}

export default Chat;
