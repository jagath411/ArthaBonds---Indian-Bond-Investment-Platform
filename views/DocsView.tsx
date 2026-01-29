
import React from 'react';
import { Server, Database, Cloud, Shield, Cpu, Smartphone } from 'lucide-react';

const DocsView: React.FC = () => {
  return (
    <div className="p-6 pt-12 animate-in fade-in duration-500">
      <h1 className="text-2xl font-bold mb-2">Technical Specs</h1>
      <p className="text-zinc-500 text-sm mb-8">System Architecture & Deployment Blueprint</p>

      <div className="space-y-8">
        <section>
          <div className="flex items-center space-x-3 mb-4">
            <Smartphone className="text-indigo-400" size={20} />
            <h2 className="font-bold">App Stack</h2>
          </div>
          <div className="glass-card rounded-2xl p-4 space-y-2 border border-white/5">
            <DocItem label="Frontend" value="React Native / Flutter" />
            <DocItem label="State" value="Redux Toolkit / Riverpod" />
            <DocItem label="Charts" value="D3.js / Victory Native" />
            <DocItem label="Auth" value="Firebase / Custom OTP" />
          </div>
        </section>

        <section>
          <div className="flex items-center space-x-3 mb-4">
            <Server className="text-emerald-400" size={20} />
            <h2 className="font-bold">Backend Architecture</h2>
          </div>
          <div className="glass-card rounded-2xl p-4 space-y-2 border border-white/5">
            <DocItem label="Framework" value="Node.js (NestJS)" />
            <DocItem label="DB" value="PostgreSQL (RDS)" />
            <DocItem label="Cache" value="Redis (ElastiCache)" />
            <DocItem label="Queue" value="BullMQ (Worker nodes)" />
          </div>
        </section>

        <section>
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="text-purple-400" size={20} />
            <h2 className="font-bold">Security & Compliance</h2>
          </div>
          <div className="glass-card rounded-2xl p-4 space-y-3 border border-white/5">
            <p className="text-xs text-zinc-400 leading-relaxed">
              - <span className="text-white font-bold">mTLS</span> for all partner API integrations.<br/>
              - <span className="text-white font-bold">AES-256</span> encryption for sensitive PII data.<br/>
              - <span className="text-white font-bold">RBAC</span> implementation for Read vs. Transactional scopes.<br/>
              - <span className="text-white font-bold">SEBI</span> compliant KYC flow placeholders.
            </p>
          </div>
        </section>

        <section>
          <div className="flex items-center space-x-3 mb-4">
            <Cloud className="text-sky-400" size={20} />
            <h2 className="font-bold">Deployment Guide</h2>
          </div>
          <div className="space-y-4">
            <StepItem step="1" title="Infrastructure as Code" desc="Deploy RDS and ECS using Terraform on AWS." />
            <StepItem step="2" title="CI/CD Pipeline" desc="GitHub Actions for auto-deploy to Staging/Prod." />
            <StepItem step="3" title="Monitoring" desc="Datadog for logs and Sentry for error tracking." />
          </div>
        </section>
      </div>
      
      <div className="h-20"></div>
    </div>
  );
};

const DocItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-sm">
    <span className="text-zinc-500">{label}</span>
    <span className="font-bold text-zinc-200">{value}</span>
  </div>
);

const StepItem = ({ step, title, desc }: { step: string; title: string; desc: string }) => (
  <div className="flex space-x-4">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs">
      {step}
    </div>
    <div>
      <h4 className="text-sm font-bold text-zinc-200">{title}</h4>
      <p className="text-[11px] text-zinc-500">{desc}</p>
    </div>
  </div>
);

export default DocsView;
