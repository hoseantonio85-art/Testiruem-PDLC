import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Прототип системы управления рисками',
  description: 'Интерактивная валидация продуктовой модели',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
