// VALIDATES: Страница компании показывает профиль с полнотой знаний и подсказками

'use client';

import CompanyContextProfile from '@/components/CompanyContextProfile';
import { mockCompany } from '@/data/mock-company';
import { sources } from '@/data/mock-sources';

export default function CompanyContextPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <header className="mb-6">
          <a href="/" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
            ← На главную
          </a>
          <h1 className="text-2xl font-bold text-gray-900">
            Профиль компании
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            ID: {params.id}
          </p>
        </header>

        {/* Main Content */}
        <main className="space-y-6">
          <CompanyContextProfile company={mockCompany} sources={sources} />
          
          {/* Info Box */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-green-800 mb-2">
              💡 Как это работает
            </h3>
            <p className="text-sm text-green-700">
              Полнота знаний показывает, насколько хорошо система понимает компанию. 
              Зелёный (&gt;70%) — достаточно данных, жёлтый (40-70%) — есть пробелы, 
              красный (&lt;40%) — критически не хватает информации.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
