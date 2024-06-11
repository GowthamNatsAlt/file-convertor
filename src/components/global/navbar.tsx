import ModeToggler from "./modetoggler"

function Navbar() {
  return (
    <nav className="flex w-full justify-between">
      <h1>LOGO</h1>
      <div className="flex">
        <ModeToggler />
        <h1>Repo</h1>
      </div>
    </nav>
  )
}

export default Navbar