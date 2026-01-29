import React from 'react';
// Fix: Added PieChart to the lucide-react imports to resolve 'Cannot find name PieChart' on line 30
import { TrendingUp, ArrowUpRight, DollarSign, PieChart } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const data = [
  { value: 400000 },
  { value: 410000 },
  { value: 405000 },
  { value: 425000 },
  { value: 440000 },
  { value: 450000 },
];

const PortfolioCard: React.FC = () => {
  return (
    <div className="relative overflow-hidden glass-card rounded-3xl p-6 mb-6 group">
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">Total Current Value</p>
          <h2 className="text-3xl font-bold text-white tracking-tight">₹4,50,000.00</h2>
          <div className="flex items-center space-x-1 text-emerald-400 mt-1">
            <TrendingUp size={14} />
            <span className="text-xs font-semibold">+8.4% (All time)</span>
          </div>
        </div>
        <div className="p-2 bg-indigo-500/10 rounded-xl">
          <PieChart className="text-indigo-400" size={24} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
          <p className="text-zinc-500 text-[10px] uppercase font-bold mb-1">Annualized Return</p>
          <p className="text-lg font-bold">7.8% <span className="text-[10px] font-normal text-zinc-400 ml-1">XIRR</span></p>
        </div>
        <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
          <p className="text-zinc-500 text-[10px] uppercase font-bold mb-1">Next Payout</p>
          <p className="text-lg font-bold">₹12,400 <span className="text-[10px] font-normal text-zinc-400 ml-1">May 20</span></p>
        </div>
      </div>

      <div className="h-16 w-full -mb-6 -mx-6 opacity-50 group-hover:opacity-100 transition-opacity">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="value" stroke="#6366f1" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PortfolioCard;
