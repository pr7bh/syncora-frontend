import { useState } from "react";

import { registerUser } from "../services/api";

import AeroShards from "./AeroShards";
import SpecularButton from "./SpecularButton";
import ParticleText from "./ParticleText";

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
    <div className="relative min-h-screen overflow-hidden">

      {/* ================= BACKGROUND ================= */}

      <div className="absolute inset-0 z-0">
        <AeroShards
          backgroundColor="#120F17"
          shardColor="#896ABD"
          accentColor="#A855F7"
          placement="full"
          flow="stream"
          material="pearl"
          detail="balanced"
          effect="none"
          scale={1}
          spread={1}
          depth={1}
          speed={1}
          spin={1}
          interaction="repel"
          density={1.5}
          shardSize={1.1}
          stretch={1}
          turbulence={1}
          glow={1}
          edgeSoftness={2}
          bloom={0.5}
          grain={0.05}
          chromaticAberration={0.0075}
          transitionDuration={1}
          interactionRadius={1.5}
          interactionStrength={0.5}
          rippleIntensity={1}
          holdToGather
          paused={false}
        />
      </div>

      {/* ================= DARK OVERLAY ================= */}

      <div className="absolute inset-0 z-10 bg-black/20" />

      {/* ================= REGISTER CONTENT ================= */}

      <div className="relative z-20 flex min-h-screen items-center justify-center p-4">

        <div className="w-full max-w-md">

          {/* Logo */}

          <div className="mb-2 text-center">

            <ParticleText
              text="Syncora"
              particleSize={2.2}
              density={4}
              color="#f8fafc"
              highlightColor="#8b5cf6"
              scatter={190}
              gatherDuration={1600}
              stagger={420}
              pointerRepel={42}
              repelRadius={120}
              idleDrift={0.8}
              trigger="mount"
              fontSize="clamp(3.5rem, 13vw, 9rem)"
              fontWeight={800}
              fontFamily="inherit"
              glow
            />

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
                tintOpacity={0}
                blur={0}
                textColor="#f5f5f5"
                lineColor="#ffffff"
                baseColor="#525252"
                intensity={1}
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