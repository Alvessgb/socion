import { cn } from "@/lib/utils";

interface TrustScoreProps {
  score: number;              // 0-100
  identity?:   number;
  experience?: number;
  competence?: number;
  reputation?: number;
  commitment?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const subscore = (label: string, value: number) => (
  <div key={label} className="flex items-center gap-3">
    <span className="text-[12px] font-[400] tracking-[0.72px] uppercase [font-feature-settings:'ss03'] text-[#71717a] w-28 shrink-0">
      {label}
    </span>
    <div className="flex-1 h-1.5 rounded-full bg-[#e4e4e7] overflow-hidden">
      <div
        className="h-full rounded-full bg-[#c1fbd4]"
        style={{ width: `${value}%` }}
      />
    </div>
    <span className="text-[13px] font-[500] text-black [font-feature-settings:'ss03'] w-8 text-right">
      {value}
    </span>
  </div>
);

export function TrustScore({
  score,
  identity   = 0,
  experience = 0,
  competence = 0,
  reputation = 0,
  commitment = 0,
  size = "md",
  className,
}: TrustScoreProps) {
  const numberSize = {
    sm: "text-[48px]",
    md: "text-[70px]",
    lg: "text-[96px]",
  }[size];

  const color =
    score >= 80 ? "#c1fbd4" :
    score >= 60 ? "#d4f9e0" :
    score >= 40 ? "#a1a1aa" :
    "#71717a";

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Main score circle */}
      <div className="flex items-center gap-6">
        <div
          className={cn(
            "font-[330] leading-[1.0] tracking-[2.4px] [font-feature-settings:'ss03']",
            "font-[family-name:'NeueHaasGrotesk_Display',_Helvetica,_Arial,_sans-serif]",
            numberSize
          )}
          style={{ color }}
        >
          {score}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[16px] font-[550] leading-[1.5] [font-feature-settings:'ss03'] text-black">
            Trust Score
          </span>
          <span className="text-[13px] font-[500] text-[#71717a] [font-feature-settings:'ss03']">
            {score >= 80 ? "Alta confiabilidade" : score >= 60 ? "Boa confiabilidade" : "Em construção"}
          </span>
        </div>
      </div>

      {/* Subscores */}
      <div className="flex flex-col gap-3">
        {subscore("Identidade",    identity)}
        {subscore("Experiência",   experience)}
        {subscore("Competência",   competence)}
        {subscore("Reputação",     reputation)}
        {subscore("Comprometimento", commitment)}
      </div>
    </div>
  );
}
