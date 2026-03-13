import type { Meta, StoryObj } from "@storybook/nextjs"
import { Input } from "./input"

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    children: "Input"
  }
}
