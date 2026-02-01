
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { TreeNode, ChatMessage, NodeType, HistoryStep, SiteContext } from './types';
import DiagnosticTreeNodeComponent from './components/DiagnosticTreeNodeComponent';
import ChatPanel from './components/ChatPanel';
import LegendComponent from './components/LegendComponent';
import LanguageSelector from './components/LanguageSelector';
import TutorialModal from './components/TutorialModal';
import DiagnosticGraph from './components/DiagnosticGraph';
import ContextPanel from './components/ContextPanel';
import { getAiExplanation, getAiSummaryFeedback } from './services/geminiService';
import { translationsEN, DIAGNOSTIC_TREE_DATA_EN, INITIAL_NODE_ID_EN } from './i18n/en';
import { translationsES, DIAGNOSTIC_TREE_DATA_ES, INITIAL_NODE_ID_ES } from './i18n/es';

const TreeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 2.25H2.25A2.25 2.25 0 0 0 0 4.5v15A2.25 2.25 0 0 0 2.25 21.75h15a2.25 2.25 0 0 0 2.25-2.25V13.5m-3-3.75V6.75A2.25 2.25 0 0 0 16.5 4.5h-6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25h6.75a2.25 2.25 0 0 0 2.25-2.25V13.5m-3-3.75h-1.5m1.5 0v-1.5m0 1.5L12 9m3 3L12 9m0 0L9 12m3-3v1.5m0 0H9m3.75-3.75L12 6.75m0 0L10.125 5.25M12 6.75V5.25m0 1.5L13.875 5.25m-3.75 0h.008v.008h-.008V5.25Z" />
  </svg>
);

