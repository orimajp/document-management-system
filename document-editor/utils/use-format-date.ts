export const useFormatDate = () => {
  const { $dayjs } = useNuxtApp()

  const formatDateTime = (date: number) => {
    return $dayjs(date).tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm:ss')
  }
  
  return {
    formatDateTime,
  }
}