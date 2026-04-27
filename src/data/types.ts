// VALIDATES: Пользователи понимают связь "риск ← знания ← источники" через явные типы данных

export type KnowledgeCategory = 'general' | 'org_structure' | 'financial' | 'regulatory' | 'strategic';
export type SourceType = 'document' | 'news' | 'incident' | 'ai_extracted';
export type InfluenceType = 'trigger' | 'supporting_evidence' | 'contradicting' | 'contextual';

export interface KnowledgeFact {
  id: string;
  category: KnowledgeCategory;
  subcategory: string;
  factText: string;
  confidence: number; // 0-1
  sourceId: string;
}

export interface KnowledgeSource {
  id: string;
  type: SourceType;
  title: string;
  url?: string;
  publishedDate: string;
  fragment: string; // конкретный фрагмент текста
  page?: number;
}

export interface RiskOrigin {
  riskId: string;
  riskTitle: string;
  linkedFacts: Array<{
    fact: KnowledgeFact;
    influence: InfluenceType;
    weight: number; // 0-1
  }>;
}

export interface CompanyContext {
  companyId: string;
  name: string;
  completeness: {
    overall: number; // 0-100
    byCategory: Record<KnowledgeCategory, { score: number; missingHints: string[] }>;
  };
  factsByCategory: Record<KnowledgeCategory, KnowledgeFact[]>;
  linkedRisksCount: number;
}
