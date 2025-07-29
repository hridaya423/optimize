'use client';

import { useState } from 'react';
import Link from 'next/link';

interface MemoryTier {
  id: string;
  name: string;
  limit: string;
  description: string;
  color: string;
  gradient: string;
}
const memoryTiers: MemoryTier[] = [
  {
    id: 'light',
    name: 'Efficient Coder',
    limit: '<200MB',
    description: 'Getting Started',
    color: 'text-green-400',
    gradient: 'from-green-500/20 to-emerald-500/20'
  },
  {
    id: 'efficient',
    name: 'Optimization Master', 
    limit: '<100MB',
    description: 'Pushing Limits',
    color: 'text-blue-400',
    gradient: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    id: 'extreme',
    name: 'Memory Virtuoso',
    limit: '<50MB',
    description: 'Peak Performance',
    color: 'text-purple-400',
    gradient: 'from-purple-500/20 to-pink-500/20'
  }
];

interface GeneratedIdea {
  projectName: string;
  shortDescription: string;
  coreFeatures: string[];
  memoryOptimization: string[];
  techStack: string[];
  implementationInsights: string[];
}

export default function IdeasPage() {
  const [selectedTier, setSelectedTier] = useState<MemoryTier | null>(null);
  const [generatedIdea, setGeneratedIdea] = useState<GeneratedIdea | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filterThinkTags = (text: string): string => {
    return text.replace(/<think>[\s\S]*?<\/think>/gi, '')
             .replace(/\*\*/g, '')
             .replace(/^\s*[-*•]\s*/gm, '')
             .replace(/^\s*\d+\.\s*/gm, '')
             .trim();
  };

  const generateRandomSeed = (): number => {
    return Math.floor(Math.random() * 10000) + 1000;
  };

  const generatePrompt = (tier: MemoryTier): string => {
    const randomSeed = generateRandomSeed();
    
    return `You are a expert at memory efficient desktop apps

REQUIREMENTS:
- Memory target: ${tier.limit}
- Create something PRACTICAL
- Avoid overly complex or theoretical concepts
- Keep features simple but effective
- No markdown formatting - plain text only

Generate a desktop application idea that:
- Solves a real, common problem
- Uses standard, well-known technologies
- Has clear, implementable features

RESPONSE FORMAT:

PROJECT NAME: [Simple, clear name]

SHORT DESCRIPTION: [What it does and why it's useful in 2-3 sentences]

CORE FEATURES:
[List 4-5 practical features that are easy to understand and implement]

MEMORY OPTIMIZATION:
[List 3-4 realistic techniques to stay under ${tier.limit}]

TECH STACK:
[List common, well-documented technologies and frameworks]

IMPLEMENTATION INSIGHTS:
[List 3-4 practical development tips and approaches]

SEED: ${randomSeed}

Focus on simplicity, practicality, and buildability. Think like a developer who needs to ship something that works, not impress with complexity.`;
  };

  const parseAIResponse = (response: string): GeneratedIdea => {
    const cleanResponse = filterThinkTags(response);
    
    const nameMatch = cleanResponse.match(/PROJECT NAME:\s*(.+?)(?=\n|$)/i);
    const projectName = nameMatch ? nameMatch[1].trim() : 'Innovative Desktop App';
    
    const descMatch = cleanResponse.match(/SHORT DESCRIPTION:\s*([\s\S]*?)(?=\n\s*[A-Z\s]+:|$)/i);
    const shortDescription = descMatch ? descMatch[1].trim() : 'A memory-efficient desktop application.';
    
    const featuresMatch = cleanResponse.match(/CORE FEATURES:\s*([\s\S]*?)(?=\n\s*[A-Z\s]+:|$)/i);
    const coreFeatures = featuresMatch ? 
      featuresMatch[1].split('\n').filter(line => line.trim()).map(line => line.trim()).slice(0, 5) :
      ['Unable to parse features'];
    
    const optimizationMatch = cleanResponse.match(/MEMORY OPTIMIZATION:\s*([\s\S]*?)(?=\n\s*[A-Z\s]+:|$)/i);
    const memoryOptimization = optimizationMatch ?
      optimizationMatch[1].split('\n').filter(line => line.trim()).map(line => line.trim()).slice(0, 4) :
      ['Unable to parse optimization strategies'];
    
    const techMatch = cleanResponse.match(/TECH STACK:\s*([\s\S]*?)(?=\n\s*[A-Z\s]+:|$)/i);
    const techStack = techMatch ?
      techMatch[1].split('\n').filter(line => line.trim()).map(line => line.trim()).slice(0, 5) :
      ['Unable to parse tech stack'];
    
    const insightsMatch = cleanResponse.match(/IMPLEMENTATION INSIGHTS:\s*([\s\S]*?)(?=\n\s*[A-Z\s]+:|$)/i);
    const implementationInsights = insightsMatch ?
      insightsMatch[1].split('\n').filter(line => line.trim()).map(line => line.trim()).slice(0, 4) :
      ['Unable to parse implementation insights'];
    
    return {
      projectName,
      shortDescription,
      coreFeatures,
      memoryOptimization,
      techStack,
      implementationInsights
    };
  };

  const generateIdea = async () => {
    if (!selectedTier) return;
    
    setIsGenerating(true);
    setError(null);
    setGeneratedIdea(null);

    try {
      const prompt = generatePrompt(selectedTier);
      
      const response = await fetch('https://ai.hackclub.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }]
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to generate idea: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.choices?.[0]?.message?.content) {
        throw new Error('Invalid response from AI service');
      }

      const aiResponse = filterThinkTags(data.choices[0].message.content);
      const parsedIdea = parseAIResponse(aiResponse);
      
      setGeneratedIdea(parsedIdea);
      
    } catch (err) {
      console.error('Error generating idea:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-2">
                💡 Idea Generator
              </h1>
              <p className="text-xl text-text-secondary">
                AI-powered desktop app concepts tailored for memory efficiency
              </p>
            </div>
           
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <div>
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
            Choose Your Memory Challenge
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {memoryTiers.map((tier, index) => (
              <div key={tier.id} className="group">
                <div
                  className={`cursor-pointer bg-surface-elevated border border-border rounded-lg p-8 hover:border-text-primary transition-all duration-300 relative overflow-hidden h-full ${
                    selectedTier?.id === tier.id ? 'ring-2 ring-text-primary border-text-primary' : ''
                  }`}
                  onClick={() => setSelectedTier(tier)}
                >
                  <div className="absolute top-4 right-4 text-6xl font-bold text-text-muted/20">
                    0{index + 1}
                  </div>
                  <div className="relative">
                    <div className="text-2xl font-bold text-text-primary mb-1">{tier.name}</div>
                    <div className="text-sm text-text-secondary mb-8 font-medium">{tier.description}</div>
                    
                    <div className="space-y-6 mb-8">
                      <div className="text-center">
                        <div className="text-xs text-text-secondary uppercase tracking-widest mb-2">Memory Target</div>
                        <div className="text-3xl font-bold text-text-primary mb-4">{tier.limit}</div>
                      </div>
                    </div>
                    
                    {selectedTier?.id === tier.id && (
                      <div className="border-t border-border pt-6 text-center">
                        <div className="text-xs text-text-secondary uppercase tracking-widest mb-3">Status</div>
                        <div className="text-xl font-bold text-text-primary">
                          Selected
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedTier && (
          <div className="text-center">
            <button
              onClick={generateIdea}
              disabled={isGenerating}
              className="group bg-gradient-to-r from-text-primary to-text-secondary text-background px-12 py-6 rounded-xl font-bold text-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin inline-block w-6 h-6 border-2 border-background border-t-transparent rounded-full mr-3"></div>
                  Generating Creative Ideas...
                </>
              ) : (
                <>
                  Generate {selectedTier.name} App Idea
                  <span className="ml-3 group-hover:translate-x-1 transition-transform">→</span>
                </>
              )}
            </button>
            
            {selectedTier && !isGenerating && (
              <p className="text-text-muted mt-4">
                Creating innovative ideas optimized for {selectedTier.limit} memory usage
              </p>
            )}
          </div>
        )}

        {error && (
          <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <div className="text-red-400 text-2xl font-bold">!</div>
              <div>
                <div className="text-red-400 font-semibold">Failed to generate idea</div>
                <div className="text-text-secondary mt-1">{error}</div>
              </div>
            </div>
          </div>
        )}

        {generatedIdea && (
          <div className="bg-surface-elevated border border-border rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-text-primary/10 to-text-secondary/10 p-8 border-b border-border">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-text-primary mb-4">
                  {generatedIdea.projectName}
                </h3>
                <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                  {generatedIdea.shortDescription}
                </p>
              </div>
            </div>

            <div className="p-8 space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-2xl font-bold text-text-primary mb-6 flex items-center">
                   
                    Core Features
                  </h4>
                  <div className="space-y-4">
                    {generatedIdea.coreFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-surface rounded-lg border border-border hover:border-text-primary/30 transition-colors">
                        <div className="bg-blue-500/20 text-blue-400 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                          {index + 1}
                        </div>
                        <span className="text-text-secondary leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-2xl font-bold text-text-primary mb-6 flex items-center">
                  
                    Memory Optimization
                  </h4>
                  <div className="space-y-4">
                    {generatedIdea.memoryOptimization.map((strategy, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-surface rounded-lg border border-border hover:border-text-primary/30 transition-colors">
                        <div className="bg-green-500/20 text-green-400 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                          {index + 1}
                        </div>
                        <span className="text-text-secondary leading-relaxed">{strategy}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-text-primary mb-6 flex items-center">
                  Tech Stack
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {generatedIdea.techStack.map((tech, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-surface rounded-lg border border-border hover:border-text-primary/30 transition-colors">
                      <div className="bg-purple-500/20 text-purple-400 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-text-secondary leading-relaxed">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-text-primary mb-6 flex items-center">
               
                  Implementation Insights
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {generatedIdea.implementationInsights.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-surface rounded-lg border border-border hover:border-text-primary/30 transition-colors">
                      <div className="bg-orange-500/20 text-orange-400 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-text-secondary leading-relaxed">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-8">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <button
                    onClick={generateIdea}
                    disabled={isGenerating}
                    className="bg-text-primary text-background px-8 py-4 rounded-lg font-semibold text-lg hover:bg-text-secondary transition-colors"
                  >
                    Generate Another Idea
                  </button>
                  <a 
                    href="https://forms.hackclub.com/t/fmL5xGZng2us" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-text-primary text-background px-8 py-4 rounded-lg font-semibold text-lg hover:bg-text-secondary transition-colors"
                  >
                    Built it already? Submit here!
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}