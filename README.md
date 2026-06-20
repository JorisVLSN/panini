# Panini WK 2026 Tracker

Een Next.js app om dubbele Panini stickers voor het WK voetbal 2026 te beheren.

## Inhoud

- 981 stickers uit `dubbels.xlsx`
- Dashboard met totalen
- Zoek- en filterfunctie
- Knoppen voor `+1` en `-1`
- Ruilformulier met notities
- Lokale opslag in de browser via `localStorage`
- CSV- en JSON-export
- Klaar voor Vercel

## Lokaal starten

```bash
npm install
npm run dev
```

Open daarna `http://localhost:3000`.

## Deployen naar Vercel

1. Maak een nieuwe GitHub repository, bijvoorbeeld `panini-2026-tracker`.
2. Upload alle bestanden uit deze map.
3. Ga naar Vercel en kies **Add New Project**.
4. Importeer je GitHub repository.
5. Klik **Deploy**.

## Data aanpassen

De startdata staat in:

```text
data/stickers.json
```

In de app zelf worden wijzigingen lokaal bewaard in je browser. Wil je later gedeelde opslag voor meerdere gebruikers, dan kun je Supabase, Neon, Vercel Postgres of Firebase toevoegen.


## Vercel build fix

Deze versie gebruikt een relatieve import in `app/page.tsx` en bevat ook `baseUrl`/`paths` in `tsconfig.json`, zodat `@/...` imports correct werken. Next.js is vastgepind op `14.2.35`, een gepatchte 14.x versie.
