import React, { useState, useEffect } from 'react';
import { Idea, TechPlan } from '../types';
import { generateTechArchitecture } from '../services/geminiService';
import { Icons } from './ui/Icons';

interface TechStackArchitectProps {
  idea: Idea;
  onBack: () => void;
}

const TechStackArchitect: React.FC<TechStackArchitectProps> = ({ idea, onBack }) => {
  const [plan, setPlan] = useState<TechPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchPlan = async () => {
      try {
        const result = await generateTechArchitecture(idea.description);
        if (mounted) {
          setPlan(result);
          setLoading(false);
        }
      } catch (e) {
        if (mounted) setLoading(false);
      }
    };
    fetchPlan();
    return () => { mounted = false; };
  }, [idea]);

  return (
    <div className="max-w-4xl mx-auto p-2">
      <button 
        onClick={onBack}
        className="mb-6 text-accent hover:text-text flex items-center gap-2 text-sm"
      >
        ← Back to Ideas
      </button>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-heading">Architecture Blueprint</h2>
        <p className="text-accent mt-1">For: <span className="text-primary">{idea.title}</span></p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-accent">
          <Icons.Tech className="animate-spin text-primary" size={48} />
          <p className="animate-pulse">Designing system architecture...</p>
        </div>
      ) : plan ? (
        <div className="grid gap-6">
          <div className="bg-surface border border-border p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-heading mb-4 border-b border-border pb-2">Full Stack Overview</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">Frontend</span>
                <p className="text-text font-mono text-sm bg-background p-3 rounded border border-border/50">
                  {plan.frontend}
                </p>
              </div>
              <div>
                <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">Backend</span>
                <p className="text-text font-mono text-sm bg-background p-3 rounded border border-border/50">
                  {plan.backend}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                <Icons.Sparkles size={20} />
              </div>
              <h3 className="text-lg font-semibold text-white">Gemini Integration Strategy</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {plan.aiIntegration}
            </p>
          </div>

          <div className="bg-surface border border-border p-6 rounded-xl border-l-4 border-l-primary">
            <h3 className="text-lg font-semibold text-heading mb-2">Architect's Notes</h3>
            <p className="text-accent italic">
              "{plan.architectureNotes}"
            </p>
          </div>
        </div>
      ) : (
         <div className="text-red-400">Failed to load plan. Please try again.</div>
      )}
    </div>
  );
};

export default TechStackArchitect;