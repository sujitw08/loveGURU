import React, { useState, useEffect } from 'react';
import {
  Heart,
  Sparkles,
  Feather,
  Smartphone,
  Gift,
  LayoutDashboard,
  Compass,
  ArrowRight,
  Plus
} from 'lucide-react';

import { INITIAL_MEMORIES } from './data/initialMemories';
import DiscoverHome from './components/DiscoverHome';
import CreationWizard from './components/CreationWizard';
import DigitalPersonalWorld from './components/DigitalPersonalWorld';
import EmotionalExpressionLab from './components/EmotionalExpressionLab';
import PhysicalKeepsakesAtelier from './components/PhysicalKeepsakesAtelier';
import CreatorDashboard from './components/CreatorDashboard';

export default function App() {
  // Load memories from localStorage or fallback to INITIAL_MEMORIES
  const [memories, setMemories] = useState(() => {
    try {
      const saved = localStorage.getItem('loveguru_memories');
      return saved ? JSON.parse(saved) : INITIAL_MEMORIES;
    } catch (e) {
      return INITIAL_MEMORIES;
    }
  });

  // Load orders from localStorage or initial sample order
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('loveguru_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        orderId: 'LG-8841-WL',
        date: 'Sep 22, 2024',
        keepsake: {
          name: 'The Archival Walnut Memory Frame',
          price: '$98'
        },
        customEngraving: 'Sarah & Julian • October 14, 2021',
        status: 'Delivered & Scanned',
        shippingInfo: {
          recipientName: 'Sarah Jenkins',
          address: '450 Hayes Street, Apt 3B',
          city: 'San Francisco'
        }
      }
    ];
  });

  // Active view: 'discover' | 'wizard' | 'digital-world' | 'expression' | 'keepsakes' | 'dashboard'
  const [currentView, setCurrentView] = useState('discover');
  const [activeMemory, setActiveMemory] = useState(memories[0] || null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('loveguru_memories', JSON.stringify(memories));
    } catch (e) {}
  }, [memories]);

  useEffect(() => {
    try {
      localStorage.setItem('loveguru_orders', JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  // Handle URL hash routing (e.g. #memory=slug from scanned QR code)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#memory=')) {
        const slug = hash.replace('#memory=', '');
        const found = memories.find(m => m.slug === slug);
        if (found) {
          setActiveMemory(found);
          setCurrentView('digital-world');
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [memories]);

  // Actions
  const handleOpenDigitalWorld = (mem) => {
    setActiveMemory(mem);
    setCurrentView('digital-world');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveMemory = (newMemory) => {
    setMemories(prev => [newMemory, ...prev]);
    setActiveMemory(newMemory);
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateMemory = (updated) => {
    setMemories(prev => prev.map(m => m.id === updated.id ? updated : m));
    if (activeMemory?.id === updated.id) {
      setActiveMemory(updated);
    }
  };

  const handleDeleteMemory = (id) => {
    setMemories(prev => prev.filter(m => m.id !== id));
    if (activeMemory?.id === id) {
      setActiveMemory(memories.find(m => m.id !== id) || null);
    }
  };

  const handleOrderPlaced = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTransferLetterToMemory = (letterText) => {
    setCurrentView('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Top Navigation Bar with Rosacea Palette Glassmorphism */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(243, 214, 216, 0.92)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '12px 24px'
      }}>
        <div className="container-narrow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo & Manifesto */}
          <div
            onClick={() => setCurrentView('discover')}
            style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
          >
            <div className="wax-seal" style={{ width: 34, height: 34 }}>
              ♥
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.02em', display: 'block', lineHeight: 1.1 }}>
                LoveGuru
              </span>
              <span style={{ fontSize: '0.68rem', color: 'var(--accent-hover)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Turn what you feel into something they can keep
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            {[
              { id: 'discover', label: 'Discover', icon: Compass },
              { id: 'wizard', label: 'Create Memory', icon: Plus },
              { id: 'expression', label: 'Expression Lab', icon: Feather },
              { id: 'digital-world', label: 'Digital World', icon: Smartphone },
              { id: 'keepsakes', label: 'Physical Heirlooms', icon: Gift },
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = currentView === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setCurrentView(tab.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-pill)',
                    border: 'none',
                    background: isActive ? 'var(--accent-primary)' : 'transparent',
                    color: isActive ? '#FFFFFF' : 'var(--text-primary)',
                    fontWeight: 500,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  <Icon size={14} color={isActive ? '#FFFFFF' : 'var(--accent-primary)'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Viewport Content */}
      <main style={{ flex: 1 }}>
        {currentView === 'discover' && (
          <DiscoverHome
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenDigitalWorld={handleOpenDigitalWorld}
            memories={memories}
          />
        )}

        {currentView === 'wizard' && (
          <CreationWizard
            onSaveMemory={handleSaveMemory}
            onOpenExpressionLab={() => setCurrentView('expression')}
            onCancel={() => setCurrentView('dashboard')}
          />
        )}

        {currentView === 'digital-world' && (
          <DigitalPersonalWorld
            memory={activeMemory || memories[0]}
            onBack={() => setCurrentView('dashboard')}
          />
        )}

        {currentView === 'expression' && (
          <EmotionalExpressionLab
            initialData={activeMemory || {}}
            onSelectLetter={handleTransferLetterToMemory}
          />
        )}

        {currentView === 'keepsakes' && (
          <PhysicalKeepsakesAtelier
            memories={memories}
            activeMemory={activeMemory}
            onOpenDigitalWorld={handleOpenDigitalWorld}
            onOrderPlaced={handleOrderPlaced}
          />
        )}

        {currentView === 'dashboard' && (
          <CreatorDashboard
            memories={memories}
            orders={orders}
            onOpenDigitalWorld={handleOpenDigitalWorld}
            onStartNewMemory={() => setCurrentView('wizard')}
            onDeleteMemory={handleDeleteMemory}
            onUpdateMemory={handleUpdateMemory}
          />
        )}
      </main>

      {/* Editorial Velvet Deep Berry Footer */}
      <footer style={{
        background: 'var(--bg-dark)',
        color: '#FFF8F2',
        padding: '55px 24px 38px',
        borderTop: '1px solid #5C2237'
      }}>
        <div className="container-narrow">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 32,
            marginBottom: 40
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div className="wax-seal" style={{ width: 28, height: 28, fontSize: '0.7rem' }}>♥</div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, color: '#FFF8F2' }}>
                  LoveGuru
                </span>
              </div>
              <p style={{ fontSize: '0.86rem', color: '#DEBAC1', lineHeight: 1.6 }}>
                A premium emotional-memory platform that transforms feelings, stories, and memories into personalized digital experiences and physical keepsakes connected by QR.
              </p>
            </div>

            <div>
              <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--accent-highlight)', marginBottom: 12 }}>
                The Five Core Branches
              </h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.84rem', color: '#DEBAC1' }}>
                <li style={{ cursor: 'pointer' }} onClick={() => setCurrentView('wizard')}>1. Emotional Memory</li>
                <li style={{ cursor: 'pointer' }} onClick={() => setCurrentView('digital-world')}>2. Digital Personal World</li>
                <li style={{ cursor: 'pointer' }} onClick={() => setCurrentView('expression')}>3. Emotional Expression</li>
                <li style={{ cursor: 'pointer' }} onClick={() => setCurrentView('keepsakes')}>4. Physical Gifts Atelier</li>
                <li style={{ cursor: 'pointer' }} onClick={() => setCurrentView('keepsakes')}>5. Physical + Digital QR Bridge</li>
              </ul>
            </div>

            <div>
              <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--accent-highlight)', marginBottom: 12 }}>
                Philosophy
              </h5>
              <p style={{ fontSize: '0.84rem', color: '#DEBAC1', fontStyle: 'italic', lineHeight: 1.6 }}>
                “Turn what you feel into something they can keep.”
              </p>
              <p style={{ fontSize: '0.78rem', color: '#B58D97', marginTop: 10 }}>
                Every memory is private, encrypted, and designed to endure for decades.
              </p>
            </div>
          </div>

          <div style={{
            paddingTop: 24,
            borderTop: '1px solid #5C2237',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.76rem',
            color: '#B58D97',
            flexWrap: 'wrap',
            gap: 12
          }}>
            <span>© {new Date().getFullYear()} LoveGuru. All rights reserved.</span>
            <span>Rosacea Atelier Edition • Archival Grade</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
