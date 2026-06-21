import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/components/ds/input";

const meta: Meta<typeof Input> = {
  title:     "Components/Input",
  component: Input,
  tags:      ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: "seu@email.com" },
};

export const WithLabel: Story = {
  args: {
    label:       "E-mail",
    placeholder: "seu@email.com",
    type:        "email",
  },
};

export const WithHint: Story = {
  args: {
    label:       "LinkedIn",
    placeholder: "https://linkedin.com/in/...",
    hint:        "Obrigatório para gerar o Trust Score completo.",
  },
};

export const WithError: Story = {
  args: {
    label:       "E-mail",
    placeholder: "seu@email.com",
    error:       "E-mail inválido.",
    value:       "nao-e-email",
  },
};

export const Disabled: Story = {
  args: {
    label:    "E-mail",
    value:    "usuario@exemplo.com",
    disabled: true,
  },
};
