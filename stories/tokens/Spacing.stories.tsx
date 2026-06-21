import type { Meta, StoryObj } from "@storybook/react";
import { spacing, radius, elevation } from "@/lib/design-system/tokens";

const meta: Meta = {
  title:      "Design Tokens/Spacing & Radius",
  tags:       ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

export const Spacing: Story = {
  render: () => (
    <div className="p-8 bg-[#fbfbf5]">
      <h1 className="text-heading-xl mb-8">Spacing Scale</h1>
      <div className="flex flex-col gap-4">
        {(Object.entries(spacing) as [string, string][]).map(([name, val]) => (
          <div key={name} className="flex items-center gap-6">
            <span className="text-[12px] font-[500] font-mono text-[#52525b] w-16">{name}</span>
            <span className="text-[11px] text-[#a1a1aa] w-10">{val}</span>
            <div className="bg-[#c1fbd4] h-4" style={{ width: val }} />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <div className="p-8 bg-[#fbfbf5]">
      <h1 className="text-heading-xl mb-8">Border Radius Scale</h1>
      <div className="flex flex-wrap gap-8">
        {(Object.entries(radius) as [string, string][]).map(([name, val]) => (
          <div key={name} className="flex flex-col items-center gap-3">
            <div
              className="w-24 h-24 bg-[#c1fbd4] border border-[#a8f5c2]"
              style={{ borderRadius: val === "9999px" ? "9999px" : val }}
            />
            <p className="text-[12px] font-[500] font-mono text-[#52525b]">{name}</p>
            <p className="text-[11px] text-[#a1a1aa]">{val}</p>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Elevation: Story = {
  render: () => (
    <div className="p-8 bg-[#fbfbf5]">
      <h1 className="text-heading-xl mb-8">Elevation — Light Canvas</h1>
      <div className="flex flex-wrap gap-8">
        {([1, 2, 3, 4] as const).map((level) => (
          <div
            key={level}
            className="w-32 h-32 bg-white rounded-xl flex items-center justify-center"
            style={{ boxShadow: elevation[level] }}
          >
            <span className="text-[20px] font-[330]">{level}</span>
          </div>
        ))}
      </div>
      <h1 className="text-heading-xl mt-12 mb-8">Elevation — Dark Canvas</h1>
      <div className="flex flex-wrap gap-8 bg-black p-8 rounded-xl">
        {([1, 2] as const).map((level) => (
          <div
            key={level}
            className="w-32 h-32 bg-[#0a0a0a] rounded-xl flex items-center justify-center border border-[#1e2c31]"
            style={{ boxShadow: elevation[level] }}
          >
            <span className="text-[20px] font-[330] text-white">{level}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};
