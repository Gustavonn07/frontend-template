import type { Meta, StoryObj } from "@storybook/nextjs"
import { Chart } from "./chart"

const meta: Meta<typeof Chart> = {
  title: "UI/Chart",
  component: Chart,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Chart>

export const Default: Story = {
  args: {
    children: "Chart"
  }
}
