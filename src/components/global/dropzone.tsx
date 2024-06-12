"use client"

import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { ScrollArea } from "@/components/ui/scroll-area"
import FileBox from './filebox';
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';

function FileDropzone() {
  const [files, setFiles] = useState<Array<any>>([]);

  const onDrop = (acceptedFiles: Array<any>) => {
    setFiles(acceptedFiles)
  }

  return (
    <div className='flex-1 px-16 py-5 pb-16 overflow-hidden gap-4'>
      {
        files.length == 0 ? (
          <Dropzone 
            onDrop={onDrop}
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
        ) : (
         <>
          <div className='p-4 w-full flex flex-row justify-between items-center'>
            <h1 className='text-2xl font-medium'>Uploaded files</h1>
            <Button variant="ghost" onClick={() => setFiles([])}><Trash size={30} /></Button>
          </div>
          <ScrollArea className='flex flex-col h-4/5 gap-2 p-4 rounded-md'>
            {files.map((file, key) => (
              <FileBox key={key} index={key} file={file} />
            ))}
          </ScrollArea>
         </>
        )
      }
    </div>
  )
}

export default FileDropzone