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
      {/* Header */}
      <div className="bg-[#8B2F2F] rounded-[3rem] p-10 shadow-xl">
        <h2 className="text-3xl md:text-4xl font-black text-[#F4D38A] tracking-normal">
          {t.insights.title}
        </h2>

        <p className="mt-4 text-white/90 font-bold italic tracking-normal">
          {t.insights.subtitle}
        </p>
      </div>

      {/* Explanation Card */}
      <div className="bg-[#F8F6F0] rounded-[2rem] p-6 border border-[#9C7A3C]/20 shadow-sm">
        <p className="text-sm font-black text-[#9C7A3C] mb-3 tracking-normal">
          {t.common.whatThisPageShows}
        </p>

        <p className="text-[#3B2A18] font-bold leading-relaxed">
          {t.pageExplanations.insights}
        </p>
      </div>

      {/* Main Summary */}
      <div className="bg-white rounded-[3rem] p-8 md:p-10 border border-[#9C7A3C]/10 shadow-sm space-y-8">
        <div className="bg-[#1F1F1F] rounded-3xl p-7 border border-[#9C7A3C]/30">
          <p className="text-sm font-black text-[#F4D38A] mb-3 tracking-normal">
            {language === "ta" ? "மொத்த பகுப்பாய்வு" : "OVERALL ANALYSIS"}
          </p>

          <p className="text-white font-bold text-lg leading-relaxed">
            {t.common.analyzedSummary}
          </p>
        </div>

        {/* Structural Interpretation */}
        <div className="bg-[#F8F6F0] rounded-3xl p-7">
          <h3 className="text-sm font-black tracking-normal text-[#9C7A3C] mb-4">
            {t.insights.structuralInterpretation}
          </h3>

          <p className="text-lg font-bold text-black leading-relaxed">
            {t.common.entropyExplanation}
          </p>
        </div>

        {/* Key Findings */}
        <div>
          <h3 className="text-xl font-black text-[#9C7A3C] mb-5 tracking-normal">
            {t.insights.keyFindings}
          </h3>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-white border border-[#9C7A3C]/20 rounded-3xl p-6 shadow-sm">
              <p className="text-4xl font-black text-[#9C7A3C] mb-4">01</p>

              <p className="font-bold text-[#3B2A18] leading-relaxed">
                {t.insights.findingOne}
              </p>
            </div>

            <div className="bg-white border border-[#9C7A3C]/20 rounded-3xl p-6 shadow-sm">
              <p className="text-4xl font-black text-[#9C7A3C] mb-4">02</p>

              <p className="font-bold text-[#3B2A18] leading-relaxed">
                {t.insights.findingTwo}
              </p>
            </div>

            <div className="bg-white border border-[#9C7A3C]/20 rounded-3xl p-6 shadow-sm">
              <p className="text-4xl font-black text-[#9C7A3C] mb-4">03</p>

              <p className="font-bold text-[#3B2A18] leading-relaxed">
                {t.insights.findingThree}
              </p>
            </div>
          </div>
        </div>

        {/* Governance Recommendation */}
        <div className="bg-[#1F1F1F] text-white rounded-3xl p-7 border border-[#9C7A3C]/30">
          <h3 className="text-xl font-black text-[#F4D38A] mb-4 tracking-normal">
            {t.insights.recommendationTitle}
          </h3>

          <p className="text-white/90 font-bold leading-relaxed">
            {t.common.recommendation}
          </p>
        </div>

        {/* Policy Meaning */}
        <div className="bg-[#F8F6F0] rounded-3xl p-7 border border-[#9C7A3C]/10">
          <p className="text-sm font-black text-[#9C7A3C] mb-3 tracking-normal">
            {language === "ta" ? "கொள்கை அர்த்தம்" : "POLICY MEANING"}
          </p>

          <p className="text-[#3B2A18] font-bold leading-relaxed">
            {language === "ta"
              ? "இந்த பகுப்பாய்வு தனிப்பட்ட புகார்களை மட்டும் பார்க்கவில்லை. புகார்கள் ஏன் தாமதமாகின்றன என்பதற்கான நிர்வாக கட்டமைப்பு காரணத்தை காட்டுகிறது. அதிகாரிகள் இதைப் பயன்படுத்தி எந்த துறைக்கு தெளிவான பொறுப்பு வழங்க வேண்டும் என்பதை முடிவு செய்யலாம்."
              : "This analysis does not only look at individual complaints. It identifies the structural governance reason behind complaint delays. Officials can use it to decide where clear departmental ownership is required."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GovernanceInsights;