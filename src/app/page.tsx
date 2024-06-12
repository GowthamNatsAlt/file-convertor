import FileDropzone from "@/components/global/dropzone";
import Hero from "@/components/global/hero";
import Navbar from "@/components/global/navbar"

export default function Home() {
  return (
    <main className="w-dvh h-dvh flex flex-col">
      <Navbar />
      <Hero />
      <FileDropzone />
    </main>
  );
}