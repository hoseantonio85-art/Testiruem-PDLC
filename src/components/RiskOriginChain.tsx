// VALIDATES: Пользователи понимают цепочку "риск ← знания ← источники" и могут предложить свою связь

'use client';

import { useState } from 'react';
import { RiskOrigin, KnowledgeSource } from '@/data/types';
import SourcePreviewModal from './SourcePreviewModal';

interface RiskOriginChainProps {
  risk: RiskOrigin;
  sources: KnowledgeSource[];
}

const influenceConfig: Record<string, { label: string; color: string; bg: string }> = {
  trigger: { label: 'Триггер', color: 'text-green-700', bg: 'bg-green-100' },
  supporting_evidence: { label: 'Подтверждение', color: 'text-blue-700', bg: 'bg-blue-100' },
  contradicting: { label: 'Противоречие', color: 'text-red-700', bg: 'bg-red-100' },
  contextual: { label: 'Контекст', color: 'text-gray-700', bg: 'bg-gray-100' },
};

export default function RiskOriginChain({ risk, sources }: RiskOriginChainProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSource, setSelectedSource] = useState<KnowledgeSource | null>(null);
  const [suggested, setSuggested] = useState(false);

  const getSourceById = (sourceId: string) => sources.find(s => s.id === sourceId);

  return (
    <div className="border rounded-lg bg-white">
      {/* Header */}
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{risk.riskTitle}</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
        >
          {isExpanded ? '▼ Скрыть цепочку знаний' : '▶ Показать цепочку знаний'}
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Связанные факты:</h4>
          
          <div className="space-y-3">
            {risk.linkedFacts.map((link, idx) => {
              const source = getSourceById(link.fact.sourceId);
              const config = influenceConfig[link.influence];
              
              return (
                <div 
                  key={idx}
                  className="border rounded-md p-3 hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => source && setSelectedSource(source)}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className={`inline-block px-2 py-0.5 text-xs rounded ${config.bg} ${config.color} font-medium`}>
                      {config.label}
                    </span>
                    <span className="text-xs text-gray-500">
                      Вес: {(link.weight * 100).toFixed(0)}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 mb-2">{link.fact.factText}</p>
                  {source && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>Источник:</span>
                      <span className="font-medium text-gray-700 truncate max-w-[200px]">
                        {source.title}
                      </span>
                      <span>•</span>
                      <span>{new Date(source.publishedDate).toLocaleDateString('ru-RU')}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Button */}
          <div className="pt-3 border-t">
            {suggested ? (
              <div className="text-sm text-green-700 bg-green-50 px-3 py-2 rounded">
                ✓ Предложение отправлено на модерацию
              </div>
            ) : (
              <button
                onClick={() => setSuggested(true)}
                className="text-sm text-gray-700 hover:text-gray-900 font-medium flex items-center gap-2"
              >
                + Предложить связь с этим риском
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedSource && (
        <SourcePreviewModal 
          source={selectedSource} 
          onClose={() => setSelectedSource(null)} 
        />
      )}
    </div>
  );
}
