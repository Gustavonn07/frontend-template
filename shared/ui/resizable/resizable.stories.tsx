import type { Meta, StoryObj } from "@storybook/nextjs"
import { Resizable } from "./resizable"

const meta: Meta<typeof Resizable> = {
  title: "UI/Resizable",
  component: Resizable,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Resizable>

export const Default: Story = {
  args: {
    children: "Resizable"
  }
}
