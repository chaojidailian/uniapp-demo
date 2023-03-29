export default function getFileExt(fileName: string) {
  return fileName.lastIndexOf('.') !== -1
    ? fileName.slice(fileName.lastIndexOf('.'))
    : ''
}

//const imgSrcReg = /(?<=(img[^>]*src="))[^"]*/g
