
import React, { useState } from 'react';
import { SiteContext } from '../types';

interface ContextPanelProps {
  context: SiteContext;
  onContextChange: (newContext: SiteContext) => void;
  t: any;
}

const ContextPanel: React.FC<ContextPanelProps> = ({ context, onContextChange, t }) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateContext = (updates: Partial<SiteContext>) => {
    onContextChange({ ...context, ...updates });
  };

  const updateLandUse = (key: keyof SiteContext['landUse']) => {
    updateContext({
      landUse: { ...context.landUse, [key]: !context.landUse[key] }
    });
  };

  const toggleSpecies = (specie: string) => {
    const newSpecies = context.species.includes(specie)
      ? context.species.filter(s => s !== specie)
      : [...context.species, specie];
    updateContext({ species: newSpecies });
  };

  const speciesOptions = [
    'Pinus ponderosa', 'Pinus contorta', 'Pinus radiata', 
    'Pinus sylvestris', 'Pinus nigra', 'Pseudotsuga menziesii', 
    'Abies grandis', 'Picea sitchensis', 'Picea abies',
    'Larix decidua', 'Tsuga heterophylla', 'Cupressus macrocarpa',
    'Cedrus libani', 'Taxus baccata', 'Other'
  ];

  return (
    <div className="w-full max-w-5xl mb-6 transition-all duration-500">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-slate-800/80 backdrop-blur-md rounded-xl border border-teal-500/30 hover:bg-slate-700/80 transition-all shadow-lg group"
      >
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${isOpen ? 'bg-teal-500 text-white' : 'bg-teal-500/10 text-teal-400'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="font-bold text-slate-100">{t.context.title}</h3>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
              {isOpen ? t.context.collapse : t.context.expand} • {context.country || t.context.selectCountry} • {context.species.length} {t.context.speciesLabel}
            </p>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-2 p-6 bg-slate-900/90 backdrop-blur-xl rounded-xl border border-teal-500/20 shadow-2xl animate-fade-in-up grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Section 1: Geographical Context */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-teal-400 uppercase tracking-widest mb-2">{t.context.countryLabel}</label>
                <select 
                  value={context.country}
                  onChange={(e) => updateContext({ country: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                >
                  <option value="">{t.context.selectCountry}</option>
                  {t.context.countries.map((c: string) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-teal-400 uppercase tracking-widest mb-2">{t.context.regionLabel}</label>
                <select 
                  value={context.region}
                  onChange={(e) => updateContext({ region: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                >
                  <option value="">{t.context.selectRegion}</option>
                  {t.context.regions.map((r: string) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-teal-400 uppercase tracking-widest mb-2">{t.context.placeLabel}</label>
              <input 
                type="text"
                value={context.specificLocation}
                onChange={(e) => updateContext({ specificLocation: e.target.value })}
                placeholder={t.context.placePlaceholder}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-teal-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-teal-400 uppercase tracking-widest mb-2">
                {t.context.stageLabel}: <span className="text-slate-200">{context.invasionStage}%</span>
              </label>
              <input 
                type="range" min="0" max="100" 
                value={context.invasionStage}
                onChange={(e) => updateContext({ invasionStage: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
              <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-500 uppercase">
                <span>{t.context.stageStart}</span>
                <span>{t.context.stageEnd}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-teal-400 uppercase tracking-widest mb-3">{t.context.impactLabel}</label>
              <div className="flex p-1 bg-slate-800 rounded-xl border border-slate-700">
                {(['low', 'medium', 'high'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => updateContext({ impactLevel: level })}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                      context.impactLevel === level 
                        ? 'bg-teal-600 text-white shadow-lg' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t.context.impactLevels[level]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Biological & Social Context */}
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-teal-400 uppercase tracking-widest mb-3">{t.context.speciesHeader}</label>
              <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-teal-900">
                {speciesOptions.map(s => (
                  <button
                    key={s}
                    onClick={() => toggleSpecies(s)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${
                      context.species.includes(s)
                        ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-[0_0_10px_rgba(20,184,166,0.2)]'
                        : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-500'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-teal-400 uppercase tracking-widest mb-3">{t.context.landUseLabel}</label>
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(context.landUse).map((key) => (
                  <label key={key} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700 cursor-pointer hover:border-teal-500/50 transition-all">
                    <span className="text-xs font-semibold text-slate-300">{t.context.landUseOptions[key]}</span>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={context.landUse[key as keyof SiteContext['landUse']]} 
                        onChange={() => updateLandUse(key as keyof SiteContext['landUse'])}
                        className="sr-only peer" 
                      />
                      <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
               <label className="block text-xs font-bold text-teal-400 uppercase tracking-widest mb-2">{t.context.notesLabel}</label>
               <textarea 
                 value={context.additionalNotes}
                 onChange={(e) => updateContext({ additionalNotes: e.target.value })}
                 placeholder={t.context.notesPlaceholder}
                 className="w-full h-16 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg p-3 text-xs outline-none focus:ring-2 focus:ring-teal-500 resize-none"
               />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextPanel;
