"use client"

import React, { useEffect, useRef, useState } from 'react'
import Dropzone from 'react-dropzone'
import { ScrollArea } from "@/components/ui/scroll-area"
import FileBox from './filebox';
import { Button } from '../ui/button';
import { ArrowDown, ArrowRightLeft, Trash } from 'lucide-react';
import { toast } from '../ui/use-toast';
import { accepted_files } from '@/utils/constants/constants';
import { Files } from '@/utils/interfaces/file';
import convert from '@/utils/hooks/conversion';
import { FFmpeg } from "@ffmpeg/ffmpeg";
import loadFfmpeg from '@/utils/hooks/loadFFmpeg';
import { Blobs } from '@/utils/interfaces/blob';
import JSZip from 'jszip';

function FileDropzone() {
  const [files, setFiles] = useState<Files []>([])
  const [isLoaded,  setIsLoaded] = useState(false)
  const [blobs, setBlobs] = useState<Blobs []>([])
  const ffmpegRef = useRef<any>(null)
  const [isConverting, setIsConverting] = useState(false)

  const onDrop = async (acceptedFiles: Array<any>) => {
     const newFiles = await Promise.all(
      acceptedFiles.map(async (file) => {
        return { 
          value: file, 
          conversion: "",
          status: "Uploaded",
        }
      })
    )
    setFiles((prevFiles) => [...prevFiles, ...newFiles])
  }

  const handleConvert = async () => {
    // if FFmpeg isn't loaded
    if (!isLoaded) {
      toast({
        variant: "destructive",
        title: "FFmpeg not loaded",
        description: " Please wait for FFmpeg to load.",
        duration: 2000
      })
      return
    }
    // If there are any of files without a conversion mentioned
    if (files.every(f => f.conversion === "")) {
      toast({
        variant: "destructive",
        title: "Empty conversion format",
        description: " Please select a conversion format for the files to be converted.",
        duration: 2000
      })
      return
    }

    //  Convert files using FFmpeg
    toast({
      variant: "default",
      title: "Starting Conversion",
      description: "Please wait for the conversion to finish.",
      duration: 2000
    })
    setFiles(files.map((f) => {
      f.status = "Converting"
      return f
    }))
    setIsConverting(true)
    setBlobs ([]);

    files.map(async f => {
      await convert(ffmpegRef.current, f)
        .then((value) => {
          setBlobs((prevBlobs) => [...prevBlobs, value])
          let tempFiles = files 
          tempFiles[files.indexOf(f)].status = "Done"
          setFiles([...tempFiles])
        })
        .catch((err) => {
          let tempFiles = files 
          tempFiles[files.indexOf(f)].status = "Error"
          setFiles([...tempFiles])
          toast({
            variant: "destructive",
            title: "Error while converting",
            description: "There seems to be an error while converting the files.",
            duration: 2000
          })
          return
        })
    })

    setIsConverting(false)
    toast({
      variant: "default",
      title: "Conversion Finished",
      description: "All files have been converted successfully.",
      duration: 2000
    })
  }

const handleDownload = async () => {
  console.log(blobs)
  if (blobs.length === 1) {
    const a = document.createElement("a")
    a.style.display = "none"
    a.href = blobs[0].url
    a.download = blobs[0].name
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(blobs[0].url);
    document.body.removeChild(a);
  }
  else {
    const zip = new JSZip()
    blobs.map((blob, index) => {
      zip.file(blob.name, blob.url)
    })
    const zipContent = await zip.generateAsync({ type: "blob" });
    console.log(zipContent)
    const a = document.createElement("a")
    a.href = URL.createObjectURL(zipContent)
    a.download = "converted-files.zip"
    a.click()
  }
  toast({
    variant: "default",
    title: "Download Finished",
    description: "All files have been downloaded successfully.",
    duration: 2000
  })
  setBlobs([])
}

  const load = async () => {
    const ffmpeg_response: FFmpeg = await loadFfmpeg();
    ffmpegRef.current = ffmpeg_response;
    setIsLoaded(true);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className='px-4 md:px-16 py-5 gap-4 h-screen w-full lg:w-2/3'>
      <Dropzone 
        onDrop={ onDrop }
        accept={ accepted_files }
        disabled={isConverting}
        onError={() => {
          toast({
            variant: "destructive",
            title: "Error uploading your file(s)",
            description: "Only audios, videos and images are allowed.",
            duration: 2000
          })
        }}
        onDropRejected={() => {
          toast({
            variant: "destructive",
            title: "Error uploading your file(s)",
            description: "Only audios, videos and images are allowed.",
            duration: 2000
          })
        }}
      >
        {({getRootProps, getInputProps}) => (
          <section>
            <div {...getRootProps({
              className: 'h-[250px] w-full border-4 border-dashed border p-4 rounded-md flex items-center justify-center'
            })}>
              <input {...getInputProps()} />
              <p className={`text-xl text-center ${isConverting && "opacity-50"}`}>Drag & drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
      
      {
        files.length !== 0 && (
          <div className='h-2/3 overflow-hidden'>
            <div className='p-4 w-full flex flex-row justify-between items-center'>
              <h1 className='text-lg sm:text-xl md:text-2xl font-medium'>Uploaded files</h1>
              <div className='flex flex-row items-center'>
                  <Button
                    disabled={!(files.length > 0 && !isConverting)}
                    className='disabled:opacity-50'
                    variant="ghost" 
                    onClick={handleConvert}>
                    <ArrowRightLeft size={30} />
                  </Button>
                  <Button 
                    disabled={!(blobs.length > 0 && !isConverting)}
                    className='disabled:opacity-50'
                    variant="ghost" 
                    onClick={handleDownload}>
                      <ArrowDown size={30} />
                  </Button>
                <Button variant="ghost" onClick={() => setFiles([])}><Trash size={30} /></Button>
              </div>
            </div>
            <ScrollArea 
              className='flex flex-col h-4/5 p-4 rounded-md'
              type="always"
            >
              {files.map((file, key) => (
                <FileBox key={key} index={key} file={file} files={files} setFiles={setFiles} />
              ))}
            </ScrollArea>
          </div>
        )
      }

    </div>
  )
}

export default FileDropzone