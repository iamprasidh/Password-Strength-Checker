"use client"

import { motion } from "framer-motion"

type StrengthMeterProps = {
  strength: "weak" | "medium" | "strong" | "none"
}

const StrengthMeter = ({ strength }: StrengthMeterProps) => {
  // Determine progress percentage based on strength
  const getProgressPercentage = () => {
    switch (strength) {
      case "weak":
        return 25
      case "medium":
        return 50
      case "strong":
        return 100
      default:
        return 0
    }
  }

  // Determine color based on strength
  const getGradient = () => {
    switch (strength) {
      case "weak":
        return "from-red-400 to-red-600"
      case "medium":
        return "from-amber-400 to-amber-600"
      case "strong":
        return "from-emerald-400 to-emerald-600"
      default:
        return "from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600"
    }
  }

  return (
    <div className="mt-4">
      <div className="h-2.5 w-full bg-gray-200/70 dark:bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${getGradient()}`}
          initial={{ width: 0 }}
          animate={{ width: `${getProgressPercentage()}%` }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </div>

      <div className="flex justify-between mt-1.5 px-0.5">
        <div className="w-1/4 text-center">
          <div
            className={`h-1 w-1 rounded-full mx-auto ${
              strength !== "none" ? "bg-red-500 dark:bg-red-400" : "bg-gray-300 dark:bg-gray-600"
            }`}
          />
          <span className="text-[10px] text-gray-500 dark:text-gray-400">Weak</span>
        </div>
        <div className="w-1/4 text-center">
          <div
            className={`h-1 w-1 rounded-full mx-auto ${
              strength === "medium" || strength === "strong"
                ? "bg-amber-500 dark:bg-amber-400"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          />
          <span className="text-[10px] text-gray-500 dark:text-gray-400">Medium</span>
        </div>
        <div className="w-1/4 text-center">
          <div
            className={`h-1 w-1 rounded-full mx-auto ${
              strength === "strong" ? "bg-emerald-500 dark:bg-emerald-400" : "bg-gray-300 dark:bg-gray-600"
            }`}
          />
          <span className="text-[10px] text-gray-500 dark:text-gray-400">Strong</span>
        </div>
      </div>
    </div>
  )
}

export default StrengthMeter
