# 🏛️ Mandate Vacuum — Governance Intelligence System

> **A policy diagnostics tool that reveals the structural roots of administrative failure in municipal complaint workflows.**

---

## 📌 Overview

**Mandate Vacuum** is a governance intelligence system that analyzes municipal complaint-transfer data to expose structural accountability failures between departments.

Unlike traditional complaint-tracking or citizen-reporting tools, Mandate Vacuum focuses on the *architecture of failure* — studying how responsibility erodes, gets transferred, and ultimately dissolves across bureaucratic structures. It is designed as a **decision-support tool for policy makers and municipal administrators** who want to move beyond symptoms and address the systemic causes of delay and unresolved complaints.

---

## 🎯 Problem Statement

Municipal complaint systems routinely fail not because of individual negligence, but because of **structural ambiguities in mandate ownership**:

- No single department clearly owns a complaint category
- Complaints bounce between departments indefinitely
- Accountability diffuses over time until no one is responsible
- Decisions makers lack data-driven diagnostics to redesign these structures

Mandate Vacuum directly addresses this gap.

---

## 🔬 Core Analytical Concepts

### 🌀 Ownership Entropy
Measures the degree of *instability in mandate ownership* across departments. High entropy indicates that no single department reliably owns a complaint type — a leading indicator of systemic delay.

### ⏳ Accountability Half-Life
Quantifies how quickly *responsibility erodes* as a complaint ages and transfers between departments. A short half-life means accountability decays rapidly, and resolution becomes increasingly unlikely.

### 🔁 Counterfactual Resolution Simulator
Evaluates how *alternate mandate structures* would perform compared to the current configuration. Answers questions like: *"If Department A took primary ownership of this complaint category instead of Department B, how much faster would resolution occur?"*

---

**Dataset:** BBMP Grievances 2023 — 119,140 real municipal 
complaints from Bangalore (data.opencity.in)

---

## 🧠 What the System Does

- Ingests historical complaint-transfer data from municipal records
- Detects patterns of unclear departmental ownership
- Identifies repeated inter-department handoffs indicating mandate vacuums
- Tracks responsibility decay over complaint lifecycle
- Synthesizes AI-generated policy insights using Google Gemini
- Outputs actionable diagnostics for governance redesign

---

## 🚫 What This System Does NOT Do

| ❌ Not a... | ✅ It is a... |
|------------|--------------|
| Complaint status tracker | Structural governance analyzer |
| Citizen-facing reporting portal | Policy diagnostics engine |
| Worker monitoring tool | Accountability gap detector |
| Real-time tracking system | Historical pattern analyzer |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Dashboard** | React, TypeScript, Vite, Tailwind CSS |
| **Data Processing** | Python, Pandas, NumPy |
| **Statistical Modeling** | Custom metrics (Entropy, Half-Life) |
| **Cloud Infrastructure** | Google Cloud Platform (GCP) |
| **Database** | Firebase Firestore |
| **AI Insight Synthesis** | Google Gemini API |

---

## 🗂️ Project Structure

```
mandate-vacuum-governance-intelligence/
│
├── 📁 components/
│   ├── AccountabilityAuditTerminal.tsx
│   ├── AIoTGovernanceBlueprint.tsx
│   ├── AdministrativeOverview.tsx
│   ├── AnalyticsDashboard.tsx
│   ├── CitizenPortal.tsx
│   ├── CounterfactualSimulator.tsx
│   ├── ExpertDrawer.tsx
│   ├── ForensicJourneyTrace.tsx
│   ├── GovernanceDashboard.tsx
│   ├── GovernanceInsights.tsx
│   ├── HowToReadPanel.tsx
│   ├── InsightCard.tsx
│   ├── LanguageGate.tsx
│   ├── LiveMonitor.tsx
│   ├── LogicExplainer.tsx
│   ├── MandateVacuumIdentifier.tsx
│   ├── ResponsibilityLeakageAnalyzer.tsx
│   └── SFRASDashboard.tsx
│
├── 📁 notebooks/
│   ├── 01_ownership_entropy.ipynb
│   ├── 02_accountability_halflife.ipynb
│   └── 03_counterfactual_simulator.ipynb
│
├── 📁 results/
│   └── .gitkeep
│
├── 📁 sample_data/
│   ├── sample_complaints.csv
│   └── bbmp_complaints_cleaned.csv
│
├── App.tsx
├── constants.tsx
├── download.ts
├── index.html
├── index.tsx
├── metadata.json
├── package.json
├── tsconfig.json
├── types.ts
├── vite.config.ts
│
├── clean_bbmp_data.py
├── .env.example
├── .gitignore
├── LIMITATIONS.md
├── METHODOLOGY.md
├── README.md
└── requirements.txt
```

## 🚀 Getting Started

### Prerequisites

- Python 3.9+
- Google Cloud account with Firestore enabled
- Google Gemini API access
- Service account credentials for GCP

### Installation

```bash
git clone https://github.com/visha-l127/mandate-vacuum-governance-intelligence.git
cd mandate-vacuum-governance-intelligence
pip install -r requirements.txt
```

### Configuration

```bash
# Set up your GCP credentials
export GOOGLE_APPLICATION_CREDENTIALS="path/to/your/service-account.json"

# Configure Gemini API Key
export GEMINI_API_KEY="your-api-key-here"
```

### Running the Analysis

```bash
# Run the core governance analysis pipeline
python analysis/ownership_entropy.py

# Run the counterfactual resolution simulator
python analysis/counterfactual_simulator.py
```

---

## 📊 Sample Outputs

The system produces:

- **Ownership Entropy scores** per complaint category and department
- **Accountability Half-Life curves** showing responsibility decay over time
- **Counterfactual resolution tables** comparing alternate mandate structures
- **AI-synthesized policy narratives** summarizing key structural failures and recommendations

---

## 🎯 Target Users

| User | Use Case |
|------|----------|
| **Municipal Administrators** | Identify which departments need clearer mandate boundaries |
| **Policy Makers** | Redesign accountability structures with simulation support |
| **Governance Researchers** | Study structural causes of administrative delay |
| **Urban Planning Teams** | Evaluate departmental efficiency at scale |

---

## 🔭 Roadmap

- [ ] Interactive dashboard for entropy and half-life visualization
- [ ] Multi-city comparative analysis support
- [ ] Automated policy recommendation generation
- [ ] Integration with open government data APIs
- [ ] Longitudinal tracking of governance reforms

---

## 🤝 Contributing

Contributions are welcome! If you're working in governance analytics, public administration research, or civic tech, feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Vishal** — [@visha-l127](https://github.com/visha-l127)

Built with a focus on structural governance analysis and data-driven public administration reform.

---

> *"The failure isn't in the people — it's in the mandate architecture. Mandate Vacuum makes that visible."*
