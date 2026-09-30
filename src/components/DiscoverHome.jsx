import React from 'react';
import {
  Heart,
  Sparkles,
  Feather,
  Smartphone,
  Gift,
  QrCode,
  ArrowRight,
  Shield,
  Layers,
  Eye,
  CheckCircle2,
  Calendar,
  Compass
} from 'lucide-react';

export default function DiscoverHome({
  onNavigate,
  onOpenDigitalWorld,
  memories = []
}) {
  const sampleMemory = memories[0] || null;

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Editorial Hero Section with Peach -> Rose gradient */}
      <section style={{
        position: 'relative',
        padding: '75px 20px 85px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, var(--hero-gradient-start) 0%, var(--hero-gradient-end) 100%)',
        borderBottom: '1px solid var(--border-subtle)',
        overflow: 'hidden'
      }}>
        {/* Soft champagne highlight flare */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(245, 215, 181, 0.5) 0%, rgba(243, 214, 216, 0) 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container-readable" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'var(--bg-card)',
            padding: '7px 18px',
            borderRadius: 999,
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: 22
          }}>
            <div className="wax-seal" style={{ width: 22, height: 22, fontSize: '0.7rem' }}>♥</div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-hover)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              The Emotional Memory Platform
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.7rem, 5.8vw, 4.3rem)',
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            marginBottom: 22
          }}>
            Turn what you feel into <br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent-primary)', fontWeight: 500 }}>something they can keep.</em>
          </h1>

          <p style={{
            fontSize: '1.12rem',
            color: 'var(--text-secondary)',
            maxWidth: 630,
            margin: '0 auto 38px',
            lineHeight: 1.65,
            fontWeight: 400
          }}>
            LoveGuru is not a generic gift shop. It is a sanctuary for memories—transforming your authentic feelings, stories, and photographs into intimate digital worlds paired with hand-crafted keepsakes connected by QR.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('wizard')}
              className="btn-primary"
              style={{ padding: '14px 34px', fontSize: '1rem' }}
            >
              <Sparkles size={18} />
              Create an Emotional Memory
            </button>

            <button
              onClick={() => onNavigate('expression')}
              className="btn-secondary"
              style={{ padding: '14px 28px', fontSize: '1rem', background: 'var(--accent-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-subtle)' }}
            >
              <Feather size={18} color="var(--accent-primary)" />
              Write an Authentic Letter
            </button>
          </div>

          {/* Quick link to recipient experience */}
          {sampleMemory && (
            <div style={{ marginTop: 26 }}>
              <button
                onClick={() => onOpenDigitalWorld(sampleMemory)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-hover)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <Eye size={16} color="var(--accent-primary)" />
                Preview Sarah’s Experience (“Three Years of Sunrises”) <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* The Core Journey: Feeling -> Story -> Personalization -> Digital Experience -> Physical Keepsake -> Long-Term Memory */}
      <section style={{ padding: '65px 20px', background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container-narrow">
          <div style={{ textAlign: 'center', marginBottom: 38 }}>
            <span className="badge-subtle" style={{ marginBottom: 6 }}>The Sacred Continuum</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 500, color: 'var(--text-primary)' }}>
              The 6-Step Journey of LoveGuru
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', marginTop: 4 }}>
              Moving seamlessly from internal emotion to enduring tangible heirloom.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 16,
            position: 'relative'
          }}>
            {[
              { num: '01', title: 'Feeling', desc: 'The unspoken sentiment, gratitude, or quiet devotion' },
              { num: '02', title: 'Story', desc: 'The turning points, shared moments, and memories' },
              { num: '03', title: 'Personalization', desc: 'Curating photos, milestone dates, letters, and voice' },
              { num: '04', title: 'Digital World', desc: 'An intimate mobile-first interactive reveal portal' },
              { num: '05', title: 'Physical Keepsake', desc: 'Solid wood frame, leather token, or wax-sealed letter' },
              { num: '06', title: 'Long-Term Memory', desc: 'Revisited anytime via the laser-etched QR code' }
            ].map((step, idx) => (
              <div key={idx} className="card-paper" style={{ padding: '22px 16px', background: 'var(--bg-card)', textAlign: 'center' }}>
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--accent-primary)', letterSpacing: '0.06em' }}>
                  {step.num}
                </span>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: 4, marginBottom: 6 }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Five Core Branches Showcase */}
      <section style={{ padding: '80px 20px', background: 'var(--bg-primary)' }}>
        <div className="container-narrow">
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <span className="badge-subtle" style={{ marginBottom: 8 }}>Architecture</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 500, color: 'var(--text-primary)' }}>
              The Five Core Branches of LoveGuru
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 640, margin: '8px auto 0', fontSize: '0.96rem' }}>
              Every feature belongs to one or more of these foundational branches, designed in harmony to honor your emotional bond.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {/* Branch 1 */}
            <div className="card-paper" style={{ padding: 28, background: 'var(--bg-card)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#F8E2E6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                  <Heart size={22} color="var(--accent-primary)" />
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-primary)', fontWeight: 700 }}>
                    Branch 1
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Emotional Memory
                  </h3>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55, flex: 1 }}>
                Create and preserve personal stories through names, dates, stories, photos, videos, audio, music, messages, timelines, galleries, and special moments.
              </p>
              <div style={{ marginTop: 20 }}>
                <button
                  onClick={() => onNavigate('wizard')}
                  className="btn-secondary"
                  style={{ width: '100%', fontSize: '0.86rem' }}
                >
                  Launch Memory Wizard <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Branch 2 */}
            <div className="card-paper" style={{ padding: 28, background: 'var(--bg-card)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#F8E2E6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                  <Smartphone size={22} color="var(--accent-primary)" />
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-primary)', fontWeight: 700 }}>
                    Branch 2
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Digital Personal World
                  </h3>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55, flex: 1 }}>
                Transform the created memory into a personalized digital world where the recipient can experience the story, memories, timeline, gallery, special moments, and personal letter through an elegant interactive experience.
              </p>
              <div style={{ marginTop: 20 }}>
                <button
                  onClick={() => {
                    if (sampleMemory) onOpenDigitalWorld(sampleMemory);
                    else onNavigate('digital-world');
                  }}
                  className="btn-secondary"
                  style={{ width: '100%', fontSize: '0.86rem' }}
                >
                  Experience Recipient Portal <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Branch 3 */}
            <div className="card-paper" style={{ padding: 28, background: 'var(--bg-card)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#F8E2E6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                  <Feather size={22} color="var(--accent-primary)" />
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-primary)', fontWeight: 700 }}>
                    Branch 3
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Emotional Expression
                  </h3>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55, flex: 1 }}>
                Help users turn their feelings, experiences, memories, and thoughts into authentic personalized messages or letters while keeping the original meaning and allowing complete editing.
              </p>
              <div style={{ marginTop: 20 }}>
                <button
                  onClick={() => onNavigate('expression')}
                  className="btn-secondary"
                  style={{ width: '100%', fontSize: '0.86rem' }}
                >
                  Open Expression Lab <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Branch 4 */}
            <div className="card-paper" style={{ padding: 28, background: 'var(--bg-card)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#F8E2E6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                  <Gift size={22} color="var(--accent-primary)" />
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-primary)', fontWeight: 700 }}>
                    Branch 4
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Physical Gifts
                  </h3>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55, flex: 1 }}>
                Turn the emotional memory into personalized physical keepsakes such as memory frames, custom T-shirts, custom keychains, handwritten letters, and custom cards, always connected to the story rather than functioning as generic products.
              </p>
              <div style={{ marginTop: 20 }}>
                <button
                  onClick={() => onNavigate('keepsakes')}
                  className="btn-secondary"
                  style={{ width: '100%', fontSize: '0.86rem' }}
                >
                  Explore Keepsakes Atelier <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Branch 5 */}
            <div className="card-paper" style={{ padding: 28, background: 'var(--bg-card)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#F8E2E6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                  <QrCode size={22} color="var(--accent-primary)" />
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-primary)', fontWeight: 700 }}>
                    Branch 5
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Physical + Digital Experience
                  </h3>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55, flex: 1 }}>
                Connect physical keepsakes with the digital memory using unique QR codes, allowing a recipient to move from something they can physically hold to a personalized digital experience they can revisit anytime.
              </p>
              <div style={{ marginTop: 20 }}>
                <button
                  onClick={() => onNavigate('keepsakes')}
                  className="btn-secondary"
                  style={{ width: '100%', fontSize: '0.86rem' }}
                >
                  Test QR Bridge Simulator <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recipient Experience Preview */}
      {sampleMemory && (
        <section style={{ padding: '65px 20px 85px', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-subtle)' }}>
          <div className="container-narrow">
            <div style={{
              background: 'var(--bg-card)',
              borderRadius: 24,
              padding: '42px 36px',
              border: '1px solid var(--border-subtle)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 36,
              alignItems: 'center',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div>
                <span className="badge-gold" style={{ marginBottom: 10 }}>Featured Recipient Story</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.3rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {sampleMemory.title}
                </h3>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', marginTop: 8, fontStyle: 'italic' }}>
                  "{sampleMemory.emotionalFeeling}"
                </p>

                <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CheckCircle2 size={16} color="var(--accent-primary)" />
                    <span>Includes <strong>{sampleMemory.timeline?.length}</strong> milestone chapters and quiet moments</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CheckCircle2 size={16} color="var(--accent-primary)" />
                    <span>Interactive wax seal reveal with ambient soundscape</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CheckCircle2 size={16} color="var(--accent-primary)" />
                    <span>Physically bound to <strong>The Archival Walnut Frame</strong> via QR plaque</span>
                  </div>
                </div>

                <div style={{ marginTop: 28, display: 'flex', gap: 12 }}>
                  <button
                    onClick={() => onOpenDigitalWorld(sampleMemory)}
                    className="btn-primary"
                  >
                    <Eye size={16} /> Open Recipient Experience
                  </button>
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="btn-secondary"
                  >
                    View in Dashboard
                  </button>
                </div>
              </div>

              {/* Visual Preview */}
              <div style={{ textAlign: 'center' }}>
                <img
                  src={sampleMemory.coverImage}
                  alt={sampleMemory.title}
                  style={{
                    width: '100%',
                    maxWidth: 400,
                    height: 290,
                    objectFit: 'cover',
                    borderRadius: 20,
                    border: '1px solid var(--border-subtle)',
                    boxShadow: 'var(--shadow-lg)'
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
