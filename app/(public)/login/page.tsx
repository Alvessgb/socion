import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">SocioN</CardTitle>
          <CardDescription>
            Encontre seu sócio ideal com confiança e segurança.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/app/feed" });
            }}
          >
            <Button type="submit" className="w-full" size="lg">
              Entrar com Google
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Ao entrar, você concorda com os Termos de Uso e Política de Privacidade.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
