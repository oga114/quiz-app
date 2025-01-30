import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "メールアドレスとパスワードは必須です" }, { status: 400 });
    }

    // ✅ `createRouteHandlerClient` を使用
    const supabase = createRouteHandlerClient({ cookies });

    // ✅ Supabase でログイン処理
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    // ✅ セッションを設定（エラーチェックのみ）
    const { error: sessionError } = await supabase.auth.setSession({
      access_token: data.session?.access_token ?? "",
      refresh_token: data.session?.refresh_token ?? "",
    });

    if (sessionError) {
      return NextResponse.json({ error: sessionError.message }, { status: 500 });
    }

    return NextResponse.json({ user: data.user, message: "ログイン成功" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
