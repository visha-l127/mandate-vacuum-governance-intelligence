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
                  ? "bg-[#1F1F1F] text-[#9C7A3C] shadow-xl"
                  : "bg-white text-[#3B2A18] border border-[#9C7A3C]/10"
              }`}
            >
              {scenarios[key].label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-[3rem] p-8 border border-[#9C7A3C]/10 shadow-sm">
          <h3 className="text-xl font-black text-[#9C7A3C] mb-6 tracking-normal">
            {t.simulator.before}
          </h3>

          <div className="space-y-5">
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

            <p className="font-bold italic text-[#8B2F2F]">
              {t.simulatorCases.reasonText}
            </p>
          </div>
        </div>

        <div className="bg-[#1F1F1F] rounded-[3rem] p-8 shadow-xl">
          <h3 className="text-xl font-black text-[#9C7A3C] mb-6 tracking-normal">
            {t.simulator.after}
          </h3>

          <div className="space-y-5 text-white">
            <div>
              <p className="text-sm font-bold text-white/60">
                {t.simulator.optimizedResolution}
              </p>
              <p className="text-5xl font-black">{current.optimized}</p>
            </div>

            <div>
              <p className="text-sm font-bold text-white/60">
                {t.simulator.improvement}
              </p>
              <p className="text-5xl font-black text-[#9C7A3C]">
                {current.improvement}
              </p>
            </div>

            <p className="font-bold italic text-white/90">
              {t.common.recommendation}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] p-8 border border-[#9C7A3C]/10 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-sm font-black text-[#9C7A3C] tracking-normal">
              {t.common.structuralMandateVacuum}
            </p>
            <h3 className="mt-3 text-2xl font-black italic text-[#3B2A18]">
              {t.simulatorCases.entropyText}
            </h3>
          </div>

          <div className="text-6xl font-black text-black">
            {current.improvement}
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 space-y-5">
          <div>
            <p className="text-sm font-bold text-[#9C7A3C]">
              {t.common.reason}:
            </p>
            <p className="font-bold italic text-black">
              {t.simulatorCases.reasonText}
            </p>
          </div>

          <div>
            <p className="text-sm font-bold text-[#8B2F2F]">
              {t.common.risk}:
            </p>
            <p className="font-black text-[#8B2F2F]">
              {t.simulatorCases.riskText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterfactualSimulator;