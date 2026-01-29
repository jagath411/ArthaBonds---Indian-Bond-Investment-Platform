
export enum BondType {
  GOVERNMENT = 'Government',
  CORPORATE = 'Corporate',
  TAX_FREE = 'Tax-Free',
  FD = 'Fixed Deposit'
}

export enum RiskLevel {
  LOW = 'Low',
  MODERATE = 'Moderate',
  HIGH = 'High'
}

export interface Bond {
  id: string;
  name: string;
  issuer: string;
  type: BondType;
  ytm: number;
  faceValue: number;
  minInvestment: number;
  tenorYears: number;
  rating: string;
  risk: RiskLevel;
  payoutFrequency: 'Monthly' | 'Quarterly' | 'Yearly' | 'On Maturity';
  nextInterestDate: string;
}

export interface Bucket {
  id: string;
  name: string;
  description: string;
  goalAmount: number;
  currentValue: number;
  bonds: string[]; // Array of Bond IDs
  createdAt: string;
}

export interface UserPortfolio {
  totalInvested: number;
  currentValue: number;
  annualizedReturn: number;
  nextPayoutAmount: number;
  nextPayoutDate: string;
}
