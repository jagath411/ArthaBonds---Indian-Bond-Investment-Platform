
import React from 'react';
import { Settings, Shield, CreditCard, HelpCircle, LogOut, ChevronRight, Headphones } from 'lucide-react';

const ProfileView: React.FC = () => {
  return (
    <div className="p-6 pt-12 animate-in fade-in duration-500">
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 p-1">
          <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center">
            <span className="text-3xl font-black text-white">AB</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold">Artha Investor</h2>
        <p className="text-zinc-500 text-sm">ab.investor@example.com</p>
        <div className="mt-3 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center space-x-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">KYC Verified</span>
        </div>
      </div>

      <div className="space-y-3">
        <ProfileMenuItem icon={<Settings size={20} />} label="Settings" />
        <ProfileMenuItem icon={<CreditCard size={20} />} label="Bank & Mandates" />
        <ProfileMenuItem icon={<Shield size={20} />} label="Security & Biometrics" />
        <ProfileMenuItem icon={<Headphones size={20} />} label="Help & Support" />
        <ProfileMenuItem icon={<HelpCircle size={20} />} label="Knowledge Base" />
      </div>

      <div className="mt-8">
        <button className="w-full py-4 glass-card rounded-2xl flex items-center justify-center space-x-2 text-rose-500 font-bold hover:bg-rose-500/5 transition-colors">
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>

      <p className="text-center text-[10px] text-zinc-600 mt-12 uppercase font-bold tracking-widest">
        Version 2.4.1 (Stable)
      </p>
    </div>
  );
};

const ProfileMenuItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <button className="w-full p-4 glass-card rounded-2xl flex items-center justify-between group hover:border-indigo-500/20 transition-all">
    <div className="flex items-center space-x-4">
      <div className="text-zinc-500 group-hover:text-indigo-400 transition-colors">{icon}</div>
      <span className="font-bold text-zinc-300 group-hover:text-white transition-colors">{label}</span>
    </div>
    <ChevronRight size={18} className="text-zinc-700 group-hover:text-indigo-400 transition-all" />
  </button>
);

export default ProfileView;
