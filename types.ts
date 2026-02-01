
export enum NodeType {
  QUESTION = 'QUESTION',
  ALERT = 'ALERT',
  INTERVENTION = 'INTERVENTION',
  OUTCOME = 'OUTCOME',
  REASSESSMENT = 'REASSESSMENT',
}

export interface SiteContext {
  country: string;
  specificLocation: string;
  region: string;
  species: string[];
  invasionStage: number; // 0-100
  landUse: {
    protectedArea: boolean;
    forestry: boolean;
    urbanInterface: boolean;
    agriculture: boolean;
  };
  impactLevel: 'low' | 'medium' | 'high';
  additionalNotes: string;
}

export interface TreeNode {
  id: string;
  type: NodeType;
  text: string;
  details?: string;
  yesNodeId?: string;
  noNodeId?: string;
  nextNodeId?: string;
  position?: { x: number; y: number };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export interface HistoryStep {
  nodeId: string;
  nodeText: string;
  nodeType: NodeType;
  answerValue?: number; // 0 to 100 ranking
  answerLabel?: string; // e.g. "Likely No" to "Likely Yes"
}
