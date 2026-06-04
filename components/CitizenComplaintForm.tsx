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
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-[#9C7A3C]/10 shadow-sm">
        <h2 className="text-2xl font-black text-[#9C7A3C] mb-6 uppercase tracking-normal">
          {t.citizen.title}
        </h2>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold mb-2">
              {t.citizen.category}
            </label>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
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
            <label className="block text-sm font-bold mb-2">
              {t.citizen.description}
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder={t.citizen.placeholder}
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
            />
          </div>

          <button
            onClick={handleAnalyze}
            className="bg-[#9C7A3C] text-white px-6 py-3 rounded-xl font-bold"
          >
            {t.citizen.analyze}
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white rounded-3xl p-8 border border-[#9C7A3C]/10 shadow-sm space-y-4">
          <h3 className="text-xl font-black text-[#9C7A3C] uppercase tracking-normal">
            {t.citizen.result}
          </h3>

          <div>
            <strong>{t.citizen.category}:</strong>{" "}
            {getCategoryLabel(result.category)}
          </div>

          <div>
            <strong>{t.citizen.riskLevel}:</strong> {getRiskLabel(result.risk)}
          </div>

          <div>
            <strong>{t.citizen.reason}:</strong> {getRiskReason(result)}
          </div>

          <div>
            <strong>{t.citizen.normalResolution}:</strong>{" "}
            {result.baseResolutionDays} {t.citizen.days}
          </div>

          <div>
            <strong>{t.citizen.escalatedResolution}:</strong>{" "}
            {result.escalatedResolutionDays} {t.citizen.days}
          </div>

          <div>
            <strong>{t.citizen.recommendedDept}:</strong>{" "}
            {getDepartmentLabel(result.recommendedDept)}
          </div>

          <div>
            <strong>{t.citizen.entropyScore}:</strong> {result.entropyScore}
          </div>

          <div>
            <strong>{t.citizen.expectedImprovement}:</strong>{" "}
            {result.improvement}
          </div>
        </div>
      )}
    </div>
  );
};

export default CitizenComplaintForm;