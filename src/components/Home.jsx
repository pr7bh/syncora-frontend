import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import light from "../assets/loader-light-mode.png";
import dark from "../assets/loader-dark-mode.png";
import lightLogo from "../assets/logo-light-mode.png";
import darkLogo from "../assets/logo-dark-mode.png";
import youtubeLogo from "../assets/youtube.svg";
import UserAvatar from "./UserAvatar";
import {
  Sparkles,
  Upload,
  ArrowUp,
  FileAudio,
  FileVideo,
  Loader2,
  MessageSquare,
  Bot,
  User,
  Plus,
  Clock3,
  Play,
  Menu,
} from "lucide-react";

import Sidebar from "./Sidebar";
import MeetingInput from "./MeetingInput";
import Summary from "./Summary";
import Chat from "./Chat";

import {
  getMeetings,
  getMeeting,
  transcribeFile,
  analyzeYouTube,
  askMeetingQuestion,
  deleteMeeting,
} from "../services/api";

function Home() {
  const [file, setFile] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [summaryComplete, setSummaryComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isNewMeeting, setIsNewMeeting] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [recents, setRecents] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  useEffect(() => {
    loadRecentMeetings();
  }, []);

  async function handleDeleteMeeting(meetingId) {
    try {
      await deleteMeeting(meetingId);

      setRecents((prev) =>
        prev.filter((meeting) => meeting.id !== meetingId)
      );

      if (selectedMeeting?.id === meetingId) {
        setSelectedMeeting(null);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function loadRecentMeetings() {
    try {
      const data = await getMeetings();

      setRecents(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function analyzeMeeting() {
    setError("");
    setResult(null);
    setSummaryComplete(false);
    setIsNewMeeting(true);

    if (!file && !youtubeUrl) {
      setError("Please upload a file or enter a YouTube URL.");
      return;
    }

    setLoading(true);

    try {
      let data;

      if (file) {
        data = await transcribeFile(file);
      } else {
        data = await analyzeYouTube(youtubeUrl);
      }

      setResult(data);

      await loadRecentMeetings();
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function askQuestion() {
    if (!question.trim() || !result || chatLoading) {
      return;
    }

    const currentQuestion = question.trim();

    // Show user message immediately
    setChatHistory((prev) => [
      ...prev,
      {
        role: "user",
        content: currentQuestion,
      },
    ]);

    setQuestion("");
    setChatLoading(true);
    setError("");

    try {
      const data = await askMeetingQuestion(result.meeting_id, currentQuestion);

      // Add AI response when API returns
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
        },
      ]);
    } catch (error) {
      setError(error.message);
    } finally {
      setChatLoading(false);
    }
  }

  function newMeeting() {
    setFile(null);
    setYoutubeUrl("");
    setResult(null);
    setError("");
    setChatHistory([]);
    setQuestion("");
  }

  async function selectMeeting(meeting) {
    setSelectedMeeting(meeting);
    try {
      setError("");
      setLoading(true);

      const data = await getMeeting(meeting.id);

      setResult({
        ...data,
        meeting_id: data.id,
      });

      // This is an OLD meeting
      setIsNewMeeting(false);

      // Show saved chat
      setChatHistory(data.chat_history || []);

      // No typing animation
      setSummaryComplete(true);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f7f8] font-[Manrope] text-gray-900">
      {/* Mobile menu button */}
      {collapsed && (
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          className="
        fixed left-4 top-4 z-50
        flex h-10 w-10 items-center justify-center
        rounded-lg
        border border-gray-200
        bg-white
        text-gray-700
        shadow-sm
        transition-all duration-200
        hover:scale-105
        hover:bg-gray-100
        dark:border-gray-700
        dark:bg-gray-900
        dark:text-gray-200
        dark:hover:bg-gray-800
        lg:hidden
      "
        >
          <Menu size={21} />
        </button>
      )}

      {/* Mobile backdrop */}
      {!collapsed && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}
      {/* Sidebar */}
      <Sidebar
        recents={recents}
        onNewMeeting={newMeeting}
        onSelectMeeting={selectMeeting}
        onDeleteMeeting={handleDeleteMeeting}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        selectedMeetingId={selectedMeeting?.id}
      />

      {/* Main */}
      <main
        className={`main-scrollbar
          h-screen
          overflow-y-auto
          transition-all
          duration-300
          ease-in-out
          bg-gray-50
          text-gray-900
          dark:bg-gray-900
          dark:text-gray-100
          ${collapsed ? "ml-0 lg:ml-17" : "ml-0 lg:ml-64"}
        `}
      >
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10 overflow-y-hidden">
          {/* Top Header */}
          <div className="mb-6 flex items-center justify-end">
            <UserAvatar />
          </div>

          <AnimatePresence mode="wait">
            {/* Upload Screen */}
            {!result && !loading && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                {/* Hero */}
                <div className="mb-10 text-center">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1,
                    }}
                    className="mx-auto flex items-center justify-center
                      "
                  >
                    {/* Light mode */}
                    <img
                      src={light}
                      alt="Syncora"
                      className="h-30 w-30 object-contain dark:hidden"
                    />

                    {/* Dark mode */}
                    <img
                      src={dark}
                      alt="Syncora"
                      className="hidden h-30 w-30 object-contain dark:block"
                    />
                  </motion.div>

                  <h3 className="text-xl font-bold tracking-tight sm:text-4xl">
                    Turn meetings/videos into
                    <span className="block text-gray-500 dark:text-gray-400">
                      actionable insights.
                    </span>
                  </h3>

                  <p
                    className="mx-auto mt-4 max-w-xl text-sm leading-6
                    text-gray-500 dark:text-gray-400 sm:text-base"
                  >
                    Upload a meeting recording or paste a YouTube video and let
                    AI transcribe, summarize, and answer questions about it.
                  </p>
                </div>

                {/* Input Card */}
                <div className="mx-auto max-w-3xl">
                  <MeetingInput
                    file={file}
                    setFile={setFile}
                    youtubeUrl={youtubeUrl}
                    setYoutubeUrl={setYoutubeUrl}
                    loading={loading}
                    analyzeMeeting={analyzeMeeting}
                  />
                </div>

                {/* Supported formats */}
                <div
                  className="mt-8 flex flex-wrap items-center justify-center gap-3
                  text-xs text-gray-400 dark:text-gray-500"
                >
                  {/* existing format items */}
                </div>
              </motion.div>
            )}

            {/* Loading */}
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex min-h-125 items-center justify-center"
              >
                <div className="text-center">
                  {/* Logo Animation */}
                  <div className="relative mx-auto mb-6 h-50 w-50">
                    {/* Outer rotating ring */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="
                        absolute inset-0
                        rounded-full
                        border-2
                        border-gray-200
                        border-t-gray-900
                        dark:border-gray-700
                        dark:border-t-white
                      "
                    />

                    {/* Pulsing glow */}
                    <motion.div
                      animate={{
                        scale: [1, 1.08, 1],
                        opacity: [0.15, 0.3, 0.15],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="
                        absolute inset-2
                        rounded-full
                        bg-gray-400
                        blur-xl
                        dark:bg-gray-500
                      "
                    />

                    {/* Logo */}
                    <motion.div
                      animate={{
                        scale: [1, 0.95, 1],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="
                        absolute inset-4
                        overflow-hidden
                      "
                    >
                      {/* Light mode */}
                      <img
                        src={lightLogo}
                        alt="Syncora"
                        className="
                          h-full
                          w-full
                          object-cover
                          dark:hidden
                        "
                      />

                      {/* Dark mode */}
                      <img
                        src={darkLogo}
                        alt="Syncora"
                        className="
                          hidden
                          h-full
                          w-full
                          object-cover
                          dark:block
                        "
                      />
                    </motion.div>
                  </div>

                  {/* Processing text */}
                  <motion.h2
                    animate={{
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-lg font-semibold text-gray-900 dark:text-gray-100"
                  >
                    Analyzing your video
                  </motion.h2>

                  {/* Subtitle */}
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Transcribing audio and generating insights
                    <span className="inline-flex w-6 ml-1">
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: 0,
                        }}
                      >
                        .
                      </motion.span>

                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: 0.2,
                        }}
                      >
                        .
                      </motion.span>

                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: 0.4,
                        }}
                      >
                        .
                      </motion.span>
                    </span>
                  </p>
                </div>
              </motion.div>
            )}

            {/* Results */}
            {result && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="space-y-8"
              >
                {/* Meeting information */}
                <div
                  className="rounded-2xl
                    border border-gray-200
                    bg-white
                    p-6
                    shadow-sm
                    dark:border-gray-800
                    dark:bg-gray-800/50"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center
                        rounded-xl
                        bg-gray-100
                        dark:bg-gray-700"
                    >
                      {result.source ? (
                        <img
                          src={youtubeLogo}
                          alt="YouTube"
                          className="h-6 w-6"
                        />
                      ) : (
                        <FileAudio size={19} />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate font-semibold">
                        {result.title || "Video"}
                      </h2>

                      <div
                        className="mt-1 flex items-center gap-2
                        text-xs text-gray-400 dark:text-gray-500"
                      >
                        <Clock3 size={13} />
                        Video analyzed successfully
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Summary
                    summary={result.summary}
                    animate={isNewMeeting}
                    onComplete={() => setSummaryComplete(true)}
                  />
                </motion.div>

                {/* Chat */}
                <AnimatePresence>
                  {summaryComplete && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                      }}
                    >
                      <Chat
                        chatHistory={chatHistory}
                        question={question}
                        setQuestion={setQuestion}
                        askQuestion={askQuestion}
                        chatLoading={chatLoading}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-5 rounded-xl
                  border border-red-200
                  bg-red-50
                  p-4 text-sm text-red-600
                  dark:border-red-900
                  dark:bg-red-950/40
                  dark:text-red-400"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default Home;
