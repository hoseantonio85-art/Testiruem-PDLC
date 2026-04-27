// VALIDATES: Пользователи понимают индикатор полноты знаний и видят конкретные пробелы по категориям

'use client';

import { useState } from 'react';
import { CompanyContext, KnowledgeCategory, KnowledgeSource } from '@/data/types';
import SourcePreviewModal from './SourcePreviewModal';

interface CompanyContextProfileProps {
  company: CompanyContext;
  sources: KnowledgeSource[];
}

const categoryLabels: Record<KnowledgeCategory, string> = {
  general: '🏢 Общая информация',
  org_structure: '👥 Организационная структура',
  financial: '💰 Финансы',
  regulatory: '⚖️ Регуляторика',
  strategic: '🎯 Стратегия',
};

function getProgressColor(score: number): string {
  if (score >= 70) return 'bg-green-500';
  if (score >= 40) return 'bg-yellow-500';
  return 'bg-red-500';
}

export default function CompanyContextProfile({ company, sources }: CompanyContextProfileProps) {
  const [openCategories, setOpenCategories] = useState<Set<KnowledgeCategory>>(new Set(['general']));
  const [selectedSource, setSelectedSource] = useState<KnowledgeSource | null>(null);
  const [addedDocs, setAddedDocs] = useState<Record<string, boolean>>({});

  const toggleCategory = (cat: KnowledgeCategory) => {
    const next = new Set(openCategories);
    if (next.has(cat)) next.delete(cat);
    else next.add(cat);
    setOpenCategories(next);
  };

  const getSourceById = (sourceId: string) => sources.find(s => s.id === sourceId);

  const handleAddDocument = (category: string) => {
    setAddedDocs(prev => ({ ...prev, [category]: true }));
  };

  const overallColor = getProgressColor(company.completeness.overall);

  return (
    <div className="bg-white rounded-lg border">
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{company.name}</h2>
        
        {/* Overall Progress */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Полнота знаний</span>
          <span className="text-sm font-bold text-gray-900">{company.completeness.overall}%</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${overallColor} transition-all duration-500`}
            style={{ width: `${company.completeness.overall}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Связано рисков: {company.linkedRisksCount}
        </p>
      </div>

      {/* Categories Accordion */}
      <div className="divide-y">
        {(Object.keys(categoryLabels) as KnowledgeCategory[]).map((category) => {
          const catData = company.completeness.byCategory[category];
          const facts = company.factsByCategory[category] || [];
          const isOpen = openCategories.has(category);
          const progressColor = getProgressColor(catData.score);

          return (
            <div key={category}>
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{isOpen ? '▼' : '▶'}</span>
                  <span className="font-medium text-gray-900">{categoryLabels[category]}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${progressColor}`}
                      style={{ width: `${catData.score}%` }}
                    />
                  </div>
                  <span className={`text-sm font-medium ${catData.score >= 70 ? 'text-green-700' : catData.score >= 40 ? 'text-yellow-700' : 'text-red-700'}`}>
                    {catData.score}%
                  </span>
                </div>
              </button>

              {/* Expanded Content */}
              {isOpen && (
                <div className="px-4 pb-4">
                  {/* Facts List */}
                  {facts.length > 0 ? (
                    <div className="space-y-2 mb-4">
                      {facts.map((fact) => {
                        const source = getSourceById(fact.sourceId);
                        return (
                          <div 
                            key={fact.id}
                            className="p-3 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition"
                            onClick={() => source && setSelectedSource(source)}
                          >
                            <p className="text-sm text-gray-800">{fact.factText}</p>
                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                              <span>Уверенность: {(fact.confidence * 100).toFixed(0)}%</span>
                              {source && (
                                <>
                                  <span>•</span>
                                  <span>{source.title}</span>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic mb-4">Нет данных в этой категории</p>
                  )}

                  {/* Missing Hints */}
                  {catData.missingHints.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-orange-700 mb-2 flex items-center gap-1">
                        ⚠️ Не хватает:
                      </h4>
                      <ul className="space-y-1">
                        {catData.missingHints.map((hint, idx) => (
                          <li key={idx} className="text-sm text-gray-600 pl-4 list-disc">
                            {hint}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2 border-t">
                    {!addedDocs[category] ? (
                      <button
                        onClick={() => handleAddDocument(category)}
                        className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        + Добавить документ
                      </button>
                    ) : (
                      <span className="px-3 py-1.5 text-sm text-green-700 bg-green-50 rounded">
                        ✓ Документ добавлен
                      </span>
                    )}
                    <button className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition">
                      🤖 Запросить у AI
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Link */}
      <div className="p-4 border-t bg-gray-50 rounded-b-lg">
        <button
          onClick={() => alert(`Показываем ${company.linkedRisksCount} связанных рисков...`)}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Показать {company.linkedRisksCount} связанных рисков →
        </button>
      </div>

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
