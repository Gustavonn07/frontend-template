import type { Meta, StoryObj } from "@storybook/nextjs"
import { Tooltip } from "./tooltip"

const meta: Meta<typeof Tooltip> = {
  title: "UI/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    children: "Tooltip"
  }
}
