// 格式化大小
export function formatSize(size, rate) {
  if (typeof size === 'number') {
    size = size.toString()
  }

  if (size.match(/K|B|M|T/ig)) {
    return size
  }

  rate = rate || 1
  size = parseInt(size) * rate
  // 文件大小 初始Byte
  let fileSize = '0B'
  if (size >= 1024 * 1024 * 1024) {
    fileSize = parseInt((size / (1024 * 1024 * 1024)) * 100) / 100 + 'GB'
  } else if (size >= 1024 * 1024) {
    fileSize = (parseInt((size / (1024 * 1024)) * 100) / 100).toFixed(2) + 'MB'
  } else if (size >= 1024) {
    fileSize = (parseInt((size / 1024) * 100) / 100).toFixed(2) + 'KB'
  } else {
    fileSize = size.toFixed(0) + 'B'
  }
  return fileSize
}