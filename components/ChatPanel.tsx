
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}
interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}
interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
}

const PaperAirplaneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
  </svg>
);

const UserCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.5 13.5h.008v.008h-.008v-.008Z" />
</svg>
);

const XMarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

const MicrophoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19v3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 22h8" />
  </svg>
);

const StopIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M5.25 6.375a2.125 2.125 0 0 1 2.125-2.125h9.25a2.125 2.125 0 0 1 2.125 2.125v9.25a2.125 2.125 0 0 1-2.125 2.125h-9.25a2.125 2.125 0 0 1-2.125-2.125v-9.25Z" />
  </svg>
);

const DocumentArrowDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);


interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onExportChat: () => void;
  isLoading: boolean;
  currentNodeText: string;
  onClose: () => void;
  t: any;
  expanded?: boolean;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ messages, onSendMessage, onExportChat, isLoading, currentNodeText, onClose, t, expanded = false }) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const speechRecognition = useRef<SpeechRecognition | null>(null);
  const initialInputRef = useRef<string>('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      console.warn("Speech Recognition API not supported in this browser.");
      return;
    }

    const recognition: SpeechRecognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = t.langCode;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        alert(t.chat.micPermission);
      }
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      setInput(initialInputRef.current + transcript);
    };

    speechRecognition.current = recognition;

    return () => {
      if (speechRecognition.current) {
        speechRecognition.current.stop();
      }
    };
  }, [t.langCode, t.chat.micPermission]);

  const handleToggleListening = () => {
    if (!speechRecognition.current) return;

    if (isListening) {
      speechRecognition.current.stop();
    } else {
      initialInputRef.current = input ? input + ' ' : '';
      speechRecognition.current.start();
    }
  };


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className={`flex flex-col bg-slate-800 rounded-xl shadow-2xl border border-teal-700 overflow-hidden transition-all duration-300 ${expanded ? 'w-full' : 'h-full'}`}>
      <div className="p-4 border-b border-teal-700 flex justify-between items-center bg-slate-800/80 backdrop-blur-sm sticky top-0 z-10">
        <h3 className="text-xl font-bold text-teal-300 flex items-center">
            <SparklesIcon className="w-6 h-6 mr-3 text-teal-400" />
            {t.chat.title}
        </h3>
        <div className="flex items-center space-x-4">
          {messages.length > 0 && (
            <button 
              onClick={onExportChat} 
              className="text-teal-400 hover:text-teal-300 transition-all p-2 rounded-lg hover:bg-teal-500/10 flex items-center space-x-2"
              title={t.chat.export}
              aria-label={t.chat.ariaExport}
            >
              <DocumentArrowDownIcon className="w-6 h-6" />
              <span className="hidden sm:inline text-sm font-semibold">{t.chat.export}</span>
            </button>
          )}
          {!expanded && (
            <button onClick={onClose} className="lg:hidden text-teal-400 hover:text-teal-300 transition-colors">
              <XMarkIcon className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
      
      <div className="px-6 py-3 border-b border-teal-800/30 bg-slate-900/40">
        <p className="text-sm text-slate-400 italic">
          <span className="font-bold text-teal-500/80 uppercase tracking-wider text-[10px] mr-2 not-italic">{t.chat.contextLabel}</span> 
          "{currentNodeText.substring(0, 100)}{currentNodeText.length > 100 ? '...' : ''}"
        </p>
      </div>

      <div className={`flex-grow overflow-y-auto p-6 space-y-6 bg-slate-900/20 scrollbar-thin scrollbar-thumb-teal-900 ${expanded ? 'min-h-[400px] max-h-[600px] lg:min-h-[500px]' : 'max-h-[calc(100vh-3rem)]'}`}>
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4 py-20">
            <SparklesIcon className="w-16 h-16 opacity-10" />
            <p className="text-lg font-medium opacity-40">{t.chat.placeholder}</p>
          </div>
        )}
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] lg:max-w-[75%] p-4 rounded-2xl shadow-lg transition-all ${
                msg.sender === 'user'
                  ? 'bg-teal-600 text-white rounded-br-none'
                  : 'bg-slate-700 text-slate-200 rounded-bl-none border border-teal-900/30'
              }`}
            >
              <div className="flex items-center mb-2">
                {msg.sender === 'user' ? (
                  <UserCircleIcon className="w-5 h-5 mr-2 text-teal-200" />
                ) : (
                  <SparklesIcon className="w-5 h-5 mr-2 text-teal-400" />
                )}
                <span className="text-xs font-bold uppercase tracking-widest opacity-80">
                  {msg.sender === 'user' ? t.chat.user : t.chat.ai}
                </span>
              </div>
              <p className="text-base leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              <div className="flex justify-end mt-2">
                <span className="text-[10px] font-mono opacity-50">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-4 rounded-2xl bg-slate-700 text-slate-200 rounded-bl-none border border-teal-900/30 animate-pulse">
               <div className="flex items-center mb-2">
                 <SparklesIcon className="w-5 h-5 mr-2 text-teal-400" />
                 <span className="text-xs font-bold uppercase tracking-widest opacity-80">{t.chat.ai}</span>
               </div>
              <div className="flex space-x-1 items-center">
                 <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                 <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                 <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></div>
                 <span className="ml-2 text-sm italic opacity-60">{t.chat.typing}</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-6 border-t border-teal-700/50 bg-slate-800/50">
        <div className="flex items-center space-x-4 max-w-4xl mx-auto">
          <div className="relative flex-grow">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? t.chat.listening : t.chat.placeholder}
              className="w-full p-4 pr-12 border border-teal-700 rounded-xl focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all bg-slate-900 text-slate-100 placeholder-slate-500 shadow-inner"
              disabled={isLoading || isListening}
            />
          </div>
          
           {speechRecognition.current && (
            <button
              type="button"
              onClick={handleToggleListening}
              disabled={isLoading}
              className={`p-4 rounded-xl transition-all focus:ring-4 focus:ring-teal-500/20 shadow-lg disabled:bg-slate-700 disabled:text-slate-500 ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-slate-700 text-teal-400 hover:bg-slate-600 hover:text-teal-300'
              }`}
              title={isListening ? t.chat.stopRecording : t.chat.startRecording}
              aria-label={isListening ? t.chat.stopRecording : t.chat.startRecording}
            >
              {isListening ? <StopIcon className="w-6 h-6" /> : <MicrophoneIcon className="w-6 h-6" />}
            </button>
          )}
          
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-4 bg-teal-600 text-white rounded-xl hover:bg-teal-500 disabled:bg-slate-700 disabled:text-slate-500 transition-all focus:ring-4 focus:ring-teal-500/20 shadow-lg flex items-center justify-center min-w-[60px]"
          >
            <PaperAirplaneIcon className="w-6 h-6" />
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-500 mt-4 uppercase tracking-[0.2em]">{t.footer}</p>
      </form>
    </div>
  );
};

export default ChatPanel;
