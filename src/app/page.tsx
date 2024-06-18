"use client"

import FileDropzone from "@/components/global/dropzone";
import Navbar from "@/components/global/navbar"
import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/ui/flip-words";
import { useState } from "react";

export default function Home() {
  const words = ["videos", "audios", "images"]
  const [startConv, setStartConv] = useState (false)

  return (
    <main className="flex flex-col h-screen w-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full h-full">
          {
            !startConv ? (
              <div className="flex flex-col gap-6 text-center relative bottom-[40px]">
                <h1 className="text-3xl">Convert an unlimited number of</h1>
                <h1 className="text-4xl font-semibold"><FlipWords  words={words} /></h1>
                <h1 className="text-3xl">to the format you desire for free.</h1>
                <Button variant="default" onClick={() => setStartConv(true)}>Start Conversion</Button>
              </div>
            ) : (
              <FileDropzone />
            )
          }
      </div>
    </main>
  );
}