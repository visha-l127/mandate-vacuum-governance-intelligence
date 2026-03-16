
import React, { useState, useEffect } from 'react';
import { identifyMandateVacuums } from '../services/geminiService';
import { MandateVacuum, Language } from '../types';
import HowToReadPanel from './HowToReadPanel';

interface Props {
  language: Language;
}

const GovernanceInsights: React.FC<Props> = ({ language }) => {
  const [insights, setInsights] = useState<MandateVacuum[]>([]);
  const [loading, setLoading] = useState(true);

  const t = {
    title: language === 'ta' ? 'மூலோபாய ஆட்சிமுறை நுண்ணறிவு' : 'Strategic Governance Insights',
    subtitle: language === 'ta' ? 'நிர்வாக முட்டுக்கட்டை மற்றும் ஆணை மோதல்களைக் கண்டறியும் உயர்மட்ட முடிவு-ஆதரவு அடுக்கு.' : 'High-level decision-support layer identifying administrative deadlock and mandate collisions.',
    loading: language === 'ta' ? 'ஆட்சிமுறை சமிக்ஞைகளைப் பிரித்தெடுத்தல்...' : 'Extracting Governance Signals...',
    confidence: language === 'ta' ? 'அனுமான நம்பிக்கை' : 'Inference Confidence',
    pattern: language === 'ta' ? 'கவனிக்கப்பட்ட மாதிரி' : 'Observed Pattern',
    interpretation: language === 'ta' ? 'கட்டமைப்பு விளக்கம்' : 'Structural Interpretation',
    issue: language === 'ta' ? 'ஆணை / பொறுப்புக்கூறல் சிக்கல்' : 'Mandate / Accountability Issue',
    evidence: language === 'ta' ? 'நுண்ணறிவு ஆதார அடிப்படை' : 'Insight Evidence Basis',
    rec: language === 'ta' ? 'ஆட்சிமுறை பரிந்துரை' : 'Governance Recommendation',
    footer: language === 'ta' ? 'பகுப்பாய்வு தோல்வி பண்புக்கூறு • முடிவு ஆதரவு அணி' : 'Analytical Failure Attribution • Decision Support Matrix'
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await identifyMandateVacuums(language);
        setInsights(data);
      } catch (err) {
        console.error("Governance Insight Stream Interrupted.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [language]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-48">
        <div className="w-10 h-10 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#6A6A6A]">{t.loading}</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-1000">
      <HowToReadPanel language={language} />

      <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
        <h3 className="text-3xl font-black text-[#9C7A3C] uppercase tracking-tighter">{t.title}</h3>
        <p className="text-sm font-bold text-[#6A6A6A] uppercase tracking-widest leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      <div className="space-y-10">
        {insights.map((insight, idx) => (
          <div key={idx} className="bg-white border border-slate-100 rounded-[3rem] p-12 shadow-sm space-y-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between border-b border-[#F4F3EE] pb-6">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-[#9C7A3C] uppercase tracking-[0.4em]">{insight.category}</span>
                <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${insight.failureClassification.includes('Structural') ? 'bg-rose-50 text-[#7B2D2D] border-[#7B2D2D]/10' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                   {insight.failureClassification}
                </div>
              </div>
              <span className="text-[9px] font-black uppercase text-[#6A6A6A] tracking-widest">
                {t.confidence}: {insight.confidenceLevel.toFixed(2)}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-10">
              <div className="space-y-3">
                <label className="text-[9px] font-black text-[#6A6A6A] uppercase tracking-widest">{t.pattern}:</label>
                <p className="text-base font-bold text-[#1E1E1E] leading-relaxed italic">
                  {insight.observedPattern}
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-black text-[#6A6A6A] uppercase tracking-widest">{t.interpretation}:</label>
                <p className="text-sm font-bold text-[#1E1E1E] leading-relaxed italic opacity-80">
                  {insight.structuralInterpretation}
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-black text-[#7B2D2D] uppercase tracking-widest">{t.issue}:</label>
                <p className="text-sm font-black text-[#7B2D2D] leading-relaxed uppercase tracking-tight">
                  {insight.mandateAccountabilityIssue}
                </p>
              </div>

              {/* Evidence Basis micro-section */}
              <div className="bg-[#F4F3EE]/30 p-8 rounded-[2.5rem] space-y-4">
                <div className="text-[9px] font-black text-[#6A6A6A] uppercase tracking-[0.4em]">{t.evidence}:</div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {insight.evidenceBasis.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-[9px] font-bold text-[#6A6A6A] uppercase tracking-tight leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-[#9C7A3C] mt-1 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 pt-6 border-t border-[#F4F3EE]">
                <label className="text-[9px] font-black text-[#5A4628] uppercase tracking-widest text-[#9C7A3C]">{t.rec}:</label>
                <p className="text-sm font-bold text-[#5A4628] leading-relaxed uppercase tracking-widest italic opacity-80">
                  {insight.governanceRecommendation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-12 text-center opacity-40">
         <p className="text-[9px] font-black text-[#6A6A6A] uppercase tracking-[0.6em]">
            {t.footer}
         </p>
      </div>
    </div>
  );
};

export default GovernanceInsights;
