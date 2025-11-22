import React, { useState } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ChevronRight } from 'lucide-react';

const App = () => {
  const [activeProduct, setActiveProduct] = useState(null);

  const products = [
    {
      id: 1,
      title: "letsmeet",
      tagline: "Scheduling that actually works",
      description: "Most of my group project meetings at MIT were scheduled through when2meet, a clunky and outdated tool with unusable UX on mobile.",
      problem: "Current scheduling tools are clunky and don't account for preferences or meeting fatigue.",
      solution: "Smart scheduling that learns from user behavior and optimizes for everyone's productivity.",
      tech: ["React", "Claude API", "Calendar Integration"],
      link: "https://letsmeet-jp.vercel.app"
    },
    {
      id: 2,
      title: "Meeting Notes Synthesizer",
      tagline: "Never miss a detail again",
      description: "I always take manual meeting notes alongside Granola AI's automatic transcription summaries. Keeping track of both was difficult, so I'm combining them into one comprehensive record.",
      problem: "Manual notes capture intent and context; AI summaries capture verbatim content. Both are incomplete alone.",
      solution: "AI synthesis that merges human insight with machine precision into actionable meeting records.",
      tech: ["React", "Claude API", "File Processing"],
      link: "#"
    },
    {
      id: 3,
      title: "AI Vibe Coding Guide",
      tagline: "Ship faster with the right tools",
      description: "I'm overwhelmed by the amount of information on AI tools. I made a simple chatbot to talk me through exactly what I should use, when, and why.",
      problem: "Too many AI tools, unclear workflows. Developers waste time figuring out the right tool chain.",
      solution: "Order-of-operations guide: which LLM, what prompt, where to use Cursor, when to use Lovable, how to deploy.",
      tech: ["React", "Claude API", "Tool Knowledge Base"],
      link: "#"
    },
    {
      id: 4,
      title: "Accelerator Marketing Hub",
      tagline: "Marketing intelligence for startups",
      description: "I joined an MIT/Harvard accelerator as Head of Marketing. We had a lot of work to do, but time was tight with Winter Break approaching. I made an AI tool to supercharge myself.",
      problem: "Accelerators need sophisticated marketing but lack dedicated resources and consistent strategy.",
      solution: "AI agent that handles messaging, tracks metrics (applications, funding, mentors), and generates campaigns.",
      tech: ["React", "Claude API", "Analytics Dashboard"],
      link: "#"
    },
    {
      id: 5,
      title: "AI-Powered PMM Suite",
      tagline: "Your marketing co-pilot",
      description: "I talked to a few startups who wanted some PMM help. Life always gets in the way, so I made an AI tool to multiply the amount of work I can do.",
      problem: "PMMs juggle too many tools and frameworks. No unified AI-native solution exists.",
      solution: "Comprehensive PMM platform: messaging, segmentation, campaigns, metrics, competitive intel.",
      tech: ["React", "Claude API", "Multi-tenant Architecture"],
      link: "#"
    },
    {
      id: 6,
      title: "Product Positioning Canvas",
      tagline: "Strategic positioning, AI-assisted",
      description: "Positioning is hard and teams often struggle to articulate their differentiation clearly. I built an interactive tool with AI assistance to make it easier.",
      problem: "Positioning is hard. Teams struggle to articulate differentiation and customer value clearly.",
      solution: "Structured canvas with AI assistance for competitive analysis, persona generation, and messaging variations.",
      tech: ["React", "Claude API", "Visual Canvas Interface"],
      link: "#"
    }
  ];

  const categories = ["All", "Productivity", "Marketing", "Strategy", "Developer Tools"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = products;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Portfolio
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-slate-400 hover:text-slate-100 transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-100 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-100 transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI-Native Products
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Leveraging AI to solve real problems
          </p>
        </div>
      </section>

      {/* About */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About
          </h2>
          <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
            <p className="text-slate-100 font-semibold text-2xl mb-4">
              Jackson Price
            </p>
            <p>
              <span className="text-slate-100 font-semibold">University of Pennsylvania</span> • <span className="text-slate-100 font-semibold">MIT Sloan MBA</span>
            </p>
            <p>
              <span className="text-slate-100 font-semibold">MIT AI Club President</span>
            </p>
            <p>
              Background leading strategic communications for deep tech companies from seed to public in self-driving, supply chain and logistics, Web3, financial services, cybersecurity, healthcare, and a global VC firm. Program Manager experience at <span className="text-slate-100 font-semibold">Amazon</span>.
            </p>
            <p>
              Built products for ecommerce, entertainment, and mobility.
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-800">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Products
          </h2>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-all cursor-pointer"
              onClick={() => setActiveProduct(activeProduct === product.id ? null : product.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-100 mb-1">{product.title}</h3>
                  <p className="text-slate-400 text-sm">{product.tagline}</p>
                </div>
              </div>

              <p className="text-slate-300 mb-4">{product.description}</p>

              {activeProduct === product.id && (
                <div className="space-y-4 mt-6 pt-6 border-t border-slate-800">
                  <div>
                    <div className="text-sm font-semibold text-blue-400 mb-2">Problem</div>
                    <p className="text-slate-300 text-sm">{product.problem}</p>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-purple-400 mb-2">Solution</div>
                    <p className="text-slate-300 text-sm">{product.solution}</p>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-pink-400 mb-2">Tech Stack</div>
                    <div className="flex gap-2 flex-wrap">
                      {product.tech.map(tech => (
                        <span key={tech} className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end items-center mt-4">
                <ChevronRight 
                  className={`text-slate-500 transition-transform ${activeProduct === product.id ? 'rotate-90' : ''}`} 
                  size={20} 
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Process
          </h2>
          <div className="space-y-8">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-slate-100 mb-3">Context Engineering First</h3>
              <p className="text-slate-300 leading-relaxed">
                Every product starts with comprehensive context building. I use Claude Projects with custom knowledge bases and system prompts to ensure AI assistance is strategic, not just tactical. This means better PRDs, sharper product decisions, and faster iteration cycles.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-slate-100 mb-3">Ship, Learn, Iterate</h3>
              <p className="text-slate-300 leading-relaxed">
                I build quickly with AI-native tools (Claude, Lovable, Cursor) but always ground decisions in user problems and business value. Each product teaches me something new about what customers actually need versus what they say they need.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-slate-100 mb-3">Cost-Optimized Development</h3>
              <p className="text-slate-300 leading-relaxed">
                Complete PRDs, refined prompts, and design specs in Claude before touching paid prototyping tools. This minimizes iteration costs while maximizing output quality. Every line of code has a reason to exist.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/50 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-slate-500 text-sm">
          <p>Built with Claude • Deployed on Vercel • Open Source on GitHub</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
