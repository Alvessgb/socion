import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "@/components/ds/tag";

const meta: Meta<typeof Tag> = {
  title:     "Components/Tag",
  component: Tag,
  tags:      ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["mint", "shade", "dark"] },
  },
};
export default meta;

type Story = StoryObj<typeof Tag>;

export const Mint:  Story = { args: { children: "Plataforma de Sociedades", variant: "mint" } };
export const Shade: Story = { args: { children: "Trust Score", variant: "shade" } };
export const Dark:  Story = {
  parameters: { backgrounds: { default: "canvas-night" } },
  args: { children: "Verificado", variant: "dark" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap p-8 bg-[#fbfbf5] rounded-xl">
      <Tag variant="mint">Plataforma de Sociedades</Tag>
      <Tag variant="shade">Trust Score</Tag>
      <div className="bg-black rounded-full px-1 py-1">
        <Tag variant="dark">Verificado</Tag>
      </div>
    </div>
  ),
};
