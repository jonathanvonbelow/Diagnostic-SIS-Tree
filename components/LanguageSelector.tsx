import React from 'react';

interface LanguageSelectorProps {
  onSelectLanguage: (lang: 'en' | 'es') => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelectLanguage }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black via-slate-900 to-teal-900 flex flex-col items-center justify-center z-50 text-white">
      <div className="text-center p-8 bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-2xl border border-teal-700">
        <h1 className="text-3xl font-bold mb-2 text-stone-100">Welcome / Bienvenido</h1>
        <p className="text-lg text-teal-300 mb-8">Please select your language / Por favor, seleccione su idioma</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => onSelectLanguage('en')}
            className="px-8 py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-transform transform hover:scale-105 focus:ring-2 focus:ring-teal-500 font-semibold text-lg shadow-lg"
          >
            English
          </button>
          <button
            onClick={() => onSelectLanguage('es')}
            className="px-8 py-4 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-transform transform hover:scale-105 focus:ring-2 focus:ring-sky-500 font-semibold text-lg shadow-lg"
          >
            Español
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
