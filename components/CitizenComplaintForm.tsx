import React, { useState } from "react";
import { analyzeCitizenComplaint } from "../services/citizenAnalysisAPI";
import { translations } from "../data/translations";
import { Language } from "../types";

interface AnalysisResult {
  category: string;
  risk: string;
  riskReason: string;
  baseResolutionDays: number;
  escalatedResolutionDays: number;
  recommendedDept: string;
  entropyScore: number;
  improvement: string;
}

interface Props {
  language: Language;
}

const categories = [
  "Electrical",
  "Drain",
  "Solid Waste",
  "Road Maintenance",
  "Forest",
  "Health",
];

const CitizenComplaintForm: React.FC<Props> = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const t = translations[language as keyof typeof translations];

  const getCategoryLabel = (category: string) => {
    const categoryMap = t.categories as Record<string, string>;
    return categoryMap[category] || category;
  };

  const getRiskLabel = (risk: string) => {
    const riskMap = t.risk as Record<string, string>;
    return riskMap[risk] || risk;
  };

  const getDepartmentLabel = (department: string) => {
    const departmentMap = t.departments as Record<string, string>;
    return departmentMap[department] || department;
  };

  const getRiskReason = (analysis: AnalysisResult) => {
    if (language !== "ta") return analysis.riskReason;

    return `${getCategoryLabel(
      analysis.category
    )} தொடர்பான புகார்கள் பல துறைகளில் பகிரப்பட்டுள்ளதால், தீர்வு தாமதமாகும் அபாயம் அதிகம்.`;
  };

  const handleAnalyze = () => {
    if (!selectedCategory) {
      alert(t.citizen.selectAlert);
      return;
    }

    const analysis = analyzeCitizenComplaint(selectedCategory);
    setResult(analysis);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div className="bg-[#1F1F1F] rounded-[3rem] p-10 shadow-xl">
        <h2 className="text-3xl md:text-4xl font-black text-[#F4D38A] tracking-normal">
          {t.citizen.title}
        </h2>

        <p className="mt-4 text-white/70 font-bold italic tracking-normal">
          {language === "ta"
            ? "புகார் தாமதம் மற்றும் பரிந்துரைக்கப்படும் துறை மதிப்பீடு"
            : "Complaint delay risk and recommended department assessment"}
        </p>
      </div>

      {/* Explanation Card */}
      <div className="bg-[#F8F6F0] rounded-[2rem] p-6 border border-[#9C7A3C]/20 shadow-sm">
        <p className="text-sm font-black text-[#9C7A3C] mb-3 tracking-normal">
          {t.common.whatThisPageShows}
        </p>

        <p className="text-[#3B2A18] font-bold leading-relaxed">
          {t.pageExplanations.citizen}
        </p>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-6">
        <p className="text-sm font-black text-yellow-800 mb-2 tracking-normal">
          {t.disclaimer.title}
        </p>

        <p className="text-yellow-900 font-bold leading-relaxed">
          {t.disclaimer.citizen}
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-[3rem] p-8 border border-[#9C7A3C]/10 shadow-sm">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-black text-gray-600 mb-2">
              {t.citizen.category}
            </label>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 font-bold bg-white"
            >
              <option value="">{t.citizen.selectCategory}</option>

              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {getCategoryLabel(cat)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-black text-gray-600 mb-2">
              {t.citizen.description}
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder={t.citizen.placeholder}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 font-bold"
            />
          </div>

          <button
            onClick={handleAnalyze}
            className="bg-[#9C7A3C] hover:bg-[#86672F] text-white px-6 py-3 rounded-xl font-black transition"
          >
            {t.citizen.analyze}
          </button>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="bg-white rounded-[3rem] p-8 border border-[#9C7A3C]/10 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="text-sm font-black text-[#9C7A3C] tracking-normal">
                {t.citizen.result}
              </p>

              <h3 className="text-3xl font-black text-[#1F1F1F] mt-2">
                {getCategoryLabel(result.category)}
              </h3>
            </div>

            <div className="bg-red-50 text-red-800 px-5 py-3 rounded-full font-black text-sm">
              {getRiskLabel(result.risk)}
            </div>
          </div>

          <div className="bg-[#F8F6F0] rounded-3xl p-6">
            <p className="text-sm font-black text-[#9C7A3C] mb-2">
              {t.citizen.reason}
            </p>

            <p className="font-bold text-[#3B2A18] leading-relaxed">
              {getRiskReason(result)}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white border border-[#9C7A3C]/20 rounded-3xl p-6">
              <p className="text-sm font-black text-gray-500">
                {t.citizen.normalResolution}
              </p>

              <p className="text-4xl font-black text-[#8B2F2F] mt-2">
                {result.baseResolutionDays}
              </p>

              <p className="font-bold text-gray-500">{t.citizen.days}</p>
            </div>

            <div className="bg-white border border-[#9C7A3C]/20 rounded-3xl p-6">
              <p className="text-sm font-black text-gray-500">
                {t.citizen.escalatedResolution}
              </p>

              <p className="text-4xl font-black text-[#9C7A3C] mt-2">
                {result.escalatedResolutionDays}
              </p>

              <p className="font-bold text-gray-500">{t.citizen.days}</p>
            </div>

            <div className="bg-white border border-[#9C7A3C]/20 rounded-3xl p-6">
              <p className="text-sm font-black text-gray-500">
                {t.citizen.recommendedDept}
              </p>

              <p className="text-xl font-black text-[#1F1F1F] mt-2">
                {getDepartmentLabel(result.recommendedDept)}
              </p>
            </div>

            <div className="bg-white border border-[#9C7A3C]/20 rounded-3xl p-6">
              <p className="text-sm font-black text-gray-500">
                {t.citizen.entropyScore}
              </p>

              <p className="text-4xl font-black text-[#8B2F2F] mt-2">
                {result.entropyScore}
              </p>
            </div>
          </div>

          <div className="bg-[#1F1F1F] rounded-3xl p-6 border border-[#9C7A3C]/30">
            <p className="text-sm font-black text-[#F4D38A] mb-3 tracking-normal">
              {t.citizen.expectedImprovement}
            </p>

            <p className="font-bold text-white leading-relaxed text-lg">
              {result.improvement}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitizenComplaintForm;