import lightLogo from "../assets/logo-light-mode.png";
import darkLogo from "../assets/logo-dark-mode.png";
import SpecularButton from "./SpecularButton";
import { useState, useRef, useEffect } from "react";
import {
  PanelLeft,
  PanelLeftClose,
  Plus,
  FileText,
  MoreVertical,
  Pencil,
  Trash2,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function Sidebar({
  recents,
  loadingRecents,
  onNewMeeting,
  onSelectMeeting,
  onDeleteMeeting,
  onRenameMeeting,
  selectedMeetingId,
  collapsed,
  setCollapsed,
}) {
  const { darkMode, toggleTheme } = useTheme();
  const [openMenuId, setOpenMenuId] = useState(null);
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const renameInputRef = useRef(null);
  const closeTimerRef = useRef(null);

  // Auto-focus rename input when it appears
  useEffect(() => {
    if (renamingId) {
      setTimeout(() => renameInputRef.current?.focus(), 0);
    }
  }, [renamingId]);

  const startCloseTimer = () => {
    closeTimerRef.current = setTimeout(() => setOpenMenuId(null), 1500);
  };

  const cancelCloseTimer = () => {
    clearTimeout(closeTimerRef.current);
  };

  return (
    <aside
      className={`
        fixed left-0 top-0 z-50 h-screen
        border-r border-white/30
        bg-white/80
        text-gray-900
        shadow-2xl
        backdrop-blur-2xl
        transition-transform duration-300 ease-in-out

        dark:border-white/10
        dark:bg-black/20
        dark:text-gray-100

        ${
          collapsed
            ? "-translate-x-full lg:w-17 lg:translate-x-0"
            : "w-64 translate-x-0"
        }

        lg:transition-all
      `}
    >
      {/* Invisible backdrop — closes open menu when user clicks outside */}
      {openMenuId && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpenMenuId(null)}
        />
      )}

      <div className="flex h-full flex-col p-3">
        {/* Header */}
        <div
          className={`mb-6 flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          {/* Logo */}
          {!collapsed && (
            <div className="flex items-center gap-2 px-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden">
                {/* Light mode */}
                <img
                  src={lightLogo}
                  alt="Syncora"
                  className="h-full w-full object-contain dark:hidden"
                />

                {/* Dark mode */}
                <img
                  src={darkLogo}
                  alt="Syncora"
                  className="hidden h-full w-full object-contain dark:block"
                />
              </div>

              <h1 className="whitespace-nowrap text-sm font-semibold">
                Syncora
              </h1>
            </div>
          )}

          {/* Collapse button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="
  hidden
  h-9
  w-9
  items-center
  justify-center
  rounded-xl
  border
  border-gray-200
  bg-gray-100/60
  text-gray-500
  backdrop-blur-md
  transition-all
  duration-200
  hover:bg-gray-200
  hover:text-gray-900
  hover:scale-105
  dark:border-white/10
  dark:bg-white/5
  dark:text-gray-400
  dark:hover:bg-white/10
  dark:hover:text-white
  lg:flex
"
          >
            {collapsed ? <PanelLeft size={19} /> : <PanelLeftClose size={19} />}
          </button>
        </div>

        {/* New Meeting */}
        {/* New Video */}
        <div className={`mb-6 ${collapsed ? "flex justify-center" : "block"}`}>
          <SpecularButton
            type="button"
            onClick={onNewMeeting}
            title={collapsed ? "New Video" : undefined}
            size="md"
            radius={14}
            tint="#ffffff"
            tintOpacity={0.08}
            blur={8}
            textColor={darkMode ? "#f5f5f5" : "#111827"}
            lineColor="#ffffff"
            baseColor="#000000"
            intensity={0.8}
            shineSize={10}
            shineFade={40}
            thickness={1}
            speed={0.35}
            followMouse
            proximity={180}
            autoAnimate={false}
            className={collapsed ? "h-10 w-10" : "h-10 w-full"}
          >
            <div className="flex h-full w-full items-center justify-center gap-2">
              <Plus size={18} />

              {!collapsed && <span>New Video</span>}
            </div>
          </SpecularButton>
        </div>

        {/* Recents */}
        <div className="flex min-h-0 flex-1 flex-col">
          {!collapsed && (
            <h2 className="mb-2 shrink-0 px-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Recents
            </h2>
          )}

          {loadingRecents ? (
            <div className="space-y-1">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className={`
            flex
            h-10
            w-full
            items-center
            rounded-xl
            border
            border-gray-200 dark:border-white/10
            bg-gray-100 dark:bg-white/4
            animate-pulse
            ${collapsed ? "justify-center" : "gap-2 px-2"}
          `}
                >
                  {/* File icon skeleton */}
                  <div className="h-4 w-4 shrink-0 rounded bg-gray-300 dark:bg-white/10" />

                  {/* Text skeleton */}
                  {!collapsed && (
                    <div className="h-3 flex-1 rounded bg-gray-300 dark:bg-white/10" />
                  )}
                </div>
              ))}
            </div>
          ) : recents.length === 0 ? (
            !collapsed && (
              <p className="px-2 text-sm text-gray-400 dark:text-white/40">
                No recent meetings
              </p>
            )
          ) : (
            <div className="chat-scrollbar flex-1 space-y-1 overflow-y-auto pr-0.5">
              {recents.map((meeting) => (
                <div
                  key={meeting.id}
                  className={`
  group
  relative
  flex
  h-10
  w-full
  items-center
  rounded-xl
  border
  text-left
  text-sm
  transition-all
  duration-200

  ${
    selectedMeetingId === meeting.id
      ? `
        border-purple-400/30
        bg-white/15
        text-gray-900
        shadow-sm
        dark:border-purple-400/20
        dark:bg-white/10
        dark:text-white
      `
      : `
        border-transparent
        text-gray-700
        hover:border-white/10
        hover:bg-white/10
        hover:text-gray-900
        dark:text-gray-300
        dark:hover:bg-white/5
        dark:hover:text-white
      `
  }

  ${collapsed ? "justify-center" : "gap-2 px-2"}
`}
                >
                  {/* Selected indicator */}
                  {selectedMeetingId === meeting.id && !collapsed && (
                    <span className="absolute left-0 h-5 w-0.5 rounded-full bg-purple-500" />
                  )}

                  {/* Meeting */}
                  {renamingId === meeting.id && !collapsed ? (
                    <div className="flex flex-1 items-center gap-2 px-1">
                      <FileText
                        size={17}
                        className="shrink-0 text-gray-500 dark:text-gray-400"
                      />
                      <input
                        ref={renameInputRef}
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const v = renameValue.trim();
                            if (v) onRenameMeeting(meeting.id, v);
                            setRenamingId(null);
                          }
                          if (e.key === "Escape") setRenamingId(null);
                        }}
                        onBlur={() => {
                          const v = renameValue.trim();
                          if (v) onRenameMeeting(meeting.id, v);
                          setRenamingId(null);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="min-w-0 flex-1 rounded-md border border-purple-400/40 bg-white/80 px-2 py-0.5 text-sm text-gray-900 outline-none focus:border-purple-400 dark:bg-white/10 dark:text-white"
                      />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSelectMeeting(meeting)}
                      title={collapsed ? meeting.title || "Meeting" : undefined}
                      className={`flex min-w-0 items-center text-left ${
                        collapsed ? "justify-center" : "flex-1 gap-2"
                      }`}
                    >
                      <FileText
                        size={17}
                        className="shrink-0 text-gray-500 dark:text-gray-400"
                      />

                      {!collapsed && (
                        <span className="min-w-0 flex-1 truncate">
                          {meeting.title || meeting.filename}
                        </span>
                      )}
                    </button>
                  )}

                  {/* Three dots + menu */}
                  {!collapsed && (
                    <div
                      className="relative shrink-0"
                      onMouseLeave={startCloseTimer}
                      onMouseEnter={cancelCloseTimer}
                    >
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();

                          setOpenMenuId(
                            openMenuId === meeting.id ? null : meeting.id,
                          );
                        }}
                        className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-md
              text-gray-500
              transition
              hover:bg-gray-200
              hover:text-gray-900
              md:hidden
              md:group-hover:flex
              dark:text-gray-400
              dark:hover:bg-transparent
              dark:hover:text-white
            "
                        aria-label="Meeting options"
                      >
                        <MoreVertical size={16} />
                      </button>

                      {/* Context menu */}
{openMenuId === meeting.id && (
  <div
    onClick={(event) => event.stopPropagation()}
    className="
      absolute
      right-0
      top-full
      z-[60]
      mt-2
      w-40
      origin-top-right
      rounded-xl
      border border-gray-200/80
      bg-white/95
      p-1.5
      shadow-[0_8px_30px_rgba(0,0,0,0.12)]
      backdrop-blur-2xl
      animate-in fade-in zoom-in-95 duration-150

      dark:border-white/15
      dark:bg-[#17151c]/95
      dark:shadow-[0_8px_30px_rgba(0,0,0,0.45)]
    "
  >
    {/* Tooltip arrow */}
    <span
      className="
        absolute
        -top-1.5
        right-2.5
        h-3
        w-3
        rotate-45
        border-l
        border-t
        border-gray-200/80
        bg-white/95
        dark:border-white/15
        dark:bg-[#17151c]
      "
    />

    {/* Rename */}
    <button
      type="button"
      onClick={() => {
        setOpenMenuId(null);
        setRenameValue(meeting.title || meeting.filename || "");
        setRenamingId(meeting.id);
      }}
      className="
        relative
        flex
        w-full
        items-center
        gap-2.5
        rounded-lg
        px-3
        py-2
        text-sm
        text-gray-700
        transition-colors
        hover:bg-gray-100
        dark:text-gray-200
        dark:hover:bg-white/10
      "
    >
      <Pencil size={14} />
      Rename
    </button>

    {/* Delete */}
    <button
      type="button"
      onClick={() => {
        setOpenMenuId(null);
        onDeleteMeeting(meeting.id);
      }}
      className="
        relative
        flex
        w-full
        items-center
        gap-2.5
        rounded-lg
        px-3
        py-2
        text-sm
        text-red-500
        transition-colors
        hover:bg-red-500/10
        dark:text-red-400
      "
    >
      <Trash2 size={14} />
      Delete
    </button>
  </div>
)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom section */}
        <div className="mt-auto">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className={`mb-2 flex h-10 w-full items-center rounded-lg
              text-sm
              text-gray-600
              hover:bg-gray-200/70
              hover:text-gray-900
              dark:text-gray-400
              dark:hover:bg-white/10
              dark:hover:text-white
              transition
              ${collapsed ? "justify-center" : "gap-3 px-3"}`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}

            {!collapsed && <span>{darkMode ? "Light mode" : "Dark mode"}</span>}
          </button>

          {/* Footer */}
          <div
            className={`border-t border-gray-200
              pt-4 text-xs text-gray-400
              dark:border-white/10
              ${collapsed ? "flex justify-center" : "px-2"}`}
          >
            {collapsed ? (
              <>
                {/* Light mode */}
                <img
                  src={lightLogo}
                  alt="Syncora"
                  className="h-6 w-6 object-contain dark:hidden"
                />

                {/* Dark mode */}
                <img
                  src={darkLogo}
                  alt="Syncora"
                  className="hidden h-6 w-6 object-contain dark:block"
                />
              </>
            ) : (
              "Syncora"
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
