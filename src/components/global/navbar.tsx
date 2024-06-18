import Link from "next/link"
import ModeToggler from "./modetoggler"
import { buttonVariants } from "../ui/button"
import { FaGithub } from "react-icons/fa6"

function Navbar() {
  return (
    <nav className="flex-none flex w-full justify-between items-center px-4 md:px-10 py-8">
      <h1 className="text-2xl font-semibold tracking-wide">FileConv</h1>
      <div className="flex items-center gap-4">
        <ModeToggler />
        <Link 
          className={buttonVariants({ variant: "ghost" })}
          href="https://github.com/GowthamNatsAlt/file-convertor" 
        >
          <FaGithub size={28} />
        </Link>
      </div>
    </nav>
  )
}

export default Navbar