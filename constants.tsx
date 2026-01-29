
import { Bond, BondType, RiskLevel } from './types';

export const MOCK_BONDS: Bond[] = [
  {
    id: '1',
    name: '7.18% GS 2033',
    issuer: 'Government of India',
    type: BondType.GOVERNMENT,
    ytm: 7.24,
    faceValue: 100,
    minInvestment: 10000,
    tenorYears: 9.5,
    rating: 'Sovereign',
    risk: RiskLevel.LOW,
    payoutFrequency: 'Yearly',
    nextInterestDate: '2024-06-15'
  },
  {
    id: '2',
    name: 'NHAI Tax Free Bonds',
    issuer: 'National Highways Authority',
    type: BondType.TAX_FREE,
    ytm: 5.85,
    faceValue: 1000,
    minInvestment: 50000,
    tenorYears: 12,
    rating: 'AAA',
    risk: RiskLevel.LOW,
    payoutFrequency: 'Yearly',
    nextInterestDate: '2024-09-01'
  },
  {
    id: '3',
    name: 'HDFC Bank Corporate Bond',
    issuer: 'HDFC Bank Ltd',
    type: BondType.CORPORATE,
    ytm: 8.15,
    faceValue: 1000,
    minInvestment: 25000,
    tenorYears: 5,
    rating: 'AAA',
    risk: RiskLevel.LOW,
    payoutFrequency: 'Quarterly',
    nextInterestDate: '2024-05-20'
  },
  {
    id: '4',
    name: 'Shriram Finance Fixed Deposit',
    issuer: 'Shriram Finance',
    type: BondType.FD,
    ytm: 9.10,
    faceValue: 1,
    minInvestment: 5000,
    tenorYears: 3,
    rating: 'AA+',
    risk: RiskLevel.MODERATE,
    payoutFrequency: 'Monthly',
    nextInterestDate: '2024-04-28'
  },
  {
    id: '5',
    name: 'NABARD Rural Bonds',
    issuer: 'NABARD',
    type: BondType.GOVERNMENT,
    ytm: 7.45,
    faceValue: 1000,
    minInvestment: 10000,
    tenorYears: 7,
    rating: 'AAA',
    risk: RiskLevel.LOW,
    payoutFrequency: 'Yearly',
    nextInterestDate: '2024-11-12'
  }
];

export const MOCK_BUCKETS = [
  {
    id: 'b1',
    name: 'Child Education',
    description: 'Bonds for college fund (15yr horizon)',
    goalAmount: 2500000,
    currentValue: 450000,
    bonds: ['1', '2'],
    createdAt: '2023-01-15'
  },
  {
    id: 'b2',
    name: 'Retirement Base',
    description: 'Stable income for golden years',
    goalAmount: 10000000,
    currentValue: 1200000,
    bonds: ['3', '5'],
    createdAt: '2022-11-20'
  }
];
