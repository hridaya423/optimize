'use client';

import { useState, useEffect } from 'react';

interface Project {
  id: string;
  projectName: string;
  codeUrl: string;
  playableUrl?: string;
  description: string;
  slackId: string;
  screenshot?: string;
}

interface MemoryCardProps {
  project: Project;
  username: string;
}

function MemoryCard({ project, username }: MemoryCardProps) {
  return (
    <div className="group relative bg-surface-elevated border border-border rounded-xl overflow-hidden hover:border-text-primary transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-text-primary/10">
      <div className="relative bg-gradient-to-r from-surface via-surface-elevated to-surface p-6 border-b border-border/50">
        <h3 className="text-xl font-bold text-text-primary mb-1 group-hover:text-text-primary transition-colors duration-300">
          {project.projectName}
        </h3>
        <div className="h-1 bg-gradient-to-r from-text-primary via-text-secondary to-transparent rounded-full w-12 group-hover:w-24 transition-all duration-500"></div>
      </div>

      <div className="relative h-56 bg-surface overflow-hidden">
        {project.screenshot ? (
          <>
            <img
              src={project.screenshot}
              alt={project.projectName}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-b from-text-primary/20 to-transparent"></div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-surface to-surface-elevated">
            <div className="text-6xl text-text-muted mb-4 group-hover:scale-110 transition-transform duration-300">⚡</div>
            <div className="text-sm font-mono text-text-muted">NO_PREVIEW_AVAILABLE</div>
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 to-transparent p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-text-secondary">by {username}</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex gap-3">
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 group/btn relative bg-text-primary text-background text-center py-3 px-4 rounded-lg font-semibold hover:bg-text-secondary transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Source
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500"></div>
          </a>
          {project.playableUrl && (
            <a
              href={project.playableUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 group/btn relative border border-text-primary text-text-primary text-center py-3 px-4 rounded-lg font-semibold hover:bg-text-primary hover:text-background transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
                
                Demo
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [usernames, setUsernames] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api2.hackclub.com/v0.1/Optimize/Optimize%20Project%20Submission');
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      const validProjects: Project[] = data
        .filter((record: any) => record.fields && record.fields.Status !== 'Rejected')
        .map((record: any) => ({
          id: record.id,
          projectName: record.fields['Project Name'] || 'Untitled Project',
          description: record.fields.Description || 'No description provided',
          codeUrl: record.fields['Code URL'] || '#',
          playableUrl: record.fields['Playable URL'],
          slackId: record.fields['Slack ID'] || '',
          screenshot: record.fields.Screenshots?.[0]?.url
        }));

      setProjects(validProjects);
      await resolveSlackUsernames(validProjects);
      
    } catch (err) {
      console.error('Error fetching projects:', err);
      setProjects([]);
      setError('');
    } finally {
      setLoading(false);
    }
  };

  const resolveSlackUsernames = async (projects: Project[]) => {
    const uniqueSlackIds = [...new Set(projects.map(p => p.slackId))];
    const newUsernames = new Map(usernames);

    for (const slackId of uniqueSlackIds) {
      if (!newUsernames.has(slackId)) {
        try {
          const response = await fetch(`/api/slack/user?userId=${slackId}`);
          if (response.ok) {
            const data = await response.json();
            newUsernames.set(slackId, data.displayName || slackId);
          } else {
            newUsernames.set(slackId, slackId);
          }
        } catch (error) {
          console.error(`Failed to resolve username for ${slackId}:`, error);
          newUsernames.set(slackId, slackId);
        }
      }
    }

    setUsernames(newUsernames);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });


  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold text-text-primary">
                    PROJECT SHOWCASE
                  </h1>
                  <div className="text-sm font-mono text-text-secondary mt-1">
                    OPTIMIZE.GALLERY_v1.0
                  </div>
                </div>
              </div>
              <p className="text-lg text-text-secondary max-w-2xl">
                Discover optimized projects built by the community.
              </p>
            </div>

            <div className="w-full lg:w-auto lg:min-w-[320px]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 pr-12 text-text-primary placeholder-text-muted focus:border-text-primary focus:outline-none font-mono text-sm transition-colors"
                />
                <div className="absolute right-3 top-3.5 text-text-muted">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-elevated border border-border rounded-lg p-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-text-primary rounded-full animate-pulse"></div>
                  <span className="text-sm font-mono text-text-secondary">
                    MEMORY_POOL: READY
                  </span>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm font-mono text-text-secondary">
                    CACHE_HIT: 100%
                  </span>
                </div>
              </div>
              <div className="bg-surface border border-border rounded px-3 py-1">
                <span className="text-sm font-mono text-text-primary font-bold">
                  {projects.length} PROJECTS
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="relative mb-6">
                <div className="w-16 h-16 border-4 border-border rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-text-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
              <div className="text-center">
                <p className="text-text-secondary font-mono text-sm mb-2">SYSTEM.LOADING</p>
                <p className="text-text-muted font-mono text-xs">Scanning memory blocks...</p>
              </div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-24">
              <div className="mb-8">
                <div className="w-24 h-24 bg-surface-elevated border border-border rounded-lg flex items-center justify-center mx-auto mb-6">
                  <div className="text-4xl text-text-muted">💾</div>
                </div>
                <div className="bg-surface-elevated border border-border rounded-lg p-6 max-w-md mx-auto">
                  <h3 className="text-2xl font-bold text-text-primary mb-3">Initialize First Entry</h3>
                  <p className="text-text-secondary mb-6 text-sm leading-relaxed">
                    Memory bank empty. Submit your project to claim the slot in our showcase.
                  </p>
                  <a 
                    href="https://forms.hackclub.com/t/fmL5xGZng2us" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-text-primary text-background px-6 py-3 rounded-lg font-semibold hover:bg-text-secondary transition-colors text-sm"
                  >
                    <span>Submit Project</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-text-primary font-mono">
                    DEPLOYED_PROJECTS
                  </h2>
                  <span className="text-sm text-text-secondary font-mono">
                    {filteredProjects.length} FOUND
                  </span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <MemoryCard
                    key={project.id}
                    project={project}
                    username={usernames.get(project.slackId) || project.slackId}
                  />
                ))}
                
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}