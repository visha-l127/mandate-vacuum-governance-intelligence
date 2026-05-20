import { GoogleGenAI } from "@google/genai";

const API_KEY = typeof window !== "undefined"
  ? (window as any).__VITE_GEMINI_API_KEY__ || import.meta.env?.VITE_GEMINI_API_KEY
  : undefined;

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

// ── Mock fallbacks ────────────────────────────────────────────────────────────

const MOCK_VACUUMS = [
  { category: "Drain-Adjacent Mixed Waste", entropyScore: 0.91, ownershipClarity: "Critical", primaryDept: "Unassigned", handoffCount: 4, recommendation: "Assign primary mandate to Drainage Dept with Sanitation as secondary." },
  { category: "Public Toilet Structure", entropyScore: 0.74, ownershipClarity: "High Risk", primaryDept: "Health Office", handoffCount: 3, recommendation: "Clarify structural vs sanitation boundary between PWD and Health." },
  { category: "Sidewalk Debris", entropyScore: 0.61, ownershipClarity: "Moderate", primaryDept: "Sanitation Dept", handoffCount: 2, recommendation: "Define encroachment threshold to reduce Sanitation-Encroachment handoffs." },
  { category: "Streetlight Outage", entropyScore: 0.38, ownershipClarity: "Stable", primaryDept: "Electricity Dept", handoffCount: 1, recommendation: "Ownership is clear. No restructuring required." },
];

const MOCK_DECAY = [
  { complaintId: "MDU-1024", category: "Mixed Waste", halfLifeDays: 8.2, finalAccountabilityPct: 18, risk: "CRITICAL", transfers: 4 },
  { complaintId: "MDU-882", category: "Public Toilet", halfLifeDays: 14.1, finalAccountabilityPct: 31, risk: "CRITICAL", transfers: 3 },
  { complaintId: "MDU-441", category: "Sidewalk Debris", halfLifeDays: 22.4, finalAccountabilityPct: 47, risk: "MODERATE", transfers: 2 },
  { complaintId: "MDU-203", category: "Streetlight", halfLifeDays: 38.7, finalAccountabilityPct: 71, risk: "STABLE", transfers: 1 },
];

const MOCK_SIMULATION = {
  baseline: { entropy: 0.91, halfLifeDays: 8.2, resolutionRate: 0.34 },
  scenarios: [
    { primaryDept: "Drainage Dept", entropy: 0.28, halfLifeDays: 31.4, resolutionRate: 0.81, improvementPct: 138 },
    { primaryDept: "Sanitation Dept", entropy: 0.44, halfLifeDays: 22.1, resolutionRate: 0.67, improvementPct: 97 },
    { primaryDept: "Municipal Corp", entropy: 0.52, halfLifeDays: 18.9, resolutionRate: 0.58, improvementPct: 71 },
  ]
};

const MOCK_KPIs = {
  totalComplaints: 2847,
  resolvedThisMonth: 1203,
  avgResolutionDays: 18.4,
  mandateVacuumCount: 7,
  highEntropyCategories: 3,
  bureaucraticWasteScore: 42,
};

const MOCK_ANALYTICS = {
  monthlyTrend: [
    { month: "Aug", complaints: 312, resolved: 198 },
    { month: "Sep", complaints: 287, resolved: 201 },
    { month: "Oct", complaints: 341, resolved: 189 },
    { month: "Nov", complaints: 298, resolved: 221 },
    { month: "Dec", complaints: 264, resolved: 198 },
    { month: "Jan", complaints: 345, resolved: 196 },
  ],
  deptPerformance: [
    { dept: "Sanitation", avgDays: 12, resolutionRate: 0.78 },
    { dept: "PWD", avgDays: 21, resolutionRate: 0.61 },
    { dept: "Health Office", avgDays: 18, resolutionRate: 0.69 },
    { dept: "Drainage", avgDays: 31, resolutionRate: 0.44 },
    { dept: "Electricity", avgDays: 9, resolutionRate: 0.87 },
  ]
};

const MOCK_INCIDENTS = [
  { id: "INC-001", ward: "Ward 45", type: "Overflow", severity: "High", timestamp: new Date().toISOString() },
  { id: "INC-002", ward: "Ward 12", type: "Blockage", severity: "Medium", timestamp: new Date().toISOString() },
];

const MOCK_SENSORS = [
  { id: "SENS-001", location: "Mattuthavani Market", status: "Alert", fillLevel: 87 },
  { id: "SENS-002", location: "Medical College", status: "Normal", fillLevel: 43 },
  { id: "SENS-003", location: "Meenakshi Temple", status: "Warning", fillLevel: 71 },
];

