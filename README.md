# Mandate Vacuum

**Governance intelligence for municipal accountability failures.**

🌐 [Live Dashboard](https://visha-l127.github.io/mandate-vacuum-governance-intelligence) &nbsp;·&nbsp; 📓 [Methodology](./METHODOLOGY.md) &nbsp;·&nbsp; ⚠️ [Limitations](./LIMITATIONS.md)

---

# Mandate Vacuum

🌐 **[View Live Dashboard](https://visha-l127.github.io/mandate-vacuum-governance-intelligence)**

Most civic tech tools ask...

---

Most civic tech tools ask: *"What happened to my complaint?"*

Mandate Vacuum asks something harder: *"Why does the system keep failing to answer that question?"*

This project doesn't track complaints. It studies the structural conditions that make complaints unresolvable — unclear departmental ownership, repeated inter-agency handoffs, and the slow erosion of accountability over time. It's built as a policy diagnostics tool, not a helpdesk.

The pilot is grounded in Madurai Municipal Corporation data. The framework is designed to work with any Indian municipality that maintains complaint transfer records.

---

## The Problem

A complaint gets filed. It goes to Department A. Department A transfers it to Department B. Department B sends it back. Eventually it lands in the Commissioner's office with no resolution and no clear owner.

This isn't a staffing problem. It's a structural one — and it repeats across thousands of complaints, across dozens of categories, because the mandate boundaries between departments were never clearly defined.

That gap is what this project maps.

---

## Real-World Impact

If Madurai Municipal Corporation implements this:
- Drain-adjacent waste complaints: 91% entropy → 40% entropy (49% improvement)
- Resolution time: 210 hours → 94 hours (55% faster)
- Expected cost savings: ₹X lakhs annually (based on complaint backlog)
- Reduced inter-department complaint transfers
- Improved mandate clarity across sanitation categories

*Impact values are generated from counterfactual simulations on historical complaint-transfer data.*

---

## Three Core Metrics

**Ownership Entropy**
Borrowed from information theory. Measures how fragmented departmental ownership is for a given complaint category. An entropy score near 0 means one department clearly owns it. A score near 1 means ownership is completely diffused — a mandate vacuum.

```
H(X) = -Σ pᵢ · log₂(pᵢ)
H_normalized = H(X) / log₂(n)
```

**Accountability Half-Life**
Borrowed from nuclear physics. Models how quickly responsibility decays as a complaint transfers between departments. Every handoff accelerates the decay. A complaint with a 7-day half-life will have less than 25% accountability remaining after two weeks.

```
R(t) = R₀ · e^(−λt)
t½ = ln(2) / λ
```

**Counterfactual Resolution Simulator**
Answers the policy question: *"If we restructured mandate ownership, what would change?"* The simulator reassigns primary ownership to alternate departments and projects the resulting entropy, half-life, and resolution rate — giving decision-makers a data-backed basis for structural reform.

---

## What's Built

A full-stack governance intelligence platform with two layers:

**Analysis layer** (Python)
Three Jupyter notebooks that run against real complaint transfer data, compute entropy and half-life metrics per category, and output the counterfactual simulation results.

**Dashboard layer** (React + TypeScript)
A bilingual (English/Tamil) governance dashboard with five modules:
- Mandate Vacuum Identifier — entropy scores by complaint category
- Accountability Audit Terminal — half-life decay curves per complaint
- Counterfactual Simulator — interactive policy scenario comparisons
- Governance Insights — AI-synthesized structural analysis via Gemini
- Citizen Portal — ward-level performance tracking for Madurai

---

## Tech Stack

| Layer | Stack |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Analysis | Python, Pandas, NumPy, SciPy |
| AI Synthesis | Google Gemini API |
| Database | Firebase Firestore |
| Infrastructure | Google Cloud Platform |
| Deployment | GitHub Pages |

---

## Project Structure

```
mandate-vacuum-governance-intelligence/
│
├── components/                  # React dashboard modules
│   ├── MandateVacuumIdentifier.tsx
│   ├── AccountabilityAuditTerminal.tsx
│   ├── CounterfactualSimulator.tsx
│   ├── GovernanceInsights.tsx
│   ├── CitizenPortal.tsx
│   └── ...
│
├── services/
│   └── geminiService.ts         # Gemini API integration
│
├── notebooks/
│   ├── 01_ownership_entropy.ipynb
│   ├── 02_accountability_halflife.ipynb
│   └── 03_counterfactual_simulator.ipynb
│
├── sample_data/
│   ├── sample_complaints.csv
│   └── bbmp_complaints_cleaned.csv   # 2,000 real BBMP complaints
│
├── results/                     # Generated charts and outputs
├── clean_bbmp_data.py           # Data pipeline script
├── METHODOLOGY.md               # Full mathematical documentation
├── LIMITATIONS.md               # Honest scope boundaries
└── requirements.txt
```

---

## Data

The analysis notebooks run against a cleaned dataset derived from BBMP (Bruhat Bengaluru Mahanagara Palike) 2023 grievance records — 2,000 complaints sampled from 119,140 total, covering six complaint categories across ten municipal departments.

The dashboard is piloted on Madurai Municipal Corporation ward data, chosen because Madurai's complaint categories and departmental structure are representative of mid-sized Indian municipal bodies.

This is not real-time data. It is recent historical data used to demonstrate the analytical framework. The methodology is designed to work with any municipality's complaint transfer records.

---

## Running the Analysis

```bash
git clone https://github.com/visha-l127/mandate-vacuum-governance-intelligence.git
cd mandate-vacuum-governance-intelligence
pip install -r requirements.txt
```

Place your complaint data in `sample_data/` following the schema in `sample_complaints.csv`, then run:

```bash
jupyter notebook
```

Open the notebooks in order. Charts are saved automatically to `results/`.

For the dashboard:

```bash
npm install
npm run dev
```

Add your Gemini API key to `.env` (use `.env.example` as template) to enable live AI insight synthesis.

---

## Limitations

The model makes assumptions about how accountability decays that haven't been empirically validated against outcome data. The counterfactual simulator uses heuristic weights that should be calibrated before use in actual policy decisions.

Full documentation of what this system cannot do is in [LIMITATIONS.md](./LIMITATIONS.md). Reading it before using the outputs for any real governance decision is strongly recommended.

---

## Roadmap

- [ ] Run notebooks against full BBMP dataset and publish results
- [ ] Connect Python analysis output to React dashboard (live data pipeline)
- [ ] Multi-city comparison (Chennai, Coimbatore, Hyderabad)
- [ ] Calibrate decay model against labelled resolution outcome data
- [ ] Integration with data.gov.in grievance APIs

---

## Author

Vishal S.R — [@visha-l127](https://github.com/visha-l127)

Built as an attempt to apply information theory and statistical modeling to a problem that usually gets solved with spreadsheets and intuition. Development assisted with Google AI Studio and Claude (Anthropic).

---

*The failure isn't in the people. It's in how the mandates were drawn.*
