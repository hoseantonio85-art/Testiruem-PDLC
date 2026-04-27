// VALIDATES: Пользователи понимают концепцию "полноты знаний" по компании и видят пробелы

import { CompanyContext, KnowledgeFact } from './types';

export const companyFacts: Record<string, KnowledgeFact[]> = {
  general: [
    {
      id: 'fact-gen-001',
      category: 'general',
      subcategory: 'registration',
      factText: 'ООО «СтройИнвест» зарегистрировано 15 июня 2018 года',
      confidence: 0.99,
      sourceId: 'src-004',
    },
    {
      id: 'fact-gen-002',
      category: 'general',
      subcategory: 'activity',
      factText: 'Основной вид деятельности: строительство жилых и нежилых зданий (ОКВЭД 41.20)',
      confidence: 0.95,
      sourceId: 'src-004',
    },
  ],
  org_structure: [
    {
      id: 'fact-org-001',
      category: 'org_structure',
      subcategory: 'management',
      factText: 'Генеральный директор — Петров Алексей Владимирович',
      confidence: 0.90,
      sourceId: 'src-004',
    },
  ],
  financial: [
    {
      id: 'fact-fin-001',
      category: 'financial',
      subcategory: 'revenue',
      factText: 'Выручка за 2023 год составила 450 млн руб.',
      confidence: 0.92,
      sourceId: 'src-005',
    },
    {
      id: 'fact-fin-002',
      category: 'financial',
      subcategory: 'profit',
      factText: 'Чистая прибыль за 2023 год — 38 млн руб.',
      confidence: 0.92,
      sourceId: 'src-005',
    },
  ],
  regulatory: [
    {
      id: 'fact-reg-001',
      category: 'regulatory',
      subcategory: 'procurement_compliance',
      factText: 'Ответственное лицо не получило три коммерческих предложения при закупке на 2.4 млн руб.',
      confidence: 0.95,
      sourceId: 'src-001',
    },
    {
      id: 'fact-reg-002',
      category: 'regulatory',
      subcategory: 'legal_changes',
      factText: 'С 1 марта 2024 года вступили в силу новые требования 44-ФЗ к обоснованию НМЦК',
      confidence: 0.88,
      sourceId: 'src-002',
    },
  ],
  strategic: [], // Пустая категория для демонстрации недостающих данных
};

export const mockCompany: CompanyContext = {
  companyId: 'comp-001',
  name: 'ООО «СтройИнвест»',
  completeness: {
    overall: 62,
    byCategory: {
      general: {
        score: 85,
        missingHints: ['История смены собственников'],
      },
      org_structure: {
        score: 45,
        missingHints: ['Организационная структура', 'Контакты ключевых сотрудников', 'Положения о подразделениях'],
      },
      financial: {
        score: 70,
        missingHints: ['Данные за 2022 год', 'Дебиторская задолженность'],
      },
      regulatory: {
        score: 80,
        missingHints: ['Лицензии и сертификаты'],
      },
      strategic: {
        score: 15,
        missingHints: ['Стратегия развития', 'Целевые показатели', 'Планы расширения'],
      },
    },
  },
  factsByCategory: companyFacts as Record<keyof typeof companyFacts, KnowledgeFact[]>,
  linkedRisksCount: 12,
};
