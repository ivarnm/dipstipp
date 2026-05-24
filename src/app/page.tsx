import { auth, signIn, signOut } from "src/auth";
import { createSupabaseServer } from "src/lib/supabase";
import Image from "next/image";

export default async function Home() {
  const session = await auth();

  let dbUser: { name: string | null; email: string | null; image: string | null } | null = null;

  if (session?.user?.id) {
    const supabase = createSupabaseServer();
    const { data } = await supabase
      .from("users")
      .select("name, email, image")
      .eq("id", session.user.id)
      .single();
    if (data) {
      dbUser = data as { name: string | null; email: string | null; image: string | null };
    }
  }

  return (
    <main className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">DipsTipp</h1>

      {dbUser ? (
        <div className="flex items-center gap-4">
          {dbUser.image && (
            <Image
              src={dbUser.image}
              alt={dbUser.name ?? "User"}
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
          <div>
            <p className="font-medium">{dbUser.name}</p>
            <p className="text-sm text-gray-500">{dbUser.email}</p>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button className="text-sm text-red-600 underline">Sign out</button>
          </form>
        </div>
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn("slack");
          }}
        >
          <button className="bg-purple-600 text-white px-4 py-2 rounded">
            Sign in with Slack
          </button>
        </form>
      )}
    </main>
  );
}


