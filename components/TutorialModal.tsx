import React, { useState } from 'react';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: any; // Translation object
}

const TutorialModal: React.FC<TutorialModalProps> = ({ isOpen, onClose, t }) => {
  const [step, setStep] = useState(0);
  const tutorialSteps = t.tutorial.steps;

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < tutorialSteps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const isLastStep = step === tutorialSteps.length - 1;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
      <div className="bg-slate-800 border border-teal-700 rounded-2xl shadow-2xl max-w-2xl w-full text-white p-6 sm:p-8 transform transition-all animate-fade-in-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-teal-300">{tutorialSteps[step].title}</h2>
          <button onClick={onClose} aria-label={t.tutorial.close} className="text-slate-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-slate-300 mb-6 whitespace-pre-wrap">{tutorialSteps[step].content}</p>

        <div className="flex justify-center my-4">
          {tutorialSteps.map((_, index) => (
            <div key={index} className={`h-2 w-8 mx-1 rounded-full ${index === step ? 'bg-teal-500' : 'bg-slate-600'}`}></div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
          <button
            onClick={onClose}
            className="text-sm text-slate-400 hover:text-white transition-colors order-last sm:order-first mt-4 sm:mt-0"
          >
            {t.tutorial.skip}
          </button>
          <div className="flex gap-4">
            {step > 0 && (
              <button
                onClick={handleBack}
                className="px-6 py-2 bg-slate-600 rounded-lg hover:bg-slate-500 transition-colors font-medium"
              >
                {t.tutorial.back}
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors font-semibold text-white shadow-md focus:ring-2 focus:ring-teal-500"
            >
              {isLastStep ? t.tutorial.finish : t.tutorial.next}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;
