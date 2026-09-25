import { useTheme } from "../context/ThemeContext";
import lightLogo from "../assets/logo-light-mode.png";
import darkLogo from "../assets/logo-dark-mode.png";
import { deleteMeeting } from "../services/api";
import { useState } from "react";
import {
  PanelLeft,
  PanelLeftClose,
  Plus,
  FileText,
  Sun,
  Moon,
  X,
  MoreVertical,
  Trash2,
} from "lucide-react";

function Sidebar({
  recents,
  onNewMeeting,
  onSelectMeeting,
  onDeleteMeeting,
  selectedMeetingId,
  collapsed,
  setCollapsed,
}) {
  const { darkMode, toggleTheme } = useTheme();
  const [openMenuId, setOpenMenuId] = useState(null);
  async function handleDeleteMeeting(meetingId) {
    try {
      await deleteMeeting(meetingId);

      // Remove it from the sidebar
      setRecents((prev) => prev.filter((meeting) => meeting.id !== meetingId));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <aside
      className={`fixed left-0 top-0 z-50 h-screen border-r
            border-gray-200 bg-white
            text-gray-900
            transition-transform duration-300 ease-in-out
            dark:border-gray-800
            dark:bg-gray-950
            dark:text-gray-100

            ${
              collapsed
                ? "-translate-x-full lg:w-17 lg:translate-x-0"
                : "w-64 translate-x-0"
            }

            lg:transition-all
          `}
    >
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
              hidden lg:flex
              h-9 w-9
              items-center justify-center
              rounded-lg
              text-gray-500
              transition-all duration-200
              hover:bg-gray-100
              hover:text-gray-900
              hover:scale-105
              dark:text-gray-400
              dark:hover:bg-gray-800
              dark:hover:text-white
            "
          >
            {collapsed ? <PanelLeft size={19} /> : <PanelLeftClose size={19} />}
          </button>
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            className="
              flex lg:hidden
              h-9 w-9
              items-center justify-center
              rounded-lg
              text-gray-500
              transition-all duration-200
              hover:bg-gray-100
              hover:text-gray-900
              hover:scale-105
              dark:text-gray-400
              dark:hover:bg-gray-800
              dark:hover:text-white
            "
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* New Meeting */}
        <button
          onClick={onNewMeeting}
          title={collapsed ? "New Video" : undefined}
          className={`mb-6 flex h-10 items-center rounded-lg
            border border-gray-200
            text-sm font-medium
            hover:bg-gray-100
            dark:border-gray-800
            dark:hover:bg-gray-800
            transition
            ${collapsed ? "justify-center w-full" : "w-full gap-2 px-3"}`}
        >
          <Plus size={19} />

          {!collapsed && <span>New Video</span>}
        </button>

        {/* Recents */}
        <div className="min-w-0">
          {!collapsed && (
            <h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Recents
            </h2>
          )}

          {recents.length === 0 ? (
            !collapsed && (
              <p className="px-2 text-sm text-gray-400">No recent meetings</p>
            )
          ) : (
            <div className="chat-scrollbar space-y-1">
              {recents.map((meeting) => (
                <div
                  key={meeting.id}
                  className={`group relative flex h-10 w-full items-center rounded-lg
        text-left text-sm transition
        ${
          selectedMeetingId === meeting.id
            ? "bg-gray-200 font-medium text-gray-900 dark:bg-gray-800 dark:text-white"
            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
        }
        ${collapsed ? "justify-center" : "gap-2 px-2"}
      `}
                >
                  {/* Selected indicator */}
                  {selectedMeetingId === meeting.id && !collapsed && (
                    <span className="absolute left-0 h-5 w-0.5 rounded-full bg-blue-500" />
                  )}

                  {/* Meeting */}
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

                  {/* Three dots + menu */}
                  {!collapsed && (
                    <div className="relative shrink-0">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();

                          setOpenMenuId(
                            openMenuId === meeting.id ? null : meeting.id,
                          );
                        }}
                        className="
              hidden
              h-7
              w-7
              items-center
              justify-center
              rounded-md
              text-gray-500
              transition
              hover:bg-gray-200
              hover:text-gray-900
              group-hover:flex
              dark:text-gray-400
              dark:hover:bg-gray-700
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
                top-8
                z-50
                w-32
                rounded-lg
                border
                border-gray-200
                bg-white
                p-1
                shadow-lg
                dark:border-gray-700
                dark:bg-gray-900
              "
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenuId(null);
                              onDeleteMeeting(meeting.id);
                            }}
                            className="
                  flex
                  w-full
                  items-center
                  gap-2
                  rounded-md
                  px-3
                  py-2
                  text-sm
                  text-red-600
                  transition
                  hover:bg-red-50
                  dark:text-red-400
                  dark:hover:bg-red-950/40
                "
                          >
                            <Trash2 size={15} />
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
          {/* Theme Button */}
          <button
            onClick={toggleTheme}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className={`mb-2 flex h-10 w-full items-center rounded-lg
              text-sm
              text-gray-600
              hover:bg-gray-100
              hover:text-gray-900
              dark:text-gray-300
              dark:hover:bg-gray-800
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
              dark:border-gray-800
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
