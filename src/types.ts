export interface CompetitorData {
  competitor: string;
  rank: number;
  seoAuthority: number;
}

export interface RecommendedService {
  name: string;
  impact: string;
  costEstimate: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface AuditReport {
  overallScore: number;
  loadTime: string;
  seoScore: number;
  seoIssues: string[];
  competitorRankings: CompetitorData[];
  mobileScore: number;
  mobileIssues: string[];
  conversionScore: number;
  conversionIssues: string[];
  estimatedMonthlyRevenueIncrease: string;
  recommendedServices: RecommendedService[];
  executiveSummary: string;
  technicalDetails: string;
  isFallback?: boolean;
  errorMsg?: string;
}

export type AlkhawarizmiServiceType = 'omniseo' | 'revmarketing' | 'uxai' | 'platform';
