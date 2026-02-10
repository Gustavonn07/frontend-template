export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface HttpRequestConfig<TBody = unknown> {
  url: string
  method?: HttpMethod
  params?: Record<string, unknown>
  body?: TBody
  headers?: Record<string, string>
}

export interface HttpResponse<TData = unknown> {
  data: TData
  status: number
  headers: Record<string, string>
}
