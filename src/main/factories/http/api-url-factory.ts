export const makeApiUrl = (path: string): string => {
  const { VITE_BASE_URL } = import.meta.env
  return `${VITE_BASE_URL}${path}`
}
