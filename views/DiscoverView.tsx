
import React, { useState } from 'react';
import { Search, SlidersHorizontal, ChevronRight, Zap, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_BONDS } from '../constants';
import { BondType } from '../types';

const DiscoverView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<BondType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs: ('All' | BondType)[] = ['All', BondType.GOVERNMENT, BondType.CORPORATE, BondType.TAX_FREE, BondType.FD];

  const filteredBonds = MOCK_BONDS.filter(bond => {
    const matchesTab = activeTab === 'All' || bond.type === activeTab;
    const matchesSearch = bond.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          bond.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-6 pt-12 animate-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-2xl font-bold mb-6">Explore Bonds</h1>
      
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
        <input 
          type="text" 
          placeholder="Search by issuer, rating, or name..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors">
          <SlidersHorizontal size={18} />
        </button>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === tab 
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                : 'bg-white/5 text-zinc-500 hover:bg-white/10'
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
            className="block glass-card rounded-2xl p-4 border border-white/5 hover:border-indigo-500/30 hover:bg-white/[0.05] transition-all group"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {bond.type}
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10">
                    {bond.rating}
                  </span>
                </div>
                <h3 className="font-bold text-base text-zinc-100 group-hover:text-indigo-400 transition-colors">{bond.name}</h3>
                <p className="text-xs text-zinc-500">{bond.issuer}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-emerald-400">{bond.ytm}%</p>
                <p className="text-[10px] text-zinc-500 font-medium uppercase">Expected Yield</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/5">
              <div>
                <p className="text-[9px] text-zinc-500 uppercase font-bold">Tenor</p>
                <p className="text-xs font-semibold">{bond.tenorYears} Years</p>
              </div>
              <div>
                <p className="text-[9px] text-zinc-500 uppercase font-bold">Min Inv</p>
                <p className="text-xs font-semibold">₹{(bond.minInvestment/1000).toFixed(0)}k</p>
              </div>
              <div className="flex justify-end items-center text-zinc-500 group-hover:text-white">
                <span className="text-[10px] font-bold mr-1">DETAILS</span>
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

      <div className="mt-12 bg-indigo-600 rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-20">
          <Award size={120} />
        </div>
        <div className="flex items-center space-x-2 mb-2">
          <Zap size={16} fill="white" />
          <span className="text-[10px] font-black uppercase tracking-widest">Limited Offer</span>
        </div>
        <h3 className="text-xl font-bold mb-2">Premium Corporate Bond</h3>
        <p className="text-white/80 text-xs mb-4 max-w-[200px]">Unlock 9.25% YTM with Tier-1 Capital Bonds. Limited units remaining.</p>
        <button className="bg-white text-indigo-600 px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-zinc-100 transition-colors">
          Invest Now
        </button>
      </div>
    </div>
  );
};

export default DiscoverView;
