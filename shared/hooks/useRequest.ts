'use client'

import { useState, useCallback } from 'react'
import { RequestConfig } from '../types/api/request-config'
import { buildQuery, resolveEndpoint } from '@/lib/api/endpoints'

const BASE_URL = 'http://localhost:3333' // TROCAR PELA ENV

/**
 * Hook genérico para realizar requisições HTTP usando `fetch`.
 *
 * Fornece controle de estado para:
 * - `data`: resposta da requisição
 * - `loading`: status de carregamento
 * - `error`: erro ocorrido na requisição
 *
 * Suporta:
 * - Métodos HTTP (GET, POST, PUT, PATCH, DELETE)
 * - Path params (`/users/:id`)
 * - Query params (`?page=1`)
 * - Body (JSON)
 * - Headers customizados
 *
 * @template TResponse Tipo esperado da resposta da requisição
 *
 * @example
 * ```ts
 * const { data, loading, error, request } = useRequest<User>()
 *
 * useEffect(() => {
 *   request({
 *     endpoint: '/users/:id',
 *     params: { id: 1 },
 *   })
 * }, [])
 * ```
 */
export function useRequest<TResponse = unknown>() {
  /**
   * Dados retornados pela última requisição bem-sucedida
   */
  const [data, setData] = useState<TResponse | null>(null)

  /**
   * Indica se uma requisição está em andamento
   */
  const [loading, setLoading] = useState(false)

  /**
   * Erro retornado pela requisição, caso ocorra
   */
  const [error, setError] = useState<Error | null>(null)

  /**
   * Executa uma requisição HTTP.
   *
   * @template TBody Tipo do corpo da requisição
   *
   * @param config Configuração da requisição
   * @param config.endpoint Endpoint da API (ex: `/users/:id`)
   * @param config.method Método HTTP (default: `GET`)
   * @param config.params Parâmetros de rota (path params)
   * @param config.query Query params
   * @param config.body Corpo da requisição (JSON)
   * @param config.headers Headers adicionais
   *
   * @returns Promise com os dados da resposta
   *
   * @throws Error Caso a requisição falhe ou a resposta não seja `ok`
   *
   * @example
   * ```ts
   * await request({
   *   endpoint: '/users',
   *   method: 'POST',
   *   body: { name: 'Gustavo' },
   * })
   * ```
   */
  const request = useCallback(
    async <TBody = unknown>({
      method = 'GET',
      endpoint,
      params,
      query,
      body,
      headers,
    }: RequestConfig<TBody>) => {
      setLoading(true)
      setError(null)

      try {
        const resolvedEndpoint = resolveEndpoint(endpoint, params)
        const queryString = buildQuery(query)

        const response = await fetch(
          `${BASE_URL}${resolvedEndpoint}${queryString}`,
          {
            method,
            headers: {
              'Content-Type': 'application/json',
              ...headers,
            },
            body: body ? JSON.stringify(body) : undefined,
          }
        )

        if (!response.ok) {
          throw new Error(`Erro ${response.status}`)
        }

        const responseData = await response.json()
        setData(responseData)
        return responseData
      } catch (err) {
        setError(err as Error)
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return {
    data,
    loading,
    error,
    request,
  }
}
