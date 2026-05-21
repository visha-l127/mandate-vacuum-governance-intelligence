import React, { useState, useEffect } from 'react';
import { identifyMandateVacuums } from '../services/geminiService';
import { Language } from '../types';

interface Props { language: Language; }

const GovernanceInsights: React.FC<Props> = ({ language }) => {
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    identifyMandateVacuums(language)
      .then((data: any) => setInsights(Array.isArray(data) ? data : []))
      .catch(() => setInsights([]))
      .finally(() => setLoading(false));
  }, [language]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-48">
      <div className="w-10 h-10 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mb-6"></div>
      <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#6A6A6A]">
        {language === 'ta' ? 'நுண்ணறிவுகளை பிரித்தெடுத்தல்...' : 'Extracting Insights...'}
      </p>
    </div>
  );

  return (
    <div className="max-w-[1200px] mx-auto space-y-12 animate-in fade-in duration-1000 pb-20">
      <header className="bg-[#7B2D2D] text-white p-10 rounded-[3rem] shadow-2xl">
        <h3 className="text-3xl font-black tracking-tighter uppercase mb-3">
          {language === 'ta' ? 'ஆட்சிமுறை நுண்ணறிவு' : 'Governance Insights'}
        </h3>
        <p className="text-xs font-bold text-white/60 uppercase tracking-widest italic">
          {language === 'ta' ? 'AI-உருவாக்கப்பட்ட கட்டமைப்பு பகுப்பாய்வு' : 'AI-Synthesized Structural Analysis'}
        </p>
      </header>

      {insights.length > 0 ? (
        <div className="space-y-8">
          {insights.map((insight: any, i: number) => (
            <div key={i} className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm">
              <h4 className="text-lg font-black text-[#5A4628] uppercase mb-4">{insight.category}</h4>
              <p className="text-sm font-bold text-[#6A6A6A] leading-relaxed mb-4 italic">
                "{insight.observedPattern}"
              </p>
              <div className="bg-[#F4F3EE]/30 p-6 rounded-2xl">
                <p className="text-[10px] font-black text-[#6A6A6A] uppercase tracking-widest mb-3">Structural Interpretation</p>
                <p className="text-sm font-bold text-[#1E1E1E]">{insight.structuralInterpretation}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-[#6A6A6A] text-sm">No insights available</div>
      )}
    </div>
  );
};

export default GovernanceInsights;
