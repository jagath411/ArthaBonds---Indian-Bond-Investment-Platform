
import React, { useEffect, useState } from 'react';
import { Plus, Bell, ShieldCheck, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import PortfolioCard from '../components/PortfolioCard';
import { MOCK_BUCKETS } from '../constants';
import { getMarketOutlook } from '../services/geminiService';

const DashboardView: React.FC = () => {
  const [outlook, setOutlook] = useState<string>('Loading market intelligence...');

  useEffect(() => {
    const fetchOutlook = async () => {
      const text = await getMarketOutlook();
      setOutlook(text);
    };
    fetchOutlook();
  }, []);

  return (
    <div className="p-6 pt-12 animate-in fade-in duration-700">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Namaste, Artha</h1>
          <p className="text-zinc-500 text-sm">Your fixed income is growing.</p>
        </div>
        <div className="flex space-x-3">
          <button className="p-2.5 glass-card rounded-full text-zinc-400 hover:text-white transition-colors">
            <Bell size={20} />
          </button>
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
            <span className="text-indigo-400 font-bold">A</span>
          </div>
        </div>
      </header>

      <PortfolioCard />

      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Goal Buckets</h3>
          <Link to="/buckets" className="text-indigo-400 text-sm font-semibold flex items-center">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="space-y-4">
          {MOCK_BUCKETS.map((bucket) => (
            <div key={bucket.id} className="glass-card rounded-2xl p-4 border border-white/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold">{bucket.name}</span>
                <span className="text-[10px] text-zinc-500 font-medium">₹{bucket.goalAmount.toLocaleString()} Goal</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-3">
                <div 
                  className="bg-indigo-500 h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${(bucket.currentValue / bucket.goalAmount) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-400">Current Value</span>
                <span className="text-xs font-bold text-white">₹{bucket.currentValue.toLocaleString()}</span>
              </div>
            </div>
          ))}
          <button className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-zinc-500 text-sm font-medium flex items-center justify-center space-x-2 hover:border-indigo-500/40 hover:text-indigo-400 transition-all">
            <Plus size={18} />
            <span>Create New Bucket</span>
          </button>
        </div>
      </section>

      <section className="mb-4">
        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <Sparkles size={60} />
          </div>
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles size={16} className="text-indigo-400" />
            <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400">AI Market Intelligence</h4>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed italic">
            "{outlook}"
          </p>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex items-center space-x-3 text-zinc-500 bg-white/5 p-4 rounded-2xl border border-white/5">
          <ShieldCheck size={20} className="text-emerald-500" />
          <p className="text-[11px] leading-snug">
            ArthaBonds is AMFI-registered and uses bank-grade 256-bit encryption for all transactions. Your assets are held in your own Demat account.
          </p>
        </div>
      </section>
    </div>
  );
};

export default DashboardView;
