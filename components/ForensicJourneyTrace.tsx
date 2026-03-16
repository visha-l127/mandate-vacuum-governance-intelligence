
import React from 'react';
import { MOCK_FRICTION_DATA } from '../constants';

const AdministrativeOverview: React.FC = () => {
  const m = MOCK_FRICTION_DATA;

  return (
    <div className="space-y-16 animate-in fade-in duration-1000 max-w-[1440px] mx-auto pb-20">
      {/* Strategic Performance Ribbons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { l: 'Administrative Inertia Coefficient', v: `${m.overallBureaucraticInertia}x`, s: 'Wait Time vs Process Time', i: 'fa-hourglass-half', c: 'text-indigo-600' },
          { l: 'Mandate Handover Friction', v: `${m.bureaucraticWasteScore}%`, s: 'Ownership Rejection Frequency', i: 'fa-arrows-left-right', c: 'text-rose-600' },
          { l: 'Rule-Set Adherence', v: '68%', s: 'Standard procedure compliance', i: 'fa-shield-halved', c: 'text-emerald-600' }
        ].map((k, i) => (
          <div key={i} className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 transition-all hover:shadow-xl">
             <div className="flex justify-between items-start mb-8">
                <i className={`fas ${k.i} ${k.c} text-2xl`}></i>
                <div className="h-1 w-10 bg-slate-100 rounded-full"></div>
             </div>
             <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2">{k.l}</h4>
             <div className="text-4xl font-black text-slate-900 mb-1 tracking-tighter">{k.v}</div>
             <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{k.s}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
         {/* Mandate Overlap Analysis */}
         <div className="bg-white border border-slate-100 rounded-[4rem] p-16 shadow-sm relative overflow-hidden">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-12 flex items-center gap-4">
               <i className="fas fa-handshake-slash text-rose-500"></i> Mandate Overlap Mapping
            </h3>
            <div className="space-y-10">
               {m.mandateCollisionMatrix.map((h, i) => (
                 <div key={i} className="flex items-center justify-between group">
                    <div className="flex items-center gap-8">
                       <div className="w-12 h-12 bg-slate-50 rounded-[1.2rem] flex items-center justify-center text-slate-400 font-black text-xs transition-all group-hover:bg-slate-900 group-hover:text-white group-hover:rotate-12">{i+1}</div>
                       <div className="text-sm font-black text-slate-800 uppercase tracking-tight italic">“{h.deptA} <i className="fas fa-arrows-left-right text-slate-200 mx-3"></i> {h.deptB}”</div>
                    </div>
                    <div className="text-right">
                       <div className="text-xl font-black text-rose-600 tracking-tighter">{h.collisionCount}</div>
                       <div className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em]">Collisions</div>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Inertia Breakdown */}
         <div className="bg-white border border-slate-100 rounded-[4rem] p-16 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-12 flex items-center gap-4">
               <i className="fas fa-chart-line text-indigo-500"></i> Task Friction by Category
            </h3>
            <div className="space-y-12">
               {m.categoryInertia.map((cat, i) => (
                 <div key={i} className="space-y-4">
                    <div className="flex justify-between items-center px-4">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{cat.category}</span>
                       <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{cat.tar}x inertia</span>
                    </div>
                    <div className="h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-0.5">
                       <div 
                        className="h-full bg-indigo-600 rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: `${(cat.tar / 4) * 100}%` }}
                       ></div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdministrativeOverview;
