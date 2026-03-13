import type { Meta, StoryObj } from "@storybook/nextjs"
import { AspectRatio } from "./aspect-ratio"

const meta: Meta<typeof AspectRatio> = {
  title: "UI/AspectRatio",
  component: AspectRatio,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof AspectRatio>

export const Default: Story = {
  args: {
    children: "AspectRatio"
  }
}
