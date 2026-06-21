import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ds/button";

const meta: Meta<typeof Button> = {
  title:     "Components/Button",
  component: Button,
  tags:      ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Pill-shape (`border-radius: 9999px`) is the only button shape in the system. " +
          "Variants differ in fill/border/canvas polarity — never in shape.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "outlineDark", "outlineLight", "aloe", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
    },
    disabled: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: "Começar grátis", variant: "primary" },
};

export const OutlineOnLight: Story = {
  args: { children: "Entrar", variant: "outlineLight" },
};

export const OutlineOnDark: Story = {
  parameters: { backgrounds: { default: "canvas-night" } },
  args: { children: "Entrar", variant: "outlineDark" },
};

export const Aloe: Story = {
  args: { children: "Iniciar trial grátis", variant: "aloe" },
};

export const Ghost: Story = {
  parameters: { backgrounds: { default: "canvas-night" } },
  args: { children: "Saiba mais", variant: "ghost" },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <Button size="sm" variant="primary">Pequeno</Button>
      <Button size="md" variant="primary">Médio</Button>
      <Button size="lg" variant="primary">Grande</Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-12">
      <div className="flex items-center gap-4 flex-wrap p-8 bg-white rounded-xl">
        <Button variant="primary">Primary</Button>
        <Button variant="outlineLight">Outline Light</Button>
        <Button variant="aloe">Aloe</Button>
      </div>
      <div className="flex items-center gap-4 flex-wrap p-8 bg-black rounded-xl">
        <Button variant="outlineDark">Outline Dark</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button variant="primary"      disabled>Primary</Button>
      <Button variant="outlineLight" disabled>Outline</Button>
      <Button variant="aloe"         disabled>Aloe</Button>
    </div>
  ),
};
