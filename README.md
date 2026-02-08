Mandate Vacuum
Structural Accountability Diagnostics for Municipal Governance

Mandate Vacuum is an independently conceptualized governance intelligence system that models structural accountability failure in municipal complaint workflows.

The idea originated from observing that many public complaints remain unresolved not due to lack of resources, but due to unclear departmental ownership and responsibility diffusion.

Instead of building another complaint-tracking interface, this project focuses on diagnosing structural causes of administrative delay.

Problem Motivation

Municipal complaint systems typically show:

Status updates

Assigned departments

Resolution timestamps

However, they do not measure:

Ownership instability

Repeated inter-department transfers

Responsibility erosion over time

Structural inefficiencies in mandate design

The hypothesis behind this project:

Administrative delay is often a structural design issue, not an execution failure.

Mandate Vacuum attempts to quantify that structural instability.

Core Idea

Transform governance ambiguity into measurable signals using:

Ownership entropy

Accountability half-life modeling

Counterfactual mandate simulation

This converts qualitative administrative inefficiency into quantitative diagnostics.

System Architecture
Diagram
graph TD
    A[Municipal Complaint Logs] --> B[Data Preprocessing]
    B --> C[Ownership Entropy Analysis]
    B --> D[Accountability Decay Modeling]
    C --> E[Counterfactual Resolution Simulator]
    D --> E
    E --> F[LLM-Based Insight Synthesis]
    F --> G[Decision Support Interface]

Analytical Components
1. Ownership Entropy Modeling

Detects unstable departmental ownership patterns.

Entropy = - Σ (p_i * log(p_i))


Where:

p_i = probability of ownership by department i

Interpretation:

Low entropy → stable mandate ownership

High entropy → structural ambiguity

Output:

Ranked list of unstable complaint categories

2. Accountability Decay (Half-Life Metric)

Models responsibility erosion using exponential decay.

t(1/2) = ln(2) / λ


Where:

λ is derived from historical delay and transfer frequency

Short half-life indicates rapid responsibility breakdown within workflow chains.

3. Counterfactual Resolution Simulator

Evaluates structural alternatives without enforcing them.

Simulates:

Consolidated ownership models

Reduced transfer pathways

Outputs:

Estimated reduction in resolution time

Structural efficiency improvement

This is a diagnostic tool, not a predictive enforcement system.

4. Insight Synthesis Layer (LLM-Assisted)

Uses Google Gemini to convert structured analytical outputs into:

Policy summaries

Reform suggestions

Confidence-scored insights

The LLM interprets computed metrics; it does not fabricate analytical results.

Example Diagnostic Output

Category: Solid Waste Overflow

Diagnostics:

Ownership Entropy: 1.73

Accountability Half-Life: 3.2 days

Structural Recommendation:

Consolidate ownership under a single department

Projected Impact:

28% reduction in resolution time

Technology Stack

Backend:

Python (Pandas, NumPy, SciPy)

LLM Integration:

Google Gemini API

Database:

Firebase Firestore

Infrastructure:

Google Cloud Platform (GCP)

Frontend:

Web-based analytics interface

Installation & Setup
Clone Repository
git clone https://github.com/visha-l127/mandate-vacuum-governance-intelligence.git
cd mandate-vacuum-governance-intelligence

Environment Configuration

Create a .env file:

GEMINI_API_KEY=your_api_key
FIREBASE_CONFIG=your_firebase_config

Install Dependencies
pip install -r requirements.txt

Run Application
python app.py

Design Philosophy

This project does not attempt to:

Replace municipal systems

Monitor workers

Build citizen-facing interfaces

It attempts to:

Diagnose structural mandate flaws

Model accountability mathematically

Support data-driven administrative reform

Limitations

Dependent on availability of structured complaint logs

Counterfactual simulation evaluates structure, not human behavior

Requires consistent timestamp records

Project Status

Independent analytical systems project
Built to demonstrate structured problem modeling and decision-support design

License

MIT License
