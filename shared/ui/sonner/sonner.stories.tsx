import type { Meta, StoryObj } from "@storybook/nextjs"
import { Sonner } from "./sonner"

const meta: Meta<typeof Sonner> = {
  title: "UI/Sonner",
  component: Sonner,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Sonner>

export const Default: Story = {
  args: {
    children: "Sonner"
  }
}
