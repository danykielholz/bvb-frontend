"use client";
import { useState } from "react";

export default function Home() {
  const [brand, setBrand] = useState("");
  const [keywords, setKeywords] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    setResult("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/generateBrand`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand_name: brand,
          keywords: keywords.split(",").map((k) => k.trim()),
        }),
      });
      const data = await res.json();
      setResult(data.brand_vision_board || JSON.stringify(data, null, 2));
    } catch {
      setResult("⚠️ Fehler bei der Generierung – bitte API prüfen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-900">BVB.ai Generator</h1>

        <input
          type="text"
          placeholder="Markenname"
          className="w-full border p-2 mb-3 rounded"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <input
          type="text"
          placeholder="Keywords (Komma-getrennt)"
          className="w-full border p-2 mb-3 rounded"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />

        <button
          onClick={generate}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          {loading ? "Generiere..." : "Brand Vision Board erstellen"}
        </button>

        {result && (
          <pre className="mt-6 whitespace-pre-wrap text-sm text-gray-700">{result}</pre>
        )}
      </div>
    </main>
  );
}
