"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

type CriteriaListProps = {
  criteria: {
    length: boolean
    uppercase: boolean
    lowercase: boolean
    number: boolean
    special: boolean
  }
}

const CriteriaList = ({ criteria }: CriteriaListProps) => {
  const criteriaItems = [
    { key: "length", label: "At least 8 characters" },
    { key: "uppercase", label: "At least one uppercase letter" },
    { key: "lowercase", label: "At least one lowercase letter" },
    { key: "number", label: "At least one number" },
    { key: "special", label: "At least one special character" },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-3 p-5 bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-800/30 dark:to-gray-900/30 rounded-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Password must have:</h3>
      <motion.ul className="space-y-2.5" variants={container} initial="hidden" animate="show">
        {criteriaItems.map((item) => (
          <motion.li
            key={item.key}
            className="flex items-center text-sm group"
            variants={item}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 24 }}
          >
            <motion.span
              className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full mr-2.5 transition-all duration-300 ${
                criteria[item.key as keyof typeof criteria]
                  ? "bg-gradient-to-br from-emerald-400/20 to-emerald-500/20 dark:from-emerald-400/10 dark:to-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/30 dark:border-emerald-400/30"
                  : "bg-gradient-to-br from-red-400/20 to-red-500/20 dark:from-red-400/10 dark:to-red-500/10 text-red-500 dark:text-red-400 border border-red-500/30 dark:border-red-400/30"
              } group-hover:scale-110 group-hover:shadow-sm`}
              whileHover={{ scale: 1.2 }}
            >
              {criteria[item.key as keyof typeof criteria] ? <Check size={14} /> : <X size={14} />}
            </motion.span>
            <span
              className={`${
                criteria[item.key as keyof typeof criteria]
                  ? "text-gray-800 dark:text-gray-200"
                  : "text-gray-600 dark:text-gray-400"
              } group-hover:font-medium transition-all duration-200`}
            >
              {item.label}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}

export default CriteriaList
