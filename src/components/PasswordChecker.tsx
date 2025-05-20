"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-hot-toast"
import { Copy, Eye, EyeOff, Shield, ShieldAlert, ShieldCheck } from "lucide-react"
import StrengthMeter from "./StrengthMeter"
import CriteriaList from "./CriteriaList"

// Password criteria
const CRITERIA = {
  length: { regex: /.{8,}/, description: "At least 8 characters" },
  uppercase: { regex: /[A-Z]/, description: "At least one uppercase letter" },
  lowercase: { regex: /[a-z]/, description: "At least one lowercase letter" },
  number: { regex: /[0-9]/, description: "At least one number" },
  special: { regex: /[^A-Za-z0-9]/, description: "At least one special character" },
}

type StrengthLevel = "weak" | "medium" | "strong" | "none"

const PasswordChecker = () => {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [strength, setStrength] = useState<StrengthLevel>("none")
  const [criteria, setCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  })

  // Check password strength and criteria
  useEffect(() => {
    if (!password) {
      setStrength("none")
      setCriteria({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
      })
      return
    }

    // Check each criterion
    const newCriteria = {
      length: CRITERIA.length.regex.test(password),
      uppercase: CRITERIA.uppercase.regex.test(password),
      lowercase: CRITERIA.lowercase.regex.test(password),
      number: CRITERIA.number.regex.test(password),
      special: CRITERIA.special.regex.test(password),
    }
    setCriteria(newCriteria)

    // Calculate strength
    const passedCriteriaCount = Object.values(newCriteria).filter(Boolean).length

    if (passedCriteriaCount <= 2) {
      setStrength("weak")
    } else if (passedCriteriaCount <= 4) {
      setStrength("medium")
    } else {
      setStrength("strong")
    }
  }, [password])

  // Get improvement tip based on current criteria
  const getImprovementTip = () => {
    if (!password) return "Enter a password to check its strength"
    if (strength === "strong") return "Excellent! Your password is strong and secure."

    const missingCriteria = Object.entries(criteria)
      .filter(([_, passed]) => !passed)
      .map(([key]) => CRITERIA[key as keyof typeof CRITERIA].description.toLowerCase())

    if (missingCriteria.length > 0) {
      return `Tip: Add ${missingCriteria.join(", ")} to strengthen your password.`
    }

    return "Keep improving your password strength."
  }

  // Copy password to clipboard
  const copyToClipboard = () => {
    if (!password) {
      toast.error("No password to copy!")
      return
    }

    navigator.clipboard
      .writeText(password)
      .then(() => toast.success("Password copied to clipboard!"))
      .catch(() => toast.error("Failed to copy password"))
  }

  const getStrengthIcon = () => {
    switch (strength) {
      case "weak":
        return <ShieldAlert className="text-red-500 dark:text-red-400" />
      case "medium":
        return <Shield className="text-amber-500 dark:text-amber-400" />
      case "strong":
        return <ShieldCheck className="text-emerald-500 dark:text-emerald-400" />
      default:
        return <Shield className="text-gray-400 dark:text-gray-500" />
    }
  }

  const getStrengthColor = () => {
    switch (strength) {
      case "weak":
        return "from-red-500 to-red-600 dark:from-red-600 dark:to-red-700"
      case "medium":
        return "from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700"
      case "strong":
        return "from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700"
      default:
        return "from-gray-400 to-gray-500 dark:from-gray-600 dark:to-gray-700"
    }
  }

  return (
    <motion.div
      className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-xl p-7 overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div className="relative mb-6">
        <div className="absolute left-3.5 top-3.5 text-gray-400 dark:text-gray-500">{getStrengthIcon()}</div>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full pl-11 pr-20 py-3.5 rounded-xl border border-gray-200/80 dark:border-gray-700/80 
                    focus:outline-none focus:ring-2 focus:ring-violet-500/50 dark:focus:ring-violet-400/50 
                    bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 transition-all duration-200
                    placeholder:text-gray-400 dark:placeholder:text-gray-500"
          aria-label="Password input"
        />
        <div className="absolute right-3 top-2.5 flex space-x-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 dark:text-gray-500 hover:text-violet-600 dark:hover:text-violet-400 
                      transition-colors duration-200 p-1.5 rounded-full hover:bg-violet-100/50 dark:hover:bg-violet-900/30"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={copyToClipboard}
            className="text-gray-400 dark:text-gray-500 hover:text-violet-600 dark:hover:text-violet-400 
                      transition-colors duration-200 p-1.5 rounded-full hover:bg-violet-100/50 dark:hover:bg-violet-900/30"
            aria-label="Copy password to clipboard"
            disabled={!password}
          >
            <Copy size={18} />
          </motion.button>
        </div>
      </div>

      <StrengthMeter strength={strength} />

      <div className="mt-4 mb-5 flex items-center">
        <AnimatePresence mode="wait">
          {strength !== "none" && (
            <motion.div
              key={strength}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center"
            >
              <div className="mr-2">{getStrengthIcon()}</div>
              <p className={`text-sm font-medium bg-gradient-to-r ${getStrengthColor()} bg-clip-text text-transparent`}>
                {strength === "none"
                  ? ""
                  : `Password Strength: ${strength.charAt(0).toUpperCase() + strength.slice(1)}`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {password && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 p-4 bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 rounded-xl border border-violet-100/50 dark:border-violet-700/30"
          >
            <h3 className="text-sm font-medium text-violet-700 dark:text-violet-300 mb-1">Tips to Improve</h3>
            <p className="text-sm text-violet-600 dark:text-violet-200">{getImprovementTip()}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <CriteriaList criteria={criteria} />

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full mt-6 py-3.5 px-4 rounded-xl font-medium text-white 
                  transition-all duration-300 ${
                    password
                      ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 dark:from-violet-500 dark:to-indigo-500 dark:hover:from-violet-600 dark:hover:to-indigo-600 shadow-lg shadow-violet-500/20 dark:shadow-violet-700/20 hover:shadow-xl hover:shadow-violet-500/30 dark:hover:shadow-violet-700/30"
                      : "bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-700 dark:to-gray-800 cursor-not-allowed"
                  }`}
        onClick={copyToClipboard}
        disabled={!password}
        style={{
          boxShadow: password
            ? "0 10px 15px -3px rgba(124, 58, 237, 0.2), 0 4px 6px -2px rgba(124, 58, 237, 0.1)"
            : "none",
        }}
      >
        {password ? "Copy Password" : "Enter a Password"}
      </motion.button>
    </motion.div>
  )
}

export default PasswordChecker
