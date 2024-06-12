import { X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function FileBox({ index, file }: { index: number, file: any }) {
  return (
    <div 
      key={index}
      className='w-full text-start outline rounded-md p-4 dark:bg-white dark:text-[#030816] 
      bg-[#030816] text-white text-md font-semibold flex flex-row items-center gap-4'
    >
      <div className='flex-1 flex md:flex-row md:justify-between flex-col gap-4'>
        <h1 className='flex-1'>{file.name}</h1>
        <div className='flex-none flex flex-row items-center gap-4'>
          <h1 className='opacity-50'>Convert to</h1>
          <Select>
            <SelectTrigger className="w-[100px] dark:bg-white dark:text-[#030816] bg-[#030816] text-white font-semibold border-2">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent className='dark:bg-white dark:text-[#030816] bg-[#030816] text-white font-semibold border-2'>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <X size={30} />
    </div>
  )
}

export default FileBox