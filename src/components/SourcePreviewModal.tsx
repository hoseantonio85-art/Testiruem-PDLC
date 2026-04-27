// VALIDATES: Пользователи понимают, что модальное окно показывает оригинальный контекст источника

'use client';

import { KnowledgeSource } from '@/data/types';

interface SourcePreviewModalProps {
  source: KnowledgeSource | null;
  onClose: () => void;
}

export default function SourcePreviewModal({ source, onClose }: SourcePreviewModalProps) {
  if (!source) return null;

  const typeLabels: Record<string, string> = {
    document: '📄 Документ',
    news: '📰 Новость',
    incident: '⚠️ Инцидент',
    ai_extracted: '🤖 AI-извлечение',
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <span className="inline-block px-2 py-1 text-xs rounded bg-gray-100 mb-2">
                {typeLabels[source.type]}
              </span>
              <h3 className="text-xl font-semibold text-gray-900">{source.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                Опубликовано: {new Date(source.publishedDate).toLocaleDateString('ru-RU')}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
              aria-label="Закрыть"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Fragment */}
        <div className="p-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Фрагмент текста:</h4>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r">
            <p className="text-gray-800 italic leading-relaxed">
              &laquo;{source.fragment}&raquo;
            </p>
          </div>
          
          {source.page && (
            <p className="text-sm text-gray-500 mt-3">Страница: {source.page}</p>
          )}
        </div>

        {/* Actions */}
        <div className="p-6 border-t bg-gray-50 rounded-b-lg flex gap-3">
          {source.url && (
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm font-medium"
            >
              Открыть оригинал ↗
            </a>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition text-sm font-medium"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
