import { useState } from "react";

import { registerUser } from "../services/api";
import SpecularButton from "./SpecularButton";
import logo from "../assets/logo-dark-mode.png"
import Plasma from "./Plasma";

export default function Register({ onSwitchToLogin }) {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleRegister(event) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const data = await registerUser(
        username,
        email,
        password
      );

      setSuccess(
        "Account created successfully. You can now sign in."
      );

      setUsername("");
      setEmail("");
      setPassword("");

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black font-[Manrope] text-gray-900">

      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none fixed inset-0 z-0">
              <Plasma
                color="#B497CF"
                speed={1}
                direction="forward"
                scale={1}
                opacity={1}
                mouseInteractive={false}
                renderScale={0.55}
                maxDpr={1.5}
                targetFps={60}
                iterations={60}
              />
            </div>

      {/* ================= DARK OVERLAY ================= */}

      <div className="absolute inset-0 z-10 bg-black/20" />

      {/* ================= REGISTER CONTENT ================= */}

      <div className="relative z-20 flex min-h-screen items-center justify-center p-4">

        <div className="w-full max-w-md">

          {/* Logo */}

          
                    <div className="flex flex-col items-center text-center">
                <img
                  src={logo}
                  alt="Syncora Logo"
                  className="h-20 w-auto object-contain"
                />
          
                <h1 className="mt-3 text-5xl font-extrabold tracking-tight text-slate-50 mb-8">
                  Syncora
                </h1>
              </div>

          {/* Register Card */}

          <div
            className="
              rounded-2xl
              border
              border-white/15
              bg-black/20
              p-6
              shadow-2xl
              backdrop-blur-md
            "
          >

            {/* Heading */}

            <div className="mb-6">

              <h2 className="text-2xl font-semibold text-white">
                Create your account
              </h2>

              <p className="mt-2 text-sm text-white/50">
                Get started with Syncora
              </p>

            </div>

            <form
              onSubmit={handleRegister}
              className="space-y-5"
            >

              {/* Username */}

              <div>

                <label className="mb-2 block text-sm font-medium text-white/80">
                  Username
                </label>

                <input
                  type="text"
                  value={username}
                  onChange={(event) =>
                    setUsername(event.target.value)
                  }
                  placeholder="Enter username"
                  required
                  className="
                    w-full
                    rounded-lg
                    border
                    border-white/15
                    bg-white/10
                    px-4
                    py-3
                    text-white
                    placeholder:text-white/40
                    outline-none
                    transition-all
                    duration-300
                    focus:border-purple-400
                    focus:ring-2
                    focus:ring-purple-500/30
                  "
                />

              </div>

              {/* Email */}

              <div>

                <label className="mb-2 block text-sm font-medium text-white/80">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="you@example.com"
                  required
                  className="
                    w-full
                    rounded-lg
                    border
                    border-white/15
                    bg-white/10
                    px-4
                    py-3
                    text-white
                    placeholder:text-white/40
                    outline-none
                    transition-all
                    duration-300
                    focus:border-purple-400
                    focus:ring-2
                    focus:ring-purple-500/30
                  "
                />

              </div>

              {/* Password */}

              <div>

                <label className="mb-2 block text-sm font-medium text-white/80">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Create a password"
                  required
                  minLength={6}
                  className="
                    w-full
                    rounded-lg
                    border
                    border-white/15
                    bg-white/10
                    px-4
                    py-3
                    text-white
                    placeholder:text-white/40
                    outline-none
                    transition-all
                    duration-300
                    focus:border-purple-400
                    focus:ring-2
                    focus:ring-purple-500/30
                  "
                />

              </div>

              {/* Error */}

              {error && (
                <div
                  className="
                    rounded-lg
                    border
                    border-red-400/30
                    bg-red-500/10
                    px-4
                    py-3
                    text-sm
                    text-red-300
                  "
                >
                  {error}
                </div>
              )}

              {/* Success */}

              {success && (
                <div
                  className="
                    rounded-lg
                    border
                    border-green-400/30
                    bg-green-500/10
                    px-4
                    py-3
                    text-sm
                    text-green-300
                  "
                >
                  {success}
                </div>
              )}

              {/* Register Button */}

              <SpecularButton
                type="submit"
                disabled={loading}
                size="lg"
                radius={18}
                tint="#ffffff"
                tintOpacity={0.08}
                blur={8}
                textColor="#f5f5f5"
                lineColor="#ffffff"
                baseColor="#ffffff"
                intensity={0.8}
                shineSize={10}
                shineFade={40}
                thickness={1}
                speed={0.35}
                followMouse
                proximity={250}
                autoAnimate={false}
                className="w-full"
              >
                {loading
                  ? "Creating account..."
                  : "Create account"}
              </SpecularButton>

            </form>

            {/* Login */}

            <div className="mt-6 text-center text-sm">

              <span className="text-white/60">
                Already have an account?{" "}
              </span>

              <button
                type="button"
                onClick={onSwitchToLogin}
                className="
                  font-medium
                  text-purple-300
                  transition
                  hover:text-purple-200
                "
              >
                Sign in
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}