import React, { useState } from 'react';
import { analyzeCitizenComplaint } from '../services/citizenAnalysisAPI';
import { Language } from '../types';

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

const CitizenComplaintForm: React.FC<Props> = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const categories = [
    'Electrical',
    'Drain',
    'Solid Waste',
    'Road Maintenance',
    'Forest',
    'Health'
  ];

  const handleAnalyze = () => {
    if (!selectedCategory) {
      alert('Please select a category');
      return;
    }

    const analysis = analyzeCitizenComplaint(selectedCategory);
    setResult(analysis);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      <div className="bg-white rounded-3xl p-8 border border-[#9C7A3C]/10 shadow-sm">
        <h2 className="text-2xl font-black text-[#9C7A3C] mb-6 uppercase">
          {language === 'ta'
            ? 'குடிமக்கள் புகார் பகுப்பாய்வு'
            : 'Citizen Complaint Analysis'}
        </h2>

        <div className="space-y-5">

          <div>
            <label className="block text-sm font-bold mb-2">
              Complaint Category
            </label>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
            >
              <option value="">Select Category</option>

              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe the issue..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
            />
          </div>

          <button
            onClick={handleAnalyze}
            className="bg-[#9C7A3C] text-white px-6 py-3 rounded-xl font-bold"
          >
            Analyze Complaint
          </button>

        </div>
      </div>

      {result && (
        <div className="bg-white rounded-3xl p-8 border border-[#9C7A3C]/10 shadow-sm space-y-4">

          <h3 className="text-xl font-black text-[#9C7A3C] uppercase">
            Analysis Result
          </h3>

          <div>
            <strong>Category:</strong> {result.category}
          </div>

          <div>
            <strong>Risk Level:</strong> {result.risk}
          </div>

          <div>
            <strong>Reason:</strong> {result.riskReason}
          </div>

          <div>
            <strong>Normal Resolution:</strong> {result.baseResolutionDays} days
          </div>

          <div>
            <strong>Escalated Resolution:</strong> {result.escalatedResolutionDays} days
          </div>

          <div>
            <strong>Recommended Department:</strong> {result.recommendedDept}
          </div>

          <div>
            <strong>Entropy Score:</strong> {result.entropyScore}
          </div>

          <div>
            <strong>Improvement:</strong> {result.improvement}
          </div>

        </div>
      )}

    </div>
  );
};

export default CitizenComplaintForm;