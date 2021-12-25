export const makeApiUrl = (path: string): string => {
  const { VITE_BASE_URL } = process.env
  return `${VITE_BASE_URL}${path}`
}
