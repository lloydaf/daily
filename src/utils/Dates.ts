export const getDate = (dateOffset: number) => {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() + dateOffset)
  return date
}
