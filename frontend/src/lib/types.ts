export interface TermExplanation {
  term: string;
  termFrequency: number;
  documentFrequency: number;
  tfScore: number;
  idfScore: number;
  termContribution: number;
}

export interface RelevanceExplanation {
  docId: number;
  algorithmName: string;
  finalScore: number;
  documentLength: number;
  averageDocumentLength: number;
  termExplanations: Record<string, TermExplanation>;
}

export interface SearchResultItem {
  id: number;
  title: string;
  contentSnippet: string;
  url: string;
  category: string;
  tags: string;
  author: string;
  score: number;
  matchedTerms: string[];
  explanation: RelevanceExplanation;
}

export interface SearchResponse {
  query: string;
  algorithm: string;
  executionTimeMs: number;
  totalResults: number;
  page: number;
  size: number;
  cacheHit: boolean;
  results: SearchResultItem[];
}

export interface AnalyticsSummary {
  totalSearches: number;
  avgLatencyMs: number;
  zeroResultQueries: number;
  cacheHitRatio: number;
  indexedDocumentsCount: number;
}

export interface EngineeringStats {
  totalDocuments: number;
  totalTokens: number;
  averageDocumentLength: number;
  uniqueTermsCount: number;
  rankingAlgorithms: Record<string, any>;
}

export interface BenchmarkResult {
  documentCount: number;
  indexingTimeMs: number;
  indexingThroughputDocsPerSec: number;
  avgQueryLatencyMs: number;
  p95QueryLatencyMs: number;
  p99QueryLatencyMs: number;
  memoryUsedMb: number;
}
