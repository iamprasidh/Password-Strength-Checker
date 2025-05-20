"use client"

import { useTheme } from "./theme-provider"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 
                backdrop-blur-md shadow-lg dark:shadow-gray-900/30 
                hover:shadow-xl hover:shadow-violet-500/20 dark:hover:shadow-violet-700/20
                focus:outline-none focus:ring-2 focus:ring-violet-500/50 dark:focus:ring-violet-400/50 
                transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-violet-600" />}
    </motion.button>
  )
}

export default ThemeToggle
