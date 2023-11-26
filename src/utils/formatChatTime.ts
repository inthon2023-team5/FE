export const formatChatTime = (sentAt: string): string => {
  const date = new Date(sentAt)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  const today = new Date()
  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return `${hours}:${minutes}`
  }
  return `${month}/${day} ${hours}:${minutes}`
}
