import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ds/card";
import { Button } from "@/components/ds/button";
import { Tag } from "@/components/ds/tag";

const meta: Meta = {
  title:      "Components/Card",
  tags:       ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

export const PricingLight: Story = {
  render: () => (
    <div className="p-12 bg-[#fbfbf5] flex gap-6 flex-wrap">
      {/* Standard tier */}
      <Card variant="pricing" className="w-72">
        <CardHeader>
          <CardTitle>Starter</CardTitle>
          <CardDescription>Para quem está começando</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-[48px] font-[330] leading-[1.14] [font-feature-settings:'ss03'] mb-4">
            R$0
          </p>
          <ul className="flex flex-col gap-2 text-[16px] font-[420] text-[#52525b]">
            <li>✓ 5 likes por dia</li>
            <li>✓ Ver perfil básico</li>
            <li>✗ Proposta de sociedade</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button variant="outlineLight" className="w-full">Começar grátis</Button>
        </CardFooter>
      </Card>

      {/* Featured tier */}
      <Card variant="pricingFeatured" className="w-72">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Tag variant="mint">Mais popular</Tag>
          </div>
          <CardTitle>PRO</CardTitle>
          <CardDescription>Para quem leva a sério</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-[48px] font-[330] leading-[1.14] [font-feature-settings:'ss03'] mb-4">
            R$49
            <span className="text-[16px] font-[420] text-[#52525b]">/mês</span>
          </p>
          <ul className="flex flex-col gap-2 text-[16px] font-[420] text-[#52525b]">
            <li>✓ Likes ilimitados</li>
            <li>✓ Trust Score completo</li>
            <li>✓ Propostas ilimitadas</li>
          </ul>
        </CardContent>
        <CardFooter className="border-t-0">
          <Button variant="primary" className="w-full">Iniciar trial grátis</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const CinematicDark: Story = {
  parameters: { backgrounds: { default: "canvas-night" } },
  render: () => (
    <div className="p-12 flex gap-6 flex-wrap">
      <Card variant="cinematic" className="w-80">
        <CardHeader>
          <Tag variant="dark">Trust Score</Tag>
          <CardTitle className="text-white">92 pontos</CardTitle>
          <CardDescription className="text-[#a1a1aa]">Alta confiabilidade verificada</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-[16px] font-[420] text-[#a1a1aa] leading-[1.5]">
            Ricardo possui forte evidência de experiência em Growth, tendo liderado 4 projetos e permanecido mais de 3 anos em funções relacionadas.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const PistachioFeature: Story = {
  render: () => (
    <div className="p-12 bg-white">
      <Card variant="pistachio">
        <CardHeader>
          <Tag variant="mint">Rede de Confiança</Tag>
          <CardTitle>3 contatos em comum</CardTitle>
          <CardDescription>Você e Ricardo têm conexões em comum que podem dar referências.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="primary">Conversar com João antes</Button>
        </CardContent>
      </Card>
    </div>
  ),
};
