import { signIn } from "@/lib/auth";

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fbfbf5] px-4">
      <div className="w-[440px] bg-white rounded-xl border border-[#e4e4e7] p-10
        shadow-[0_8px_8px_rgba(0,0,0,0.1),0_4px_4px_rgba(0,0,0,0.1),0_2px_2px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.1)]">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-[48px] font-[330] leading-[1.14] [font-feature-settings:'ss03'] text-black mb-2">
            SocioN
          </h1>
          <p className="text-[16px] font-[420] leading-[1.5] [font-feature-settings:'ss03'] text-[#71717a]">
            Encontre seu sócio ideal com confiança e segurança.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {/* LinkedIn */}
          <form
            action={async () => {
              "use server";
              await signIn("linkedin", { redirectTo: "/app/feed" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3
                rounded-[9999px] bg-[#0077B5] text-white
                px-6 py-3 min-h-[44px]
                text-[16px] font-[420] leading-[1.5] [font-feature-settings:'ss03']
                hover:bg-[#006097] transition-colors duration-150"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Entrar com LinkedIn
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-[#e4e4e7]" />
            <span className="text-[12px] font-[400] tracking-[0.72px] uppercase [font-feature-settings:'ss03'] text-[#a1a1aa]">
              ou
            </span>
            <div className="flex-1 h-px bg-[#e4e4e7]" />
          </div>

          {/* Test account */}
          <form
            action={async () => {
              "use server";
              await signIn("credentials", {
                username:    "user",
                password:    "user",
                redirectTo:  "/app/feed",
              });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2
                rounded-[9999px] bg-[#c1fbd4] text-black
                px-6 py-3 min-h-[44px]
                text-[16px] font-[420] leading-[1.5] [font-feature-settings:'ss03']
                hover:bg-[#a8f5c2] transition-colors duration-150"
            >
              <span>🧪</span>
              Entrar como usuário de teste
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-[13px] font-[500] leading-[1.5] [font-feature-settings:'ss03'] text-[#a1a1aa]">
          Ao entrar, você concorda com os{" "}
          <a href="#" className="text-black underline underline-offset-2">Termos de Uso</a>
          {" "}e{" "}
          <a href="#" className="text-black underline underline-offset-2">Política de Privacidade</a>.
        </p>

        <p className="mt-3 text-center text-[12px] text-[#d4d4d8] [font-feature-settings:'ss03']">
          Conta de teste: user / user
        </p>
      </div>
    </div>
  );
}
