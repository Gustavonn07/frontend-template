import { describe, it, expect, vi } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useDndHandlers } from "./useDndHandlers"
import type { DragStartEvent, DragEndEvent } from "@dnd-kit/core"

describe("useDndHandlers", () => {
  const initialItems = [
    { id: "1", content: "Item 1" },
    { id: "2", content: "Item 2" },
    { id: "3", content: "Item 3" },
  ]

  it("should set activeId on drag start", () => {
    const setItems = vi.fn()
    const { result } = renderHook(() => useDndHandlers(initialItems, setItems))

    const mockEvent = { active: { id: "2" } } as DragStartEvent

    act(() => {
      result.current.onDragStart(mockEvent)
    })

    expect(result.current.activeId).toBe("2")
  })

  it("should reorder items on drag end", () => {
    let items = [...initialItems]
    const setItems = (newItems: typeof items) => { items = newItems }

    const { result } = renderHook(() => useDndHandlers(items, setItems))

    const mockEvent = {
      active: { id: "1" },
      over: { id: "3" },
    } as DragEndEvent

    act(() => {
      result.current.onDragEnd(mockEvent)
    })

    expect(result.current.activeId).toBeNull()
    expect(items.map(i => i.id)).toEqual(["2", "3", "1"])
  })

  it("should not reorder if over is null", () => {
    let items = [...initialItems]
    const setItems = (newItems: typeof items) => { items = newItems }

    const { result } = renderHook(() => useDndHandlers(items, setItems))

    const mockEvent = {
      active: { id: "1" },
      over: null,
    } as DragEndEvent

    act(() => {
      result.current.onDragEnd(mockEvent)
    })

    expect(result.current.activeId).toBeNull()
    expect(items).toEqual(initialItems)
  })

  it("should not reorder if active.id === over.id", () => {
    let items = [...initialItems]
    const setItems = (newItems: typeof items) => { items = newItems }

    const { result } = renderHook(() => useDndHandlers(items, setItems))

    const mockEvent = {
      active: { id: "2" },
      over: { id: "2" },
    } as DragEndEvent

    act(() => {
      result.current.onDragEnd(mockEvent)
    })

    expect(result.current.activeId).toBeNull()
    expect(items).toEqual(initialItems)
  })
})