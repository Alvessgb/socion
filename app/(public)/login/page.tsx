import { signIn } from "@/lib/auth";

export default function LoginPage() {
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

        {/* Google Sign In */}
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/app/feed" });
          }}
        >
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3
              rounded-[9999px] bg-black text-white
              px-6 py-3 min-h-[44px]
              text-[16px] font-[420] leading-[1.5] [font-feature-settings:'ss03']
              hover:bg-[#3f3f46] transition-colors duration-150"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#fff"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#ddd"/>
              <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#bbb"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#aaa"/>
            </svg>
            Entrar com Google
          </button>
        </form>

        <p className="mt-6 text-center text-[13px] font-[500] leading-[1.5] [font-feature-settings:'ss03'] text-[#a1a1aa]">
          Ao entrar, você concorda com os{" "}
          <a href="#" className="text-black underline underline-offset-2">Termos de Uso</a>
          {" "}e{" "}
          <a href="#" className="text-black underline underline-offset-2">Política de Privacidade</a>.
        </p>
      </div>
    </div>
  );
}
