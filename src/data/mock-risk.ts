// VALIDATES: Пользователи видят, как конкретные факты из источников формируют риск

import { RiskOrigin, KnowledgeFact } from './types';

export const riskFacts: KnowledgeFact[] = [
  {
    id: 'fact-001',
    category: 'regulatory',
    subcategory: 'procurement_compliance',
    factText: 'Ответственное лицо не получило три коммерческих предложения при закупке на 2.4 млн руб.',
    confidence: 0.95,
    sourceId: 'src-001',
  },
  {
    id: 'fact-002',
    category: 'regulatory',
    subcategory: 'legal_changes',
    factText: 'С 1 марта 2024 года вступили в силу новые требования 44-ФЗ к обоснованию НМЦК',
    confidence: 0.88,
    sourceId: 'src-002',
  },
  {
    id: 'fact-003',
    category: 'operational',
    subcategory: 'supply_chain',
    factText: 'Задержка поставки от ключевого поставщика на 45 дней создаёт каскадные риски по проекту',
    confidence: 0.75,
    sourceId: 'src-003',
  },
];

export const mockRisk: RiskOrigin = {
  riskId: 'risk-001',
  riskTitle: 'Нарушение процедур закупок',
  linkedFacts: [
    {
      fact: riskFacts[0],
      influence: 'trigger',
      weight: 0.8,
    },
    {
      fact: riskFacts[1],
      influence: 'supporting_evidence',
      weight: 0.6,
    },
    {
      fact: riskFacts[2],
      influence: 'contextual',
      weight: 0.4,
    },
  ],
};
