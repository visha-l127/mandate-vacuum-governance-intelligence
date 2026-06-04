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

const decayMetrics: Record<
  CategoryKey,
  {
    halfLife: number;
    avgResolution: number;
    transfers: number;
    finalAccountability: number;
    primaryDept: string;
    entropy: number;
  }
> = {
  Electrical: {
    halfLife: 33.9,
    avgResolution: 9,
    transfers: 3,
    finalAccountability: 82,
    primaryDept: "Electrical Dept",
    entropy: 0.98,
  },
  Drain: {
    halfLife: 28.9,
    avgResolution: 48,
    transfers: 5,
    finalAccountability: 41,
    primaryDept: "Drainage Dept",
    entropy: 0.91,
  },
  "Solid Waste": {
    halfLife: 34.1,
    avgResolution: 35,
    transfers: 4,
    finalAccountability: 53,
    primaryDept: "Sanitation Dept",
    entropy: 0.99,
  },
  "Road Maintenance": {
    halfLife: 33.9,
    avgResolution: 34,
    transfers: 4,
    finalAccountability: 55,
    primaryDept: "PWD",
    entropy: 1.0,
  },
  Forest: {
    halfLife: 28.9,
    avgResolution: 31,
    transfers: 4,
    finalAccountability: 57,
    primaryDept: "Parks Dept",
    entropy: 0.98,
  },
  Health: {
    halfLife: 38.1,
    avgResolution: 38,
    transfers: 5,
    finalAccountability: 46,
    primaryDept: "Health Dept",
    entropy: 1.0,
  },
};

