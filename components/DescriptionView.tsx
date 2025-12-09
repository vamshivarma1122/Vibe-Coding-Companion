import React from 'react';
import { Icons } from './ui/Icons';

const DescriptionView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-2">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-3xl font-bold text-heading">Description</h1>
        <div className="flex gap-4 text-accent">
           <button className="hover:text-primary transition-colors"><Icons.Link size={20}/></button>
           <button className="hover:text-primary transition-colors"><Icons.ChevronUp size={20}/></button>
        </div>
      </div>

      <div className="space-y-6 text-text leading-relaxed">
        <p>
          Imagine building an application that finally solves a daily frustration or addresses a
          global challenge that has been waiting for an AI breakthrough. This Vibe Coding with
          Gemini 3 Pro Hackathon challenges you to step up and use the latest advancements in
          AI to do exactly that.
        </p>

        <p>
          Harness Gemini's advanced reasoning capabilities and native multimodality to bridge
          the gap between idea and reality. You are tasked with building solutions that were
          impossible to build yesterday, like solving everyday personal friction points to tackling
          complex global challenges.
        </p>

        <div>
          <h2 className="text-lg font-semibold text-heading mb-4">Where will you make an impact?</h2>
          <ul className="space-y-3">
            {[
              { label: 'Science', desc: 'Accelerate discovery and research', icon: Icons.Science },
              { label: 'Education', desc: 'Reimagine learning', icon: Icons.Education },
              { label: 'Accessibility', desc: 'Build tools that work for everyone', icon: Icons.Accessibility },
              { label: 'Health', desc: 'Improve lives and patient care', icon: Icons.Health },
              { label: 'Business', desc: 'Reinvent workflows and goals', icon: Icons.Business },
              { label: 'Technology', desc: 'Push the boundaries of code', icon: Icons.Technology },
            ].map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                <span className="text-heading font-medium">• {item.label}:</span>
                <span>{item.desc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-border mt-8">
          <h2 className="text-xl font-bold text-heading mb-2">Accelerate Your Build in AI Studio</h2>
          <p className="mb-4">
            The free tier is only available in AI Studio. To get started, access the 
            <a href="#" className="text-primary hover:underline mx-1">Build tab of AI Studio</a> 
            to easily and quickly build advanced applications. You can also find existing
            templates to get started in our <a href="#" className="text-primary hover:underline">Gallery</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DescriptionView;