// ── AI helper ─────────────────────────────────────────────────────────────────

async function askGemini(prompt: string): Promise<string> {
  if (!ai) return "";
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    return response.text ?? "";
  } catch {
    return "";
  }
}

// ── Exported functions ────────────────────────────────────────────────────────

export async function identifyMandateVacuums(data?: any) {
  const aiText = await askGemini(
    `Analyze these municipal complaint categories for mandate ownership gaps and entropy: ${JSON.stringify(data ?? MOCK_VACUUMS)}. Return a brief governance insight.`
  );
  return { vacuums: MOCK_VACUUMS, insight: aiText || "High entropy detected in drain-adjacent categories. Immediate mandate reassignment recommended." };
}

export async function calculateAccountabilityDecay(data?: any) {
  const aiText = await askGemini(
    `Analyze this accountability decay data for municipal complaints: ${JSON.stringify(data ?? MOCK_DECAY)}. Summarize key risk patterns.`
  );
  return { decayRecords: MOCK_DECAY, insight: aiText || "3 of 4 complaint types show critical half-life below 15 days. Structural reassignment needed." };
}

export async function simulateCounterfactualOutcome(journey: any, language?: string) {
  return {
    simulatedOutcome: {
      totalHours: Math.round(journey.metrics.totalDurationHours * 0.45),
      owningDepartment: "Drainage & Sanitation Authority",
    },
    improvement: {
      timeReductionPercentage: 55,
    },
    failureClassification: "Structural Mandate Vacuum",
    observedPattern: "Complaint bounced between departments due to overlapping jurisdiction with no primary owner assigned.",
    structuralInterpretation: "The absence of a single accountable department created a circular transfer loop, exponentially increasing resolution time.",
    mandateAccountabilityIssue: "No department accepted primary ownership — classic mandate vacuum with accountability decay.",
    evidenceBasis: [
      "4 inter-department transfers recorded",
      "Zero resolution attempts in first 72 hours",
      "Commissioner escalation triggered by circular handoff",
      "No SLA binding on secondary departments"
    ],
    governanceRecommendation: "Assign unified mandate to Drainage & Sanitation Authority with 48-hour binding SLA and automatic escalation protocol.",
    confidenceLevel: 0.87,
  };
}

export async function auditCaseMandate(ticketId: string, data?: any) {
  const aiText = await askGemini(
    `Audit this complaint journey for mandate failures: Ticket ${ticketId}. Identify accountability gaps and recommend fixes.`
  );
  return {
    ticketId,
    auditResult: aiText || `Ticket ${ticketId} shows circular handoff pattern. Commissioner escalation indicates systemic mandate vacuum.`,
    riskLevel: "HIGH",
    recommendedAction: "Assign single department as mandate owner with 72-hour resolution SLA."
  };
}

export async function getAIoTGovernanceBlueprint(ward?: string) {
  const aiText = await askGemini(
    `Generate a smart governance blueprint for ${ward ?? "Madurai municipal wards"} focusing on IoT-enabled complaint resolution.`
  );
  return {
    ward: ward ?? "All Wards",
    blueprint: aiText || "Deploy sensor nodes at high-entropy complaint zones. Automate mandate assignment using entropy scores. Trigger escalation at 48hr idle threshold.",
    sensors: MOCK_SENSORS,
    estimatedImprovementPct: 43,
  };
}

export async function getGovernanceKpis() {
  return MOCK_KPIs;
}

export async function getAdvancedAnalytics() {
  return MOCK_ANALYTICS;
}

export async function generateMockIncident() {
  return MOCK_INCIDENTS[Math.floor(Math.random() * MOCK_INCIDENTS.length)];
}

export async function generateSOP(incidentType: string) {
  const aiText = await askGemini(
    `Generate a standard operating procedure for handling a "${incidentType}" municipal complaint in Madurai. Include department assignments and time limits.`
  );
  return aiText || `SOP for ${incidentType}: 1. Sanitation logs complaint within 2hrs. 2. Assess mandate ownership within 4hrs. 3. Assign primary department within 8hrs. 4. Resolve within 72hrs or escalate to Commissioner.`;
}

export async function getPredictiveAnalytics(ward?: string) {
  const aiText = await askGemini(
    `Predict complaint surge patterns for ${ward ?? "Madurai"} municipal wards based on seasonal and historical trends.`
  );
  return {
    ward: ward ?? "All Wards",
    prediction: aiText || "Expect 23% surge in drain-adjacent complaints post-monsoon (Oct-Nov). Pre-position Drainage Dept resources in Zone 2.",
    riskZones: ["Ward 45", "Ward 12", "Ward 23"],
    confidenceScore: 0.74,
  };
}

export async function getUpdatedSensorStatuses() {
  return MOCK_SENSORS.map(s => ({
    ...s,
    fillLevel: Math.min(100, s.fillLevel + Math.floor(Math.random() * 5 - 2)),
    lastUpdated: new Date().toISOString(),
  }));
}

export async function runAccountabilityAudit(deptName: string) {
  const aiText = await askGemini(
    `Run an accountability audit for ${deptName} in Madurai municipal governance. Identify mandate overlaps and decay patterns.`
  );
  return {
    department: deptName,
    auditSummary: aiText || `${deptName} shows moderate accountability decay. Average half-life of 18.4 days. 3 active mandate conflicts with adjacent departments.`,
    score: Math.floor(Math.random() * 40) + 40,
    mandateConflicts: 3,
  };
}

export async function getSFRASAttribution(assetId: string) {
  return {
    assetId,
    attributedDept: "Sanitation Dept",
    mandateClarity: "Medium",
    lastAuditDate: "2024-11-01",
    recommendation: "Clarify PWD vs Sanitation boundary for structural assets.",
  };
}

export async function getSIH_SFRAS_Analysis(data?: any) {
  const aiText = await askGemini(
    `Analyze SFRAS attribution data for Madurai sanitation assets. Identify mandate gaps and structural accountability issues.`
  );
  return {
    analysis: aiText || "SFRAS data shows 34% of sanitation assets have unclear mandate attribution between PWD and Sanitation Dept. Recommend joint ownership protocol.",
    totalAssets: 48,
    clearMandate: 32,
    ambiguousMandate: 16,
  };
}

export async function validateSanitationImage(base64Image: string, mimeType: string = "image/jpeg") {
  if (!ai) {
    return { valid: true, issue: "No API key — mock validation passed.", severity: "Low", recommendedAction: "Configure GEMINI_API_KEY for real image analysis." };
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        { inlineData: { data: base64Image, mimeType } },
        { text: "Analyze this image for municipal sanitation issues. Identify: 1) Type of issue, 2) Severity (Low/Medium/High/Critical), 3) Which department should own this complaint, 4) Recommended action." }
      ],
    });
    return { valid: true, analysis: response.text, severity: "Medium", recommendedDept: "Sanitation Dept" };
  } catch {
    return { valid: false, issue: "Image analysis failed.", severity: "Unknown", recommendedAction: "Manual review required." };
  }
}

export function createExpertChat() {
  if (!ai) {
    return {
      sendMessage: async (msg: string) => `[Offline Mode] Expert system unavailable. Query received: "${msg}". Please configure GEMINI_API_KEY for live expert chat.`,
      isOffline: true,
    };
  }
  const chat = ai.chats.create({
    model: "gemini-2.0-flash",
    history: [
      { role: "user", parts: [{ text: "You are a municipal governance expert specializing in Madurai's sanitation complaint system. Help analyze mandate vacuums, accountability decay, and structural governance failures." }] },
      { role: "model", parts: [{ text: "Understood. I'm your governance intelligence expert for Madurai municipal systems. I can help analyze mandate ownership gaps, accountability half-life metrics, and counterfactual policy scenarios. What would you like to investigate?" }] },
    ],
  });
  return {
    sendMessage: async (msg: string) => {
      const response = await chat.sendMessage({ message: msg });
      return response.text ?? "No response received.";
    },
    isOffline: false,
  };
}

export async function getWardFromCoordinates(lat: number, lng: number) {
  const WARD_COORDS: Record<string, { lat: number; lng: number }> = {
    "Ward 1 (Simmakkal)": { lat: 9.9195, lng: 78.1193 },
    "Ward 12 (Ellis Nagar North)": { lat: 9.9312, lng: 78.1284 },
    "Ward 23 (KK Nagar)": { lat: 9.9401, lng: 78.1102 },
    "Ward 45 (Karisalkulam)": { lat: 9.9089, lng: 78.1356 },
    "Ward 74 (Villapuram)": { lat: 9.9523, lng: 78.1421 },
    "Ward 84 (Airport Area)": { lat: 9.8348, lng: 78.0934 },
    "Ward 90 (Vilangudi)": { lat: 9.9634, lng: 78.1287 },
    "Ward 100 (Kulamangalam)": { lat: 9.9712, lng: 78.1456 },
  };
  let closest = "Ward 1 (Simmakkal)";
  let minDist = Infinity;
  for (const [ward, coords] of Object.entries(WARD_COORDS)) {
    const dist = Math.sqrt(Math.pow(lat - coords.lat, 2) + Math.pow(lng - coords.lng, 2));
    if (dist < minDist) { minDist = dist; closest = ward; }
  }
  return closest;
}
