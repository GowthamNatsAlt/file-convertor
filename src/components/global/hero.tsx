import { FlipWords } from "../ui/flip-words";

function Hero() {
  const words = ["videos", "audios", "images"];

  return (
    <div className="flex-none flex justify-center items-center px-8 py-10">
      <div className=" flex flex-col gap-6 text-center">
        <h1 className="text-3xl">Convert an unlimited number of</h1>
        <h1 className="text-4xl font-semibold"><FlipWords  words={words} /></h1>
        <h1 className="text-3xl">to the format you desire for free.</h1>
      </div>
    </div>
  )
}

export default Hero