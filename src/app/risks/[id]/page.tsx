// VALIDATES: Страница риска показывает цепочку происхождения и позволяет взаимодействовать

'use client';

import RiskOriginChain from '@/components/RiskOriginChain';
import { mockRisk } from '@/data/mock-risk';
import { sources } from '@/data/mock-sources';

export default function RiskPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <header className="mb-6">
          <a href="/" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
            ← На главную
          </a>
          <h1 className="text-2xl font-bold text-gray-900">
            Карточка риска
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            ID: {params.id}
          </p>
        </header>

        {/* Main Content */}
        <main className="space-y-6">
          <RiskOriginChain risk={mockRisk} sources={sources} />
          
          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">
              💡 Как это работает
            </h3>
            <p className="text-sm text-blue-700">
              Каждый риск связан с конкретными фактами из базы знаний. 
              Кликните на факт, чтобы увидеть оригинальный источник. 
              Это помогает понять происхождение риска и оценить его достоверность.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
