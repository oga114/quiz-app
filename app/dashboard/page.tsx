import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "../components/LogoutButton";

export default async function Dashboard() {
  // ✅ `cookies()` を関数として渡す
  const supabase = createServerComponentClient({ cookies: () => cookies() });

  // ✅ 認証ユーザーを取得
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.error("user", user); // ✅ デバッグ用ログ

  // ✅ ユーザーがいなければログインページへリダイレクト
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md text-center">
        <h2 className="mb-6 text-2xl font-bold text-gray-700">ダッシュボード</h2>
        <p className="mb-4 text-gray-600">ようこそ、{user.email} さん！</p>
        <LogoutButton />
      </div>
    </div>
  );
}
