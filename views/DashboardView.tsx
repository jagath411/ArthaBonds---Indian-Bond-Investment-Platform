
import React, { useEffect, useState } from 'react';
import { Plus, Bell, ShieldCheck, ChevronRight, Sparkles, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import PortfolioCard from '../components/PortfolioCard';
import { MOCK_BUCKETS } from '../constants';
import { getMarketOutlook } from '../services/geminiService';

interface DashboardViewProps {
  user: any;
}

const DashboardView: React.FC<DashboardViewProps> = ({ user }) => {
  const [outlook, setOutlook] = useState<{text: string, sources: any[]}>({
    text: 'Loading market intelligence...',
    sources: []
  });

  useEffect(() => {
    const fetchOutlook = async () => {
      const result = await getMarketOutlook();
      setOutlook(result);
    };
    fetchOutlook();
  }, []);

  const firstName = user?.given_name || user?.name?.split(' ')[0] || 'Artha';

  return (
    <div className="p-6 pt-12 animate-in fade-in duration-700">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Namaste, {firstName}</h1>
          <p className="text-zinc-500 text-sm">Your fixed income is growing.</p>
        </div>
        <div className="flex space-x-3">
          <button className="p-2.5 glass-card rounded-full text-zinc-400 hover:text-white transition-colors">
            <Bell size={20} />
          </button>
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 overflow-hidden border border-indigo-500/30 flex items-center justify-center">
            {user?.picture ? (
              <img src={user.picture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-indigo-400 font-bold">{firstName[0]}</span>
            )}
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
        </div>
      </section>

      <section className="mb-4">
        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles size={16} className="text-indigo-400" />
            <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Live Market Outlook</h4>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed italic mb-3">
            "{outlook.text}"
          </p>
          {outlook.sources.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {outlook.sources.map((s, idx) => (
                <a key={idx} href={s.uri} target="_blank" rel="noopener noreferrer" className="text-[9px] bg-white/5 px-2 py-1 rounded flex items-center gap-1 text-zinc-400 hover:text-white transition-colors">
                  <ExternalLink size={10} />
                  {s.title.substring(0, 20)}...
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mt-8">
        <div className="flex items-center space-x-3 text-zinc-500 bg-white/5 p-4 rounded-2xl border border-white/5">
          <ShieldCheck size={20} className="text-emerald-500" />
          <p className="text-[11px] leading-snug">
            ArthaBonds is AMFI-registered. Your data is synced in real-time with your Demat provider.
          </p>
        </div>
      </section>
    </div>
  );
};

export default DashboardView;
