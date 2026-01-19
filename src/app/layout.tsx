import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '基本情報・応用情報 クイズアプリ',
  description: '基本情報技術者試験・応用情報技術者試験の過去問クイズ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold text-gray-900">
                基本情報・応用情報 クイズ
              </h1>
            </div>
          </header>
          <main className="py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
