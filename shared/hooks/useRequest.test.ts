import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useRequest } from './useRequest'

const mockFetch = vi.fn()
global.fetch = mockFetch

beforeEach(() => {
  vi.clearAllMocks()
})

function mockFetchResponse(
  data: object,
  ok: boolean = true,
  status: number = 200
) {
  mockFetch.mockResolvedValueOnce({
    ok,
    status,
    json: async () => data,
  })
}

describe('useRequest', () => {
  it('should do GET successfuly (default)', async () => {
    const responseData = { id: 1, name: 'Gustavo' }
    mockFetchResponse(responseData)

    const { result } = renderHook(() => useRequest<typeof responseData>())

    await act(async () => {
      const data = await result.current.request({
        endpoint: '/users/:id',
        params: { id: 1 },
      })

      expect(data).toEqual(responseData)
    })

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3333/users/1',
      expect.objectContaining({
        method: 'GET',
      })
    )

    expect(result.current.loading).toBe(false)
    expect(result.current.data).toEqual(responseData)
  })

  it('should do POST successfuly using body', async () => {
    const responseData = { id: 1 }
    mockFetchResponse(responseData)

    const { result } = renderHook(() => useRequest<typeof responseData>())

    await act(async () => {
      await result.current.request({
        method: 'POST',
        endpoint: '/users',
        body: { name: 'Gustavo' },
      })
    })

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3333/users',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ name: 'Gustavo' }),
      })
    )
  })

  it('should do PUT successfuly using params and body', async () => {
    const responseData = { success: true }
    mockFetchResponse(responseData)

    const { result } = renderHook(() => useRequest<typeof responseData>())

    await act(async () => {
      await result.current.request({
        method: 'PUT',
        endpoint: '/users/:id',
        params: { id: 2 },
        body: { name: 'Novo nome' },
      })
    })

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3333/users/2',
      expect.objectContaining({
        method: 'PUT',
      })
    )
  })

  it('should do PATCH', async () => {
    const responseData = { updated: true }
    mockFetchResponse(responseData)

    const { result } = renderHook(() => useRequest<typeof responseData>())

    await act(async () => {
      await result.current.request({
        method: 'PATCH',
        endpoint: '/users/:id',
        params: { id: 3 },
        body: { active: false },
      })
    })

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3333/users/3',
      expect.objectContaining({
        method: 'PATCH',
      })
    )
  })

  it('should do DELETE successfuly using params', async () => {
    const responseData = { deleted: true }
    mockFetchResponse(responseData)

    const { result } = renderHook(() => useRequest<typeof responseData>())

    await act(async () => {
      await result.current.request({
        method: 'DELETE',
        endpoint: '/users/:id',
        params: { id: 10 },
      })
    })

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3333/users/10',
      expect.objectContaining({
        method: 'DELETE',
        body: undefined,
      })
    )
  })

  it('resolve errors when is not OK', async () => {
    mockFetchResponse({ message: 'Erro interno' }, false, 500)

    const { result } = renderHook(() => useRequest())

    let error: Error | undefined

    await act(async () => {
      try {
        await result.current.request({
          endpoint: '/error',
        })
      } catch (err) {
        error = err as Error
      }
    })

    expect(error).toBeInstanceOf(Error)
    expect(error?.message).toBe('Erro 500')

    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.loading).toBe(false)
  })

  it('should resolve errors with exception', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    const { result } = renderHook(() => useRequest())

    let error: Error | undefined

    await act(async () => {
      try {
        await result.current.request({
          endpoint: '/users',
        })
      } catch (err) {
        error = err as Error
      }
    })

    expect(error).toBeInstanceOf(Error)
    expect(error?.message).toBe('Network error')

    expect(result.current.error?.message).toBe('Network error')
    expect(result.current.loading).toBe(false)
  })

})
