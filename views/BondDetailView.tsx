import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Fix: Added Plus to the lucide-react imports to resolve 'Cannot find name Plus' on line 92
import { ChevronLeft, ShieldCheck, Calendar, Info, Share2, Sparkles, ShoppingCart, Plus } from 'lucide-react';
import { MOCK_BONDS } from '../constants';
import { getBondInsight } from '../services/geminiService';

const BondDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const bond = MOCK_BONDS.find(b => b.id === id);
  const [insight, setInsight] = useState<string>('Generating AI investment thesis...');

  useEffect(() => {
    if (bond) {
      const fetchInsight = async () => {
        const text = await getBondInsight(bond.name, bond.issuer, bond.ytm);
        setInsight(text);
      };
      fetchInsight();
    }
  }, [bond]);

  if (!bond) return <div className="p-8">Bond not found.</div>;

  return (
    <div className="min-h-screen animate-in slide-in-from-right-4 duration-500 relative bg-[#0a0a0a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-white/5 p-4 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="p-2 glass-card rounded-full text-zinc-400">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-sm font-bold truncate px-4">{bond.name}</h2>
        <button className="p-2 glass-card rounded-full text-zinc-400">
          <Share2 size={18} />
        </button>
      </div>

      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {bond.type}
            </span>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {bond.risk} Risk
            </span>
          </div>
          <h1 className="text-2xl font-bold mb-1">{bond.name}</h1>
          <p className="text-zinc-500 text-sm mb-6">Issued by {bond.issuer}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-4 border border-white/5">
              <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Yield (YTM)</p>
              <p className="text-2xl font-bold text-emerald-400">{bond.ytm}%</p>
            </div>
            <div className="glass-card rounded-2xl p-4 border border-white/5">
              <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Tenor</p>
              <p className="text-2xl font-bold text-white">{bond.tenorYears} <span className="text-sm font-normal text-zinc-500">yrs</span></p>
            </div>
          </div>
        </div>

        {/* AI Insight Section */}
        <section className="mb-8">
          <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-5 relative overflow-hidden">
             <div className="flex items-center space-x-2 mb-3">
              <Sparkles size={16} className="text-indigo-400" />
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Artha AI Insights</h4>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed italic">
              "{insight}"
            </p>
          </div>
        </section>

        {/* Details Table */}
        <section className="mb-8">
          <h3 className="font-bold text-lg mb-4">Investment Details</h3>
          <div className="space-y-4">
            <DetailItem label="Min Investment" value={`₹${bond.minInvestment.toLocaleString()}`} />
            <DetailItem label="Credit Rating" value={bond.rating} icon={<ShieldCheck size={14} className="text-indigo-400" />} />
            <DetailItem label="Payout Frequency" value={bond.payoutFrequency} />
            <DetailItem label="Next Interest Date" value={bond.nextInterestDate} icon={<Calendar size={14} className="text-indigo-400" />} />
            <DetailItem label="Face Value" value={`₹${bond.faceValue.toLocaleString()}`} />
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex space-x-3 mb-12">
          <button className="flex-[1] py-4 bg-white/5 border border-white/10 rounded-2xl text-zinc-100 font-bold hover:bg-white/10 transition-colors flex items-center justify-center space-x-2">
            <Plus size={18} />
            <span>Add to Bucket</span>
          </button>
          <button className="flex-[2] py-4 bg-indigo-500 rounded-2xl text-white font-bold hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/20 flex items-center justify-center space-x-2">
            <ShoppingCart size={18} />
            <span>Invest Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) => (
  <div className="flex justify-between items-center py-3 border-b border-white/5">
    <span className="text-zinc-500 text-sm">{label}</span>
    <div className="flex items-center space-x-2">
      {icon}
      <span className="text-sm font-bold">{value}</span>
    </div>
  </div>
);

export default BondDetailView;
