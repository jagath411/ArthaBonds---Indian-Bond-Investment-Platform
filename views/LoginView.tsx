
import React, { useEffect } from 'react';
import { ShieldCheck, TrendingUp, Sparkles, Lock } from 'lucide-react';

interface LoginViewProps {
  onLogin: (userData: any) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  useEffect(() => {
    /* global google */
    const initializeGoogle = () => {
      if (typeof window !== 'undefined' && (window as any).google) {
        (window as any).google.accounts.id.initialize({
          client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com", // This would be the real ID in production
          callback: handleCredentialResponse,
        });
        (window as any).google.accounts.id.renderButton(
          document.getElementById("googleSignInButton"),
          { theme: "filled_black", size: "large", width: "100%", shape: "pill" }
        );
      }
    };

    const handleCredentialResponse = (response: any) => {
      // Decode JWT safely
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const decoded = JSON.parse(jsonPayload);
      onLogin({
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        given_name: decoded.given_name
      });
    };

    const timer = setTimeout(initializeGoogle, 100);
    return () => clearTimeout(timer);
  }, [onLogin]);

  // Fallback for manual simulation in this environment
  const simulateLogin = () => {
    onLogin({
      name: "Artha Investor",
      email: "investor@arthabonds.com",
      picture: null,
      given_name: "Artha"
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-8 pt-20 animate-in fade-in duration-1000">
      <div className="w-full text-center">
        <div className="w-20 h-20 bg-indigo-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-indigo-500/20 rotate-3 group hover:rotate-0 transition-transform">
          <TrendingUp size={40} className="text-white" />
        </div>
        <h1 className="text-4xl font-black tracking-tighter mb-2 text-white">ArthaBonds</h1>
        <p className="text-zinc-500 font-medium">Wealth Security in Every Bond</p>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <div className="glass-card rounded-3xl p-6 border border-white/10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <ShieldCheck size={20} className="text-indigo-400" />
            Secure Entry
          </h2>
          
          <div id="googleSignInButton" className="w-full overflow-hidden rounded-full min-h-[44px]"></div>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0a0a0a] px-2 text-zinc-600 font-bold tracking-widest">or</span></div>
          </div>

          <button 
            onClick={simulateLogin}
            className="w-full py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-zinc-300 text-sm font-bold transition-all flex items-center justify-center gap-2"
          >
            <Lock size={16} />
            Continue as Guest
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <BenefitItem 
            icon={<Sparkles size={16} className="text-indigo-400" />} 
            title="AI Insights" 
            desc="Gemini-powered bond analysis for every unit."
          />
          <BenefitItem 
            icon={<ShieldCheck size={16} className="text-emerald-400" />} 
            title="Institutional Grade" 
            desc="Sovereign & AAA rated corporate debt access."
          />
        </div>
      </div>

      <footer className="text-center">
        <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em]">
          By continuing, you agree to our Terms of Service
        </p>
      </footer>
    </div>
  );
};

const BenefitItem = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="flex items-start gap-3 p-1">
    <div className="mt-0.5">{icon}</div>
    <div>
      <h4 className="text-xs font-bold text-zinc-200">{title}</h4>
      <p className="text-[11px] text-zinc-500 leading-tight">{desc}</p>
    </div>
  </div>
);

export default LoginView;
