import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title:      "Design Tokens/Typography",
  tags:       ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

const displayScales = [
  { cls: "text-display-xxl", label: "display-xxl", size: "96px / 330", sample: "Encontre seu sócio." },
  { cls: "text-display-xl",  label: "display-xl",  size: "70px / 330", sample: "Encontre seu sócio." },
  { cls: "text-display-lg",  label: "display-lg",  size: "55px / 330", sample: "Encontre seu sócio." },
  { cls: "text-display-md",  label: "display-md",  size: "48px / 330", sample: "Encontre seu sócio." },
  { cls: "text-heading-xl",  label: "heading-xl",  size: "28px / 500", sample: "Trust Score" },
  { cls: "text-heading-lg",  label: "heading-lg",  size: "24px / 400", sample: "Trust Score" },
  { cls: "text-heading-md",  label: "heading-md",  size: "20px / 500", sample: "Trust Score" },
  { cls: "text-heading-sm",  label: "heading-sm",  size: "18px / 500", sample: "Competências" },
];

const bodyScales = [
  { cls: "text-body-lg",    label: "body-lg",     size: "18px / 550", sample: "Validamos competências, histórico e compatibilidade." },
  { cls: "text-body-md",    label: "body-md",     size: "16px / 420", sample: "Validamos competências, histórico e compatibilidade." },
  { cls: "text-body-strong",label: "body-strong", size: "16px / 550", sample: "Validamos competências, histórico e compatibilidade." },
  { cls: "text-caption",    label: "caption",     size: "14px / 500", sample: "Validamos competências, histórico e compatibilidade." },
  { cls: "text-micro",      label: "micro",       size: "13px / 500", sample: "Válido para o plano PRO durante 12 meses." },
  { cls: "text-eyebrow",    label: "eyebrow-cap", size: "12px / 400 uppercase", sample: "Plataforma de Sociedades" },
];

export const DisplayAndHeading: Story = {
  render: () => (
    <div className="p-12 bg-white min-h-screen">
      <p className="text-eyebrow text-[#71717a] mb-8">Neue Haas Grotesk Display — display & heading scales</p>
      <div className="flex flex-col gap-10">
        {displayScales.map((t) => (
          <div key={t.label} className="flex items-baseline gap-8 border-b border-[#e4e4e7] pb-8">
            <div className="w-32 shrink-0">
              <p className="text-[12px] font-[500] text-[#52525b] font-mono">{t.label}</p>
              <p className="text-[11px] text-[#a1a1aa]">{t.size}</p>
            </div>
            <p className={t.cls}>{t.sample}</p>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const BodyAndUI: Story = {
  render: () => (
    <div className="p-12 bg-[#fbfbf5] min-h-screen">
      <p className="text-eyebrow text-[#71717a] mb-8">Inter Variable — body & UI scales</p>
      <div className="flex flex-col gap-8">
        {bodyScales.map((t) => (
          <div key={t.label} className="flex items-baseline gap-8 border-b border-[#e4e4e7] pb-6">
            <div className="w-36 shrink-0">
              <p className="text-[12px] font-[500] text-[#52525b] font-mono">{t.label}</p>
              <p className="text-[11px] text-[#a1a1aa]">{t.size}</p>
            </div>
            <p className={t.cls}>{t.sample}</p>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const OnDarkCanvas: Story = {
  parameters: { backgrounds: { default: "canvas-night" } },
  render: () => (
    <div className="p-12 min-h-screen">
      {displayScales.slice(0, 4).map((t) => (
        <div key={t.label} className="mb-8">
          <p className="text-[11px] text-[#71717a] font-mono mb-2">{t.label} · {t.size}</p>
          <p className={`${t.cls} text-white`}>{t.sample}</p>
        </div>
      ))}
    </div>
  ),
};
