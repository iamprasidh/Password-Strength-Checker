import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "./components/theme-provider"
import PasswordChecker from "./components/PasswordChecker"
import ThemeToggle from "./components/ThemeToggle"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="password-checker-theme">
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50 dark:from-gray-950 dark:via-indigo-950 dark:to-gray-900 transition-colors duration-500 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 dark:opacity-20 pointer-events-none">
          <div className="absolute top-[10%] left-[15%] w-[30rem] h-[30rem] bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-[8rem] animate-blob"></div>
          <div className="absolute top-[20%] right-[15%] w-[25rem] h-[25rem] bg-cyan-300 dark:bg-cyan-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-[8rem] animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[15%] left-[35%] w-[25rem] h-[25rem] bg-pink-300 dark:bg-pink-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-[8rem] animate-blob animation-delay-4000"></div>
        </div>

        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-md z-10">
          <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">
            Password Strength
          </h1>
          <PasswordChecker />
        </div>

        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "rgba(15, 23, 42, 0.8)",
              color: "#fff",
              backdropFilter: "blur(10px)",
              borderRadius: "12px",
              padding: "12px 16px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            },
          }}
        />
      </div>
    </ThemeProvider>
  )
}

export default App
