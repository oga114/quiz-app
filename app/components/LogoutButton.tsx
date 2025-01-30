"use client";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function LogoutButton() {
  const [message, setMessage] = useState("");

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("ログアウト成功！");
      redirect("/login");
    } else {
      setMessage(`エラー: ${data.error}`);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleLogout}
        className="mt-4 rounded-md bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
      >
        ログアウト
      </button>
      {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
    </div>
  );
}
