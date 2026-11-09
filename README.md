# jezisek.nemoservis.cz

Web aplikace **Dopis Ježíškovi** pro iPhone – úvod, návod, podpora, podmínky použití a ochrana soukromí (česky i anglicky).
Čisté statické HTML/CSS/JS bez buildu, hostované na Cloudflare Workers (static assets).

## Adresy pro App Store Connect

| Pole v App Store Connect | URL |
|---|---|
| Support URL | https://jezisek.nemoservis.cz/podpora/ |
| Marketing URL | https://jezisek.nemoservis.cz/ |
| Privacy Policy URL | https://jezisek.nemoservis.cz/soukromi/ |
| License Agreement (EULA) – vlastní | https://jezisek.nemoservis.cz/podminky/ |

Anglické verze: `/en/`, `/en/guide/`, `/en/support/`, `/en/terms/`, `/en/privacy/` (zkratky `/support`, `/terms`, `/privacy`).

## Struktura

```
public/
  index.html          úvod
  navod/              návod (Ježíšek si založí účet a pozve hodné)
  podpora/            kontakt a časté otázky
  podminky/           podmínky použití
  soukromi/           zásady ochrany osobních údajů
  en/                 anglické verze
  404.html, _redirects, _headers, robots.txt, sitemap.xml
  style.css, script.js, img/
wrangler.jsonc        konfigurace Cloudflare
```

Barvy a motivy jsou převzaté z aplikace (noční obloha `#0A1430`, zlatá `#F2C14E`, vánoční červená `#D7263D`).
Web nepoužívá cookies, analytiku ani nic od třetích stran (to tvrdí i zásady soukromí – při změnách to držet).

## Lokálně

```bash
npx wrangler dev        # http://localhost:8787
```

## Nasazení

```bash
npx wrangler login      # jednou
npx wrangler deploy
```

Doména `jezisek.nemoservis.cz` je v `wrangler.jsonc` jako *custom domain* – zóna `nemoservis.cz` musí být ve stejném Cloudflare účtu, DNS záznam a certifikát pak Cloudflare vytvoří sám.

Automatické nasazení z GitHubu: v Cloudflare dashboardu *Workers & Pages → jezisek-nemoservis → Settings → Builds* připojit tento repozitář (deploy command `npx wrangler deploy`, bez build commandu).
