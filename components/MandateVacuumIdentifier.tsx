import React, { useState } from "react";
import { translations } from "../data/translations";
import { Language } from "../types";

interface Props {
  language: Language;
}

type CategoryKey =
  | "Electrical"
  | "Drain"
  | "Solid Waste"
  | "Road Maintenance"
  | "Forest"
  | "Health";

const complaintMetrics: Record<
  CategoryKey,
  {
    entropy: number;
    halfLife: number;
    primaryDept: string;
    avgResolution: number;
    risk: "HIGH" | "MEDIUM" | "LOW";
  }
> = {
  Electrical: {
    entropy: 0.98,
    halfLife: 33.9,
    primaryDept: "Electrical Dept",
    avgResolution: 9,
    risk: "HIGH",
  },
  Drain: {
    entropy: 0.91,
    halfLife: 28.9,
    primaryDept: "Drainage Dept",
    avgResolution: 48,
    risk: "HIGH",
  },
  "Solid Waste": {
    entropy: 0.99,
    halfLife: 34.1,
    primaryDept: "Sanitation Dept",
    avgResolution: 35,
    risk: "HIGH",
  },
  "Road Maintenance": {
    entropy: 1.0,
    halfLife: 33.9,
    primaryDept: "PWD",
    avgResolution: 34,
    risk: "HIGH",
  },
  Forest: {
    entropy: 0.98,
    halfLife: 28.9,
    primaryDept: "Parks Dept",
    avgResolution: 31,
    risk: "HIGH",
  },
  Health: {
    entropy: 1.0,
    halfLife: 38.1,
    primaryDept: "Health Dept",
    avgResolution: 38,
    risk: "HIGH",
  },
};

const MandateVacuumIdentifier: React.FC<Props> = ({ language }) => {
  const t = translations[language as keyof typeof translations];
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryKey>("Drain");

  const current = complaintMetrics[selectedCategory];

  const getCategoryLabel = (category: string) => {
    const categoryMap = t.categories as Record<string, string>;
    return categoryMap[category] || category;
  };

  const getDepartmentLabel = (department: string) => {
    const departmentMap = t.departments as Record<string, string>;
    return departmentMap[department] || department;
  };

  const getRiskLabel = (risk: string) => {
    const riskMap = t.risk as Record<string, string>;
    return riskMap[risk] || risk;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="bg-[#1F1F1F] rounded-[3rem] p-10 shadow-xl">
        <h2 className="text-3xl md:text-4xl font-black text-[#9C7A3C] tracking-normal">
          {t.vacuums.title}
        </h2>
        <p className="mt-4 text-white/70 font-bold italic tracking-normal">
          {t.vacuums.subtitle}
        </p>
      </div>

      <div className="bg-white rounded-[3rem] p-8 border border-[#9C7A3C]/10 shadow-sm">
        <p className="text-sm font-black tracking-normal text-gray-600 mb-6">
          {t.vacuums.analysisDomain}
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {(Object.keys(complaintMetrics) as CategoryKey[]).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-2xl p-4 text-left font-bold transition ${
                selectedCategory === category
                  ? "bg-[#9C7A3C] text-white"
                  : "bg-[#F8F6F0] text-[#3B2A18]"
              }`}
            >
              {getCategoryLabel(category)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[3rem] p-8 border border-[#9C7A3C]/10 shadow-sm">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div>
              <p className="text-sm font-black tracking-normal text-gray-500">
                {t.vacuums.fragmentation}
              </p>
              <p className="text-6xl font-black text-[#9C7A3C]">
                {current.entropy.toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-sm font-black tracking-normal text-gray-500">
                {t.vacuums.inferenceConfidence}
              </p>
              <p className="text-4xl font-black text-black">0.94</p>
            </div>

            <div>
              <span className="inline-block rounded-full bg-red-50 text-red-800 px-4 py-2 text-xs font-black">
                {getRiskLabel(current.risk)}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-lg font-bold italic text-[#3B2A18]">
              {t.common.analyzedSummary}
            </p>

            <div className="bg-[#F8F6F0] rounded-3xl p-6">
              <h3 className="text-sm font-black tracking-normal text-gray-600 mb-3">
                {t.insights.structuralInterpretation}
              </h3>
              <p className="text-lg font-bold text-black">
                {t.common.entropyExplanation}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border border-[#9C7A3C]/20 rounded-2xl p-4">
                <p className="text-xs font-black text-gray-500">
                  {t.vacuums.primaryDepartment}
                </p>
                <p className="font-bold">
                  {getDepartmentLabel(current.primaryDept)}
                </p>
              </div>

              <div className="bg-white border border-[#9C7A3C]/20 rounded-2xl p-4">
                <p className="text-xs font-black text-gray-500">
                  {t.vacuums.avgResolution}
                </p>
                <p className="font-bold">
                  {current.avgResolution} {t.citizen.days}
                </p>
              </div>

              <div className="bg-white border border-[#9C7A3C]/20 rounded-2xl p-4">
                <p className="text-xs font-black text-gray-500">
                  {t.decay.halfLife}
                </p>
                <p className="font-bold">
                  {current.halfLife} {t.citizen.days}
                </p>
              </div>

              <div className="bg-white border border-[#9C7A3C]/20 rounded-2xl p-4">
                <p className="text-xs font-black text-gray-500">
                  {t.vacuums.riskLevel}
                </p>
                <p className="font-bold">{getRiskLabel(current.risk)}</p>
              </div>
            </div>

            <div className="bg-[#1F1F1F] text-white rounded-3xl p-5">
              <p className="font-bold">{t.common.recommendation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MandateVacuumIdentifier;