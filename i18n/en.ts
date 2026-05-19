
import { TreeNode, NodeType } from '../types';

export const INITIAL_NODE_ID_EN = 'Q1';

export const DIAGNOSTIC_TREE_DATA_EN: Record<string, TreeNode> = {
  // ==========================================
  // PHASE 1: Initial Diagnosis & Invasion Drivers
  // ==========================================
  Q1: {
    id: 'Q1',
    type: NodeType.QUESTION,
    text: "Is there evidence of pine spread and/or ecological impacts (e.g., biodiversity loss, water yield)?",
    details: "This is the entry point of the diagnostic. Before assessing governance, one must confirm if a tangible problem exists.",
    position: { x: 500, y: 50 },
    yesNodeId: 'Q2',
    noNodeId: 'I1'
  },
  I1: {
    id: 'I1',
    type: NodeType.INTERVENTION,
    text: "Implement monitoring and early detection programs.",
    details: "Establish systematic monitoring protocols to detect and document pine spread early, even if impacts are not yet visible.",
    position: { x: 200, y: 150 },
    nextNodeId: 'Q1',
    checkList: ["Priority areas for early monitoring have been identified.", "Systematic field data recording protocols are in place.", "Staff has specific technical training in detection.", "An immediate reporting channel for new detections exists."]
  },
  Q2: {
    id: 'Q2',
    type: NodeType.QUESTION,
    text: "Are there identifiable drivers of pine spread and/or ecological impact (e.g., expansion, land use)?",
    details: "Once evidence of spread is confirmed, the next step is understanding what is fueling that spread.",
    position: { x: 500, y: 150 },
    yesNodeId: 'Q3',
    noNodeId: 'I2'
  },
  I2: {
    id: 'I2',
    type: NodeType.INTERVENTION,
    text: "Conduct targeted ecological assessment and research to identify invasion drivers.",
    details: "When drivers are not clearly identified, targeted research is needed before designing interventions.",
    position: { x: 800, y: 250 },
    nextNodeId: 'Q3',
    checkList: ["Key dispersal vectors have been identified.", "Analysis of invasion temporal dynamics is available.", "Perturbation factors facilitating establishment are known.", "Ecological data is updated and validated."]
  },
  Q3: {
    id: 'Q3',
    type: NodeType.QUESTION,
    text: "Are prevention, control, restoration or monitoring measures in place?",
    details: "This node evaluates whether any active management response exists, regardless of its effectiveness.",
    position: { x: 500, y: 350 },
    yesNodeId: 'Q4',
    noNodeId: 'SP1'
  },
  SP1: {
    id: 'SP1',
    type: NodeType.INTERVENTION,
    text: "Socioeconomic Pathway: 1. Education, 2. Perception Change, 3. Fostering Management Support.",
    details: "When no management measures exist despite documented evidence, the barrier is likely social or educational.",
    position: { x: 200, y: 450 },
    nextNodeId: 'Q4',
    checkList: ["Regular environmental education campaigns are conducted.", "Public perception of the impact of pines is clear.", "Local stakeholders actively support control measures.", "Conflicts of interest with the community have been mitigated."]
  },

  // ==========================================
  // PHASE 2: Governance Assessment & Critical Barriers
  // ==========================================
  Q4: {
    id: 'Q4',
    type: NodeType.QUESTION,
    text: "Are effective governance structures and operational management strategies in place?",
    details: "This is the central governance evaluation. It assesses whether there are operational tools to execute management.",
    position: { x: 500, y: 550 },
    yesNodeId: 'O_partial',
    noNodeId: 'I3'
  },
  I3: {
    id: 'I3',
    type: NodeType.INTERVENTION,
    text: "Reinforce awareness and monitoring. Engage stakeholders through targeted diffusion.",
    details: "When governance structures are weak or absent, the first step is building awareness and involving key actors.",
    position: { x: 250, y: 650 },
    nextNodeId: 'Q5',
    checkList: ["Key stakeholders recognize the risk of invasion.", "Citizen or participatory monitoring networks exist.", "Technical and social outreach materials are distributed.", "The issue is integrated into the local discussion agenda."]
  },
  O_partial: {
    id: 'O_partial',
    type: NodeType.OUTCOME,
    text: "Partial outcome: Reduction in pine density and/or invasion impacts.",
    details: "This intermediate outcome indicates that governance is functioning and achieving some level of ecological success.",
    position: { x: 650, y: 650 },
    nextNodeId: 'Q5'
  },

  // Barrier Cascade
  Q5: {
    id: 'Q5',
    type: NodeType.QUESTION,
    text: "Is there an economic/financial barrier constraining management?",
    details: "Financial constraints often limit the implementation of invasive species management plans.",
    position: { x: 400, y: 800 },
    yesNodeId: 'A_financial',
    noNodeId: 'Q6'
  },
  A_financial: {
    id: 'A_financial',
    type: NodeType.ALERT,
    text: "Alert: Financial Deficiency identified.",
    details: "A critical economic barrier has been identified. This may manifest as lack of budget or unreliable funding.",
    position: { x: 150, y: 900 },
    nextNodeId: 'I4',
    checkList: ["The current budget does not cover operational needs.", "There is no secured funding for the next cycle.", "Lack of economic resources is the main bottleneck.", "Interventions have been canceled due to financial reasons."]
  },
  I4: {
    id: 'I4',
    type: NodeType.INTERVENTION,
    text: "Identify funding opportunities, integrate management into conservation programs, explore value generation.",
    details: "Value generation from management actions (biomass, etc.) and integration into existing programs can help overcome financial gaps.",
    position: { x: 150, y: 1000 },
    nextNodeId: 'Q9',
    checkList: ["Alternative funding sources have been mapped.", "Proposals to value extracted biomass exist.", "Management is integrated into rural development programs.", "Co-financing partnerships have been established."]
  },
  Q6: {
    id: 'Q6',
    type: NodeType.QUESTION,
    text: "Is there a legal or administrative barrier?",
    details: "Legal barriers may stem from the interpretation of regulations or implementation of existing laws.",
    position: { x: 550, y: 900 },
    yesNodeId: 'A_legal',
    noNodeId: 'Q7'
  },
  A_legal: {
    id: 'A_legal',
    type: NodeType.ALERT,
    text: "Alert: Legal/Administrative Deficiency identified.",
    details: "A critical legal or administrative barrier has been identified. This might involve conflicting regulations.",
    position: { x: 350, y: 1000 },
    nextNodeId: 'I5',
    checkList: ["Legal gaps exist regarding property and intervention.", "Current regulations hinder control on private lands.", "Contradictions exist between environmental and productive laws.", "Administrative permit processes are excessively slow."]
  },
  I5: {
    id: 'I5',
    type: NodeType.INTERVENTION,
    text: "Engage with authorities to clarify regulatory options, explore alternative pathways.",
    details: "Addressing legal barriers may be more feasible than pursuing formal legal changes in the short term.",
    position: { x: 350, y: 1100 },
    nextNodeId: 'Q9',
    checkList: ["A technical table with legal authorities has been established.", "Simplified administrative pathways for control exist.", "Landowner responsibilities have been clarified.", "There is consensus on the application of current regulations."]
  },
  Q7: {
    id: 'Q7',
    type: NodeType.QUESTION,
    text: "Is there a coordination/conflict barrier among institutions or stakeholders?",
    details: "Management of biological invasions often involves multiple institutions with fragmented responsibilities.",
    position: { x: 700, y: 1050 },
    yesNodeId: 'A_coordination',
    noNodeId: 'Q8'
  },
  A_coordination: {
    id: 'A_coordination',
    type: NodeType.ALERT,
    text: "Alert: Conflict / Lack of Coordination identified.",
    details: "A critical coordination failure has been identified. This may involve conflicts between stakeholders.",
    position: { x: 350, y: 1150 },
    nextNodeId: 'I6',
    checkList: ["Institutions act in a fragmented manner.", "Jurisdictional conflicts exist between public agencies.", "A joint and coordinated action plan is missing.", "Key stakeholders do not agree on management priorities."]
  },
  I6: {
    id: 'I6',
    type: NodeType.INTERVENTION,
    text: "Establish coordination platforms, promote inter-agency collaboration, and share resources.",
    details: "MOU's, joint plans, and platforms like NZ's Wilding Pines Programme are effective coordination examples.",
    position: { x: 350, y: 1250 },
    nextNodeId: 'Q9',
    checkList: ["A formal multi-sectoral coordination platform exists.", "Inter-institutional collaboration agreements have been signed.", "A shared information and goal system is in place.", "Roles and responsibilities of each stakeholder are clearly defined."]
  },
  Q8: {
    id: 'Q8',
    type: NodeType.QUESTION,
    text: "Is there limited social awareness and support for management?",
    details: "In some contexts, the management of pine invasions may face limited public understanding or even resistance.",
    position: { x: 700, y: 1200 },
    yesNodeId: 'A_perception',
    noNodeId: 'Q8b'
  },
  A_perception: {
    id: 'A_perception',
    type: NodeType.ALERT,
    text: "Alert: Limited social awareness and support.",
    details: "A critical social perception barrier has been identified. The public may value these invasive species.",
    position: { x: 350, y: 1300 },
    nextNodeId: 'I7',
    checkList: ["The local population aesthetically values the invasive species.", "There is social resistance to control techniques.", "Control is perceived as a threat to the local economy.", "Public information on negative impacts is lacking."]
  },
  I7: {
    id: 'I7',
    type: NodeType.INTERVENTION,
    text: "Improve communication, foster stakeholder engagement, and involve local communities.",
    details: "Two-way engagement and demonstrating ecological impacts helps align social perception with management goals.",
    position: { x: 350, y: 1400 },
    nextNodeId: 'Q9',
    checkList: ["A tailored communication strategy is in place.", "Social participation spaces are included in the design.", "Restoration benefits are clear to the community.", "An active citizen science program exists."]
  },
  Q8b: {
    id: 'Q8b',
    type: NodeType.QUESTION,
    text: "Are monitoring and evaluation mechanisms in place for adaptive management?",
    details: "This node was added based on reviewer feedback recognizing that monitoring feedback is essential for adaptive governance.",
    position: { x: 700, y: 1350 },
    yesNodeId: 'I8',
    noNodeId: 'I8'
  },
  I8: {
    id: 'I8',
    type: NodeType.INTERVENTION,
    text: "Strengthen monitoring for unconsidered barriers. Review and establish evaluation protocols.",
    details: "If no specific barrier was identified but governance is not fully functional, monitoring needs strengthening.",
    position: { x: 700, y: 1450 },
    nextNodeId: 'Q9',
    checkList: ["Monitoring protocols are periodically reviewed.", "Monitoring results lead to adjustments in management actions.", "A centralized and accessible database exists.", "The effectiveness of each intervention is evaluated."]
  },

  // ==========================================
  // PHASE 3: Improvement Opportunities & Final Outcomes
  // ==========================================
  Q9: {
    id: 'Q9',
    type: NodeType.QUESTION,
    text: "Are there long-term sustainable financing mechanisms?",
    details: "Management fails if it depends on one-time grants or short-term project budgets.",
    position: { x: 500, y: 1600 },
    yesNodeId: 'Q10',
    noNodeId: 'I9'
  },
  I9: {
    id: 'I9',
    type: NodeType.INTERVENTION,
    text: "Launch political strategies with on-the-ground stakeholders to develop sustainable financing.",
    details: "Propose legislative or private-public partnerships to fund permanent control and restoration efforts.",
    position: { x: 200, y: 1700 },
    nextNodeId: 'O_review',
    checkList: ["A legislative proposal for permanent funding exists.", "Specific trust funds or levies have been created.", "The private sector provides resources through offsets.", "The political strategy has legislative backing."]
  },
  Q10: {
    id: 'Q10',
    type: NodeType.QUESTION,
    text: "Are economic incentives included in the strategies?",
    details: "Beyond funding, this evaluates whether the governance system uses incentives like tax breaks or restoration subsidies.",
    position: { x: 700, y: 1700 },
    yesNodeId: 'O_effective',
    noNodeId: 'O_review'
  },
  O_effective: {
    id: 'O_effective',
    type: NodeType.OUTCOME,
    text: "Outcome: Effective Governance Model achieved.",
    details: "The governance system demonstrates strong integration between ecological goals and administrative tools.",
    position: { x: 550, y: 1800 },
    nextNodeId: 'I_continuous'
  },
  I_continuous: {
    id: 'I_continuous',
    type: NodeType.INTERVENTION,
    text: "Continuous Action: Strengthen strategies and conduct continuous evaluation.",
    details: "Even with effective governance, continuous monitoring and evaluation are necessary to handle changing conditions.",
    position: { x: 550, y: 1900 },
    nextNodeId: 'Q4',
    checkList: ["The system evaluation is performed annually.", "New remote monitoring technologies have been integrated.", "Lessons learned are systematically documented.", "The governance model adapts to new challenges."]
  },
  O_review: {
    id: 'O_review',
    type: NodeType.OUTCOME,
    text: "Outcome: Need for Review and Readjustment.",
    details: "Critical barriers persist or sustainable financing is not in place. The system needs reconsideration.",
    position: { x: 250, y: 1800 },
    nextNodeId: 'I10'
  },
  I10: {
    id: 'I10',
    type: NodeType.INTERVENTION,
    text: "Reassess resources or adjust last implemented strategies.",
    details: "Based on the review outcome, the system loops back to governance assessment for adjustments.",
    position: { x: 250, y: 1900 },
    nextNodeId: 'Q4',
    checkList: ["A technical audit of human resources is performed.", "Goals have been adjusted based on real availability.", "Mechanisms for efficient fund reallocation exist.", "Critical priorities have been identified under scarcity."]
  }
};

