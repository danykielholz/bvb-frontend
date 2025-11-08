"use client";

import { useState } from "react";

export default function Home() {
  const [brandName, setBrandName] = useState("");
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setResult("");
    try {
      const response = await fetch("https://116.203.191.164/api/generateBrand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand_name: brandName,
          keywords: keywords.split(",").map((kw) => kw.trim()),
        }),
      });

      const data = await response.json();
      setResult(data.brand_vision_board || JSON.stringify(data, null, 2));
    } catch (err: any) {
      setResult("Fehler beim Abruf: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
      <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Brand Vision Board Generator
        </h1>

        <input
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          placeholder="Markenname"
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Keywords, durch Komma getrennt"
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {loading ? "Generiere..." : "Brand Vision Board erstellen"}
        </button>

        {result && (
          <pre className="mt-6 whitespace-pre-wrap text-sm text-gray-700">
            {result}
          </pre>
        )}
      </div>
    </main>
  );
}
