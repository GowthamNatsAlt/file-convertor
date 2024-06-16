"use client"

import React, { useEffect, useRef, useState } from 'react'
import Dropzone from 'react-dropzone'
import { ScrollArea } from "@/components/ui/scroll-area"
import FileBox from './filebox';
import { Button } from '../ui/button';
import { ArrowRightLeft, Trash } from 'lucide-react';
import { toast } from '../ui/use-toast';
import { accepted_files } from '@/utils/constants/constants';
import { Files } from '@/utils/interfaces/file';
import convert from '@/utils/hooks/conversion';
import { FFmpeg } from "@ffmpeg/ffmpeg";
import loadFfmpeg from '@/utils/hooks/loadFFmpeg';

function FileDropzone() {
  const [files, setFiles] = useState<Files []>([])
  const [isLoaded,  setIsLoaded] = useState(false)
  const ffmpegRef = useRef<any>(null)

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
    if (!isLoaded) {
      toast({
        variant: "destructive",
        title: "FFmpeg not loaded",
        description: " Please wait for FFmpeg to load.",
        duration: 2000
      })
      return
    }
    if (files.every(f => f.conversion === "")) {
      toast({
        variant: "destructive",
        title: "Empty conversion format",
        description: " Please select a conversion format for the files to be converted.",
        duration: 2000
      })
      return
    }

    setFiles(files.map((f) => {
      f.status = "Converting"
      return f
    }))

    files.map(async f => {
      await convert(ffmpegRef.current, f)
        .then((value) => {
          console.log(value)
          let tempFiles = files 
          tempFiles[files.indexOf(f)].status = "Done"
          setFiles([...tempFiles])
        })
        .catch((err) => {
          console.error(err)
          let tempFiles = files 
          tempFiles[files.indexOf(f)].status = "Error"
          setFiles([...tempFiles])
        })
    })
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
    <div className='flex-1 px-16 py-5 gap-4'>
      <Dropzone 
        onDrop={ onDrop }
        accept={ accepted_files }
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
              <p className='text-xl text-center'>Drag & drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
      
      {
        files.length !== 0 && (
          <div className='h-2/3 overflow-hidden'>
            <div className='p-4 w-full flex flex-row justify-between items-center'>
              <h1 className='text-2xl font-medium'>Uploaded files</h1>
              <div className='flex flex-row items-center'>
                {
                  files.length > 0 &&
                  <Button variant="ghost" onClick={handleConvert}><ArrowRightLeft size={30} /></Button>
                }
                <Button variant="ghost" onClick={() => setFiles([])}><Trash size={30} /></Button>
              </div>
            </div>
            <ScrollArea className='flex flex-col h-4/5 p-4 rounded-md'>
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