export const translationsEN = {
  langCode: 'en-US',
  appTitle: "Pines Invasion Governance System",
  appSubtitle: "Interactive expert diagnostic tool for pines management.",
  footer: "SIS Governance. Powered by Senior AI Insights.",
  context: {
    title: "Site Characterization",
    expand: "Define Context",
    collapse: "Hide Context",
    countryLabel: "Country",
    selectCountry: "Select country...",
    countries: ["Argentina", "Chile", "Uruguay", "Brazil", "USA", "Canada", "Spain", "France", "New Zealand", "Australia", "South Africa"],
    placeLabel: "Specific Location",
    placePlaceholder: "e.g. Nahuel Huapi Sector X",
    regionLabel: "Management Zone",
    selectRegion: "Select region...",
    regions: ["Patagonia", "Andean Region", "Coastal Range", "Central Valley", "Northern Transition", "Sierra Nevada", "Rocky Mountains"],
    stageLabel: "Invasion Stage",
    stageStart: "Introduction",
    stageEnd: "Widespread",
    impactLabel: "Perceived Impact",
    impactLevels: { low: "Low", medium: "Moderate", high: "Critical" },
    speciesHeader: "Priority Pines Species",
    speciesLabel: "species selected",
    landUseLabel: "Land Use / Zoning",
    landUseOptions: {
      protectedArea: "Protected Area",
      forestry: "Commercial Forest",
      urbanInterface: "Urban Interface",
      agriculture: "Agriculture/Pasture"
    },
    notesLabel: "Additional Context",
    notesPlaceholder: "e.g., legal barriers in Patagonia, tensions with local forestry industry, or lack of allocated budget..."
  },
  ranking: {
    noStrong: { label: "Strongly Disagree", desc: "No evidence exists or the factor is completely absent in the current site context." },
    noWeak: { label: "Disagree", desc: "The factor is likely not relevant or has very low impact on the current situation." },
    neutral: { label: "Uncertain / Neutral", desc: "Mixed evidence or lack of data. This choice signals a need for further monitoring." },
    yesWeak: { label: "Agree", desc: "Preliminary evidence indicates this factor is present and influential." },
    yesStrong: { label: "Strongly Agree", desc: "Verified evidence confirms this is a core driver or a successfully implemented stage." },
  },
  tutorial: {
    skip: "Skip", back: "Prev", next: "Next", finish: "Explore", close: "Close",
    steps: [
      { title: "Governance Diagnosis", content: "Welcome to the SIS Governance tool.\n\nThis application helps you audit pines invasion strategies using a structured decision tree and Expert AI assistance." },
      { title: "Define Your Context", content: "Use the top 'Site Characterization' panel to set your region, species, and land use. This 'primes' the AI to give you localized advice instead of generic facts." },
      { title: "Interactive Graph", content: "The central graph is your workspace. Nodes with a pulse (Q1) indicate where to start. Click any node to evaluate it." },
      { title: "Uncertainty & Sliders", content: "Governance is rarely simple Yes/No. Use the Likert slider to represent your degree of agreement or scientific certainty for each factor." },
      { title: "AI Consultant", content: "At any point, use the Chat to ask questions like 'What are the legal implications in this region?' or 'Give me examples of successful restoration'." }
    ]
  },
  chat: {
    title: "Senior AI Consultant", toggle: "Expert Chat", contextLabel: "Evaluating:", placeholder: "Ask for technical nuances or localized advice...", listening: "Listening...",
    user: "User", ai: "Expert AI", typing: "Synthesizing...", error: "AI service temporarily unavailable.", micPermission: "Microphone access denied.",
    startRecording: "Voice Query", stopRecording: "Stop", export: "Export Chat", ariaExport: "Download conversation",
  },
  node: { showDetails: "Learn More", hideDetails: "Hide Info", yes: "Yes / High", no: "No / Low", continue: "Submit Evaluation", back: "Undo", restart: "New Diagnosis", export: "Download Report", endNodeMessage: "Diagnostic complete. Review your path summary below.", notesLabel: "Local Notes / Observations", notesPlaceholder: "Add information for the AI to consider...", checklistLabel: "Verify the statements that apply to your region:" },
  path: { 
    summary: "Audit Path Summary:", 
    questionHeader: "Factor", 
    answerHeader: "Agreement", 
    viewSummaryButton: "Generate Comprehensive AI Strategy Report",
    phaseLabels: {
      phase1: "Phase 1: Initial Diagnosis",
      phase2: "Phase 2: Governance Assessment",
      phase3: "Phase 3: Improvement Opportunities"
    }
  },
  legend: { 
    title: "Node Legend:", 
    question: "Decision / Evaluation", 
    alert: "Critical Barrier", 
    intervention: "Proposed Strategy", 
    outcome: "Milestone / Result", 
    graphView: "Diagnostic Decision Tree (Zoom/Drag)", 
    exportPDF: "Save Map (PNG)" 
  },
  nodeTypes: { 
    question: "Evaluation", 
    reassessment: "Review", 
    alert: "Warning", 
    intervention: "Strategy", 
    outcome: "Result" 
  }
};
