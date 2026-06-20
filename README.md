# Panini 2026 Tracker

Next.js app voor het beheren van dubbele Panini WK 2026 stickers.

## Belangrijk bij upload naar GitHub

Zorg dat deze bestanden NIET in de root van je repository staan:

- `layout.tsx`
- `page.tsx`
- `PaniniTracker.tsx`

De correcte bestanden staan onder:

- `app/layout.tsx`
- `app/page.tsx`
- `components/PaniniTracker.tsx`
- `app/globals.css`

Als je oude bestanden in GitHub blijven staan, kan Vercel ze blijven typechecken en faalt de build.

## Lokaal testen

```bash
npm install
npm run build
npm run dev
```

## Deployen op Vercel

1. Upload de inhoud van deze map naar je GitHub repository.
2. Verwijder oude root-bestanden die hierboven genoemd zijn.
3. Commit en push.
4. Deploy opnieuw in Vercel.
