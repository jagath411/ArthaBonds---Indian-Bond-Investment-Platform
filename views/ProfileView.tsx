
import React, { useState } from 'react';
import { 
  Settings, 
  Shield, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Headphones, 
  ChevronLeft, 
  Bell, 
  Smartphone, 
  Key, 
  Mail, 
  ExternalLink,
  BookOpen,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface ProfileViewProps {
  user: any;
  onLogout: () => void;
}

type SubScreen = 'main' | 'settings' | 'bank' | 'security' | 'support' | 'knowledge';

const ProfileView: React.FC<ProfileViewProps> = ({ user, onLogout }) => {
  const [activeScreen, setActiveScreen] = useState<SubScreen>('main');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'settings': return <SettingsScreen onBack={() => setActiveScreen('main')} />;
      case 'bank': return <BankScreen onBack={() => setActiveScreen('main')} />;
      case 'security': return <SecurityScreen onBack={() => setActiveScreen('main')} />;
      case 'support': return <SupportScreen onBack={() => setActiveScreen('main')} />;
      case 'knowledge': return <KnowledgeScreen onBack={() => setActiveScreen('main')} />;
      default: return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 p-1 shadow-2xl shadow-indigo-500/20">
              <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                {user?.picture ? (
                  <img src={user.picture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-black text-white">
                    {(user?.given_name?.[0] || user?.name?.[0] || 'A').toUpperCase()}
                  </span>
                )}
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white">{user?.name || 'Artha Investor'}</h2>
            <p className="text-zinc-500 text-sm">{user?.email || 'investor@example.com'}</p>
            <div className="mt-3 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">KYC Verified</span>
            </div>
          </div>

          <div className="space-y-3">
            <ProfileMenuItem 
              icon={<Settings size={20} />} 
              label="Settings" 
              onClick={() => setActiveScreen('settings')} 
            />
            <ProfileMenuItem 
              icon={<CreditCard size={20} />} 
              label="Bank & Mandates" 
              onClick={() => setActiveScreen('bank')} 
            />
            <ProfileMenuItem 
              icon={<Shield size={20} />} 
              label="Security & Biometrics" 
              onClick={() => setActiveScreen('security')} 
            />
            <ProfileMenuItem 
              icon={<Headphones size={20} />} 
              label="Help & Support" 
              onClick={() => setActiveScreen('support')} 
            />
            <ProfileMenuItem 
              icon={<BookOpen size={20} />} 
              label="Knowledge Base" 
              onClick={() => setActiveScreen('knowledge')} 
            />
          </div>

          <div className="mt-8">
            <button 
              onClick={onLogout}
              className="w-full py-4 glass-card rounded-2xl flex items-center justify-center space-x-2 text-rose-500 font-bold hover:bg-rose-500/5 transition-all border border-rose-500/10 active:scale-[0.98]"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>

          <p className="text-center text-[10px] text-zinc-600 mt-12 uppercase font-bold tracking-widest">
            Version 2.4.1 (Stable)
          </p>
        </div>
      );
    }
  };

  return (
    <div className="p-6 pt-12 min-h-screen">
      {renderScreen()}
    </div>
  );
};

// --- Sub-Components ---

const ScreenHeader = ({ title, onBack }: { title: string; onBack: () => void }) => (
  <div className="flex items-center space-x-4 mb-8">
    <button onClick={onBack} className="p-2 glass-card rounded-full text-zinc-400 hover:text-white transition-colors">
      <ChevronLeft size={20} />
    </button>
    <h2 className="text-xl font-bold">{title}</h2>
  </div>
);

const SettingsScreen = ({ onBack }: { onBack: () => void }) => (
  <div className="animate-in slide-in-from-right-4 duration-300">
    <ScreenHeader title="Settings" onBack={onBack} />
    <div className="space-y-6">
      <section>
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 px-1">Notifications</h3>
        <div className="glass-card rounded-3xl divide-y divide-white/5">
          <ToggleItem icon={<Bell size={18} />} label="Interest Payouts" defaultChecked />
          <ToggleItem icon={<AlertCircle size={18} />} label="Market Alerts" />
          <ToggleItem icon={<Smartphone size={18} />} label="Push Notifications" defaultChecked />
        </div>
      </section>
      <section>
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 px-1">App Preference</h3>
        <div className="glass-card rounded-3xl p-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Smartphone size={18} className="text-zinc-400" />
            <span className="text-sm font-medium">Appearance</span>
          </div>
          <span className="text-xs font-bold text-indigo-400">Dark Mode Only</span>
        </div>
      </section>
    </div>
  </div>
);

