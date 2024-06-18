import FileDropzone from "@/components/global/dropzone";
import Hero from "@/components/global/hero";
import Navbar from "@/components/global/navbar"

export default function Home() {
  return (
    <main className="flex flex-col">
      <Navbar />
      {/* <Hero /> */}
      <div className="flex flex-col items-center w-full h-full">
        <FileDropzone />
      </div>
    </main>
  );
}