const AccountabilityAuditTerminal: React.FC<Props> = ({ language }) => {
  const t = translations[language as keyof typeof translations];

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryKey>("Drain");

  const current = decayMetrics[selectedCategory];

  const getCategoryLabel = (category: string) => {
    const categoryMap = t.categories as Record<string, string>;
    return categoryMap[category] || category;
  };

  const getDepartmentLabel = (department: string) => {
    const departmentMap = t.departments as Record<string, string>;
    return departmentMap[department] || department;
  };

  const decayStages = [
    {
      label: language === "ta" ? "புகார் பதிவு" : "Complaint Filed",
      value: 100,
    },
    {
      label: language === "ta" ? "முதல் துறை" : "First Department",
      value: 82,
    },
    {
      label: language === "ta" ? "துறை மாற்றம்" : "Department Transfer",
      value: 63,
    },
    {
      label: language === "ta" ? "பொறுப்பு குழப்பம்" : "Ownership Confusion",
      value: 49,
    },
    {
      label: language === "ta" ? "தீர்வு தாமதம்" : "Resolution Delay",
      value: current.finalAccountability,
    },
  ];

  const interpretation =
    language === "ta"
      ? `${getCategoryLabel(
          selectedCategory
        )} புகார்களில் பொறுப்பு பல துறைகளுக்கு மாறுவதால், காலப்போக்கில் பொறுப்புணர்வு குறைகிறது.`
      : `${selectedCategory} complaints lose accountability when they move between departments without clear primary ownership.`;

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="bg-[#1F1F1F] rounded-[3rem] p-10 shadow-xl">
        <h2 className="text-3xl md:text-4xl font-black text-[#9C7A3C] tracking-normal">
          {t.decay.title}
        </h2>

        <p className="mt-4 text-white/70 font-bold italic tracking-normal">
          {t.decay.subtitle}
        </p>
      </div>

      {/* Explanation Card */}
      <div className="bg-[#F8F6F0] rounded-[2rem] p-6 border border-[#9C7A3C]/20 shadow-sm">
        <p className="text-sm font-black text-[#9C7A3C] mb-3 tracking-normal">
          {t.common.whatThisPageShows}
        </p>

        <p className="text-[#3B2A18] font-bold leading-relaxed">
          {t.pageExplanations.decay}
        </p>
      </div>

      {/* Category Buttons */}
      <div className="grid md:grid-cols-3 gap-5">
        {(Object.keys(decayMetrics) as CategoryKey[]).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-3xl p-5 text-left transition border ${
              selectedCategory === category
                ? "bg-[#9C7A3C] text-white border-[#9C7A3C] shadow-xl"
                : "bg-white text-[#3B2A18] border-[#9C7A3C]/10 hover:border-[#9C7A3C]/40"
            }`}
          >
            <p className="font-black">{getCategoryLabel(category)}</p>

            <p
              className={`mt-2 text-sm font-bold ${
                selectedCategory === category ? "text-white/80" : "text-gray-500"
              }`}
            >
              {language === "ta" ? "அரை-ஆயுள்" : "Half-life"}:{" "}
              {decayMetrics[category].halfLife} {t.citizen.days}
            </p>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[3rem] p-8 border border-[#9C7A3C]/10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10">
            <div>
              <p className="text-sm font-black text-[#9C7A3C] tracking-normal">
                {language === "ta"
                  ? "தேர்ந்தெடுக்கப்பட்ட வகை"
                  : "Selected Category"}
              </p>

              <h3 className="text-4xl font-black text-[#1F1F1F] mt-2">
                {getCategoryLabel(selectedCategory)}
              </h3>

              <p className="mt-4 text-gray-600 font-bold max-w-2xl">
                {interpretation}
              </p>
            </div>

            <div className="bg-red-50 text-red-800 px-5 py-3 rounded-full font-black text-sm">
              {language === "ta" ? "அதிக அபாயம்" : "HIGH RISK"}
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid md:grid-cols-4 gap-5 mb-10">
            <div className="bg-[#F8F6F0] rounded-3xl p-5">
              <p className="text-xs font-black text-gray-500">
                {t.decay.halfLife}
              </p>

              <p className="text-4xl font-black text-[#9C7A3C] mt-2">
                {current.halfLife}
              </p>

              <p className="text-sm font-bold text-gray-500">
                {t.citizen.days}
              </p>
            </div>

            <div className="bg-[#F8F6F0] rounded-3xl p-5">
              <p className="text-xs font-black text-gray-500">
                {t.decay.transfers}
              </p>

              <p className="text-4xl font-black text-[#9C7A3C] mt-2">
                {current.transfers}
              </p>

              <p className="text-sm font-bold text-gray-500">
                {language === "ta" ? "சராசரி" : "average"}
              </p>
            </div>

            <div className="bg-[#F8F6F0] rounded-3xl p-5">
              <p className="text-xs font-black text-gray-500">
                {t.decay.finalAccountability}
              </p>

              <p className="text-4xl font-black text-[#8B2F2F] mt-2">
                {current.finalAccountability}%
              </p>

              <p className="text-sm font-bold text-gray-500">
                {language === "ta" ? "மீதமுள்ளது" : "remaining"}
              </p>
            </div>

            <div className="bg-[#F8F6F0] rounded-3xl p-5">
              <p className="text-xs font-black text-gray-500">
                {language === "ta" ? "சிதறல்" : "ENTROPY"}
              </p>

              <p className="text-4xl font-black text-[#8B2F2F] mt-2">
                {current.entropy.toFixed(2)}
              </p>

              <p className="text-sm font-bold text-gray-500">
                {language === "ta" ? "அதிகம்" : "high"}
              </p>
            </div>
          </div>

          {/* Decay Path */}
          <div className="bg-[#1F1F1F] rounded-[2rem] p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-[#9C7A3C] font-black text-xl">
                {language === "ta"
                  ? "பொறுப்புணர்வு குறையும் பாதை"
                  : "Accountability Decay Path"}
              </h4>

              <span className="text-white/60 text-sm font-bold">
                {language === "ta" ? "மாதிரி கணிப்பு" : "Model estimate"}
              </span>
            </div>

            <div className="space-y-5">
              {decayStages.map((stage, index) => (
                <div key={stage.label}>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-bold">{stage.label}</span>

                    <span className="text-[#9C7A3C] font-black">
                      {stage.value}%
                    </span>
                  </div>

                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        index < 2
                          ? "bg-[#9C7A3C]"
                          : index < 4
                          ? "bg-yellow-600"
                          : "bg-red-700"
                      }`}
                      style={{ width: `${stage.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Cards */}
        <div className="space-y-8">
          <div className="bg-[#8B2F2F] text-white rounded-[3rem] p-8 shadow-xl">
            <p className="text-sm font-black text-white/70">
              {language === "ta" ? "முதன்மை துறை" : "PRIMARY DEPARTMENT"}
            </p>

            <h3 className="text-3xl font-black mt-3 text-[#F4D38A]">
              {getDepartmentLabel(current.primaryDept)}
            </h3>

            <p className="mt-5 text-white/80 font-bold">
              {language === "ta"
                ? "இந்த துறையில் பொறுப்பை ஒருங்கிணைத்தால் தீர்வு வேகம் மேம்படும்."
                : "Consolidating ownership here can improve resolution speed."}
            </p>
          </div>

          <div className="bg-white rounded-[3rem] p-8 border border-[#9C7A3C]/10 shadow-sm">
            <p className="text-sm font-black text-gray-500">
              {language === "ta" ? "விளக்கம்" : "INTERPRETATION"}
            </p>

            <h3 className="text-2xl font-black text-[#1F1F1F] mt-3">
              {language === "ta"
                ? "பொறுப்பு நேராக குறையாது; அது ஒவ்வொரு மாற்றத்திலும் வேகமாக சிதையும்."
                : "Accountability does not decline linearly. It weakens faster after every transfer."}
            </h3>

            <p className="mt-5 text-gray-600 font-bold">
              {t.common.halfLifeExplanation}
            </p>
          </div>

          <div className="bg-[#F8F6F0] rounded-[3rem] p-8">
            <p className="text-sm font-black text-gray-500">
              {language === "ta" ? "சராசரி தீர்வு" : "AVG RESOLUTION"}
            </p>

            <p className="text-5xl font-black text-[#9C7A3C] mt-3">
              {current.avgResolution}
            </p>

            <p className="text-gray-500 font-bold">{t.citizen.days}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountabilityAuditTerminal;