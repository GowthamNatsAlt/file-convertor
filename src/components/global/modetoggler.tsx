"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "../ui/button"

function ModeToggler() {
  const { theme, setTheme } = useTheme()

  return (
    <>
      {
        theme === "dark" ?
        <Button variant="outline" size="icon" onClick={() => setTheme("light")}>
          <Sun  size={20} />
        </Button> 
        : 
        <Button variant="outline" size="icon" onClick={() => setTheme("dark")}>
          <Moon size={20} />
        </Button>
      }
    </>
  )
}

export default ModeToggler