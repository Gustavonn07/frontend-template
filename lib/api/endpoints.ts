export function resolveEndpoint(
  endpoint: string,
  params?: Record<string, string | number>
) {
  if (!params) return endpoint

  return Object.entries(params).reduce((url, [key, value]) => {
    return url.replace(`:${key}`, String(value))
  }, endpoint)
}

export function buildQuery(query?: Record<string, string | number>) {
  if (!query) return ''

  const search = new URLSearchParams()
  Object.entries(query).forEach(([key, value]) => {
    search.append(key, String(value))
  })

  return `?${search.toString()}`
}

