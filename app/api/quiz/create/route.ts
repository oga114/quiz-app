import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase クライアントをサーバー側で作成
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

// ✅ クライアントのIPアドレスを取得する関数
const getClientIp = (req: Request) => {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]; // 複数ある場合は最初のものを取得
  }
  return req.headers.get('host') || 'unknown';
};

// ✅ ローカルIPチェック
const isLocalRequest = (ip: string) => {
  return ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.');
};

// クイズ作成 (POST)
export async function POST(req: Request) {
  const clientIp = getClientIp(req);

  // 🌟 もしリクエスト元がローカルでなければ拒否
  if (!isLocalRequest(clientIp)) {
    return NextResponse.json({ error: 'このAPIはローカル環境でのみ利用可能です' }, { status: 403 });
  }

  try {
    const { questionText, options } = await req.json();
    if (!questionText || options.length < 2) {
      return NextResponse.json({ error: '質問と最低2つの選択肢が必要です' }, { status: 400 });
    }

    // 質問を登録
    const { data: questionData, error: questionError } = await supabase
      .from('questions')
      .insert([{ question_text: questionText }])
      .select();

    if (questionError) {
      return NextResponse.json({ error: '質問の登録に失敗しました' }, { status: 500 });
    }

    const questionId = questionData[0].id;

    // 選択肢を登録
    const optionsData = options.map((opt: { text: string; isCorrect: boolean }) => ({
      question_id: questionId,
      option_text: opt.text,
      is_correct: opt.isCorrect,
    }));

    const { error: optionsError } = await supabase.from('options').insert(optionsData);

    if (optionsError) {
      return NextResponse.json({ error: '選択肢の登録に失敗しました' }, { status: 500 });
    }

    return NextResponse.json({ message: 'クイズが登録されました！' }, { status: 201 });

  } catch (error) {
    console.error('サーバーエラー:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