const BankScreen = ({ onBack }: { onBack: () => void }) => (
  <div className="animate-in slide-in-from-right-4 duration-300">
    <ScreenHeader title="Bank & Mandates" onBack={onBack} />
    <div className="space-y-6">
      <div className="glass-card rounded-3xl p-5 border-l-4 border-indigo-500">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-bold text-black overflow-hidden">
               SBI
            </div>
            <div>
              <h4 className="font-bold text-sm">State Bank of India</h4>
              <p className="text-xs text-zinc-500">•••• 4821 | Primary</p>
            </div>
          </div>
          <CheckCircle2 size={18} className="text-emerald-500" />
        </div>
        <div className="flex items-center space-x-2 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
          <CheckCircle2 size={12} className="text-indigo-400" />
          <span>E-Mandate Active (₹5,00,000 limit)</span>
        </div>
      </div>
      <button className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-zinc-500 text-sm font-bold flex items-center justify-center space-x-2 hover:border-indigo-500/40 hover:text-indigo-400 transition-all">
        <PlusIcon size={18} />
        <span>Add New Bank Account</span>
      </button>
    </div>
  </div>
);

const SecurityScreen = ({ onBack }: { onBack: () => void }) => (
  <div className="animate-in slide-in-from-right-4 duration-300">
    <ScreenHeader title="Security" onBack={onBack} />
    <div className="space-y-4">
      <div className="glass-card rounded-3xl divide-y divide-white/5">
        <ToggleItem icon={<Shield size={18} />} label="Face ID / Biometrics" defaultChecked />
        <ToggleItem icon={<Key size={18} />} label="Two-Factor Auth" />
      </div>
      <button className="w-full p-4 glass-card rounded-2xl flex items-center justify-between group">
        <div className="flex items-center space-x-3">
          <Mail size={18} className="text-zinc-400" />
          <span className="text-sm font-medium">Change Email</span>
        </div>
        <ChevronRight size={16} className="text-zinc-600" />
      </button>
    </div>
  </div>
);

const SupportScreen = ({ onBack }: { onBack: () => void }) => (
  <div className="animate-in slide-in-from-right-4 duration-300">
    <ScreenHeader title="Help & Support" onBack={onBack} />
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <SupportCard icon={<Mail size={20} />} title="Email Us" desc="24h response time" />
        <SupportCard icon={<Headphones size={20} />} title="Call Support" desc="Mon-Fri, 9-6" />
      </div>
      <div className="glass-card rounded-3xl p-5">
        <h4 className="font-bold text-sm mb-4">Recent Tickets</h4>
        <div className="text-center py-8">
          <CheckCircle2 size={32} className="mx-auto mb-2 text-zinc-800" />
          <p className="text-zinc-500 text-xs">No active support tickets</p>
        </div>
      </div>
    </div>
  </div>
);

const KnowledgeScreen = ({ onBack }: { onBack: () => void }) => (
  <div className="animate-in slide-in-from-right-4 duration-300">
    <ScreenHeader title="Knowledge Base" onBack={onBack} />
    <div className="space-y-4">
      <KnowledgeItem title="What is YTM?" desc="Yield to Maturity represents the total return anticipated on a bond if held until it matures." />
      <KnowledgeItem title="Understanding Credit Ratings" desc="AAA is the highest safety rating. AA and below carry progressively higher risk." />
      <KnowledgeItem title="Bond Buckets Explained" desc="Goal-based portfolios that group bonds to match specific life milestones like education or retirement." />
    </div>
  </div>
);

// --- Helpers ---

const ProfileMenuItem = ({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="w-full p-4 glass-card rounded-2xl flex items-center justify-between group hover:border-indigo-500/20 hover:bg-white/[0.05] transition-all active:scale-[0.98]"
  >
    <div className="flex items-center space-x-4">
      <div className="text-zinc-500 group-hover:text-indigo-400 transition-colors">{icon}</div>
      <span className="font-bold text-zinc-300 group-hover:text-white transition-colors">{label}</span>
    </div>
    <ChevronRight size={18} className="text-zinc-700 group-hover:text-indigo-400 transition-all" />
  </button>
);

const ToggleItem = ({ icon, label, defaultChecked = false }: { icon: React.ReactNode; label: string; defaultChecked?: boolean }) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="text-zinc-500">{icon}</div>
        <span className="text-sm font-medium text-zinc-200">{label}</span>
      </div>
      <button 
        onClick={() => setChecked(!checked)}
        className={`w-10 h-5 rounded-full transition-all relative ${checked ? 'bg-indigo-500' : 'bg-zinc-800'}`}
      >
        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${checked ? 'left-6' : 'left-1'}`}></div>
      </button>
    </div>
  );
};

const SupportCard = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <button className="glass-card p-4 rounded-3xl text-left border border-white/5 hover:border-indigo-500/20 transition-all">
    <div className="text-indigo-400 mb-2">{icon}</div>
    <h5 className="font-bold text-sm text-white">{title}</h5>
    <p className="text-[10px] text-zinc-500">{desc}</p>
  </button>
);

const KnowledgeItem = ({ title, desc }: { title: string; desc: string }) => (
  <div className="glass-card p-5 rounded-3xl group cursor-pointer hover:border-indigo-500/10 transition-all">
    <div className="flex justify-between items-start mb-2">
      <h5 className="font-bold text-sm group-hover:text-indigo-400 transition-colors">{title}</h5>
      <ExternalLink size={14} className="text-zinc-600" />
    </div>
    <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
  </div>
);

const PlusIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

export default ProfileView;
