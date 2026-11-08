This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Características del slider

Cada tarjeta recibe `content.slider_preview[].icons` desde el backend. Cada
insignia puede ser un objeto
`{ "label": "6K", "specify": "Resolución", "color": "#92A8BA" }`:
`label` se muestra dentro del icono y `specify` debajo, con la fuente Inter.
El color se aplica al icono decorativo situado detrás del texto. Su forma se elige
por `specify`: sensor, horizontal/vertical, perfil de color, bits, muestreo,
resolución, focal, dron, cámara Sony, códec o bitrate. Si falta un tipo reconocido,
se identifica por `label` (por ejemplo, `D-Log-M` o `16:9`); si tampoco se reconoce,
se usa una cámara genérica.
La descripción y el color son opcionales; también se admiten cadenas, con un icono
de color neutro. Todas las insignias usan un degradado radial centrado, de
`--neutral` a `--background`.
Las insignias son informativas, no botones.
Con diez insignias, la cuadrícula muestra tres filas de 3, 4 y 3 hasta `md`;
desde `md`, mantiene cinco columnas y dos filas. Los cuadrados son iguales y el
texto se adapta al ancho de su contenedor.
Las tarjetas ya no muestran imágenes: solo insignias y, en la tercera tarjeta
(índice 2), el logo `logo-blogs-travel` del sprite centrado en el área de media.
Si solo hay características, la cuadrícula se centra en el contenedor.
La animación de entrada al cambiar de tarjeta solo afecta al texto, no a las insignias.
La paginación aparece con un efecto de burbuja al entrar en pantalla, salvo si
se ha activado la preferencia de movimiento reducido.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
