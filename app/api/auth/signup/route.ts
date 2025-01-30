import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "メールアドレスとパスワードは必須です" }, { status: 400 });
    }

    // Supabase でユーザー登録
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ user: data.user, message: "ユーザー登録成功" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
