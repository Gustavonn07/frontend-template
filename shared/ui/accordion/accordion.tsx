"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

// Gere documentações técnicas em MDX para Storybook seguindo o padrão usado em projetos com Storybook. A documentação deve sempre começar com a importação dos blocos de docs (Meta, Canvas, Story, Controls) vindos de @storybook/addon-docs/blocks e a importação de todas as stories do componente. Em seguida deve ser usado <Meta of={ComponentStories} /> para conectar a documentação ao arquivo .stories.tsx. O nome do import das stories deve sempre seguir o padrão ComponentStories.

// A documentação deve começar com um título principal com o nome do componente e uma explicação clara sobre o que ele é e qual problema resolve na interface. A introdução deve explicar o propósito do componente e em quais cenários ele é normalmente utilizado. Depois da introdução deve existir uma explicação conceitual sobre como o componente organiza seus elementos internos ou como ele é estruturado, descrevendo brevemente suas partes principais.

// Após a introdução deve existir uma seção chamada "Como funciona", explicando o comportamento do componente e sua lógica de funcionamento. Essa seção deve explicar conceitos importantes como controle de estado, fluxo de interação do usuário ou comportamento interno do componente. Sempre que existir algum identificador, valor ou propriedade importante para o funcionamento do componente, ele deve ser demonstrado em um pequeno trecho de código.

// Depois disso deve existir uma seção chamada "Estrutura básica", mostrando a composição mínima do componente em JSX/TSX. Essa seção deve conter um bloco de código mostrando a estrutura mínima necessária para utilizar o componente. Logo abaixo deve existir uma subseção chamada "Hierarquia", demonstrando a estrutura dos subcomponentes usando uma representação em árvore textual.

// Após a explicação da estrutura deve existir uma seção chamada "Exemplo básico", onde uma story real do Storybook é renderizada usando <Canvas> e <Story of={ComponentStories.Default} />. Abaixo do preview deve existir também um exemplo de código mostrando o uso prático do componente.

// Em seguida deve existir uma seção chamada "Estrutura dos componentes" contendo uma tabela sempre feita usando HTML (<table>) e nunca usando markdown com | ou ---. Essa tabela deve possuir três colunas: Componente, Função e Props principais. Cada linha da tabela deve representar um subcomponente e na coluna de props deve existir uma lista <ul> com as propriedades principais daquele elemento.

// Depois disso deve existir uma seção chamada "Tipos principais", explicando os tipos ou enums importantes usados pelo componente. Sempre que possível os tipos devem ser apresentados em blocos de código TypeScript.

// Após isso deve existir uma seção chamada "Exemplo com variação", demonstrando outro comportamento ou modo do componente. Essa seção também deve renderizar uma story usando <Canvas> e <Story> e deve incluir um bloco de código mostrando o exemplo completo.

// Se o componente permitir controle externo de estado, deve existir uma seção chamada "Controle de estado (modo controlado)", explicando como controlar o componente externamente usando value, onChange, onValueChange ou propriedades equivalentes. Essa seção deve incluir um exemplo de código usando useState.

// Sempre que forem necessárias tabelas de propriedades ou estrutura, deve-se usar exclusivamente HTML <table> em vez de tabelas markdown. O padrão de tabela deve usar <thead>, <tbody>, <tr>, <th> e <td>. Quando necessário, listas de propriedades dentro da tabela devem ser representadas usando <ul> e <li>.

// A documentação deve seguir exatamente essa estrutura de seções: Introdução → Como funciona → Estrutura básica → Hierarquia → Exemplo básico → Estrutura dos componentes (com tabela HTML) → Tipos principais → Exemplo adicional → Controle de estado. O objetivo é manter um padrão consistente de documentação para todos os componentes do design system.

// Esse padrão deve ser usado para documentar componentes de UI como Accordion, Button, Modal, Input, Tabs, Dropdown e qualquer outro componente semelhante dentro do Storybook. Envie como um arquivo só, sem separaçao na resposta

// Seguindo esse prompt crie a documentação do Button

// Código: 

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-md border border-transparent py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon data-slot="accordion-trigger-icon" className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden" />
        <ChevronUpIcon data-slot="accordion-trigger-icon" className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--radix-accordion-content-height) pt-0 pb-4 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
