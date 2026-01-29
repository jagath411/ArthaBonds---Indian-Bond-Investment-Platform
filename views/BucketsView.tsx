
import React from 'react';
import { Briefcase, MoreVertical, Plus, Target, ChevronRight } from 'lucide-react';
import { MOCK_BUCKETS, MOCK_BONDS } from '../constants';

const BucketsView: React.FC = () => {
  return (
    <div className="p-6 pt-12 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Bond Buckets</h1>
        <button className="p-2 glass-card rounded-full text-indigo-400">
          <Plus size={24} />
        </button>
      </div>

      <div className="bg-white/5 rounded-3xl p-6 mb-8 border border-white/5">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-indigo-500/20 rounded-2xl text-indigo-400">
            <Target size={24} />
          </div>
          <div>
            <h2 className="font-bold text-lg">Goal Tracking</h2>
            <p className="text-zinc-500 text-xs">₹1.25 Cr Aggregate Goal</p>
          </div>
        </div>
        <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden mb-2">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full" style={{ width: '15%' }}></div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-zinc-500 font-bold">15% PROGRESS</span>
          <span className="text-xs font-bold">₹16.50L / ₹1.25 Cr</span>
        </div>
      </div>

      <div className="space-y-6">
        {MOCK_BUCKETS.map((bucket) => (
          <div key={bucket.id} className="glass-card rounded-3xl p-5 border border-white/5 group hover:border-indigo-500/20 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-xl mb-1">{bucket.name}</h3>
                <p className="text-zinc-500 text-xs">{bucket.description}</p>
              </div>
              <button className="text-zinc-600 hover:text-white">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="flex space-x-2 mb-6">
              {bucket.bonds.map((bondId) => {
                const bond = MOCK_BONDS.find(b => b.id === bondId);
                return (
                  <div key={bondId} className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[10px] font-bold text-zinc-400">
                    {bond?.issuer.split(' ')[0]}
                  </div>
                );
              })}
              <div className="px-3 py-1 bg-indigo-500/10 rounded-lg border border-indigo-500/20 text-[10px] font-bold text-indigo-400">
                + Add
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div>
                <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Value</p>
                <p className="text-lg font-bold">₹{(bucket.currentValue/1000).toFixed(0)}k</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Yield</p>
                <p className="text-lg font-bold text-emerald-400">~7.2%</p>
              </div>
            </div>

            <button className="w-full mt-6 py-3 bg-white/5 rounded-2xl text-sm font-bold group-hover:bg-white/10 transition-all flex items-center justify-center space-x-2">
              <span>View Lifecycle</span>
              <ChevronRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BucketsView;
