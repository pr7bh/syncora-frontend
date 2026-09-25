import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  ArrowUp,
  Bot,
  Copy,
  Check,
} from "lucide-react";

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
    <section className="mt-10">

      {/* Header */}
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Ask Questions
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Ask anything about this meeting or related topics.
        </p>
      </div>

      {/* Chat container */}
      <div
        className="
          overflow-hidden
          rounded-2xl
          border border-gray-200
          bg-white
          shadow-sm
          dark:border-gray-800
          dark:bg-gray-950
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
                  bg-gray-100
                  text-gray-700
                  dark:bg-gray-800
                  dark:text-gray-200
                "
              >
                <Bot size={22} />
              </div>

              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Ask anything
              </h3>

              <p className="mt-1 max-w-sm text-sm text-gray-400">
                Ask questions about the meeting, or ask me to explain
                something related to the discussion.
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
                    isUser
                      ? "justify-end"
                      : "justify-start"
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
                        dark:bg-gray-800
                        dark:text-gray-100
                      "
                    >
                      <p className="whitespace-pre-wrap leading-6">
                        {message.role === "assistant"
                        ? displayedMessages[index] ?? message.content
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
                                <p className="mb-4 last:mb-0">
                                  {children}
                                </p>
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
                                <li className="pl-1">
                                  {children}
                                </li>
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
                              index
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
                  <div className="flex items-center gap-1.5 rounded-2xl bg-gray-100 px-4 py-3 dark:bg-gray-800">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
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
            border-gray-200
            bg-white
            p-4
            dark:border-gray-800
            dark:bg-gray-950
          "
        >
          <div
            className="
              flex
              items-end
              gap-2
              rounded-2xl
              border
              border-gray-300
              bg-gray-50
              p-2
              transition
              focus-within:border-gray-400
              focus-within:ring-2
              focus-within:ring-gray-100
              dark:border-gray-700
              dark:bg-gray-900
              dark:focus-within:border-gray-600
              dark:focus-within:ring-gray-800
            "
          >

            <textarea
              rows={1}
              placeholder="Ask anything..."
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
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
                text-gray-900
                outline-none
                placeholder:text-gray-400
                disabled:cursor-not-allowed
                disabled:opacity-50
                dark:text-gray-100
                dark:placeholder:text-gray-500
              "
            />

            <button
              onClick={askQuestion}
              disabled={
                chatLoading ||
                !question.trim()
              }
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-black
                text-white
                transition
                hover:bg-gray-800
                disabled:cursor-not-allowed
                disabled:opacity-30
                dark:bg-white
                dark:text-black
                dark:hover:bg-gray-200
              "
              title="Send"
            >
              <ArrowUp size={18} />
            </button>

          </div>

          <p className="mt-2 text-center text-[11px] text-gray-400">
            Enter to send · Shift + Enter for a new line
          </p>
        </div>

      </div>
    </section>
  );
}

export default Chat;