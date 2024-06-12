"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "../ui/button"
import useHasMounted from "@/utils/hooks/hasmounted"

function ModeToggler() {
  const { theme, setTheme } = useTheme()
  const hasMounted = useHasMounted()

  return (
    <>
      {
        hasMounted && theme === "dark" ?
        <Button variant="ghost" size="icon" onClick={() => setTheme("light")}>
          <Sun  size={28} />
        </Button> 
        : 
        <Button variant="ghost" size="icon" onClick={() => setTheme("dark")}>
          <Moon size={28} />
        </Button>
      }
    </>
  )
}

export default ModeToggler