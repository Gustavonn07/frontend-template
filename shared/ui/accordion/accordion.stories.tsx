import type { Meta, StoryObj } from "@storybook/nextjs"

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion"

const meta: Meta<typeof Accordion> = {
  title: "UI/Accordion",
  component: Accordion,
}

export default meta

type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-100">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is React?</AccordionTrigger>
        <AccordionContent>
          React is a JavaScript library for building user interfaces.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>What is Next.js?</AccordionTrigger>
        <AccordionContent>
          Next.js is a framework built on top of React.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>What is Radix UI?</AccordionTrigger>
        <AccordionContent>
          Radix UI provides accessible primitives for building UI components.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-100">
      <AccordionItem value="item-1">
        <AccordionTrigger>First section</AccordionTrigger>
        <AccordionContent>
          Multiple accordion items can stay open simultaneously.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Second section</AccordionTrigger>
        <AccordionContent>
          This behavior is controlled by the type prop.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}