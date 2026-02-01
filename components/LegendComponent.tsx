import React from 'react';
import { NodeType } from '../types';

interface LegendItemProps {
  icon: string;
  label: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

const LegendItem: React.FC<LegendItemProps> = ({ icon, label, bgColor, borderColor, textColor }) => (
  <div className={`flex items-center p-2 rounded border ${bgColor} ${borderColor} ${textColor} shadow-sm`}>
    <span className="text-xl mr-2">{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

interface LegendComponentProps {
  t: any; // Translation object
}

const LegendComponent: React.FC<LegendComponentProps> = ({ t }) => {
  return (
    <div className="mt-8 p-4 bg-slate-700 rounded-lg border border-slate-600">
      <h3 className="text-md font-semibold text-slate-200 mb-3">{t.legend.title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <LegendItem
          icon="❓"
          label={t.legend.question}
          bgColor="bg-slate-700" // Matches node style
          borderColor="border-teal-600"
          textColor="text-teal-400"
        />
        <LegendItem
          icon="❗"
          label={t.legend.alert}
          bgColor="bg-red-900/60" // Matches node style
          borderColor="border-red-500"
          textColor="text-red-300"
        />
        <LegendItem
          icon="💡"
          label={t.legend.intervention}
          bgColor="bg-sky-900/60" // Matches node style
          borderColor="border-sky-500"
          textColor="text-sky-300"
        />
        <LegendItem
          icon="🏁"
          label={t.legend.outcome}
          bgColor="bg-neutral-700" // Matches node style
          borderColor="border-neutral-500"
          textColor="text-neutral-200"
        />
      </div>
    </div>
  );
};

export default LegendComponent;