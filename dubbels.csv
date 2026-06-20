"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Minus, Plus, Search, RotateCcw, Save, Trophy } from "lucide-react";
import initialStickers from "@/data/stickers.json";
import type { Sticker, TradeLogItem } from "@/lib/types";

const STORAGE_KEY = "panini-2026-stickers-v1";
const LOG_KEY = "panini-2026-trade-log-v1";

function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function toCsv(stickers: Sticker[]) {
  const rows = [["Land", "Sticker", "Aantal dubbels"], ...stickers.map(s => [s.country, String(s.number), String(s.duplicates)])];
  return rows.map(row => row.map(v => `"${v.replaceAll('"', '""')}"`).join(",")).join("\n");
}

export default function PaniniTracker() {
  const [stickers, setStickers] = useState<Sticker[]>(initialStickers as Sticker[]);
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("alle");
  const [onlyAvailable, setOnlyAvailable] = useState(true);
  const [selectedId, setSelectedId] = useState("");
  const [amount, setAmount] = useState(1);
  const [note, setNote] = useState("");
  const [log, setLog] = useState<TradeLogItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const savedLog = localStorage.getItem(LOG_KEY);
    if (saved) setStickers(JSON.parse(saved));
    if (savedLog) setLog(JSON.parse(savedLog));
  }, []);

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(stickers)), [stickers]);
  useEffect(() => localStorage.setItem(LOG_KEY, JSON.stringify(log)), [log]);

  const countries = useMemo(() => Array.from(new Set(stickers.map(s => s.country))).sort(), [stickers]);
  const stats = useMemo(() => {
    const total = stickers.reduce((sum, s) => sum + s.duplicates, 0);
    const unique = stickers.filter(s => s.duplicates > 0).length;
    const topCountries = countries.map(c => ({ country: c, total: stickers.filter(s => s.country === c).reduce((sum, s) => sum + s.duplicates, 0) }))
      .sort((a, b) => b.total - a.total).slice(0, 5);
    return { total, unique, topCountries };
  }, [stickers, countries]);

  const filtered = useMemo(() => stickers
    .filter(s => country === "alle" || s.country === country)
    .filter(s => !onlyAvailable || s.duplicates > 0)
    .filter(s => `${s.country}-${s.number}`.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => a.country.localeCompare(b.country) || a.number - b.number), [stickers, country, onlyAvailable, query]);

  function updateSticker(stickerId: string, delta: number) {
    const sticker = stickers.find(s => s.id === stickerId);
    if (!sticker) return;
    setStickers(current => current.map(s => s.id === stickerId ? { ...s, duplicates: Math.max(0, s.duplicates + delta) } : s));
    setLog(current => [{ id: crypto.randomUUID(), stickerId, country: sticker.country, number: sticker.number, delta, note, createdAt: new Date().toISOString() }, ...current].slice(0, 50));
    setNote("");
  }

  function resetData() {
    setStickers(initialStickers as Sticker[]);
    setLog([]);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LOG_KEY);
  }

  return (
    <main className="min-h-screen p-4 sm:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-3xl bg-white p-6 shadow-soft dark:bg-slate-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100"><Trophy size={16}/> WK 2026</p>
              <h1 className="text-3xl font-black tracking-tight sm:text-5xl">Panini Dubbels Tracker</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Beheer, zoek en registreer je gewisselde stickers. Alles wordt lokaal in je browser opgeslagen.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => downloadFile("panini-dubbels.csv", toCsv(stickers), "text/csv")} className="rounded-xl bg-slate-900 px-4 py-2 font-bold text-white dark:bg-white dark:text-slate-900"><Download className="mr-2 inline" size={16}/>CSV</button>
              <button onClick={() => downloadFile("panini-dubbels.json", JSON.stringify(stickers, null, 2), "application/json")} className="rounded-xl bg-slate-200 px-4 py-2 font-bold dark:bg-slate-800"><Save className="mr-2 inline" size={16}/>JSON</button>
              <button onClick={resetData} className="rounded-xl bg-rose-100 px-4 py-2 font-bold text-rose-800 dark:bg-rose-950 dark:text-rose-100"><RotateCcw className="mr-2 inline" size={16}/>Reset</button>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <Stat title="Totaal dubbels" value={stats.total} />
          <Stat title="Unieke stickers dubbel" value={stats.unique} />
          <div className="rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900">
            <h2 className="font-bold text-slate-500 dark:text-slate-400">Top landen</h2>
            <div className="mt-3 space-y-2">{stats.topCountries.map(x => <div key={x.country} className="flex justify-between"><span>{x.country}</span><b>{x.total}</b></div>)}</div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-3xl bg-white p-5 shadow-soft dark:bg-slate-900">
            <div className="mb-4 grid gap-3 md:grid-cols-[1fr_180px_160px]">
              <label className="relative"><Search className="absolute left-3 top-3 text-slate-400" size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Zoek bv. BEL-17" className="w-full rounded-xl border border-slate-200 bg-transparent py-2 pl-10 pr-3 dark:border-slate-700" /></label>
              <select value={country} onChange={e => setCountry(e.target.value)} className="rounded-xl border border-slate-200 bg-transparent px-3 py-2 dark:border-slate-700"><option value="alle">Alle landen</option>{countries.map(c => <option key={c}>{c}</option>)}</select>
              <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 dark:border-slate-700"><input type="checkbox" checked={onlyAvailable} onChange={e => setOnlyAvailable(e.target.checked)} /> Enkel dubbels</label>
            </div>
            <div className="max-h-[650px] overflow-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-slate-100 dark:bg-slate-800"><tr><th className="p-3">Land</th><th className="p-3">Sticker</th><th className="p-3">Aantal</th><th className="p-3 text-right">Acties</th></tr></thead>
                <tbody>{filtered.map(s => <tr key={s.id} className="border-t border-slate-100 dark:border-slate-800"><td className="p-3 font-bold">{s.country}</td><td className="p-3">{s.number}</td><td className="p-3"><span className="rounded-full bg-slate-100 px-3 py-1 font-bold dark:bg-slate-800">{s.duplicates}</span></td><td className="p-3 text-right"><button onClick={() => updateSticker(s.id, -1)} className="mr-2 rounded-lg bg-rose-100 p-2 text-rose-800 dark:bg-rose-950"><Minus size={16}/></button><button onClick={() => updateSticker(s.id, 1)} className="rounded-lg bg-emerald-100 p-2 text-emerald-800 dark:bg-emerald-950"><Plus size={16}/></button></td></tr>)}</tbody>
              </table>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-white p-5 shadow-soft dark:bg-slate-900">
              <h2 className="mb-4 text-xl font-black">Ruil registreren</h2>
              <select value={selectedId} onChange={e => setSelectedId(e.target.value)} className="mb-3 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 dark:border-slate-700"><option value="">Kies sticker</option>{stickers.map(s => <option key={s.id} value={s.id}>{s.country}-{s.number} ({s.duplicates})</option>)}</select>
              <input type="number" min={1} value={amount} onChange={e => setAmount(Number(e.target.value))} className="mb-3 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 dark:border-slate-700" />
              <input value={note} onChange={e => setNote(e.target.value)} placeholder="Notitie, bv. geruild met Pieter" className="mb-3 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 dark:border-slate-700" />
              <div className="grid grid-cols-2 gap-2"><button disabled={!selectedId} onClick={() => updateSticker(selectedId, -amount)} className="rounded-xl bg-rose-600 px-4 py-3 font-black text-white disabled:opacity-40">Geruild -{amount}</button><button disabled={!selectedId} onClick={() => updateSticker(selectedId, amount)} className="rounded-xl bg-emerald-600 px-4 py-3 font-black text-white disabled:opacity-40">Toevoegen +{amount}</button></div>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-soft dark:bg-slate-900">
              <h2 className="mb-4 text-xl font-black">Laatste acties</h2>
              <div className="space-y-3">{log.length === 0 && <p className="text-slate-500">Nog geen acties.</p>}{log.map(item => <div key={item.id} className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800"><b>{item.country}-{item.number}</b> {item.delta > 0 ? `+${item.delta}` : item.delta}<br/><span className="text-slate-500">{new Date(item.createdAt).toLocaleString("nl-BE")} {item.note ? `· ${item.note}` : ""}</span></div>)}</div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

function Stat({ title, value }: { title: string; value: number }) {
  return <div className="rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900"><h2 className="font-bold text-slate-500 dark:text-slate-400">{title}</h2><p className="mt-2 text-4xl font-black">{value}</p></div>;
}
