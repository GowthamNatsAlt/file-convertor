"use client"

import React, { useRef, useState } from 'react'
import Dropzone from 'react-dropzone'
import { ScrollArea } from "@/components/ui/scroll-area"
import FileBox from './filebox';
import { Button } from '../ui/button';
import { ArrowRightLeft, Trash } from 'lucide-react';
import { toast } from '../ui/use-toast';
import { accepted_files } from '@/utils/constants/constants';
import { Files } from '@/utils/interfaces/file';

function FileDropzone() {
  const [files, setFiles] = useState<Files []>([])

  const onDrop = async (acceptedFiles: Array<any>) => {
     const newFiles = await Promise.all(
      acceptedFiles.map(async (file) => {
        return { 
          value: file, 
          conversion: ""
        }
      })
    )
    setFiles((prevFiles) => [...prevFiles, ...newFiles])
  }

  const handleConvert = async () => {
    console.log(files)
  }

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