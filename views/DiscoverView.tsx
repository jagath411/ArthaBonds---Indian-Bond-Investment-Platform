
import React, { useState } from 'react';
import { Search, SlidersHorizontal, ChevronRight, Zap, Award, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_BONDS } from '../constants';
import { BondType } from '../types';

const DiscoverView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<BondType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  const tabs: ('All' | BondType)[] = ['All', BondType.GOVERNMENT, BondType.CORPORATE, BondType.TAX_FREE, BondType.FD];

  const filteredBonds = MOCK_BONDS.filter(bond => {
    const matchesTab = activeTab === 'All' || bond.type === activeTab;
    const matchesSearch = bond.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          bond.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  return (
    <div className="p-6 pt-12 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Explore Bonds</h1>
        <button 
          onClick={handleSync}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
            isSyncing ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/5 text-zinc-500 hover:text-white'
          }`}
        >
          {isSyncing ? (
            <RefreshCw size={12} className="animate-spin" />
          ) : (
            <CheckCircle2 size={12} className="text-emerald-500" />
          )}
          {isSyncing ? 'Syncing...' : 'Live Data'}
        </button>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
        <input 
          type="text" 
          placeholder="Search by issuer, rating, or name..."
          className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl py-3.5 pl-12 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all text-zinc-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors">
          <SlidersHorizontal size={18} />
        </button>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6 mb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              activeTab === tab 
                ? 'bg-indigo-500 text-white shadow-xl shadow-indigo-500/20' 
                : 'bg-[#1a1a1a] text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4 mt-4">
        {filteredBonds.map((bond) => (
          <Link 
            to={`/bond/${bond.id}`} 
            key={bond.id} 
            className="block bg-[#121212] border border-white/5 rounded-[24px] p-5 hover:border-indigo-500/30 transition-all group active:scale-[0.98]"
          >
            <div className="flex justify-between items-start mb-1">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {bond.type}
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10">
                  {bond.rating === 'Sovereign' ? 'SOVEREIGN' : bond.rating}
                </span>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-emerald-400 leading-none">{bond.ytm}%</p>
                <p className="text-[9px] text-zinc-500 font-bold uppercase mt-1 tracking-tight">Expected Yield</p>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-bold text-lg text-white group-hover:text-indigo-400 transition-colors tracking-tight">{bond.name}</h3>
              <p className="text-xs text-zinc-500 font-medium">{bond.issuer}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/5 items-center">
              <div>
                <p className="text-[9px] text-zinc-500 uppercase font-black tracking-wider mb-0.5">Tenor</p>
                <p className="text-sm font-bold text-zinc-200">{bond.tenorYears} Years</p>
              </div>
              <div>
                <p className="text-[9px] text-zinc-500 uppercase font-black tracking-wider mb-0.5">Min Inv</p>
                <p className="text-sm font-bold text-zinc-200">₹{(bond.minInvestment/1000).toFixed(0)}k</p>
              </div>
              <div className="flex justify-end items-center text-zinc-400 group-hover:text-white transition-colors">
                <span className="text-[10px] font-black mr-1 tracking-widest">DETAILS</span>
                <ChevronRight size={14} />
              </div>
            </div>
          </Link>
        ))}

        {filteredBonds.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <Search size={40} className="mx-auto mb-4 text-zinc-600" />
            <p className="text-zinc-500">No bonds found matching your search.</p>
          </div>
        )}
      </div>

      <div className="mt-12 bg-indigo-600 rounded-[32px] p-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
          <Award size={160} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-3">
            <Zap size={16} fill="white" className="text-white" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90">Limited Offer</span>
          </div>
          <h3 className="text-2xl font-black mb-2 text-white leading-tight">Premium Corporate Bond</h3>
          <p className="text-white/80 text-xs mb-6 max-w-[220px] leading-relaxed">
            Unlock 9.25% YTM with Tier-1 Capital Bonds. Limited units remaining in current allotment.
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3.5 rounded-2xl text-xs font-black hover:shadow-xl transition-all active:scale-95">
            Invest Now
          </button>
        </div>
        {/* Decorative elements to match screenshot bookmark shape */}
        <div className="absolute top-0 right-10 w-16 h-24 bg-white/10 rounded-b-full"></div>
      </div>
    </div>
  );
};

export default DiscoverView;
