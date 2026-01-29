
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  Briefcase, 
  User, 
  Plus, 
  TrendingUp, 
  Info, 
  ShieldCheck, 
  ChevronRight,
  PieChart
} from 'lucide-react';
import DashboardView from './views/DashboardView';
import DiscoverView from './views/DiscoverView';
import BucketsView from './views/BucketsView';
import ProfileView from './views/ProfileView';
import DocsView from './views/DocsView';
import BondDetailView from './views/BondDetailView';

const Navigation = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Home' },
    { path: '/discover', icon: Search, label: 'Discover' },
    { path: '/buckets', icon: Briefcase, label: 'Buckets' },
    { path: '/docs', icon: Info, label: 'Docs' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/5 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center space-y-1 w-full transition-colors ${
              isActive(item.path) ? 'text-indigo-400' : 'text-zinc-500'
            }`}
          >
            <item.icon size={20} strokeWidth={isActive(item.path) ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a]">
        <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
        <h1 className="text-xl font-bold tracking-tight text-white">ArthaBonds</h1>
        <p className="text-zinc-500 text-sm">Secure Your Future</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen pb-24 max-w-lg mx-auto bg-[#0a0a0a] text-zinc-100 relative shadow-2xl overflow-x-hidden">
        {/* Header (Dynamic based on route could go here) */}
        
        <Routes>
          <Route path="/" element={<DashboardView />} />
          <Route path="/discover" element={<DiscoverView />} />
          <Route path="/bond/:id" element={<BondDetailView />} />
          <Route path="/buckets" element={<BucketsView />} />
          <Route path="/docs" element={<DocsView />} />
          <Route path="/profile" element={<ProfileView />} />
        </Routes>

        <Navigation />
      </div>
    </Router>
  );
};

export default App;
