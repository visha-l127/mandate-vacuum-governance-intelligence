
import React, { useState, useEffect } from 'react';
import { identifyMandateVacuums } from '../services/geminiService';
import { MandateVacuum, Language } from '../types';
import HowToReadPanel from './HowToReadPanel';

interface Props {
  language: Language;
}

const MandateVacuumIdentifier: React.FC<Props> = ({ language }) => {
  const [vacuums, setVacuums] = useState<MandateVacuum[]>([]);
  const [loading, setLoading] = useState(true);

  const t = {
    domain: language === 'ta' ? 'ஆய்வுத் துறை' : 'Analysis Domain',
    confidence: language === 'ta' ? 'அனுமான நம்பிக்கை' : 'Inference Confidence',
    pattern: language === 'ta' ? 'கவனிக்கப்பட்ட மாதிரி' : 'Observed Pattern',
    interpretation: language === 'ta' ? 'கட்டமைப்பு விளக்கம்' : 'Structural Interpretation',
    issue: language === 'ta' ? 'ஆணை / பொறுப்புக்கூறல் சிக்கல்' : 'Mandate / Accountability Issue',
    evidence: language === 'ta' ? 'ஆதார அடிப்படை' : 'Evidence Basis',
    rec: language === 'ta' ? 'ஆட்சிமுறை பரிந்துரை' : 'Governance Recommendation',
    registryTitle: language === 'ta' ? 'ஆணை வெற்றிடப் பதிவேடு' : 'Mandate Vacuum Registry',
    registrySub: language === 'ta' ? 'தெளிவான நிர்வாக உரிமை இல்லாத புகார் வகைகளை கண்டறிதல்.' : 'Structural identification of complaint categories with zero consistent administrative ownership.',
    loading: language === 'ta' ? 'வெற்றிடங்களைக் கண்டறிதல்...' : 'Identifying Vacuums...'
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await identifyMandateVacuums(language);
        setVacuums(data);
      } catch (err) {
        console.error("Governance Signal Interrupted.");
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
    <div className="space-y-12 max-w-[1200px] mx-auto animate-in fade-in duration-1000">
      <HowToReadPanel language={language} />

      <header className="bg-[#1E1E1E] text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden border-b-4 border-slate-800">
        <div className="relative z-10 max-w-3xl">
          <h3 className="text-3xl font-black tracking-tighter uppercase mb-3 leading-none text-[#9C7A3C]">{t.registryTitle}</h3>
          <p className="text-xs font-bold text-[#6A6A6A] leading-relaxed uppercase tracking-widest italic opacity-80">
            {t.registrySub}
          </p>
        </div>
      </header>

      <div className="space-y-10">
        {vacuums.map((v, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-[3rem] p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-12 transition-all hover:shadow-md">
            <div className="lg:col-span-4 space-y-4">
              <div className="text-[9px] font-black text-[#6A6A6A] uppercase tracking-[0.4em]">{t.domain}</div>
              
              <div className="flex flex-wrap items-center gap-3">
                <h4 className="text-2xl font-black text-[#5A4628] uppercase tracking-tighter leading-none">{v.category}</h4>
                <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${v.failureClassification.includes('Structural') ? 'bg-rose-50 text-[#7B2D2D] border-[#7B2D2D]/10' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                   {v.failureClassification}
                </div>
              </div>

              <div className="pt-6 flex flex-col gap-2">
                <span className="text-[9px] font-black text-[#6A6A6A] uppercase tracking-widest opacity-40">{t.confidence}</span>
                <span className="text-lg font-black text-[#5A4628] uppercase tracking-tighter">
                  {v.confidenceLevel.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-8 border-l border-[#F4F3EE] lg:pl-16">
               <div className="space-y-2">
                  <div className="text-[10px] font-black text-[#6A6A6A] uppercase tracking-[0.3em] font-mono">{t.pattern}:</div>
                  <p className="text-base font-bold text-[#1E1E1E] leading-relaxed italic">“{v.observedPattern}”</p>
               </div>

               <div className="space-y-2">
                  <div className="text-[10px] font-black text-[#6A6A6A] uppercase tracking-[0.3em] font-mono">{t.interpretation}:</div>
                  <p className="text-sm font-bold text-[#1E1E1E] leading-relaxed italic opacity-90">
                    {v.structuralInterpretation}
                  </p>
               </div>

               <div className="space-y-2">
                  <div className="text-[10px] font-black text-[#7B2D2D] uppercase tracking-[0.3em] font-mono">{t.issue}:</div>
                  <p className="text-sm font-black text-[#7B2D2D] leading-relaxed uppercase tracking-tight">
                    {v.mandateAccountabilityIssue}
                  </p>
               </div>

               {/* Evidence Basis micro-section */}
               <div className="bg-[#F4F3EE]/30 p-6 rounded-3xl space-y-3">
                  <div className="text-[9px] font-black text-[#6A6A6A] uppercase tracking-[0.4em]">{t.evidence}:</div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {v.evidenceBasis.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[9px] font-bold text-[#6A6A6A] uppercase tracking-tight">
                        <span className="w-1 h-1 rounded-full bg-[#9C7A3C] mt-1 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
               </div>

               <div className="space-y-2 pt-4 border-t border-[#F4F3EE]">
                  <div className="text-[10px] font-black text-[#5A4628] uppercase tracking-[0.3em] font-mono text-[#9C7A3C]">{t.rec}:</div>
                  <div className="bg-[#F4F3EE]/50 border border-slate-100 p-6 rounded-[2rem]">
                     <p className="text-sm font-bold text-[#5A4628] leading-relaxed uppercase tracking-tight italic">
                        {v.governanceRecommendation}
                     </p>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MandateVacuumIdentifier;
