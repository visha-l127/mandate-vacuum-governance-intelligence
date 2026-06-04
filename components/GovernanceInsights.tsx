import React from "react";
import { translations } from "../data/translations";
import { Language } from "../types";

interface Props {
  language: Language;
}

const GovernanceInsights: React.FC<Props> = ({ language }) => {
  const t = translations[language as keyof typeof translations];

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="bg-[#8B2F2F] rounded-[3rem] p-10 shadow-xl">
        <h2 className="text-3xl md:text-4xl font-black text-[#9C7A3C] tracking-normal">
          {t.insights.title}
        </h2>
        <p className="mt-4 text-white/90 font-bold italic tracking-normal">
          {t.insights.subtitle}
        </p>
      </div>

      <div className="bg-white rounded-[3rem] p-8 md:p-10 border border-[#9C7A3C]/10 shadow-sm space-y-8">
        <p className="text-lg font-bold italic text-[#3B2A18]">
          {t.common.analyzedSummary}
        </p>

        <div className="bg-[#F8F6F0] rounded-3xl p-6">
          <h3 className="text-sm font-black tracking-normal text-gray-600 mb-4">
            {t.insights.structuralInterpretation}
          </h3>
          <p className="text-lg font-bold text-black">
            {t.common.entropyExplanation}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-black text-[#9C7A3C] mb-4 tracking-normal">
            {t.insights.keyFindings}
          </h3>

          <ul className="space-y-4 text-base md:text-lg">
            <li className="bg-white border border-[#9C7A3C]/20 rounded-2xl p-4">
              {t.insights.findingOne}
            </li>
            <li className="bg-white border border-[#9C7A3C]/20 rounded-2xl p-4">
              {t.insights.findingTwo}
            </li>
            <li className="bg-white border border-[#9C7A3C]/20 rounded-2xl p-4">
              {t.insights.findingThree}
            </li>
          </ul>
        </div>

        <div className="bg-[#1F1F1F] text-white rounded-3xl p-6">
          <h3 className="text-xl font-black text-[#9C7A3C] mb-3 tracking-normal">
            {t.insights.recommendationTitle}
          </h3>
          <p className="text-white/90">{t.common.recommendation}</p>
        </div>
      </div>
    </div>
  );
};

export default GovernanceInsights;