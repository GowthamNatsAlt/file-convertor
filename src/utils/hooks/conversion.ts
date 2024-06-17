import { Files } from '../interfaces/file';
import { promises as fs } from 'fs';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

function getFileExtension(filename: string) {
  // Might need to change regex if files have 2 dots
  const regex = /(?:\.([^.]+))?$/
  const match = regex.exec(filename)
  if (match && match[1]) {
    return match[1]
  }
  return ""
}

function removeFileExtension(filename: string) {
  const lastDotIndex = filename.lastIndexOf('.')
  if (lastDotIndex !== -1) {
    return filename.slice(0, lastDotIndex)
  }
  return ""; // No file extension found
}

export default async function convert (
  ffmpeg: FFmpeg,
  file: Files
): Promise<any> {
  const { value, conversion, status } = file;
  const input = `input.${getFileExtension(value.name)}`;
  const output = removeFileExtension(value.name) + '.' + conversion;  

  if (input === "" || output === "") 
    return null

  await ffmpeg.writeFile(
    input,
    await fetchFile(value)
  )

  let ffmpeg_cmd: any = [];
  // 3gp video
  if (conversion === '3gp')
    ffmpeg_cmd = [
      '-i',
      input,
      '-r',
      '20',
      '-s',
      '352x288',
      '-vb',
      '400k',
      '-acodec',
      'aac',
      '-strict',
      'experimental',
      '-ac',
      '1',
      '-ar',
      '8000',
      '-ab',
      '24k',
      output,
    ];
  else ffmpeg_cmd = ['-i', input, output];
   
  await ffmpeg.exec(ffmpeg_cmd);

  const data = (await ffmpeg.readFile(output)) as any;
  const blob = new Blob([data], { type: `${file.value.type.split('/')[0]}/${file.conversion}` });
  const url = URL.createObjectURL(blob);
  return { 
    url, 
    name: output 
  };
}