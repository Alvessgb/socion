import type { Meta, StoryObj } from "@storybook/react";
import { Nav } from "@/components/ds/nav";

const meta: Meta<typeof Nav> = {
  title:     "Components/Nav",
  component: Nav,
  tags:      ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    track: { control: "radio", options: ["light", "dark"] },
  },
};
export default meta;

type Story = StoryObj<typeof Nav>;

const navItems = [
  { label: "Recursos", href: "/features" },
  { label: "Preços",   href: "/pricing" },
  { label: "Sobre",    href: "/about" },
];

export const LightCanvas: Story = {
  args: {
    track: "light",
    items: navItems,
  },
};

export const DarkCanvas: Story = {
  parameters: { backgrounds: { default: "canvas-night" } },
  args: {
    track: "dark",
    items: navItems,
  },
};
