'use client'

import { useUIStore } from '@/shared/store/ui.store'

export function ExampleComponent() {
  const { isSidebarOpen, setSidebarOpen } = useUIStore()

  return (
    <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
      Toggle
    </button>
  )
}
