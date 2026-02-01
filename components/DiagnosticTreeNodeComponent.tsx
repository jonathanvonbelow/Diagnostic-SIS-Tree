
import React, { useState, useEffect } from 'react';
import { TreeNode, NodeType, HistoryStep } from '../types';

interface DiagnosticTreeNodeProps {
  node: TreeNode;
  history: HistoryStep[];
  onNavigateValue: (nodeId: string | undefined, value: number) => void;
  onNavigateDirect: (nodeId: string | undefined) => void;
  onBack: () => void;
  onRestart: () => void;
  onExport: () => void;
  onClose: () => void;
  canGoBack: boolean;
  t: any;
}

const getNodeStyling = (type: NodeType) => {
  switch (type) {
    case NodeType.QUESTION:
    case NodeType.REASSESSMENT:
      return { bgColor: 'bg-slate-800', borderColor: 'border-teal-500/50', textColor: 'text-slate-100', titleColor: 'text-teal-400', accentBg: 'bg-teal-500', icon: '❓', iconBg: 'bg-teal-500/10' };
    case NodeType.ALERT:
      return { bgColor: 'bg-slate-800', borderColor: 'border-rose-500/50', textColor: 'text-rose-50', titleColor: 'text-rose-400', accentBg: 'bg-rose-500', icon: '❗', iconBg: 'bg-rose-500/10' };
    case NodeType.INTERVENTION:
      return { bgColor: 'bg-slate-800', borderColor: 'border-blue-500/50', textColor: 'text-blue-50', titleColor: 'text-blue-400', accentBg: 'bg-blue-500', icon: '💡', iconBg: 'bg-blue-500/10' };
    case NodeType.OUTCOME:
      return { bgColor: 'bg-slate-800', borderColor: 'border-emerald-500/50', textColor: 'text-emerald-50', titleColor: 'text-emerald-400', accentBg: 'bg-emerald-500', icon: '🏁', iconBg: 'bg-emerald-500/10' };
    default:
      return { bgColor: 'bg-slate-800', borderColor: 'border-slate-500/50', textColor: 'text-slate-100', titleColor: 'text-slate-400', accentBg: 'bg-slate-500', icon: 'ℹ️', iconBg: 'bg-slate-500/10' };
  }
};

const DiagnosticTreeNodeComponent: React.FC<DiagnosticTreeNodeProps> = ({
  node,
  history,
  onNavigateValue,
  onNavigateDirect,
  onBack,
  onRestart,
  onExport,
  onClose,
  canGoBack,
  t,
}) => {
  const { bgColor, borderColor, textColor, titleColor, icon, iconBg, accentBg } = getNodeStyling(node.type);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);

  useEffect(() => {
    setIsDetailsVisible(false);
    setSliderValue(50);
  }, [node.id]);

  const isQuestion = node.type === NodeType.QUESTION || node.type === NodeType.REASSESSMENT;
  const isEndNode = !node.yesNodeId && !node.noNodeId && !node.nextNodeId;

  const getRankingData = (val: number) => {
    if (val < 20) return t.ranking.noStrong;
    if (val < 45) return t.ranking.noWeak;
    if (val < 55) return t.ranking.neutral;
    if (val < 80) return t.ranking.yesWeak;
    return t.ranking.yesStrong;
  };

  const handleNextWithSlider = () => {
    const targetId = sliderValue >= 50 ? node.yesNodeId : node.noNodeId;
    onNavigateValue(targetId, sliderValue);
  };

  const currentRanking = getRankingData(sliderValue);

  return (
    <div className={`relative overflow-hidden p-6 rounded-2xl border-2 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all ${bgColor} ${borderColor} max-h-[85vh] overflow-y-auto`}>
      <div className={`absolute top-0 left-0 w-full h-1.5 ${accentBg}`} />
      
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white transition-colors"
        aria-label={t.tutorial.close}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="flex items-start justify-between mb-4 mt-2">
        <h2 className={`text-2xl font-bold ${titleColor} flex items-center`}>
          <div className={`p-2 rounded-lg mr-3 flex items-center justify-center ${iconBg}`}>
            <span className="text-2xl">{icon}</span>
          </div>
          {t.nodeTypes[node.type.toLowerCase()]}
        </h2>
        <span className="text-[10px] font-mono text-slate-500 bg-slate-900/50 px-2 py-1 rounded-md">ID: {node.id}</span>
      </div>

      <p className={`text-xl leading-relaxed mb-6 font-medium ${textColor}`}>{node.text}</p>
      
      {node.details && (
        <div className="mb-6">
          <button
            onClick={() => setIsDetailsVisible(!isDetailsVisible)}
            className="w-full text-left px-5 py-3 text-sm font-bold rounded-xl flex justify-between items-center transition-all bg-teal-500/10 border border-teal-500/20 text-teal-300 hover:bg-teal-500/20"
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
              {isDetailsVisible ? t.node.hideDetails : t.node.showDetails}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 transition-transform ${isDetailsVisible ? 'rotate-180' : ''}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          {isDetailsVisible && (
            <div className="mt-2 text-sm leading-relaxed p-5 rounded-xl bg-slate-900/60 text-slate-300 border border-white/5 animate-fade-in shadow-inner">
              <p className="whitespace-pre-wrap">{node.details}</p>
            </div>
          )}
        </div>
      )}

      {isQuestion ? (
        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500 px-1">
              <span>{t.node.no}</span>
              <span className={`transition-colors duration-300 ${sliderValue > 55 ? 'text-teal-400' : sliderValue < 45 ? 'text-rose-400' : 'text-slate-300'}`}>
                {currentRanking.label} ({sliderValue}%)
              </span>
              <span>{t.node.yes}</span>
            </div>
            <input
              type="range" min="0" max="100" value={sliderValue}
              onChange={(e) => setSliderValue(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-teal-500"
            />
            <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 min-h-[4rem] transition-all duration-300">
              <p className="text-sm text-slate-400 italic leading-snug">
                {currentRanking.desc}
              </p>
            </div>
          </div>
          <button
            onClick={handleNextWithSlider}
            className="w-full px-10 py-4 bg-teal-600 text-white rounded-xl hover:bg-teal-500 transition-all font-bold shadow-lg flex items-center justify-center space-x-2"
          >
            <span>{t.node.continue}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
        </div>
      ) : node.nextNodeId ? (
        <button
          onClick={() => onNavigateDirect(node.nextNodeId)}
          className="w-full px-10 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all font-bold shadow-lg flex items-center justify-center space-x-2"
        >
          <span>{t.node.continue}</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
      ) : isEndNode && (
        <div className={`italic text-slate-400 p-4 rounded-xl bg-slate-900/30 border border-white/5 font-medium`}>
          {t.node.endNodeMessage}
        </div>
      )}

      <div className="mt-12 pt-6 border-t border-slate-700/50 flex flex-wrap gap-3 items-center">
        {canGoBack && (
          <button onClick={onBack} className="px-6 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 font-semibold border border-slate-600/50 transition-colors">
            {t.node.back}
          </button>
        )}
        <button onClick={onRestart} className="px-6 py-2 bg-rose-900/40 text-rose-300 rounded-lg hover:bg-rose-900/60 font-semibold transition-colors border border-rose-500/30">
          {t.node.restart}
        </button>
      </div>
    </div>
  );
};

export default DiagnosticTreeNodeComponent;
