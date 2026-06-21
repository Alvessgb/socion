import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function FeedPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Feed de Pitches</h1>
      <p className="text-muted-foreground">Em breve: scroll infinito de pitches em vídeo.</p>
    </div>
  );
}
