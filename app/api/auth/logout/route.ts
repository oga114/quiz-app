import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabaseClient";

export async function POST() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "ログアウト成功" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
