import { motion } from "framer-motion";
import darkLogo from "../assets/logo-dark-mode.png";

function PageLoader() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black">
      <div className="relative h-32 w-32">

        {/* Rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute inset-0
            rounded-full
            border-2
            border-white/10
            border-t-white/80
          "
        />

        {/* Glow */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute inset-3
            rounded-full
            bg-white/20
            blur-2xl
          "
        />

        {/* Logo */}
        <motion.img
          src={darkLogo}
          alt="Syncora"
          animate={{
            scale: [1, 0.94, 1],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute inset-7
            h-[calc(100%-56px)]
            w-[calc(100%-56px)]
            object-contain
          "
        />

      </div>
    </div>
  );
}

export default PageLoader;