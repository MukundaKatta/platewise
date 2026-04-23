"use client";

import { useState, useRef } from "react";
import Link from "next/link";

interface Macros {
  label: string;
  emoji: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  note: string;
}

// 3 hardcoded photo → macro mappings, cycled by file name hash
const MACRO_MAPPINGS: Macros[] = [
  {
    label: "Chicken & Rice Bowl",
    emoji: "🍗",
    kcal: 612,
    protein: 48,
    carbs: 62,
    fat: 14,
    note: "Solid macro split. High protein, moderate carbs. Consider adding leafy greens for fiber.",
  },
  {
    label: "Avocado Toast & Egg",
    emoji: "🥑",
    kcal: 430,
    protein: 18,
    carbs: 32,
    fat: 27,
    note: "Great healthy fats from avocado. Could use more protein — try adding a second egg or some smoked salmon.",
  },
  {
    label: "Pasta Bolognese",
    emoji: "🍝",
    kcal: 740,
    protein: 34,
    carbs: 88,
    fat: 22,
    note: "Higher carb meal — great before a workout. Protein is decent. Lighten with zucchini noodles if needed.",
  },
];

function pickMacros(file: File): Macros {
  // Deterministic mock: map file to one of 3 presets based on name length
  const idx = file.name.length % MACRO_MAPPINGS.length;
  return MACRO_MAPPINGS[idx];
}

export default function TryPage() {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [macros, setMacros] = useState<Macros | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const prevUrl = useRef<string | null>(null);

  function handleFile(file: File) {
    // Revoke previous object URL to avoid memory leaks
    if (prevUrl.current) URL.revokeObjectURL(prevUrl.current);
    const url = URL.createObjectURL(file);
    prevUrl.current = url;
    setObjectUrl(url);
    setMacros(null);
    setAnalyzing(true);

    // Simulate a brief analysis delay
    setTimeout(() => {
      setMacros(pickMacros(file));
      setAnalyzing(false);
    }, 900);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  }

  function handleReset() {
    if (prevUrl.current) URL.revokeObjectURL(prevUrl.current);
    prevUrl.current = null;
    setObjectUrl(null);
    setMacros(null);
    setAnalyzing(false);
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
          Platewise
        </Link>
        <Link
          href="/#waitlist"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Get early access
        </Link>
      </nav>

      <div className="mx-auto max-w-2xl px-6 py-12">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
            Macro analyser
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            Upload a plate photo. See your macros.
          </h1>
        </div>

        {!objectUrl ? (
          <label
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-neutral-300 bg-neutral-50 px-8 py-20 text-center transition hover:border-emerald-400 hover:bg-emerald-50"
          >
            <span className="text-5xl">📸</span>
            <span className="text-base font-medium text-neutral-700">
              Drop a photo here, or click to browse
            </span>
            <span className="text-xs text-neutral-400">JPG, PNG, HEIC — stays local, never uploaded</span>
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleInputChange}
            />
          </label>
        ) : (
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="grid gap-6 md:grid-cols-[1fr_1.3fr]">
              {/* Photo preview */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={objectUrl}
                alt="Uploaded plate"
                className="aspect-square w-full rounded-2xl object-cover"
              />

              {/* Macro results */}
              <div>
                {analyzing ? (
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-neutral-500">
                    <span className="text-3xl animate-spin">⏳</span>
                    <p className="text-sm font-medium">Analysing plate…</p>
                  </div>
                ) : macros ? (
                  <>
                    <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                      {macros.emoji} {macros.label}
                    </div>
                    <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                      <div className="rounded-lg bg-emerald-50 p-2">
                        <div className="text-lg font-bold">{macros.kcal}</div>
                        <div className="text-xs text-neutral-500">kcal</div>
                      </div>
                      <div className="rounded-lg bg-emerald-50 p-2">
                        <div className="text-lg font-bold">{macros.protein}g</div>
                        <div className="text-xs text-neutral-500">protein</div>
                      </div>
                      <div className="rounded-lg bg-emerald-50 p-2">
                        <div className="text-lg font-bold">{macros.carbs}g</div>
                        <div className="text-xs text-neutral-500">carbs</div>
                      </div>
                      <div className="rounded-lg bg-emerald-50 p-2">
                        <div className="text-lg font-bold">{macros.fat}g</div>
                        <div className="text-xs text-neutral-500">fat</div>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-neutral-600">{macros.note}</p>
                  </>
                ) : null}
              </div>
            </div>

            {!analyzing && macros && (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={handleReset}
                  className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
                >
                  Try another plate
                </button>
                <Link
                  href="/#waitlist"
                  className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-900 transition hover:border-neutral-900 text-center"
                >
                  Get early access
                </Link>
              </div>
            )}
          </div>
        )}

        <p className="mt-6 text-center text-xs text-neutral-400">
          This is a v0 preview with mocked macro data.{" "}
          <Link href="/#waitlist" className="underline hover:text-neutral-600">
            Join the waitlist
          </Link>{" "}
          for real AI-powered analysis.
        </p>
      </div>
    </div>
  );
}
