'use client';

import { useState } from 'react';
import VortexAnimation from './components/VortexAnimation';
import MemoryMonitor from './components/MemoryMonitor';

export default function Home() {
  const [showAnimation, setShowAnimation] = useState(true);

  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };

  return (
    <>
      {showAnimation && (
        <VortexAnimation onComplete={handleAnimationComplete} />
      )}
      
      {!showAnimation && (
        <div className="min-h-screen bg-background">
          
          <div className="bg-surface border-b border-border py-3 px-6">
            <div className="max-w-6xl mx-auto text-center">
              <p className="text-sm text-text-secondary">
                ⚠️ This YSWS is not sponsored by Hackclub yet.
              </p>
            </div>
          </div>
          
          <section className="relative flex items-center justify-center px-6" style={{ minHeight: '100vh', paddingTop: '10vh' }}>
            <div className="max-w-6xl mx-auto text-center">
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-text-primary mb-8">
                OPTIMIZE
              </h1>
              
              
              <p className="text-xl md:text-2xl text-text-secondary mb-4 font-medium">
                Build Tiny. Code Smart. Win Big.
              </p>
              
              
              <p className="text-2xl md:text-3xl text-text-secondary mb-12">
                The desktop app memory optimization YSWS
              </p>
              
              
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                <div className="bg-surface-elevated border border-border rounded-lg p-6">
                  <div className="text-xl font-bold text-text-primary mb-2">The Challenge</div>
                  <p className="text-text-secondary">Build something incredible under strict memory limits</p>
                </div>
                <div className="bg-surface-elevated border border-border rounded-lg p-6">
                  <div className="text-xl font-bold text-text-primary mb-2">The Reward</div>
                  <p className="text-text-secondary">Win RAM upgrades for your setup</p>
                </div>
                <div className="bg-surface-elevated border border-border rounded-lg p-6">
                  <div className="text-xl font-bold text-text-primary mb-2">The Fun</div>
                  <p className="text-text-secondary">Push memory efficiency limits with creative solutions</p>
                </div>
              </div>

              
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <a href="https://forms.fillout.com/t/xwZqk1fDgWus" target="_blank" rel="noopener noreferrer" className="bg-text-primary text-background px-8 py-4 rounded-lg font-semibold text-lg hover:bg-text-secondary transition-colors">
                  RSVP Now →
                </a>
              </div>
            </div>

           
          </section>
          
          <section id="how-it-works" className="py-20 px-6 bg-surface">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                  How It Works
                </h2>
                <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                  Four simple steps to your RAM
                </p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  {
                    step: "01",
                    title: "Get an Idea",
                    description: "Choose your desktop app concept. Think utility, creativity, or solving real problems.",
                    icon: "💡"
                  },
                  {
                    step: "02", 
                    title: "Build & Optimize",
                    description: "Create something useful with at least 3 screens. Every optimization technique counts.",
                    icon: "🔧"
                  },
                  {
                    step: "03",
                    title: "Track Your Time", 
                    description: "Install Hackatime plugin and log your coding hours. Time requirements vary by tier.",
                    icon: "⏱️"
                  },
                  {
                    step: "04",
                    title: "Get Rewarded",
                    description: "Submit your optimized app and win RAM upgrades based on runtime memory usage.",
                    icon: "🏆"
                  }
                ].map(({ step, title, description, icon }, index) => (
                  <div key={index} className="relative">
                    <div className="bg-surface-elevated border border-border rounded-lg p-6 h-full">
                      <div className="text-4xl mb-4">{icon}</div>
                      <div className="text-sm font-bold text-text-primary mb-2">STEP {step}</div>
                      <h3 className="text-2xl font-bold text-text-primary mb-3">{title}</h3>
                      <p className="text-text-secondary leading-relaxed">{description}</p>
                    </div>
                    
                  </div>
                ))}
              </div>
            </div>
          </section>

          
          <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                  Prize Tiers
                </h2>
                <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                  The less memory your app uses, the bigger your reward. Time commitment scales with ambition. (These are bound to change)
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { 
                    tier: 1, 
                    size: "<200MB MEMORY", 
                    time: "6+ hours", 
                    prize: "8GB RAM", 
                    color: "text-warning",
                    bgColor: "bg-warning/10",
                    borderColor: "border-warning",
                    rotation: "rotate-1"
                  },
                  { 
                    tier: 2, 
                    size: "<100MB MEMORY ", 
                    time: "10+ hours", 
                    prize: "16GB RAM", 
                    color: "text-primary",
                    bgColor: "bg-primary/10", 
                    borderColor: "border-primary",
                    rotation: "-rotate-1"
                  },
                  { 
                    tier: 3, 
                    size: "<50MB MEMORY", 
                    time: "20+ hours", 
                    prize: "32GB RAM", 
                    color: "text-success",
                    bgColor: "bg-success/10",
                    borderColor: "border-success",
                    rotation: "rotate-2"
                  }
                ].map(({ tier, size, time, prize }) => (
                  <div key={tier}>
                    <div className="bg-surface-elevated border border-border rounded-lg p-8 hover:border-text-primary transition-colors">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-surface border border-border rounded-full mb-6">
                          <span className="text-2xl font-bold text-text-primary">T{tier}</span>
                        </div>
                        <div className="space-y-3 mb-6">
                          <div className="text-3xl font-bold text-text-primary">{size}</div>
                          <div className="text-text-secondary">+</div>
                          <div className="text-xl font-bold text-text-primary">{time}</div>
                          <div className="text-text-secondary text-sm">on Hackatime</div>
                        </div>
                        <div className="border-t border-border pt-6">
                          <div className="text-3xl mb-2">🏆</div>
                          <div className="text-xl font-bold text-text-primary">{prize}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 px-6 bg-surface relative">
        
            
            <div className="max-w-4xl mx-auto">
              <h2 className="font-sketch text-4xl md:text-5xl font-bold text-center text-text-primary mb-12 transform -rotate-1 scribble-highlight">
                Requirements & Rules
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                
                <div className="hand-drawn-border p-8">
                  <h3 className="font-sketch text-3xl font-bold text-text-primary mb-6 flex items-center transform -rotate-1">
                    <span className="text-primary mr-3 text-4xl">⚙️</span>
                    <span className="scribble-underline">Technical Requirements</span>
                  </h3>
                  <div className="space-y-4">
                    {[
                      "Minimum 3 distinct screens/views",
                      "Actually useful functionality (no hello world!)",
                      "Cross-platform compatibility preferred", 
                      "Open source code on GitHub",
                      "Document how you optimized memory usage"
                    ].map((req, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-text-secondary leading-relaxed">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                
                <div className="hand-drawn-border p-8">
                  <h3 className="font-sketch text-3xl font-bold text-text-primary mb-6 flex items-center transform rotate-1">
                    <span className="text-success mr-3 text-4xl">⏱️</span>
                    <span className="scribble-underline">Time & Tracking</span>
                  </h3>
                  <div className="space-y-4 mb-6">
                    {[
                      "Hackatime tracking is MANDATORY",
                      "Install plugin for your code editor",
                      "Minimum hours: 6 (T1), 10 (T2), 18 (T3)",
                      "Projects without tracking are disqualified"  
                    ].map((req, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-text-secondary leading-relaxed">{req}</span>
                      </div>
                    ))}
                  </div>
                 
                </div>
              </div>
            </div>
          </section>

          
          <section id="faq" className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-text-secondary">
                  Everything you need to know about the Optimize Program
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    question: "Is Hackatime really mandatory?",
                    answer: "Yes, absolutely! Hackatime is required for all participants. Install the plugin for your code editor (VS Code, IntelliJ, Sublime, etc.) and ensure it's tracking your coding sessions. We use this data to verify you've met the minimum time requirements. Projects without proper Hackatime tracking will not be eligible for rewards."
                  },
                  {
                    question: "What counts as 'useful functionality'?",
                    answer: "Your app should solve a real problem or provide genuine utility. Examples: text editors, calculators, file organizers, productivity tools, games with depth, utility apps. Avoid: basic hello world apps, simple form submissions, or apps that only display static information."
                  },
                  {
                    question: "Where can I get help?",
                    answer: "Join the Hack Club Slack and head to the #optimize channel for questions, progress sharing, and technical help. The community is super helpful with optimization techniques and debugging memory issues!"
                  },
                  {
                    question: "What optimization techniques are allowed?",
                    answer: "All legitimate techniques are fair game! Memory pooling, efficient data structures, garbage collection optimization, minimal dependencies, lazy loading, memory-mapped files - get creative! Just document your techniques when submitting."
                  },
                  {
                    question: "Can I work in a team?",
                    answer: "No, this is an individual challenge only. Each participant must work solo on their own project. This ensures fair judging and that everyone gets to fully experience the optimization learning process."
                  },
                  {
                    question: "How is memory usage measured?",
                    answer: "Memory usage is measured during runtime while your app is performing typical operations. We'll test your app with standard workflows and monitor RAM consumption using system monitoring tools. Peak memory usage determines your tier."
                  },
                  {
                    question: "What programming languages can I use?",
                    answer: "Any language that can create desktop applications! Popular choices include Rust, C++, Go, C#, Python, Java, Electron/TypeScript, and more. Choose what you're comfortable with, but remember some languages are naturally more memory-efficient than others."
                  },
                  {
                    question: "When does the program end?",
                    answer: "This hasn't launched yet."
                  }
                ].map(({ question, answer }, index) => {
                  
                  return (
                    <div key={index} className="bg-surface-elevated border border-border rounded-lg p-6">
                      <h3 className="text-lg font-bold text-text-primary mb-3">{question}</h3>
                      <p className="text-text-secondary leading-relaxed">{answer}</p>
                    </div>
                  );
                })
              }
              </div>
            </div>
          </section>


          
          <section className="py-20 px-6 bg-gradient-to-r from-primary/5 to-success/5">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-5xl md:text-6xl font-bold text-text-primary mb-6">
                Ready to Optimize?
              </h2>
              <p className="font-sans text-xl text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
                RSVP & Help make this a reality!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
                <a href="https://forms.fillout.com/t/xwZqk1fDgWus" target="_blank" rel="noopener noreferrer" className="bg-text-primary text-background px-10 py-4 rounded-lg text-lg font-semibold hover:bg-text-secondary transition-colors">
                  RSVP Now
                </a>
                
              </div>

              <div className="text-sm text-text-muted">
                Questions? Join <span className="font-semibold text-primary">Hack Club Slack #optimize</span>
              </div>
            </div>
          </section>

          
          <footer className="py-12 px-6 bg-surface border-t border-border">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                  <div className="text-2xl font-bold text-text-primary mb-4">OPTIMIZE</div>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    The desktop app memory optimization YSWS. Build efficient, win big.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-4">Community</h4>
                  <div className="space-y-2 text-sm">
                    <a href="" className="block text-text-secondary hover:text-primary transition-colors">#optimize Channel</a>
                    <a href="https://github.com/hridaya423/optimize" className="block text-text-secondary hover:text-primary transition-colors">GitHub Repository</a>
                  </div>
                </div>
                
                
              </div>
              
              <div className="border-t border-border pt-8 text-center">
                <p className="text-text-muted text-lg">
                  Made with ❤️ by Hridya
                </p>
              </div>
            </div>
          </footer>
        </div>
      )}
      <MemoryMonitor />
    </>
  );
}