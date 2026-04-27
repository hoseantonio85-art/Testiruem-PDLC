// VALIDATES: Главная страница позволяет выбрать сценарий для тестирования

'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Прототип системы управления рисками
          </h1>
          <p className="text-gray-600">
            Интерактивная валидация продуктовой модели
          </p>
        </header>

        {/* Main Cards */}
        <main className="grid md:grid-cols-2 gap-6">
          {/* Risk Card */}
          <Link href="/risks/risk-001" className="block">
            <div className="bg-white rounded-lg border p-6 hover:shadow-lg transition cursor-pointer">
              <div className="text-3xl mb-3">⚠️</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Карточка риска
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Просмотрите цепочку происхождения риска: 
                риск ← знания ← источники. 
                Кликните на факты, чтобы увидеть оригинальные документы.
              </p>
              <div className="text-sm text-blue-600 font-medium">
                Открыть →
              </div>
            </div>
          </Link>

          {/* Company Card */}
          <Link href="/companies/comp-001/context" className="block">
            <div className="bg-white rounded-lg border p-6 hover:shadow-lg transition cursor-pointer">
              <div className="text-3xl mb-3">🏢</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Профиль компании
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Изучите полноту знаний по компании ООО «СтройИнвест». 
                Смотрите пробелы по категориям и добавляйте данные.
              </p>
              <div className="text-sm text-blue-600 font-medium">
                Открыть →
              </div>
            </div>
          </Link>
        </main>

        {/* Validation Notes */}
        <section className="mt-8 bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📋 Гипотезы для валидации
          </h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>
                <strong>Риск ← Знания ← Источники:</strong> Пользователи понимают, что каждый риск основан на конкретных фактах из проверяемых источников
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>
                <strong>Профиль компании:</strong> Индикатор полноты помогает понять, насколько хорошо система знает компанию
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>
                <strong>Подсказки о пробелах:</strong> Конкретные hints («чего не хватает») мотивируют пользователей заполнять данные
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>
                <strong>Влияние фактов:</strong> Разделение на триггеры/подтверждения/противоречия помогает оценить вес риска
              </span>
            </li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-gray-500">
          <p>Прототип для валидации продуктовой модели • Не продакшн</p>
        </footer>
      </div>
    </div>
  );
}
