import React, { useState } from "react";
import { translations } from "../data/translations";
import { Language } from "../types";

interface Props {
  language: Language;
}

type ScenarioKey = "drainWaste" | "publicToilet" | "sidewalkDebris";

const CounterfactualSimulator: React.FC<Props> = ({ language }) => {
  const t = translations[language as keyof typeof translations];

  const [selectedScenario, setSelectedScenario] =
    useState<ScenarioKey>("publicToilet");

  const scenarios: Record<
    ScenarioKey,
    {
      label: string;
      departments: number;
      baseline: string;
      optimized: string;
      improvement: string;
    }
  > = {
    drainWaste: {
      label: t.simulatorCases.drainWaste,
      departments: 3,
      baseline: "48h",
      optimized: "22h",
      improvement: "55%",
    },
    publicToilet: {
      label: t.simulatorCases.publicToilet,
      departments: 4,
      baseline: "49h",
      optimized: "22h",
      improvement: "55%",
    },
    sidewalkDebris: {
      label: t.simulatorCases.sidewalkDebris,
      departments: 3,
      baseline: "35h",
      optimized: "16h",
      improvement: "54%",
    },
  };

  const current = scenarios[selectedScenario];

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Page Header */}
      <div className="bg-[#1F1F1F] rounded-[3rem] p-10 shadow-xl">
        <h2 className="text-3xl md:text-4xl font-black text-[#F4D38A] tracking-normal">
          {t.simulator.title}
        </h2>

        <p className="mt-4 text-white/75 font-bold italic tracking-normal">
          {t.simulator.subtitle}
        </p>
      </div>

      {/* What This Page Shows */}
      <div className="bg-[#F8F6F0] rounded-[2rem] p-6 border border-[#9C7A3C]/20 shadow-sm">
        <p className="text-sm font-black text-[#9C7A3C] mb-3 tracking-normal uppercase">
          {language === "ta"
            ? "இந்த பக்கம் என்ன காட்டுகிறது"
            : "WHAT THIS PAGE SHOWS"}
        </p>

        <p className="text-[#3B2A18] font-bold leading-relaxed">
          {language === "ta"
            ? "இந்த பக்கம் தற்போதைய சிதறிய பொறுப்பு அமைப்பையும், ஒரே துறைக்கு தெளிவான பொறுப்பு வழங்கப்படும் மேம்பட்ட அமைப்பையும் ஒப்பிடுகிறது. பொறுப்பு ஒருங்கிணைக்கப்பட்டால் புகார்கள் எவ்வளவு வேகமாக தீர்க்கப்படலாம் என்பதை இது மதிப்பிடுகிறது."
            : "This page compares the current fragmented complaint-handling system with an improved system where one department has clear ownership. It estimates how much faster complaints could be resolved if responsibility is unified."}
        </p>
      </div>

      {/* Scenario Selection */}
      <div>
        <p className="text-sm font-black tracking-normal text-gray-700 mb-6">
          {t.simulator.inputs}
        </p>

        <div className="grid md:grid-cols-3 gap-5">
          {(Object.keys(scenarios) as ScenarioKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedScenario(key)}
              className={`rounded-3xl p-6 text-left font-black transition ${
                selectedScenario === key
                  ? "bg-[#1F1F1F] text-[#F4D38A] shadow-xl"
                  : "bg-white text-[#3B2A18] border border-[#9C7A3C]/10 hover:border-[#9C7A3C]/40"
              }`}
            >
              {scenarios[key].label}
            </button>
          ))}
        </div>
      </div>

      {/* Before / After Comparison */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Before Structural Reform */}
        <div className="bg-white rounded-[3rem] p-8 border border-[#9C7A3C]/10 shadow-sm">
          <h3 className="text-xl font-black text-[#9C7A3C] mb-6 tracking-normal">
            {t.simulator.before}
          </h3>

          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold text-gray-500">
                {t.simulator.baselineResolution}
              </p>

              <p className="text-5xl font-black text-black">
                {current.baseline}
              </p>
            </div>

            <div>
              <p className="text-sm font-bold text-gray-500">
                {t.common.departments}
              </p>

              <p className="text-5xl font-black text-black">
                {current.departments}
              </p>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-3xl p-5">
              <p className="text-sm font-black text-red-800 mb-2 tracking-normal">
                {language === "ta" ? "தற்போதைய பிரச்சினை" : "CURRENT PROBLEM"}
              </p>

              <p className="font-bold italic text-[#8B2F2F] leading-relaxed">
                {t.simulatorCases.reasonText}
              </p>
            </div>
          </div>
        </div>

        {/* After Structural Reform */}
        <div className="bg-[#1F1F1F] rounded-[3rem] p-8 shadow-xl border border-[#9C7A3C]/30">
          <h3 className="text-xl font-black text-[#F4D38A] mb-6 tracking-normal">
            {t.simulator.after}
          </h3>

          <div className="space-y-6 text-white">
            <div>
              <p className="text-sm font-bold text-white/70">
                {t.simulator.optimizedResolution}
              </p>

              <p className="text-5xl font-black text-white">
                {current.optimized}
              </p>
            </div>

            <div>
              <p className="text-sm font-bold text-white/70">
                {t.simulator.improvement}
              </p>

              <p className="text-5xl font-black text-[#F4D38A]">
                {current.improvement}
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-3xl p-5">
              <p className="text-sm font-black text-[#F4D38A] mb-2 tracking-normal">
                {language === "ta" ? "மேம்பாட்டு கருத்து" : "REFORM IDEA"}
              </p>

              <p className="font-bold italic text-white leading-relaxed">
                {t.common.recommendation}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Structural Interpretation */}
      <div className="bg-white rounded-[3rem] p-8 border border-[#9C7A3C]/10 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p className="text-sm font-black text-[#9C7A3C] tracking-normal">
              {t.common.structuralMandateVacuum}
            </p>

            <h3 className="mt-3 text-2xl font-black italic text-[#3B2A18] leading-snug">
              {t.simulatorCases.entropyText}
            </h3>
          </div>

          <div className="bg-[#F8F6F0] rounded-3xl p-6 text-center min-w-[180px]">
            <p className="text-sm font-black text-gray-500">
              {t.simulator.improvement}
            </p>

            <p className="text-6xl font-black text-[#9C7A3C]">
              {current.improvement}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 space-y-5">
          <div>
            <p className="text-sm font-bold text-[#9C7A3C]">
              {t.common.reason}:
            </p>

            <p className="font-bold italic text-black leading-relaxed">
              {t.simulatorCases.reasonText}
            </p>
          </div>

          <div>
            <p className="text-sm font-bold text-[#8B2F2F]">
              {t.common.risk}:
            </p>

            <p className="font-black text-[#8B2F2F] leading-relaxed">
              {t.simulatorCases.riskText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterfactualSimulator;