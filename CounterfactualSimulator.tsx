
import React, { useState } from 'react';
import { calculateAccountabilityDecay } from '../services/geminiService';
import { ResponsibilityJourney, AccountabilityDecay, Language } from '../types';
import { COMPLAINT_JOURNEYS } from '../constants';
import HowToReadPanel from './HowToReadPanel';

interface Props {
  language: Language;
}

const AccountabilityAuditTerminal: React.FC<Props> = ({ language }) => {
  const [selected, setSelected] = useState<ResponsibilityJourney | null>(null);
  const [decayData, setDecayData] = useState<AccountabilityDecay | null>(null);
  const [loading, setLoading] = useState(false);

  const t = {
    archive: language === 'ta' ? 'தணிக்கை தடக் காப்பகம்' : 'Audit Trace Archive',
    init: language === 'ta' ? 'அரை ஆயுள் தணிக்கையைத் தொடங்கவும்' : 'Initiate Half-Life Audit',
    initSub: language === 'ta' ? 'துறை ரீதியான ஒப்படைப்புகளில் பொறுப்புக்கூறல் அரிப்பைத் தேடுங்கள்.' : 'Trace responsibility erosion across departmental handoffs.',
    loading: language === 'ta' ? 'பொறுப்புக்கூறல் சிதைவைக் கணக்கிடுதல்...' : 'Quantifying Responsibility Decay...',
    pattern: language === 'ta' ? 'கவனிக்கப்பட்ட மாதிரி' : 'Observed Pattern',
    interpretation: language === 'ta' ? 'கட்டமைப்பு விளக்கம்' : 'Structural Interpretation',
    issue: language === 'ta' ? 'ஆணை / பொறுப்புக்கூறல் சிக்கல்' : 'Mandate / Accountability Issue',
    evidence: language === 'ta' ? 'தணிக்கை ஆதார அடிப்படை' : 'Audit Evidence Basis',
    rec: language === 'ta' ? 'ஆட்சிமுறை பரிந்துரை' : 'Governance Recommendation',
    confidence: language === 'ta' ? 'அனுமான நம்பிக்கை' : 'Inference Confidence',
    handoffs: language === 'ta' ? 'ஒப்படைப்புகள்' : 'Handoffs',
    days: language === 'ta' ? 'நாட்கள்' : 'days'
  };

  const performAudit = async (j: ResponsibilityJourney) => {
    setSelected(j);
    setLoading(true);
    setDecayData(null);
    try {
      const res = await calculateAccountabilityDecay(j, language);
      setDecayData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto animate-in fade-in duration-1000">
      <HowToReadPanel language={language} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-[10px] font-black text-[#6A6A6A] uppercase tracking-[0.4em] px-4">{t.archive}</h3>
          {COMPLAINT_JOURNEYS.map((j) => (
            <button 
              key={j.ticketId}
              onClick={() => performAudit(j)}
              className={`w-full text-left p-8 rounded-[2.5rem] border transition-all flex flex-col gap-4 shadow-sm ${selected?.ticketId === j.ticketId ? 'bg-[#1E1E1E] border-slate-800 text-white scale-[1.02] shadow-xl' : 'bg-white border-slate-100 hover:border-slate-300'}`}
            >
              <h4 className={`font-black text-sm uppercase tracking-tight ${selected?.ticketId === j.ticketId ? 'text-[#9C7A3C]' : 'text-[#5A4628]'}`}>{j.category}</h4>
              <div className={`text-[8px] font-bold uppercase tracking-widest ${selected?.ticketId === j.ticketId ? 'text-white/40' : 'text-[#6A6A6A]'}`}>{j.metrics.handoffCount} {t.handoffs} • {j.ticketId}</div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-8">
          {!selected ? (
            <div className="bg-white border-2 border-dashed border-slate-100 h-[600px] rounded-[4rem] flex flex-col items-center justify-center text-center p-20 opacity-60">
               <i className="fas fa-hourglass-start text-5xl text-slate-200 mb-8"></i>
               <h4 className="text-xl font-black text-[#6A6A6A] uppercase tracking-tight italic">{t.init}</h4>
               <p className="text-[10px] font-bold text-[#6A6A6A] mt-4 uppercase tracking-[0.3em]">{t.initSub}</p>
            </div>
          ) : (
            <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-700">
               <div className="bg-[#1E1E1E] text-white rounded-[4rem] p-14 shadow-2xl relative overflow-hidden border-l-[16px] border-[#9C7A3C]">
                  <div className="relative z-10">
                     {loading ? (
                       <div className="py-24 flex flex-col items-center justify-center gap-8">
                          <div className="w-12 h-12 border-4 border-[#9C7A3C] border-t-transparent rounded-full animate-spin"></div>
                          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#9C7A3C]">{t.loading}</p>
                       </div>
                     ) : decayData ? (
                       <div className="space-y-12">
                          <div className="bg-white/5 border border-white/5 p-10 rounded-[3rem] text-center shadow-inner relative">
                             <div className={`absolute top-4 right-8 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${decayData.failureClassification.includes('Structural') ? 'bg-[#7B2D2D]/20 text-[#7B2D2D] border-[#7B2D2D]/30' : 'bg-white/10 text-white/40 border-white/20'}`}>
                                {decayData.failureClassification}
                             </div>
                             <p className="text-xl font-black italic tracking-tight leading-relaxed text-[#9C7A3C]">
                               {language === 'ta' 
                                 ? <>துறை ரீதியான <span className="text-white underline">{selected.metrics.handoffCount}</span> ஒப்படைப்புகளுக்குப் பிறகு, பொறுப்புக்கூறல் சுமார் <span className="text-[#7B2D2D]">{decayData.decayPercentage}%</span> சிதைந்தது. இந்த வகையின் அரை ஆயுள் <span className="text-white">{decayData.halfLifeDays} {t.days}</span> ஆகும்.</>
                                 : <>“After <span className="text-white underline">{selected.metrics.handoffCount}</span> departmental handoffs, accountability decayed by approximately <span className="text-[#7B2D2D]">{decayData.decayPercentage}%</span>. Half-life for this category is <span className="text-white">{decayData.halfLifeDays} days</span>.”</>
                               }
                             </p>
                          </div>

                          <div className="space-y-8 bg-black/40 p-10 rounded-[3rem] border border-white/5">
                             <div className="space-y-3">
                                <label className="text-[9px] font-black text-[#6A6A6A] uppercase tracking-widest font-mono">{t.pattern}:</label>
                                <p className="text-sm font-bold text-white/80 leading-relaxed italic opacity-90">{decayData.observedPattern}</p>
                             </div>
                             <div className="space-y-3">
                                <label className="text-[9px] font-black text-[#6A6A6A] uppercase tracking-widest font-mono">{t.interpretation}:</label>
                                <p className="text-sm font-bold text-white/70 leading-relaxed italic opacity-80">{decayData.structuralInterpretation}</p>
                             </div>
                             <div className="space-y-3">
                                <label className="text-[9px] font-black text-[#7B2D2D] uppercase tracking-widest font-mono">{t.issue}:</label>
                                <p className="text-sm font-black text-[#7B2D2D] leading-relaxed uppercase tracking-tight">{decayData.mandateAccountabilityIssue}</p>
                             </div>

                             {/* Evidence Basis micro-section */}
                             <div className="bg-white/5 p-8 rounded-[2.5rem] space-y-4 border border-white/5">
                                <div className="text-[9px] font-black text-[#6A6A6A] uppercase tracking-[0.4em]">{t.evidence}:</div>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {decayData.evidenceBasis.map((point, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-[9px] font-bold text-white/60 uppercase tracking-tight leading-relaxed">
                                      <span className="w-1 h-1 rounded-full bg-[#9C7A3C] mt-1 shrink-0" />
                                      {point}
                                    </li>
                                  ))}
                                </ul>
                             </div>

                             <div className="space-y-3 pt-4 border-t border-white/5">
                                <label className="text-[9px] font-black text-[#9C7A3C] uppercase tracking-widest font-mono text-[#9C7A3C]">{t.rec}:</label>
                                <p className="text-sm font-bold text-[#9C7A3C] leading-relaxed italic uppercase tracking-wider">{decayData.governanceRecommendation}</p>
                             </div>
                             <div className="pt-4 text-[8px] font-black text-[#6A6A6A] uppercase tracking-widest">
                               {t.confidence}: {decayData.confidenceLevel.toFixed(2)}
                             </div>
                          </div>
                       </div>
                     ) : null}
                  </div>
                  <i className="fas fa-wave-square absolute -top-10 -right-10 text-white/5 text-[20rem] pointer-events-none"></i>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountabilityAuditTerminal;
