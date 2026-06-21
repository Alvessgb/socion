import type { Meta, StoryObj } from "@storybook/react";
import { colors } from "@/lib/design-system/tokens";

const meta: Meta = {
  title:     "Design Tokens/Colors",
  tags:      ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="w-20 h-20 rounded-lg border border-[#e4e4e7]"
        style={{ background: value }}
      />
      <p className="text-[12px] font-[500] text-[#52525b] break-all">{name}</p>
      <p className="text-[11px] text-[#a1a1aa] font-mono">{value}</p>
    </div>
  );
}

export const AllColors: Story = {
  render: () => (
    <div className="p-8 bg-[#fbfbf5] min-h-screen">
      <h1 className="text-[48px] font-[330] leading-[1.14] mb-2 [font-feature-settings:'ss03']">
        Color Tokens
      </h1>
      <p className="text-[16px] font-[420] text-[#71717a] mb-12 [font-feature-settings:'ss03']">
        Two-canvas system: canvas-night (cinematic) · canvas-light (transactional)
      </p>

      <section className="mb-12">
        <h2 className="text-[20px] font-[500] mb-6 tracking-[0.3px] [font-feature-settings:'ss03']">Canvas</h2>
        <div className="flex flex-wrap gap-6">
          <Swatch name="canvas-night"          value={colors.canvasNight} />
          <Swatch name="canvas-night-elevated" value={colors.canvasNightElevated} />
          <Swatch name="canvas-light"          value={colors.canvasLight} />
          <Swatch name="canvas-cream"          value={colors.canvasCream} />
          <Swatch name="surface-elevated-dark" value={colors.surfaceElevatedDark} />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-[500] mb-6 tracking-[0.3px] [font-feature-settings:'ss03']">Brand Accents</h2>
        <div className="flex flex-wrap gap-6">
          <Swatch name="aloe-10"      value={colors.aloe10} />
          <Swatch name="pistachio-10" value={colors.pistachio10} />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-[500] mb-6 tracking-[0.3px] [font-feature-settings:'ss03']">Shade Ladder</h2>
        <div className="flex flex-wrap gap-6">
          <Swatch name="shade-30" value={colors.shade30} />
          <Swatch name="shade-40" value={colors.shade40} />
          <Swatch name="shade-50" value={colors.shade50} />
          <Swatch name="shade-60" value={colors.shade60} />
          <Swatch name="shade-70" value={colors.shade70} />
          <Swatch name="ink"      value={colors.ink} />
          <Swatch name="on-dark"  value={colors.onDark} />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-[500] mb-6 tracking-[0.3px] [font-feature-settings:'ss03']">Hairlines & Links</h2>
        <div className="flex flex-wrap gap-6">
          <Swatch name="hairline-light" value={colors.hairlineLight} />
          <Swatch name="hairline-dark"  value={colors.hairlineDark} />
          <Swatch name="link-cool-1"    value={colors.linkCool1} />
          <Swatch name="link-cool-2"    value={colors.linkCool2} />
          <Swatch name="link-cool-3"    value={colors.linkCool3} />
          <Swatch name="link-mint"      value={colors.linkMint} />
        </div>
      </section>
    </div>
  ),
};
