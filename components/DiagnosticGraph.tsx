
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { TreeNode, NodeType, HistoryStep } from '../types';
import html2canvas from 'html2canvas';

interface DiagnosticGraphProps {
  nodes: Record<string, TreeNode>;
  history: HistoryStep[];
  activeNodeId: string;
  onNodeClick: (id: string) => void;
  t: any;
  showStartInstruction?: boolean;
}

const getDynamicNodeStyle = (value: number | undefined) => {
  if (value === undefined) {
    return {
      fill: 'rgba(15, 23, 42, 0.4)',
      stroke: '#334155',
      progressColor: '#334155'
    };
  }

  if (value < 50) {
    const ratio = value / 50;
    const r = Math.round(244 + (148 - 244) * ratio);
    const g = Math.round(63 + (163 - 63) * ratio);
    const b = Math.round(94 + (184 - 94) * ratio);
    const color = `rgb(${r}, ${g}, ${b})`;
    return { fill: `${color}44`, stroke: color, progressColor: color };
  } else {
    const ratio = (value - 50) / 50;
    const r = Math.round(148 + (20 - 148) * ratio);
    const g = Math.round(163 + (184 - 163) * ratio);
    const b = Math.round(184 + (166 - 184) * ratio);
    const color = `rgb(${r}, ${g}, ${b})`;
    return { fill: `${color}44`, stroke: color, progressColor: color };
  }
};

const getNodeIcon = (type: NodeType) => {
  switch (type) {
    case NodeType.QUESTION:
    case NodeType.REASSESSMENT: return '❓';
    case NodeType.ALERT: return '❗';
    case NodeType.INTERVENTION: return '💡';
    case NodeType.OUTCOME: return '🏁';
    default: return 'ℹ️';
  }
};

