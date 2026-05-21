import React, { useState, useEffect } from 'react';
import { calculateAccountabilityDecay } from '../services/geminiService';
import { Language } from '../types';

interface Props { language: Language; }

const AccountabilityAuditTerminal: React.FC<Props> = ({ language }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    calculateAccountabilityDecay()
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-48">
      <div className="w-10 h-10 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mb-6"></div>
      <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#6A6A6A]">
        {language === 'ta' ? 'சிதைவு பகுப்பாய்வு...' : 'Analyzing Decay...'}
      </p>
    </div>
  );

  return (
    <div className="max-w-[1200px] mx-auto space-y-12 animate-in fade-in duration-1000 pb-20">
      <header className="bg-[#1E1E1E] text-white p-10 rounded-[3rem] shadow-2xl">
        <h3 className="text-3xl font-black tracking-tighter uppercase mb-3 text-[#9C7A3C]">
          {language === 'ta' ? 'பொறுப்புக்கூறல் சிதைவு பகுப்பாய்வு' : 'Accountability Decay Analysis'}
        </h3>
        <p className="text-xs font-bold text-[#6A6A6A] uppercase tracking-widest italic opacity-80">
          {language === 'ta' ? 'ஆணை பொறுப்பு அரை-ஆயுள் மெட்রிக்' : 'Mandate Responsibility Half-Life Metrics'}
        </p>
      </header>

      {data && data.decayRecords && (
        <div className="space-y-8">
          {data.decayRecords.map((record: any, i: number) => (
            <div key={i} className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-lg font-black text-[#5A4628] uppercase">{record.complaintId}</h4>
                  <p className="text-[9px] font-bold text-[#6A6A6A] uppercase tracking-widest mt-2">{record.category}</p>
                </div>
                <div className={`text-right px-4 py-2 rounded-full text-[9px] font-black uppercase ${
                  record.risk === 'CRITICAL' ? 'bg-rose-50 text-[#7B2D2D]' :
                  record.risk === 'MODERATE' ? 'bg-amber-50 text-[#9C7A3C]' :
                  'bg-emerald-50 text-[#1B5E20]'
                }`}>
                  {record.risk}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8">
                <div>
                  <div className="text-[8px] font-black text-[#6A6A6A] uppercase tracking-widest mb-2">Half-Life (Days)</div>
                  <div className="text-3xl font-black text-[#1E1E1E]">{record.halfLifeDays}</div>
                </div>
                <div>
                  <div className="text-[8px] font-black text-[#6A6A6A] uppercase tracking-widest mb-2">Final Accountability</div>
                  <div className="text-3xl font-black text-[#1E1E1E]">{record.finalAccountabilityPct}%</div>
                </div>
                <div>
                  <div className="text-[8px] font-black text-[#6A6A6A] uppercase tracking-widest mb-2">Transfers</div>
                  <div className="text-3xl font-black text-[#1E1E1E]">{record.transfers}</div>
                </div>
              </div>

              <div className="mt-6 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#9C7A3C] transition-all duration-1000"
                  style={{ width: `${record.finalAccountabilityPct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountabilityAuditTerminal;
