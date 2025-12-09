import React, { useState } from 'react';
import { Track, Idea } from '../types';
import { generateHackathonIdea } from '../services/geminiService';
import { Icons } from './ui/Icons';

interface IdeaGeneratorProps {
  onIdeaSelected: (idea: Idea) => void;
}

const IdeaGenerator: React.FC<IdeaGeneratorProps> = ({ onIdeaSelected }) => {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(false);
  const [generatedIdea, setGeneratedIdea] = useState<Idea | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!selectedTrack) return;
    setLoading(true);
    setError(null);
    try {
      const idea = await generateHackathonIdea(selectedTrack);
      setGeneratedIdea(idea);
    } catch (e) {
      setError("Failed to generate idea. Please check your API Key and try again.");
    } finally {
      setLoading(false);
    }
  };

  const tracks = Object.values(Track);

  return (
    <div className="max-w-4xl mx-auto p-2">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-heading mb-2">Idea Accelerator</h2>
        <p className="text-accent">
          Use <span className="text-primary font-mono">gemini-3-pro-preview</span> to brainstorm breakthrough solutions.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {tracks.map((track) => {
          const Icon = Icons[track as keyof typeof Icons];
          return (
            <button
              key={track}
              onClick={() => setSelectedTrack(track)}
              className={`p-4 rounded-xl border transition-all duration-200 flex flex-col items-center gap-2
                ${selectedTrack === track 
                  ? 'bg-primary/20 border-primary text-heading ring-1 ring-primary' 
                  : 'bg-surface border-border hover:border-accent/50 text-accent hover:text-text'
                }`}
            >
              {Icon && <Icon size={24} />}
              <span className="font-medium">{track}</span>
            </button>
          );
        })}
      </div>

      <div className="flex justify-center mb-10">
        <button
          onClick={handleGenerate}
          disabled={!selectedTrack || loading}
          className={`
            px-8 py-3 rounded-full font-bold text-lg flex items-center gap-2 transition-all
            ${!selectedTrack || loading
              ? 'bg-surface text-accent cursor-not-allowed border border-border'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/30 active:scale-95'
            }
          `}
        >
          {loading ? (
            <>
              <Icons.Sparkles className="animate-spin" /> Thinking...
            </>
          ) : (
            <>
              <Icons.Sparkles /> Generate Concept
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-500/50 text-red-300 rounded-lg mb-6">
          {error}
        </div>
      )}

      {generatedIdea && (
        <div className="bg-surface border border-border rounded-xl p-6 md:p-8 animate-fade-in shadow-2xl">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-white">{generatedIdea.title}</h3>
            <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-mono uppercase">
              {selectedTrack}
            </div>
          </div>
          
          <p className="text-lg text-text mb-6 leading-relaxed">
            {generatedIdea.description}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-background/50 p-4 rounded-lg border border-border/50">
              <h4 className="text-primary font-semibold mb-3 flex items-center gap-2">
                <Icons.Idea size={18} /> Key Features
              </h4>
              <ul className="space-y-2">
                {generatedIdea.keyFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background/50 p-4 rounded-lg border border-border/50">
              <h4 className="text-purple-400 font-semibold mb-3 flex items-center gap-2">
                <Icons.Tech size={18} /> Gemini Power
              </h4>
              <p className="text-sm text-gray-400">
                {generatedIdea.geminiUsage}
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => onIdeaSelected(generatedIdea)}
              className="text-white bg-border hover:bg-border/80 px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              Architect Tech Stack <Icons.Arrow size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdeaGenerator;