import React, { useState } from 'react';
import { simulateCounterfactualOutcome } from '../services/geminiService';
import { Language } from '../types';
import { COMPLAINT_JOURNEYS } from '../constants';

interface Props { language: Language; }

const CounterfactualSimulator: React.FC<Props> = ({ language }) => {
  const [selected, setSelected] = useState<any>(null);
  const [sim, setSim] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const t = {
    inputs: language === 'ta' ? 'உருவகப்படுத்துதல் உள்ளீடுகள்' : 'Simulation Inputs',
    init: language === 'ta' ? 'தொடங்கவும்' : 'Select a complaint to simulate',
    actual: language === 'ta' ? 'உண்மையான முடிவு' : 'Actual Outcome',
    simulated: language === 'ta' ? 'உருவகப்படுத்தப்பட்ட' : 'Simulated',
    gain: language === 'ta' ? 'அதிகரிப்பு' : 'Efficiency Gain',
    pattern: language === 'ta' ? 'மாதிரி' : 'Pattern',
    issue: language === 'ta' ? 'சிக்கல்' : 'Issue',
    rec: language === 'ta' ? 'பரிந்துரை' : 'Recommendation',
  };

  const runSimulation = async (journey: any) => {
    setSelected(journey);
    setLoading(true);
    setSim(null);
    try {
      const res = await simulateCounterfactualOutcome(journey, language);
      setSim(res);
    } catch (e) {
      console.error(e);
      setSim(null);
    } finally {
      setLoading(false);
    }
  };

  if (!COMPLAINT_JOURNEYS || COMPLAINT_JOURNEYS.length === 0) {
    return <div className="text-center py-20 text-gray-500">No data available</div>;
  }

  return (
    <div className="max-w-[1440px] mx-auto animate-in fade-in duration-700 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-[10px] font-black text-[#6A6A6A] uppercase tracking-[0.4em] px-4">{t.inputs}</h3>
          {COMPLAINT_JOURNEYS.map((j: any) => (
            <button 
              key={j.ticketId}
              onClick={() => runSimulation(j)}
              className={`w-full text-left p-8 rounded-[2.5rem] border transition-all ${
                selected?.ticketId === j.ticketId 
                  ? 'bg-[#1E1E1E] border-slate-800 text-white shadow-xl' 
                  : 'bg-white border-slate-100 hover:border-slate-300'
              }`}
            >
              <h4 className={`font-black text-sm uppercase tracking-tight ${
                selected?.ticketId === j.ticketId ? 'text-[#9C7A3C]' : 'text-[#5A4628]'
              }`}>
                {j.category || 'Unknown'}
              </h4>
            </button>
          ))}
        </div>

        <div className="lg:col-span-8">
          {!selected ? (
            <div className="bg-white border-2 border-dashed border-slate-100 h-[600px] rounded-[4rem] flex flex-col items-center justify-center text-center p-20 opacity-60">
              <p className="text-[10px] font-black text-[#6A6A6A] uppercase tracking-tight">{t.init}</p>
            </div>
          ) : (
            <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border border-slate-100 rounded-[3.5rem] p-12 shadow-sm">
                  <div className="text-[9px] font-black text-[#6A6A6A] uppercase tracking-[0.4em] mb-8">{t.actual}</div>
                  <div className="text-5xl font-black text-[#1E1E1E]">
                    {selected?.metrics?.totalDurationHours ?? 210}h
                  </div>
                </div>

                <div className="bg-[#1E1E1E] text-white rounded-[3.5rem] p-12 shadow-2xl ring-4 ring-slate-800">
                  <div className="text-[9px] font-black text-[#9C7A3C] uppercase tracking-[0.4em] mb-8">{t.simulated}</div>
                  {loading ? (
                    <div className="animate-pulse h-12 w-full bg-white/5 rounded-xl"></div>
                  ) : sim ? (
                    <div className="text-5xl font-black text-[#9C7A3C]">
                      {sim?.simulatedOutcome?.totalHours ?? 0}h
                    </div>
                  ) : null}
                </div>
              </div>

              {sim && (
                <div className="bg-white border border-slate-100 rounded-[4rem] p-16 shadow-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-[#F4F3EE] pb-12 mb-12">
                    <div className="col-span-1">
                      <div className="text-[10px] font-black text-[#9C7A3C] uppercase tracking-[0.5em] mb-2">{t.gain}</div>
                      <div className="text-7xl font-black text-[#1E1E1E] tracking-tighter">
                        {sim?.improvement?.timeReductionPercentage ?? 0}%
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className={`inline-block px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border mb-4 ${
                        (sim?.failureClassification ?? '').includes('Structural') 
                          ? 'bg-rose-50 text-[#7B2D2D] border-[#7B2D2D]/10' 
                          : 'bg-slate-50 text-slate-400 border-slate-200'
                      }`}>
                        {sim?.failureClassification ?? 'Unknown'}
                      </div>
                      <p className="text-xl font-black text-[#5A4628] leading-tight italic">
                        {sim?.structuralInterpretation ?? 'Analyzing...'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-10">
                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-[#6A6A6A] uppercase tracking-widest">{t.pattern}:</label>
                      <p className="text-base font-bold text-[#1E1E1E] leading-relaxed italic">
                        {sim?.observedPattern ?? 'N/A'}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-[#7B2D2D] uppercase tracking-widest">{t.issue}:</label>
                      <p className="text-sm font-black text-[#7B2D2D] leading-relaxed uppercase tracking-tight">
                        {sim?.mandateAccountabilityIssue ?? 'N/A'}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-[#9C7A3C] uppercase tracking-widest">{t.rec}:</label>
                      <div className="p-8 bg-[#F4F3EE] rounded-[2rem] border border-slate-100">
                        <p className="text-sm font-bold text-[#5A4628] leading-relaxed uppercase tracking-widest">
                          {sim?.governanceRecommendation ?? 'N/A'}
                        </p>
                      </div>
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
