
import React from 'react';

const LogicExplainer: React.FC = () => {
  return (
    <div className="max-w-[1440px] mx-auto mt-24 mb-32 bg-indigo-50/50 border border-indigo-100 rounded-[5rem] p-20 animate-in fade-in slide-in-from-bottom-12">
       <div className="flex flex-col md:flex-row gap-20">
          <div className="flex-1 space-y-10">
             <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-[0.5em]">
                <i className="fas fa-brain-circuit"></i> Administrative Logic Framework
             </div>
             
             <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                Resolving <span className="text-indigo-600 italic">Mandate Deadlocks</span>
             </h3>
             <p className="text-sm font-bold text-slate-500 leading-relaxed uppercase tracking-widest max-w-lg">
                We analyze administrative failures in task movement. We do not monitor physical labor; we diagnose departmental policy friction.
             </p>
             
             <div className="space-y-14 pt-8">
                {[
                  { t: 'Mandate Reconstruction', d: 'When transfer logs are incomplete, our system identifies the most likely policy ambiguity causing the task to stall between departments.', i: 'fa-puzzle-piece' },
                  { t: 'Inertia Analytics', d: 'We highlight processes where administrative handoffs consume 90% of the timeline. This exposes broken responsibility rules.', i: 'fa-scale-balanced' },
                  { t: 'Resolving Mandate Collisions', d: 'Instead of identifying physical waste, we pinpoint rules that clash—where multiple departments claim the subject is not within their mandate.', i: 'fa-arrows-split-up-and-left' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                     <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center text-indigo-600 shadow-lg border border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-all transform group-hover:rotate-3">
                        <i className={`fas ${item.i} text-xl`}></i>
                     </div>
                     <div>
                        <h5 className="font-black text-slate-900 uppercase text-xs tracking-[0.2em] mb-2">{item.t}</h5>
                        <p className="text-[11px] font-bold text-slate-500 leading-relaxed italic">{item.d}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="flex-1 bg-slate-900 rounded-[4rem] p-16 text-white flex flex-col justify-center relative overflow-hidden shadow-2xl">
             <div className="relative z-10 space-y-10">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 text-indigo-300 text-[10px] font-black uppercase tracking-[0.5em]">
                   <i className="fas fa-lightbulb"></i> Policy Insight Engine
                </div>
                
                <div className="space-y-8">
                   <div className="space-y-3">
                      <div className="text-[9px] font-black text-indigo-400 uppercase tracking-widest opacity-50">Operational Focus</div>
                      <p className="text-xl font-black italic leading-tight">
                         “Monitoring tells you a task exists; SwachhVigil tells you which mandate update will resolve it.”
                      </p>
                   </div>
                   <div className="h-[1px] bg-white/10 w-24 rounded-full"></div>
                   <div className="space-y-3">
                      <div className="text-[9px] font-black text-indigo-400 uppercase tracking-widest opacity-50">Governance Value</div>
                      <p className="text-sm font-bold text-slate-400 leading-relaxed uppercase tracking-tight">
                         We provide city commissioners with the data required to update municipal laws and resolve departmental responsibility gaps permanently.
                      </p>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-10 pt-8 border-t border-white/10">
                   <div>
                      <div className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-2 opacity-50">Objective</div>
                      <div className="text-base font-black uppercase tracking-tight">Mandate Clarity</div>
                   </div>
                   <div>
                      <div className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-2 opacity-50">Target User</div>
                      <div className="text-base font-black uppercase tracking-tight">City Commissioner</div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default LogicExplainer;
