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
  concurrencyLevel: number;
  totalQueriesExecuted: number;
  queriesPerSec: number;
  minLatencyMs: number;
  avgQueryLatencyMs: number;
  p50QueryLatencyMs: number;
  p75QueryLatencyMs: number;
  p90QueryLatencyMs: number;
  p95QueryLatencyMs: number;
  p99QueryLatencyMs: number;
  maxLatencyMs: number;
  errorCount: number;
  errorRatePercent: number;
  memoryUsedMb: number;
  cacheHitRatePercent: number;
  shardCount: number;
}

export interface ShardStatus {
  shardId: string;
  partitionIndex: number;
  host: string;
  port: number;
  isPrimary: boolean;
  isHealthy: boolean;
  artificialLatencyMs: number;
  documentCount: number;
}

export interface ClusterTopology {
  activeProfile: string;
  profileDescription: string;
  primaryShardCount: number;
  replicaShardCount: number;
  cacheEnabled: boolean;
  totalClusterDocuments: number;
  primaryShards: ShardStatus[];
  replicaShards: ShardStatus[];
}

export interface ReliabilityExperimentResult {
  faultAction: string;
  targetShardId: string;
  description: string;
  preFailureLatencyMs: number;
  degradedLatencyMs: number;
  postRecoveryLatencyMs: number;
  recoveryDurationMs: number;
  dataAvailabilityPercent: number;
  requestFailureRatePercent: number;
  analysis: string;
}

export interface RelevanceEvaluationResult {
  strategyName: string;
  precisionAt5: number;
  precisionAt10: number;
  recallAt10: number;
  meanReciprocalRank: number;
  ndcgAt10: number;
  evaluatedQueriesCount: number;
}

export interface ArchitectureDecisionRecord {
  id: string;
  title: string;
  status: string;
  context: string;
  problem: string;
  optionsConsidered: string[];
  decision: string;
  benchmarkEvidence: string;
  positiveTradeoffs: string[];
  negativeTradeoffs: string[];
}

export interface ExperimentRecord {
  id?: number;
  experimentName: string;
  gitCommit: string;
  documentCount: number;
  shardCount: number;
  concurrencyLevel: number;
  cacheEnabled: boolean;
  totalQueries: number;
  queriesPerSec: number;
  p50LatencyMs: number;
  p90LatencyMs: number;
  p95LatencyMs: number;
  p99LatencyMs: number;
  maxLatencyMs: number;
  indexingThroughputDocsPerSec: number;
  memoryUsedMb: number;
  errorRatePercent: number;
  timestamp: string;
}
