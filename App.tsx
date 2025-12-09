import React, { useState } from 'react';
import { ViewState, Idea } from './types';
import DescriptionView from './components/DescriptionView';
import IdeaGenerator from './components/IdeaGenerator';
import TechStackArchitect from './components/TechStackArchitect';
import { Icons } from './components/ui/Icons';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('description');
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);

  const handleIdeaSelected = (idea: Idea) => {
    setSelectedIdea(idea);
    setView('architect');
  };

  return (
    <div className="min-h-screen bg-background text-text font-sans">
      {/* Navigation Header */}
      <header className="border-b border-border bg-surface/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm">
               VC
             </div>
             <span className="font-bold text-heading hidden sm:block">Vibe Coding Hackathon</span>
          </div>

          <nav className="flex items-center gap-1 bg-background/50 p-1 rounded-full border border-border">
            <button 
              onClick={() => setView('description')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
                ${view === 'description' ? 'bg-border text-white shadow-sm' : 'text-accent hover:text-text'}`}
            >
              Description
            </button>
            <button 
              onClick={() => setView('ideator')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2
                ${view === 'ideator' || view === 'architect' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm' : 'text-accent hover:text-text'}`}
            >
              <Icons.Sparkles size={14} />
              Build
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {view === 'description' && (
          <div className="animate-fade-in">
             <DescriptionView />
             <div className="mt-12 text-center">
                <button 
                  onClick={() => setView('ideator')}
                  className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/20"
                >
                  Start Building Now
                </button>
             </div>
          </div>
        )}
        
        {view === 'ideator' && (
          <div className="animate-fade-in">
            <IdeaGenerator onIdeaSelected={handleIdeaSelected} />
          </div>
        )}

        {view === 'architect' && selectedIdea && (
          <div className="animate-fade-in">
            <TechStackArchitect idea={selectedIdea} onBack={() => setView('ideator')} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-8 text-center text-accent text-sm">
        <p>Powered by Google Gemini 3.0 Pro</p>
      </footer>
    </div>
  );
};

export default App;