const DiagnosticGraph: React.FC<DiagnosticGraphProps> = ({ nodes, history, activeNodeId, onNodeClick, t, showStartInstruction }) => {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const dragStart = useRef({ x: 0, y: 0 });
  const fullExportRef = useRef<HTMLDivElement>(null);

  const nodeIds = Object.keys(nodes);
  
  const historyMap = useMemo(() => {
    const map = new Map<string, number>();
    history.forEach(h => map.set(h.nodeId, h.answerValue ?? 50));
    return map;
  }, [history]);

  const bounds = useMemo(() => {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    nodeIds.forEach(id => {
      const pos = nodes[id].position || { x: 500, y: 300 };
      minX = Math.min(minX, pos.x);
      minY = Math.min(minY, pos.y);
      maxX = Math.max(maxX, pos.x);
      maxY = Math.max(maxY, pos.y);
    });
    const padding = 120;
    return { 
      minX: minX - padding, 
      minY: minY - padding, 
      width: (maxX - minX) + padding * 2, 
      height: (maxY - minY) + padding * 2 
    };
  }, [nodes, nodeIds]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isExporting) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isExporting) return;
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      });
    }
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (isExporting) return;
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.min(Math.max(prev * delta, 0.1), 3));
  };

  const handleExportPNG = async () => {
    if (!fullExportRef.current) return;
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 200));
    try {
      const canvas = await html2canvas(fullExportRef.current, {
        backgroundColor: '#020617',
        scale: 3,
        useCORS: true,
        logging: false,
        width: bounds.width,
        height: bounds.height
      });
      const link = document.createElement('a');
      link.download = `Diagnostic_Network_${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('PNG Export Error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const renderNodesAndLines = (viewBox: string, transformString: string, isInteractive: boolean) => (
    <svg 
      width="100%" 
      height="100%" 
      viewBox={viewBox} 
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <g transform={transformString}>
        {nodeIds.map(id => {
          const node = nodes[id];
          const targets = [node.yesNodeId, node.noNodeId, node.nextNodeId].filter(Boolean);
          return targets.map(toId => {
            const from = nodes[id].position || { x: 500, y: 300 };
            const to = nodes[toId!].position || { x: 500, y: 300 };
            const isVisited = historyMap.has(id);
            const value = historyMap.get(id);

            return (
              <line
                key={`conn-${id}-${toId}`}
                x1={from.x} y1={from.y}
                x2={to.x} y2={to.y}
                style={{ stroke: isVisited ? getDynamicNodeStyle(value).stroke : '#1e293b' }}
                className={`transition-all duration-500 opacity-30 ${isVisited ? 'opacity-70' : ''}`}
                strokeWidth={isVisited ? 4 : 2}
              />
            );
          });
        })}

        {nodeIds.map(id => {
          const node = nodes[id];
          const pos = node.position || { x: 500, y: 300 };
          const isActive = activeNodeId === id;
          const isHovered = hoveredNodeId === id;
          const value = historyMap.get(id);
          const isStartNode = id === 'Q1' && showStartInstruction;
          
          const { fill, stroke, progressColor } = getDynamicNodeStyle(value);
          const size = isActive ? 42 : 36;
          const radius = size / 2;

          const circumference = 2 * Math.PI * (radius + 4);
          const offsetRing = value !== undefined ? circumference - (value / 100) * circumference : circumference;

          return (
            <g 
              key={`node-${id}`} 
              className="cursor-pointer transition-all duration-300"
              onClick={() => onNodeClick(id)}
              onMouseEnter={() => isInteractive && setHoveredNodeId(id)}
              onMouseLeave={() => isInteractive && setHoveredNodeId(null)}
            >
              {/* Throb effect for start node */}
              {isStartNode && (
                <circle
                  cx={pos.x} cy={pos.y}
                  r={radius + 15}
                  className="fill-teal-500/20 animate-ping"
                />
              )}

              {/* Progress Ring */}
              {value !== undefined && (
                <circle
                  cx={pos.x} cy={pos.y}
                  r={radius + 4}
                  fill="none"
                  stroke={progressColor}
                  strokeWidth={3}
                  strokeDasharray={circumference}
                  strokeDashoffset={offsetRing}
                  strokeLinecap="round"
                  transform={`rotate(-90 ${pos.x} ${pos.y})`}
                />
              )}

              <rect
                x={pos.x - radius} y={pos.y - radius}
                width={size} height={size}
                rx={12}
                style={{ fill, stroke: (isActive || isHovered) ? '#2dd4bf' : stroke }}
                className={`stroke-2 transition-all duration-300 ${isStartNode ? 'filter-glow' : ''}`}
              />
              
              <text
                x={pos.x} y={pos.y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[16px] pointer-events-none select-none"
              >
                {getNodeIcon(node.type)}
              </text>

              {isStartNode && (
                <g transform={`translate(${pos.x + 25}, ${pos.y - 45})`}>
                  <rect width="120" height="30" rx="8" className="fill-teal-600/90 shadow-lg" />
                  <text x="60" y="20" textAnchor="middle" className="fill-white text-[10px] font-bold uppercase tracking-widest">
                    {t.nodeTypes.question}: Click!
                  </text>
                  <path d="M0 25 L-10 35 L5 25 Z" className="fill-teal-600/90" transform="translate(10, 0)" />
                </g>
              )}

              <text
                x={pos.x} y={pos.y + radius + 18}
                textAnchor="middle"
                className={`text-[10px] font-mono fill-slate-500 font-bold pointer-events-none select-none ${isActive ? 'fill-teal-300' : ''}`}
              >
                {id}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );

  return (
    <div 
      className="w-full h-full relative cursor-grab active:cursor-grabbing bg-[radial-gradient(circle_at_center,_rgba(15,23,42,0.5)_0%,_rgba(2,6,23,1)_100%)]"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => { setIsDragging(false); setHoveredNodeId(null); }}
      onWheel={handleWheel}
    >
      <div className="absolute top-4 left-4 z-10 flex space-x-2">
         <button onClick={() => setZoom(z => Math.min(z * 1.2, 3))} className="bg-slate-800 hover:bg-slate-700 text-white w-8 h-8 rounded border border-slate-700 font-bold shadow-lg transition-colors">+</button>
         <button onClick={() => setZoom(z => Math.max(z * 0.8, 0.1))} className="bg-slate-800 hover:bg-slate-700 text-white w-8 h-8 rounded border border-slate-700 font-bold shadow-lg transition-colors">-</button>
         <button onClick={handleExportPNG} className="bg-teal-700 hover:bg-teal-600 text-white px-3 h-8 rounded border border-teal-800 text-[10px] font-bold uppercase tracking-tighter shadow-lg transition-colors">PNG</button>
      </div>

      <div 
        style={{ position: 'absolute', top: '-10000px', width: bounds.width, height: bounds.height }}
        ref={fullExportRef}
      >
        {renderNodesAndLines(`${bounds.minX} ${bounds.minY} ${bounds.width} ${bounds.height}`, "translate(0,0) scale(1)", false)}
      </div>

      {renderNodesAndLines("0 0 1000 600", `translate(${offset.x}, ${offset.y}) scale(${zoom})`, true)}

      {hoveredNodeId && nodes[hoveredNodeId] && (
        <div 
          className="fixed z-[100] pointer-events-none bg-slate-900/95 border border-teal-500/40 rounded-xl p-3 shadow-2xl backdrop-blur-md max-w-xs transition-opacity duration-200"
          style={{ left: mousePos.x + 15, top: mousePos.y + 15 }}
        >
          <p className="text-xs text-slate-100 font-medium leading-relaxed">{nodes[hoveredNodeId].text}</p>
        </div>
      )}
    </div>
  );
};

export default DiagnosticGraph;
