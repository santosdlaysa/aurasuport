import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AURA — Assistente de Apoio e Resposta Humanizada',
  description: 'Um espaço seguro para conversar, buscar apoio e orientação. Assistente especializado em apoio a mulheres em situações de violência.',
  keywords: 'apoio, mulheres, violência doméstica, assistente, chat, ajuda, emergência',
  authors: [{ name: 'AURA Team' }],
  openGraph: {
    title: 'AURA — Assistente de Apoio',
    description: 'Espaço seguro para apoio e orientação a mulheres',
    type: 'website',
  },
  robots: {
    index: false, // Para protótipo, não indexar nos buscadores
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#9333ea" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}