type Language = 'en' | 'es';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isEvaluationOpen, setIsEvaluationOpen] = useState(false);

  const [currentNodeId, setCurrentNodeId] = useState<string>('');
  const [history, setHistory] = useState<HistoryStep[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  const [siteContext, setSiteContext] = useState<SiteContext>({
    country: '',
    specificLocation: '',
    region: '',
    species: [],
    invasionStage: 10,
    landUse: {
      protectedArea: false,
      forestry: false,
      urbanInterface: false,
      agriculture: false,
    },
    impactLevel: 'low',
    additionalNotes: ''
  });
  
  const chatRef = useRef<HTMLDivElement>(null);

  const { t, DIAGNOSTIC_TREE_DATA, INITIAL_NODE_ID } = lang === 'es' 
    ? { t: translationsES, DIAGNOSTIC_TREE_DATA: DIAGNOSTIC_TREE_DATA_ES, INITIAL_NODE_ID: INITIAL_NODE_ID_ES }
    : { t: translationsEN, DIAGNOSTIC_TREE_DATA: DIAGNOSTIC_TREE_DATA_EN, INITIAL_NODE_ID: INITIAL_NODE_ID_EN };

  useEffect(() => {
    if (lang) {
      setCurrentNodeId(INITIAL_NODE_ID);
      const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
      if (!hasSeenTutorial) {
        setShowTutorial(true);
      }
    }
  }, [lang, INITIAL_NODE_ID]);

  const handleSelectLanguage = (selectedLang: Language) => setLang(selectedLang);
  const handleCloseTutorial = () => { setShowTutorial(false); localStorage.setItem('hasSeenTutorial', 'true'); };
  
  const currentNode = DIAGNOSTIC_TREE_DATA[currentNodeId];

  const onNodeClick = useCallback((id: string) => {
    setCurrentNodeId(id);
    setIsEvaluationOpen(true);
  }, []);

  const navigateWithValue = useCallback((nodeId: string | undefined, val: number) => {
    const currentFullNode = DIAGNOSTIC_TREE_DATA[currentNodeId];
    if (!currentFullNode) return;

    setHistory(prev => [...prev, {
      nodeId: currentNodeId,
      nodeText: currentFullNode.text,
      nodeType: currentFullNode.type,
      answerValue: val
    }]);

    if (!nodeId || !DIAGNOSTIC_TREE_DATA[nodeId]) {
      setIsEvaluationOpen(false);
    } else {
      setCurrentNodeId(nodeId);
    }
  }, [currentNodeId, DIAGNOSTIC_TREE_DATA]);

  const navigateDirect = useCallback((nodeId: string | undefined) => {
    const currentFullNode = DIAGNOSTIC_TREE_DATA[currentNodeId];
    if (!currentFullNode) return;

    setHistory(prev => [...prev, {
      nodeId: currentNodeId,
      nodeText: currentFullNode.text,
      nodeType: currentFullNode.type
    }]);

    if (!nodeId || !DIAGNOSTIC_TREE_DATA[nodeId]) {
      setIsEvaluationOpen(false);
    } else {
      setCurrentNodeId(nodeId);
    }
  }, [currentNodeId, DIAGNOSTIC_TREE_DATA]);

  const handleBack = useCallback(() => {
    if (history.length > 0) {
      const lastStep = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setCurrentNodeId(lastStep.nodeId);
    }
  }, [history]);

  const handleRestart = useCallback(() => { 
    setHistory([]); 
    setCurrentNodeId(INITIAL_NODE_ID); 
    setChatMessages([]);
    setIsEvaluationOpen(false);
  }, [INITIAL_NODE_ID]);

  const handleViewSummary = useCallback(async () => {
    if (history.length === 0) return;
    setIsChatLoading(true);
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
    try {
      const summaryFeedback = await getAiSummaryFeedback(history, lang || 'en', siteContext);
      setChatMessages(prev => [...prev, {
        id: Date.now().toString() + 'summary',
        sender: 'ai',
        text: summaryFeedback,
        timestamp: new Date(),
      }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsChatLoading(false);
    }
  }, [history, lang, siteContext]);

  const handleExport = useCallback(() => {
    let content = `${t.appTitle}\n${"=".repeat(20)}\n\n`;
    content += `SITE CHARACTERIZATION:\n`;
    content += `- Country: ${siteContext.country}\n`;
    content += `- Specific Place: ${siteContext.specificLocation}\n`;
    content += `- Region: ${siteContext.region}\n`;
    content += `- Species: ${siteContext.species.join(', ')}\n`;
    content += `- Stage: ${siteContext.invasionStage}%\n`;
    content += `- Impact: ${siteContext.impactLevel}\n\n`;
    content += `DIAGNOSTIC PATH:\n`;
    history.forEach((step, i) => {
      content += `[${i + 1}] (${step.nodeId}) ${step.nodeText}\n`;
      if (step.answerValue !== undefined) content += `    Score: ${step.answerValue}%\n`;
    });
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Diagnostic_Report_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }, [history, t, siteContext]);

  const handleUserMessage = useCallback(async (userQuery: string) => {
    if (!userQuery.trim() || !lang) return;
    setChatMessages(prev => [...prev, { id: Date.now().toString() + 'user', sender: 'user', text: userQuery, timestamp: new Date() }]);
    setIsChatLoading(true);
    try {
      const aiResponseText = await getAiExplanation(userQuery, currentNode, lang, siteContext);
      setChatMessages(prev => [...prev, { id: Date.now().toString() + 'ai', sender: 'ai', text: aiResponseText, timestamp: new Date() }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { id: Date.now().toString() + 'error', sender: 'ai', text: t.chat.error, timestamp: new Date() }]);
    } finally { setIsChatLoading(false); }
  }, [currentNode, lang, t, siteContext]);

  if (!lang) return <LanguageSelector onSelectLanguage={handleSelectLanguage} />;
  
  if (!currentNode) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-teal-500">
        Loading Diagnostic data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-teal-950 flex flex-col items-center p-4">
      <TutorialModal isOpen={showTutorial} onClose={handleCloseTutorial} t={t} />
      
      <header className="w-full max-w-5xl mb-6 text-center">
        <div className="flex items-center justify-center space-x-3 mb-2">
           <TreeIcon className="w-12 h-12 text-teal-400" />
          <h1 className="text-4xl font-bold text-stone-100">{t.appTitle}</h1>
        </div>
        <p className="text-lg text-teal-300">{t.appSubtitle}</p>
      </header>

      <div className="w-full max-w-6xl flex flex-col gap-4 relative">
        
        <ContextPanel 
          context={siteContext} 
          onContextChange={setSiteContext} 
          t={t} 
        />

        <div className="relative w-full h-[600px] bg-slate-950 rounded-2xl border border-teal-900/40 shadow-inner overflow-hidden">
          <DiagnosticGraph 
            nodes={DIAGNOSTIC_TREE_DATA}
            history={history}
            activeNodeId={currentNodeId}
            onNodeClick={onNodeClick}
            t={t}
            showStartInstruction={history.length === 0}
          />

          {/* Evaluation Card Overlay */}
          {isEvaluationOpen && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
              <div className="w-full max-w-xl animate-scale-up">
                 <DiagnosticTreeNodeComponent
                    node={currentNode}
                    history={history}
                    onNavigateValue={navigateWithValue}
                    onNavigateDirect={navigateDirect}
                    onBack={handleBack}
                    onRestart={handleRestart}
                    onExport={handleExport}
                    onClose={() => setIsEvaluationOpen(false)}
                    canGoBack={history.length > 0}
                    t={t}
                  />
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChatPanel messages={chatMessages} onSendMessage={handleUserMessage} onExportChat={() => {}} isLoading={isChatLoading} currentNodeText={currentNode.text} onClose={() => {}} t={t} expanded={true} />
          </div>
          <div className="space-y-4">
             <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg border border-teal-800/30">
               <h3 className="text-lg font-bold text-teal-400 mb-4">{t.path.summary}</h3>
               <div className="max-h-[300px] overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-teal-900">
                  {history.length === 0 ? (
                    <p className="text-slate-500 italic text-sm">No steps taken yet.</p>
                  ) : (
                    history.map((step, idx) => (
                      <div key={idx} className="p-3 bg-slate-900/50 rounded-lg border border-slate-700/50 flex justify-between items-center text-sm">
                        <span className="text-slate-300 font-medium truncate max-w-[150px]">{step.nodeText}</span>
                        {step.answerValue !== undefined && (
                          <span className="text-teal-400 font-bold whitespace-nowrap">{step.answerValue}%</span>
                        )}
                      </div>
                    ))
                  )}
               </div>
               <button 
                onClick={handleViewSummary} 
                className="w-full mt-6 px-4 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold shadow-md transition-all disabled:opacity-50" 
                disabled={history.length === 0}
              >
                {t.path.viewSummaryButton}
              </button>
             </div>
             <LegendComponent t={t} />
          </div>
        </div>

      </div>
      <footer className="mt-12 mb-8 text-center text-sm text-teal-600/50">
        <p>&copy; {new Date().getFullYear()} {t.footer}</p>
      </footer>
    </div>
  );
};

export default App;
