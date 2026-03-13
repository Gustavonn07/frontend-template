import type { Meta, StoryObj } from "@storybook/nextjs"
import { ToggleGroup } from "./toggle-group"

const meta: Meta<typeof ToggleGroup> = {
  title: "UI/ToggleGroup",
  component: ToggleGroup,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof ToggleGroup>

export const Default: Story = {
  args: {
    children: "ToggleGroup"
  }
}
