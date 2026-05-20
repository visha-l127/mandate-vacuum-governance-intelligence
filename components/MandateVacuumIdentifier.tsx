import React, { useState, useEffect } from 'react';
import { identifyMandateVacuums } from '../services/geminiService';
import { Language } from '../types';

interface Props {
  language: Language;
}

const MandateVacuumIdentifier: React.FC<Props> = ({ language }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    identifyMandateVacuums().then(setData).finally(() => setLoading(false));
  }, []);

  const t = {
    title: language === 'ta' ? 'ஆணை வெற்றிட அடையாளங்காரி' : 'Mandate Vacuum Identifier',
    subtitle: language === 'ta' ? 'துறை உரிமை நிலையற்ற தன்மை பகுப்பாய்வு' : 'Departmental Ownership Instability Analysis',
    entropy: language === 'ta' ? 'என்ட்ரோபி மதிப்பெண்' : 'Entropy Score',
    handoffs: language === 'ta' ? 'கைமாற்றுகள்' : 'Handoffs',
    recommendation: language === 'ta' ? 'பரிந்துரை' : 'Recommendation',
    owner: language === 'ta' ? 'முதன்மை துறை' : 'Primary Dept',
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40">
      <div className="w-12 h-12 border-4 border-[#9C7A3C] border-t-transparent rounded-full animate-spin mb-6"></div>
      <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#6A6A6A]">
        {language === 'ta' ? 'ஆணை வெற்றிடங்களை பகுப்பாய்கிறது...' : 'Scanning for mandate vacuums...'}
      </p>
    </div>
  );

  if (!data) return null;

  return (
    <div className="max-w-[1400px] mx-auto space-y-12 animate-in fade-in duration-700">

      <div className="space-y-2 px-4">
        <h2 className="text-4xl font-black tracking-tighter text-[#1E1E1E] uppercase">{t.title}</h2>
        <p className="text-[10px] font-black text-[#6A6A6A] uppercase tracking-[0.4em]">{t.subtitle}</p>
      </div>

      {data.insight && (
        <div className="bg-[#1E1E1E] text-[#9C7A3C] p-8 rounded-[2.5rem] border border-[#9C7A3C]/20">
          <p className="text-sm font-bold italic leading-relaxed">{data.insight}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.vacuums.map((v: any, i: number) => {
          const riskColor =
            v.entropyScore >= 0.70 ? '#7B2D2D' :
            v.entropyScore >= 0.40 ? '#9C7A3C' : '#1B5E20';

          const riskBg =
            v.entropyScore >= 0.70 ? 'bg-rose-50 border-rose-100' :
            v.entropyScore >= 0.40 ? 'bg-amber-50 border-amber-100' :
            'bg-emerald-50 border-emerald-100';

          return (
            <div key={i} className={`bg-white border rounded-[3rem] p-10 shadow-sm space-y-6 ${riskBg}`}>
              <div className="flex justify-between items-start">
                <h3 className="font-black text-lg text-[#1E1E1E] uppercase tracking-tight leading-tight max-w-[70%]">
                  {v.category}
                </h3>
                <div className="text-right">
                  <div className="text-3xl font-black" style={{ color: riskColor }}>
                    {(v.entropyScore * 100).toFixed(0)}
                  </div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-[#6A6A6A]">
                    {t.entropy}
                  </div>
                </div>
              </div>

              <div className="h-2 bg-white/60 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${v.entropyScore * 100}%`,
                    backgroundColor: riskColor
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[8px] font-black text-[#6A6A6A] uppercase tracking-widest mb-1">{t.owner}</div>
                  <div className="text-xs font-black text-[#1E1E1E] uppercase">{v.primaryDept}</div>
                </div>
                <div>
                  <div className="text-[8px] font-black text-[#6A6A6A] uppercase tracking-widest mb-1">{t.handoffs}</div>
                  <div className="text-xs font-black text-[#1E1E1E]">{v.handoffCount}</div>
                </div>
              </div>

              <div className="bg-white/70 rounded-2xl p-6">
                <div className="text-[8px] font-black text-[#6A6A6A] uppercase tracking-widest mb-2">{t.recommendation}</div>
                <p className="text-[10px] font-bold text-[#1E1E1E] leading-relaxed">{v.recommendation}</p>
              </div>

              <div className="flex justify-between items-center">
                <span
                  className="text-[8px] font-black uppercase tracking-widest px-4 py-2 rounded-full"
                  style={{ color: riskColor, backgroundColor: `${riskColor}15` }}
                >
                  {v.ownershipClarity}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MandateVacuumIdentifier;
