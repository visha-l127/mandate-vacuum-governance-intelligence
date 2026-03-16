
import React, { useState, useEffect } from 'react';
import { getAdvancedAnalytics } from '../services/geminiService';
import { AdvancedAnalytics } from '../types';

const AnalyticsDashboard: React.FC = () => {
  const [data, setData] = useState<AdvancedAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchAnalytics = async (isInitial: boolean = false) => {
    if (isInitial) setLoading(true); else setIsRefreshing(true);
    try {
      const result = await getAdvancedAnalytics();
      setData(result);
    } catch (e) {
      console.error("Analytics Signal Lost:", e);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics(true);
    const interval = setInterval(() => fetchAnalytics(false), 300000); 
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40 animate-pulse">
      <div className="w-12 h-12 border-4 border-[#1B5E20] border-t-transparent rounded-full animate-spin mb-6"></div>
      <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Synthesizing System Health...</p>
    </div>
  );

  if (!data) return null;

  return (
    <div className="space-y-12 animate-in fade-in duration-700 relative max-w-7xl mx-auto">
      <div className="flex justify-between items-center px-4">
        <div className="flex items-center gap-3">
           <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1B5E20]">Live Governance Uplink Active</span>
        </div>
        {isRefreshing && <span className="text-[8px] font-black uppercase tracking-widest animate-pulse text-emerald-600">Syncing...</span>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { l: 'System Efficiency', v: `${data.efficiencyScore}%`, s: 'UCCC Response Rating', i: 'fa-gauge-high' },
          { l: 'Resource Diversion', v: `${data.diversionRate}%`, s: 'Circular Economy Metric', i: 'fa-recycle' },
          { l: 'Revenue Accuracy', v: `₹${data.totalFinesCollected.toLocaleString()}`, s: 'Automated Compliance', i: 'fa-coins' },
          { l: 'Carbon Avoidance', v: data.carbonReduction, s: 'Logistics Optimization', i: 'fa-leaf' }
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-sm hover:shadow-md transition-shadow group">
             <i className={`fas ${stat.i} text-[#E8F5E9] text-3xl mb-6 group-hover:text-[#1B5E20] transition-colors`}></i>
             <h4 className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-2">{stat.l}</h4>
             <div className="text-3xl font-black text-[#1B5E20] mb-1">{stat.v}</div>
             <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">{stat.s}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-[4rem] p-12 shadow-sm">
         <div className="flex justify-between items-end mb-12">
            <div>
               <h3 className="text-xl font-black text-[#1B5E20] uppercase tracking-tight">Ward-Level Performance Matrix</h3>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Comparative accountability tracking across municipal clusters</p>
            </div>
         </div>

         <div className="space-y-8">
            {data.wardPerformance.map((w, i) => (
              <div key={i} className="space-y-3">
                 <div className="flex justify-between items-center px-2">
                    <span className="text-[10px] font-black text-[#333333] uppercase">{w.ward}</span>
                    <span className="text-[10px] font-black text-slate-400">{w.efficiency}%</span>
                 </div>
                 <div className="h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                    <div 
                      className="h-full bg-[#1B5E20] transition-all duration-1000 ease-out"
                      style={{ width: `${w.efficiency}%` }}
                    ></div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
