import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "outline", "secondary", "ghost", "destructive", "link"],
    },
    size: {
      control: { type: "select" },
      options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
    },
    asChild: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const ButtonPlayground: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    asChild: false,
  },
};