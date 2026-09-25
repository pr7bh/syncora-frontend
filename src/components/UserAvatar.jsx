import { useEffect, useRef, useState } from "react";
import { uploadProfilePicture } from "../services/api";
import { Camera, LogOut, User, X } from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function UserAvatar() {
  const { user, logout } = useAuth();
  const avatarLetter = user?.username?.trim()?.charAt(0)?.toUpperCase() || "U";
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.profile_image || null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  function handleAvatarClick() {
    setIsOpen((prev) => !prev);
  }

  function handleChangePhoto() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      return;
    }

    try {
      setUploading(true);

      const data = await uploadProfilePicture(file);

      setProfileImage(data.profile_image);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  function handleRemovePhoto() {
    setProfileImage(null);
    localStorage.removeItem("profile_image");
  }

  function handleLogout() {
    setIsOpen(false);
    logout();
  }

  const displayName = user?.username || "User";
  const email = user?.email || "";

  useEffect(() => {
    setProfileImage(user?.profile_image || null);
  }, [user]);

  return (
    <div className="relative">
      {/* Avatar button */}
      <button
        type="button"
        onClick={handleAvatarClick}
        className="absolute right-[0.1rem] top-2 h-10 w-10 overflow-hidden rounded-full border border-gray-200 dark:border-gray-700 hover:scale-105
                hover:ring-2
                hover:ring-blue-500/50
                hover:ring-offset-2
                hover:ring-offset-gray-50
                dark:hover:ring-offset-gray-900"
      >
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
            onError={() => setProfileImage(null)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-900 text-sm font-semibold text-white">
            {avatarLetter}
          </div>
        )}
      </button>

      {/* Popup */}
      {isOpen && (
        <>
          {/* Optional backdrop for mobile/outside area */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 top-12 z-50 w-72 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900">
            {/* User information */}
            <div className="flex items-center gap-3 border-b border-gray-200 p-4 dark:border-gray-700">
              <div className="h-10 w-10 overflow-hidden rounded-full border border-gray-200 dark:border-gray-700">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-300">
                    <User size={20} />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                  {displayName}
                </p>

                <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                  {email}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X size={17} />
              </button>
            </div>

            {/* Profile picture options */}
            <div className="p-2">
              <button
                type="button"
                onClick={handleChangePhoto}
                disabled={uploading}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                <Camera size={18} />

                <span>
                  {uploading ? "Uploading..." : "Change profile picture"}
                </span>
              </button>

              {profileImage && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  <User size={18} />
                  <span>Remove profile picture</span>
                </button>
              )}
            </div>

            {/* Logout */}
            <div className="border-t border-gray-200 p-2 dark:border-gray-700">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
