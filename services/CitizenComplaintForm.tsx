import React, { useState } from 'react';
import { analyzeCitizenComplaint } from '../services/citizenAnalysisAPI';

interface AnalysisResult {
  category: string;
  risk: string;
  riskReason: string;
  baseResolutionDays: number;
  escalatedResolutionDays: number;
  recommendedDept: string;
  entropyScore: number;
  improvement: string;
  error?: string;
}

interface CitizenComplaintFormProps {
  language: 'en' | 'ta';
}

const CitizenComplaintForm: React.FC<CitizenComplaintFormProps> = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    'Electrical',
    'Drain',
    'Solid Waste',
    'Road Maintenance',
    'Forest',
    'Health'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategory) {
      alert(language === 'ta' ? 'வகையைத் தேர்ந்தெடுக்கவும்' : 'Please select a category');
      return;
    }

    setLoading(true);

    // Simulate processing delay
    setTimeout(() => {
      const analysis = analyzeCitizenComplaint(selectedCategory);
      setResult(analysis as AnalysisResult);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Form Section */}
      {!result && (
        <form onSubmit={handleSubmit} className="bg-white/5 border border-[#9C7A3C]/20 rounded-lg p-8 space-y-6">
          <h2 className="text-2xl font-black text-[#9C7A3C] uppercase tracking-tight">
            {language === 'ta' ? 'புகாரை பகுப்பாய்வு செய்யவும்' : 'Analyze Your Complaint'}
          </h2>

          {/* Category Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-black text-[#6A6A6A] uppercase tracking-wider">
              {language === 'ta' ? 'புகாரின் வகை' : 'Complaint Category'}
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 bg-[#F4F3EE] border border-[#9C7A3C]/10 rounded-lg text-[#1E1E1E] font-semibold focus:outline-none focus:border-[#9C7A3C] transition-all"
            >
              <option value="">
                {language === 'ta' ? 'ஒன்றைத் தேர்ந்தெடுக்கவும்...' : 'Select a category...'}
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label className="block text-sm font-black text-[#6A6A6A] uppercase tracking-wider">
              {language === 'ta' ? 'விவரம் (விருப்பம்)' : 'Description (Optional)'}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={language === 'ta' ? 'உங்கள் புகாரை விவரிக்கவும்...' : 'Describe your complaint...'}
              className="w-full px-4 py-3 bg-[#F4F3EE] border border-[#9C7A3C]/10 rounded-lg text-[#1E1E1E] font-medium focus:outline-none focus:border-[#9C7A3C] transition-all resize-none h-24"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#9C7A3C] hover:bg-[#7A5A1E] disabled:opacity-50 text-white font-black py-4 rounded-lg uppercase tracking-wider transition-all"
          >
            {loading ? (language === 'ta' ? 'பகுப்பாய்வு செய்யப்படுகிறது...' : 'Analyzing...') : (language === 'ta' ? 'பகுப்பாய்வு செய்யவும்' : 'Analyze')}
          </button>
        </form>
      )}

      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          {/* Risk Badge */}
          <div className={`p-6 rounded-lg border-2 ${
            result.risk === 'HIGH' ? 'bg-red-50/50 border-red-300' :
            result.risk === 'MEDIUM' ? 'bg-yellow-50/50 border-yellow-300' :
            'bg-green-50/50 border-green-300'
          }`}>
            <div className="text-sm font-black text-[#6A6A6A] uppercase tracking-wider mb-2">
              {language === 'ta' ? 'ঝুঁকির স্তর' : 'Risk Level'}
            </div>
            <div className={`text-4xl font-black uppercase tracking-tight ${
              result.risk === 'HIGH' ? 'text-red-600' :
              result.risk === 'MEDIUM' ? 'text-yellow-600' :
              'text-green-600'
            }`}>
              {result.risk}
            </div>
          </div>

          {/* Analysis Details */}
          <div className="space-y-4">
            {/* Category */}
            <div className="bg-white/5 border border-[#9C7A3C]/10 p-4 rounded-lg">
              <div className="text-xs font-black text-[#9C7A3C] uppercase tracking-wider mb-1">
                {language === 'ta' ? 'புகாரின் வகை' : 'Category'}
              </div>
              <div className="text-lg font-black text-[#1E1E1E]">{result.category}</div>
            </div>

            {/* Risk Reason */}
            <div className="bg-white/5 border border-[#9C7A3C]/10 p-4 rounded-lg">
              <div className="text-xs font-black text-[#9C7A3C] uppercase tracking-wider mb-1">
                {language === 'ta' ? 'ஏன் ஝ுঁகிகரமான?' : 'Why Risky?'}
              </div>
              <div className="text-sm text-[#1E1E1E]">{result.riskReason}</div>
            </div>

            {/* Entropy Score */}
            <div className="bg-white/5 border border-[#9C7A3C]/10 p-4 rounded-lg">
              <div className="text-xs font-black text-[#9C7A3C] uppercase tracking-wider mb-1">
                {language === 'ta' ? 'உரிமை பிறழ்வு' : 'Ownership Fragmentation'}
              </div>
              <div className="text-2xl font-black text-[#9C7A3C]">{result.entropyScore.toFixed(2)}</div>
              <div className="text-xs text-[#6A6A6A] mt-1">
                {language === 'ta' ? '(0=தெளிவு, 1=அதிகபட்சம் பிறழ்வு)' : '(0=Clear, 1=Max fragmentation)'}
              </div>
            </div>

            {/* Resolution Timeline */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-[#9C7A3C]/10 p-4 rounded-lg">
                <div className="text-xs font-black text-[#9C7A3C] uppercase tracking-wider mb-1">
                  {language === 'ta' ? 'சாதாரண நேரம்' : 'Normal Time'}
                </div>
                <div className="text-2xl font-black text-[#1E1E1E]">{result.baseResolutionDays}d</div>
              </div>
              <div className="bg-green-50/50 border border-green-300 p-4 rounded-lg">
                <div className="text-xs font-black text-green-700 uppercase tracking-wider mb-1">
                  {language === 'ta' ? 'ஏற்றிச் செயல்பட்ட நேரம்' : 'If Escalated'}
                </div>
                <div className="text-2xl font-black text-green-700">{result.escalatedResolutionDays}d</div>
                <div className="text-xs text-green-600 mt-1">{result.improvement} faster</div>
              </div>
            </div>

            {/* Recommended Department */}
            <div className="bg-[#9C7A3C]/10 border border-[#9C7A3C]/30 p-4 rounded-lg">
              <div className="text-xs font-black text-[#9C7A3C] uppercase tracking-wider mb-1">
                {language === 'ta' ? 'ஏற்றிச் செயல்பட்ட விभाग' : 'Escalate To'}
              </div>
              <div className="text-lg font-black text-[#9C7A3C]">{result.recommendedDept}</div>
              <div className="text-xs text-[#6A6A6A] mt-2">
                {language === 'ta' ? 'இந்த வகையிற்கான முதன்மை உரிமைத் தாங்கி' : 'Primary owner for this category'}
              </div>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={() => {
              setResult(null);
              setSelectedCategory('');
              setDescription('');
            }}
            className="w-full bg-white/10 hover:bg-white/20 text-[#9C7A3C] font-black py-3 rounded-lg uppercase tracking-wider transition-all border border-[#9C7A3C]/20"
          >
            {language === 'ta' ? 'மற்றொரு புகாரைபகுப்பாய்வு செய்யவும்' : 'Analyze Another Complaint'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CitizenComplaintForm;
