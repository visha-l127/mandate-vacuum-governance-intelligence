
import React, { useState } from 'react';
import { simulateCounterfactualOutcome } from '../services/geminiService';
import { ResponsibilityJourney, CounterfactualSimulation, Language } from '../types';
import { COMPLAINT_JOURNEYS } from '../constants';
import HowToReadPanel from './HowToReadPanel';

interface Props {
  language: Language;
}

const CounterfactualSimulator: React.FC<Props> = ({ language }) => {
  const [selected, setSelected] = useState<ResponsibilityJourney | null>(null);
  const [sim, setSim] = useState<CounterfactualSimulation | null>(null);
  const [loading, setLoading] = useState(false);

  const t = {
    inputs: language === 'ta' ? 'உருவகப்படுத்துதல் உள்ளீடுகள்' : 'Simulation Inputs',
    init: language === 'ta' ? 'மாற்று ஆணை உருவகப்படுத்துதலைத் தொடங்கவும்' : 'Initiate Counterfactual Scenario',
    initSub: language === 'ta' ? 'ஒருங்கிணைந்த ஆணை நெறிமுறைகளின் கீழ் முடிவுகளை உருவகப்படுத்தவும்.' : 'Simulate outcomes under unified mandate protocols.',
    actual: language === 'ta' ? 'உண்மையான முடிவு' : 'Actual Outcome',
    simulated: language === 'ta' ? 'உருவகப்படுத்தப்பட்ட உகப்பாக்கம்' : 'Simulated Optimization',
    baseline: language === 'ta' ? 'வரலாற்று அடிப்படை' : 'Historical Baseline',
    projected: language === 'ta' ? 'எதிர்பார்க்கப்படும் ஒருங்கிணைந்த காலம்' : 'Projected Unified Duration',
    gain: language === 'ta' ? 'செயல்திறன் அதிகரிப்பு' : 'Efficiency Gain',
    pattern: language === 'ta' ? 'கவனிக்கப்பட்ட மாதிரி' : 'Observed Pattern',
    interpretation: language === 'ta' ? 'கட்டமைப்பு விளக்கம்' : 'Structural Interpretation',
    issue: language === 'ta' ? 'ஆணை / பொறுப்புக்கூறல் சிக்கல்' : 'Mandate / Accountability Issue',
    evidence: language === 'ta' ? 'உருவகப்படுத்துதல் ஆதார அடிப்படை' : 'Simulation Evidence Basis',
    rec: language === 'ta' ? 'ஆட்சிமுறை பரிந்துரை' : 'Governance Recommendation',
    confidence: language === 'ta' ? 'நம்பிக்கை' : 'Confidence',
    recorded: language === 'ta' ? 'பதிவு செய்யப்பட்டது' : 'Recorded',
    handoffs: language === 'ta' ? 'ஒப்படைப்புகள்' : 'Handoffs'
  };

  const runSimulation = async (journey: ResponsibilityJourney) => {
    setSelected(journey);
    setLoading(true);
    setSim(null);
    try {
      const res = await simulateCounterfactualOutcome(journey, language);
      setSim(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto animate-in fade-in duration-700 pb-20">
      <HowToReadPanel language={language} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-[10px] font-black text-[#6A6A6A] uppercase tracking-[0.4em] px-4">{t.inputs}</h3>
          {COMPLAINT_JOURNEYS.map((j) => (
            <button 
              key={j.ticketId}
              onClick={() => runSimulation(j)}
              className={`w-full text-left p-8 rounded-[2.5rem] border transition-all ${selected?.ticketId === j.ticketId ? 'bg-[#1E1E1E] border-slate-800 text-white shadow-xl' : 'bg-white border-slate-100 hover:border-slate-300'}`}
            >
              <h4 className={`font-black text-sm uppercase tracking-tight ${selected?.ticketId === j.ticketId ? 'text-[#9C7A3C]' : 'text-[#5A4628]'}`}>{j.category}</h4>
              <div className={`text-[8px] font-bold uppercase tracking-widest ${selected?.ticketId === j.ticketId ? 'text-white/40' : 'text-[#6A6A6A]'}`}>{t.recorded}: {j.metrics.handoffCount} {t.handoffs}</div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-8">
          {!selected ? (
            <div className="bg-white border-2 border-dashed border-slate-100 h-[600px] rounded-[4rem] flex flex-col items-center justify-center text-center p-20 opacity-60">
               <i className="fas fa-code-branch text-5xl text-slate-200 mb-8"></i>
               <h4 className="text-xl font-black text-[#6A6A6A] uppercase tracking-tight italic">{t.init}</h4>
               <p className="text-[10px] font-bold text-[#6A6A6A] mt-4 uppercase tracking-[0.3em]">{t.initSub}</p>
            </div>
          ) : (
            <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-700">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 rounded-[3.5rem] p-12 shadow-sm">
                     <div className="text-[9px] font-black text-[#6A6A6A] uppercase tracking-[0.4em] mb-8">{t.actual}</div>
                     <div className="text-5xl font-black text-[#1E1E1E]">{selected.metrics.totalDurationHours}h</div>
                     <div className="text-[8px] font-black text-[#6A6A6A] uppercase tracking-widest mt-2">{t.baseline}</div>
                  </div>

                  <div className="bg-[#1E1E1E] text-white rounded-[3.5rem] p-12 shadow-2xl ring-4 ring-slate-800">
                     <div className="text-[9px] font-black text-[#9C7A3C] uppercase tracking-[0.4em] mb-8">{t.simulated}</div>
                     {loading ? ( <div className="animate-pulse h-12 w-full bg-white/5 rounded-xl"></div> ) : sim ? (
                       <>
                          <div className="text-5xl font-black text-[#9C7A3C]">{sim.simulatedOutcome.totalHours}h</div>
                          <div className="text-[8px] font-black text-[#6A6A6A] uppercase tracking-widest mt-2">{t.projected}</div>
                       </>
                     ) : null}
                  </div>
               </div>

               {sim && (
                 <div className="bg-white border border-slate-100 rounded-[4rem] p-16 shadow-2xl relative overflow-hidden group">
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-[#F4F3EE] pb-12 mb-12">
                       <div className="col-span-1">
                          <div className="text-[10px] font-black text-[#9C7A3C] uppercase tracking-[0.5em] mb-2">{t.gain}</div>
                          <div className="text-7xl font-black text-[#1E1E1E] tracking-tighter">{sim.improvement.timeReductionPercentage}%</div>
                       </div>
                       <div className="col-span-2">
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${sim.failureClassification.includes('Structural') ? 'bg-rose-50 text-[#7B2D2D] border-[#7B2D2D]/10' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                               {sim.failureClassification}
                            </div>
                          </div>
                          <p className="text-xl font-black text-[#5A4628] leading-tight italic">
                            {language === 'ta' 
                              ? <><span className="text-[#9C7A3C] underline">{sim.simulatedOutcome.owningDepartment}</span> முதல் நாளிலிருந்து இந்த வகையைச் சொந்தமாகக் கொண்டிருந்தால், மதிப்பிடப்பட்ட தீர்வு நேரம் {sim.improvement.timeReductionPercentage}% குறையும்.</>
                              : <>“If the <span className="text-[#9C7A3C] underline">{sim.simulatedOutcome.owningDepartment}</span> owned this category from Day 1, estimated resolution time reduces by {sim.improvement.timeReductionPercentage}%.”</>
                            }
                          </p>
                       </div>
                    </div>

                    <div className="space-y-10 relative z-10">
                      <div className="space-y-3">
                        <label className="text-[9px] font-black text-[#6A6A6A] uppercase tracking-widest font-mono">{t.pattern}:</label>
                        <p className="text-base font-bold text-[#1E1E1E] leading-relaxed italic">{sim.observedPattern}</p>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] font-black text-[#6A6A6A] uppercase tracking-widest font-mono">{t.interpretation}:</label>
                        <p className="text-sm font-bold text-[#1E1E1E] leading-relaxed italic opacity-80">{sim.structuralInterpretation}</p>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] font-black text-[#7B2D2D] uppercase tracking-widest font-mono">{t.issue}:</label>
                        <p className="text-sm font-black text-[#7B2D2D] leading-relaxed uppercase tracking-tight">{sim.mandateAccountabilityIssue}</p>
                      </div>

                      {/* Evidence Basis micro-section */}
                      <div className="bg-[#F4F3EE]/30 p-8 rounded-[2.5rem] space-y-4">
                        <div className="text-[9px] font-black text-[#6A6A6A] uppercase tracking-[0.4em]">{t.evidence}:</div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {sim.evidenceBasis.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-[9px] font-bold text-[#6A6A6A] uppercase tracking-tight leading-relaxed">
                              <span className="w-1 h-1 rounded-full bg-[#9C7A3C] mt-1 shrink-0" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[9px] font-black text-[#9C7A3C] uppercase tracking-widest font-mono text-[#9C7A3C]">{t.rec}:</label>
                        <div className="p-8 bg-[#F4F3EE] rounded-[2rem] border border-slate-100">
                           <p className="text-sm font-bold text-[#5A4628] leading-relaxed italic uppercase tracking-widest">{sim.governanceRecommendation}</p>
                        </div>
                      </div>
                      <div className="pt-4 flex justify-between items-center opacity-40">
                         <span className="text-[8px] font-black text-[#6A6A6A] uppercase tracking-widest">
                           {t.confidence}: {sim.confidenceLevel.toFixed(2)}
                         </span>
                      </div>
                    </div>
                 </div>
               )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CounterfactualSimulator;
