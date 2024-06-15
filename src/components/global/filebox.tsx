import { X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { extensions } from '@/utils/constants/constants';
import { Dispatch, SetStateAction, useState } from 'react';
import { Button } from '../ui/button';
import { Files } from '@/utils/interfaces/file';
import { useToast } from '../ui/use-toast';


function FileBox(
  { index, file, files, setFiles } : 
  { index: number, file: Files, files: Array<Files>, setFiles: Dispatch<SetStateAction<Array<any>>> }
) {

  const fileType : string = file.value.type.substring(0, 5)
  const allowed_extensions : string[] = (
    fileType == "image" ? extensions.image : (fileType == "video" ? extensions.video : extensions.audio)
  )

  const handleSelect = (selectionValue : string) => {
    if (!allowed_extensions.includes(selectionValue)) {
      console.log("error with ext")
      return;
    }

    const updatedFiles = files.map((f) => f.value === file.value ? { value: file.value, conversion: selectionValue } : f);
    setFiles(updatedFiles)
  }

  return (
    <div 
      key={index}
      className='w-full text-start rounded-md p-4 dark:bg-white dark:text-[#030816] 
      bg-[#030816] text-white text-md font-semibold flex flex-row items-center gap-4 my-1'
    >
      <div className='flex-1 flex md:flex-row md:justify-between flex-col gap-4'>
        <div className='flex-1 flex flex-row justify-between items-center'>
          <h1 className='truncate'>{file.value.name}</h1>
          <Badge>Completed</Badge>
        </div>
        <div className='flex-none flex flex-row items-center gap-4'>
          <h1 className='opacity-50'>Convert to</h1>
          <Select
            onValueChange={handleSelect}
            value={ file.conversion !== "" ?  file.conversion : "" }
          >
            <SelectTrigger className="w-[100px] dark:bg-white dark:text-[#030816] bg-[#030816] text-white font-semibold border-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className='dark:bg-white dark:text-[#030816] bg-[#030816] text-white font-semibold border-2'>
              {
                allowed_extensions?.map((extension, key) => (
                  <SelectItem 
                    key={key} 
                    value={extension}
                  >
                    {extension}
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button variant="ghost" onClick={() => {
         setFiles(files.filter((f) => f !== file))
      }}>
        <X size={30} />
      </Button>
    </div>
  )
}

export default FileBox