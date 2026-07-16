# Tutorías SQL

Sitio web para tutorías de SQL orientadas a la preparación de examen Oracle.

**Sitio en vivo:** [https://its-camilo.github.io/tutorias-sql/](https://its-camilo.github.io/tutorias-sql/)

## Requisitos

- Node.js 18+
- npm

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en el navegador.

## Estructura

- **Conceptos básicos** — fundamentos teóricos y SQL (secciones 0–4)
- **Ejercicio** — práctica guiada con esquemas CO y SH
- **Integración con Codex** — uso de herramientas de IA

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Vista previa del build |

## Despliegue (GitHub Pages)

El sitio se despliega automáticamente al hacer push a `main` mediante GitHub Actions (rama `gh-pages`).

- Workflow: `.github/workflows/deploy.yml`
- Base path: `/tutorias-sql/` (configurado en `vite.config.ts`)
- URL: [https://its-camilo.github.io/tutorias-sql/](https://its-camilo.github.io/tutorias-sql/)

**Primera vez:** en el repositorio ve a **Settings → Pages → Build and deployment** y selecciona **Deploy from a branch**, rama `gh-pages`, carpeta `/ (root)`.

Para desplegar manualmente:

```bash
npm run deploy
```
