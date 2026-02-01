
import { TreeNode, NodeType } from '../types';

export const INITIAL_NODE_ID_EN = 'Q1';

export const DIAGNOSTIC_TREE_DATA_EN: Record<string, TreeNode> = {
  Q1: { 
    id: 'Q1', 
    type: NodeType.QUESTION, 
    text: "Does the current management reflect the critical stages of biological invasion?", 
    details: "This evaluation checks if the local strategy acknowledges the stages from arrival and establishment to rapid spread. Effective governance must adapt its tools depending on whether the invasion is initial or widespread.",
    position: { x: 500, y: 50 }, 
    yesNodeId: 'Q2', 
    noNodeId: 'I1' 
  },
  Q2: { 
    id: 'Q2', 
    type: NodeType.QUESTION, 
    text: "Are diagnostic indicators (density, expansion, fire risk) prioritized for assessment?", 
    details: "Using specific indicators allows for a measurable baseline. If these are not prioritized, management becomes reactive rather than evidence-based.",
    position: { x: 300, y: 150 }, 
    yesNodeId: 'Q5', 
    noNodeId: 'I2' 
  },
  I1: { 
    id: 'I1', 
    type: NodeType.INTERVENTION, 
    text: "Align strategy with ecological invasion stages.", 
    details: "Restructure the management plan to include specific protocols for early detection vs. long-term control.",
    position: { x: 700, y: 150 }, 
    nextNodeId: 'Q2' 
  },
  I2: { 
    id: 'I2', 
    type: NodeType.INTERVENTION, 
    text: "Implement standardized ecological monitoring.", 
    details: "Define a set of key performance indicators (KPIs) like annual expansion rate and fuel load near urban interfaces.",
    position: { x: 200, y: 250 }, 
    nextNodeId: 'Q5' 
  },
  Q5: { 
    id: 'Q5', 
    type: NodeType.QUESTION, 
    text: "Is there a functional hierarchy to address governance barriers (economic, legal, social)?", 
    details: "Effective governance requires identifying which barrier is the 'bottleneck'. For example, having funds (economic) is useless if the law (legal) prevents intervention on private land.",
    position: { x: 500, y: 350 }, 
    yesNodeId: 'O1', 
    noNodeId: 'I4' 
  },
  O1: { 
    id: 'O1', 
    type: NodeType.OUTCOME, 
    text: "Strategic Alignment Achieved.", 
    details: "The system shows strong integration between ecological needs and administrative capacity.",
    position: { x: 300, y: 450 }, 
    nextNodeId: 'Q10' 
  },
  I4: { 
    id: 'I4', 
    type: NodeType.INTERVENTION, 
    text: "Establish a Multi-Sectoral Coordination Board.", 
    details: "Create a platform where legal, financial, and ecological experts can resolve cross-cutting barriers.",
    position: { x: 700, y: 450 }, 
    nextNodeId: 'Q10' 
  },
  Q10: { 
    id: 'Q10', 
    type: NodeType.QUESTION, 
    text: "Are sustainable financing and economic incentives utilized?", 
    details: "Management fails if it depends on one-time grants. Sustainable governance uses incentives (tax breaks, restoration subsidies) to ensure long-term participation.",
    position: { x: 500, y: 600 }, 
    yesNodeId: 'O2', 
    noNodeId: 'I10' 
  },
  I10: { 
    id: 'I10', 
    type: NodeType.INTERVENTION, 
    text: "Develop long-term financial mechanisms.", 
    details: "Propose legislative or private-public partnerships to fund permanent control and restoration efforts.",
    position: { x: 700, y: 750 }, 
    nextNodeId: 'O2' 
  },
  O2: { 
    id: 'O2', 
    type: NodeType.OUTCOME, 
    text: "Integrated Governance Model.", 
    details: "Conclusion reached. Use the Path Summary to audit your decisions and consult the AI for final strategic refinements.",
    position: { x: 500, y: 900 } 
  },
};

export const translationsEN = {
  langCode: 'en-US',
  appTitle: "Conifer Invasion Governance System",
  appSubtitle: "Interactive expert diagnostic tool for conifer management.",
  footer: "SIS Governance. Powered by Senior AI Insights.",
  context: {
    title: "Site Characterization",
    expand: "Define Context",
    collapse: "Hide Context",
    countryLabel: "Country",
    selectCountry: "Select country...",
    countries: ["Argentina", "Chile", "Uruguay", "Brazil", "USA", "Canada", "Spain", "France", "New Zealand", "Australia"],
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
    speciesHeader: "Priority Conifer Species",
    speciesLabel: "species selected",
    landUseLabel: "Land Use / Zoning",
    landUseOptions: {
      protectedArea: "Protected Area",
      forestry: "Commercial Forest",
      urbanInterface: "Urban Interface",
      agriculture: "Agriculture/Pasture"
    },
    notesLabel: "Additional Context",
    notesPlaceholder: "Specific site challenges, local regulations..."
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
      { title: "Governance Diagnosis", content: "Welcome to the SIS Governance tool.\n\nThis application helps you audit conifer invasion strategies using a structured decision tree and Expert AI assistance." },
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
  node: { showDetails: "Learn More", hideDetails: "Hide Info", yes: "Yes / High", no: "No / Low", continue: "Submit Evaluation", back: "Undo", restart: "New Diagnosis", export: "Download Report", endNodeMessage: "Diagnostic complete. Review your path summary below." },
  path: { summary: "Audit Path Summary:", questionHeader: "Factor", answerHeader: "Agreement", viewSummaryButton: "Generate Comprehensive AI Strategy Report" },
  legend: { title: "Node Legend:", question: "Management Factor", alert: "Critical Barrier", intervention: "Proposed Strategy", outcome: "Milestone Reached", graphView: "Diagnostic Decision Tree (Zoom/Drag)", exportPDF: "Save Map (PNG)" },
  nodeTypes: { question: "Evaluation", reassessment: "Review", alert: "Warning", intervention: "Strategy", outcome: "Result" }
};
