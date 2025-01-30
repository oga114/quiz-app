"use client";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("登録成功！確認メールをチェックしてください。");
    } else {
      setMessage(`エラー: ${data.error}`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-700">新規登録</h2>
        <div className="mb-4">
          <input
            type="email"
            placeholder="メールアドレス"
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="パスワード"
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleSignup}
          className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
        >
          登録
        </button>
        {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
      </div>
    </div>
  );
}
