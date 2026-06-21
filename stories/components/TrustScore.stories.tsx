import type { Meta, StoryObj } from "@storybook/react";
import { TrustScore } from "@/components/ds/trust-score";

const meta: Meta<typeof TrustScore> = {
  title:     "Components/TrustScore",
  component: TrustScore,
  tags:      ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Trust Score 0-100 com 5 subscores de peso igual (20% cada): " +
          "Identidade, Experiência, Competência, Reputação e Comprometimento.",
      },
    },
  },
  argTypes: {
    score:      { control: { type: "range", min: 0, max: 100 } },
    identity:   { control: { type: "range", min: 0, max: 100 } },
    experience: { control: { type: "range", min: 0, max: 100 } },
    competence: { control: { type: "range", min: 0, max: 100 } },
    reputation: { control: { type: "range", min: 0, max: 100 } },
    commitment: { control: { type: "range", min: 0, max: 100 } },
    size:       { control: "radio", options: ["sm", "md", "lg"] },
  },
};
export default meta;

type Story = StoryObj<typeof TrustScore>;

export const HighScore: Story = {
  args: {
    score:      92,
    identity:   100,
    experience: 95,
    competence: 88,
    reputation: 90,
    commitment: 87,
    size:       "md",
  },
};

export const MidScore: Story = {
  args: {
    score:      62,
    identity:   80,
    experience: 60,
    competence: 55,
    reputation: 70,
    commitment: 45,
    size:       "md",
  },
};

export const LargeDisplay: Story = {
  args: {
    score:      92,
    identity:   100,
    experience: 95,
    competence: 88,
    reputation: 90,
    commitment: 87,
    size:       "lg",
  },
};

export const OnCard: Story = {
  render: () => (
    <div className="p-8 bg-[#fbfbf5]">
      <div className="max-w-sm bg-white rounded-xl border border-[#e4e4e7] p-8 shadow-[0_8px_8px_rgba(0,0,0,0.1),0_4px_4px_rgba(0,0,0,0.1),0_2px_2px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.1)]">
        <TrustScore
          score={92}
          identity={100}
          experience={95}
          competence={88}
          reputation={90}
          commitment={87}
        />
      </div>
    </div>
  ),
};
