import type { Meta, StoryObj } from "@storybook/nextjs"
import { Calendar } from "./calendar"

const meta: Meta<typeof Calendar> = {
  title: "UI/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Calendar>

export const Default: Story = {
  args: {
    children: "Calendar"
  }
}
