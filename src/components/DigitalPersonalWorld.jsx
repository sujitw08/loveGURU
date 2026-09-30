import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Heart,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Calendar,
  Sparkles,
  Maximize2,
  ChevronDown,
  Quote,
  Share2,
  Lock,
  ArrowLeft,
  Smartphone,
  Monitor
} from 'lucide-react';
import { soundscape } from '../utils/audio';

export default function DigitalPersonalWorld({
  memory,
  isStandaloneMobile = false,
  onBack = null
}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [activeLightboxImg, setActiveLightboxImg] = useState(null);
  const [heartCount, setHeartCount] = useState(0);
  const [replyMessage, setReplyMessage] = useState('');
  const [replySent, setReplySent] = useState(false);
  const [mobileSimulator, setMobileSimulator] = useState(true);

  if (!memory) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
        No memory selected to preview.
      </div>
    );
  }

  // Handle opening seal
  const handleOpenSeal = () => {
    soundscape.playSealBreakChime();
    confetti({
      particleCount: 50,
      spread: 65,
      origin: { y: 0.65 },
      colors: ['#C65372', '#E5A8B5', '#F5D7B5', '#A83F5D', '#FFF8F2']
    });
    setIsRevealed(true);
    soundscape.start('piano');
    setIsPlayingAudio(true);
  };

  const toggleSoundscape = () => {
    if (isPlayingAudio) {
      soundscape.stop();
      setIsPlayingAudio(false);
    } else {
      soundscape.start('piano');
      setIsPlayingAudio(true);
    }
  };

  const handleSendWarmth = () => {
    setHeartCount(prev => prev + 1);
    confetti({
      particleCount: 20,
      spread: 45,
      origin: { y: 0.85 },
      colors: ['#C65372', '#A83F5D', '#E5A8B5', '#F5D7B5']
    });
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;
    setReplySent(true);
  };

  // Content of the digital world
  const renderWorldContent = () => (
    <div style={{ width: '100%', minHeight: '100%', background: 'var(--bg-primary)' }}>
      {/* Top Floating Ambient Bar */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 18px',
        background: 'rgba(255, 248, 242, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="wax-seal" style={{ width: 28, height: 28, fontSize: '0.75rem' }}>
            ♥
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--accent-hover)' }}>
              LoveGuru Memory
            </span>
          </div>
        </div>

        {/* Music Control Pill */}
        <button
          onClick={toggleSoundscape}
          className="audio-ambient-bar"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            border: 'none',
            cursor: 'pointer',
            padding: '6px 14px'
          }}
          title={isPlayingAudio ? "Pause background music" : "Play ambient music"}
        >
          {isPlayingAudio ? (
            <>
              <Volume2 size={15} color="var(--accent-primary)" />
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 12 }}>
                <span style={{ width: 2, height: '100%', background: 'var(--accent-primary)', animation: 'floatSoft 1s infinite alternate' }} />
                <span style={{ width: 2, height: '60%', background: 'var(--accent-primary)', animation: 'floatSoft 0.8s infinite alternate' }} />
                <span style={{ width: 2, height: '80%', background: 'var(--accent-primary)', animation: 'floatSoft 1.2s infinite alternate' }} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--accent-hover)' }}>Soundscape On</span>
            </>
          ) : (
            <>
              <VolumeX size={15} color="var(--text-muted)" />
              <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)' }}>Play Music</span>
            </>
          )}
        </button>
      </div>

      {/* Hero Cover & Gentle Greeting */}
      <div style={{ position: 'relative', width: '100%', minHeight: 340, overflow: 'hidden' }}>
        <img
          src={memory.coverImage}
          alt={memory.title}
          style={{
            width: '100%',
            height: 380,
            objectFit: 'cover',
            filter: 'brightness(0.85) contrast(1.05)'
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(63, 23, 38, 0.15) 0%, rgba(63, 23, 38, 0.6) 65%, var(--bg-primary) 100%)'
        }} />

        <div style={{
          position: 'absolute',
          bottom: 24,
          left: 20,
          right: 20,
          color: '#FFF8F2'
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255, 248, 242, 0.25)', backdropFilter: 'blur(8px)', padding: '4px 12px', borderRadius: 999, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10, color: '#FFF8F2' }}>
            <Sparkles size={12} color="var(--accent-highlight)" />
            {memory.occasion}
          </div>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '2.1rem',
            lineHeight: 1.15,
            fontWeight: 500,
            color: '#FFFFFF',
            textShadow: '0 2px 10px rgba(63, 23, 38, 0.4)'
          }}>
            {memory.title}
          </h1>
          <p style={{
            fontSize: '0.9rem',
            color: 'var(--accent-highlight)',
            marginTop: 6,
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            <span>From <strong>{memory.senderName}</strong> for <strong>{memory.recipientName}</strong></span>
          </p>
        </div>
      </div>

      {/* Days / Milestone Counter Card in Ivory */}
      <div style={{ padding: '0 20px', marginTop: -15, position: 'relative', zIndex: 10 }}>
        <div className="card-paper" style={{
          padding: '18px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div>
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-primary)', fontWeight: 700 }}>
              Key Milestone Date
            </span>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: 2 }}>
              {memory.keyDate}
            </h4>
          </div>
          {memory.daysCount && (
            <div style={{ textAlign: 'right', borderLeft: '1px solid var(--border-subtle)', paddingLeft: 18 }}>
              <span style={{ fontSize: '1.45rem', fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--accent-primary)' }}>
                {memory.daysCount.toLocaleString()}
              </span>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Days Cherished
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Emotional Thesis Statement */}
      <div style={{ padding: '30px 24px 18px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <Quote size={24} color="var(--accent-primary)" style={{ opacity: 0.7 }} />
        </div>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.25rem',
          lineHeight: 1.5,
          fontStyle: 'italic',
          color: 'var(--text-primary)',
          maxWidth: 520,
          margin: '0 auto'
        }}>
          "{memory.emotionalFeeling}"
        </p>
        <div style={{ width: 44, height: 2, background: 'var(--accent-primary)', margin: '16px auto 0', opacity: 0.4 }} />
      </div>

      {/* Voice Note Section */}
      {memory.voiceNoteTranscript && (
        <div style={{ padding: '0 20px', marginBottom: 28 }}>
          <div className="card-paper" style={{ padding: 18, background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button
                  onClick={() => setIsPlayingVoice(!isPlayingVoice)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'var(--accent-primary)',
                    border: 'none',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(198, 83, 114, 0.35)'
                  }}
                >
                  {isPlayingVoice ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: 2 }} />}
                </button>
                <div>
                  <p style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Personal Voice Note
                  </p>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                    Duration: {memory.voiceNoteDuration || "1:24"} • {isPlayingVoice ? "Playing recorded audio..." : "Tap to listen"}
                  </span>
                </div>
              </div>
            </div>

            {/* Voice Waveform visual simulation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 26, padding: '4px 0' }}>
              {[40, 65, 30, 80, 95, 45, 60, 85, 35, 70, 90, 50, 75, 40, 90, 60, 30, 85, 55, 70, 45, 80, 60, 40, 65].map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${isPlayingVoice ? Math.min(100, h * (1 + Math.sin(Date.now() / 200 + i) * 0.4)) : h}%`,
                    background: isPlayingVoice ? 'var(--accent-primary)' : 'var(--accent-secondary)',
                    borderRadius: 2,
                    transition: 'height 0.2s ease'
                  }}
                />
              ))}
            </div>

            <p style={{ fontSize: '0.84rem', fontStyle: 'italic', color: 'var(--text-secondary)', marginTop: 10, lineHeight: 1.5, background: '#FFFBF7', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
              "{memory.voiceNoteTranscript}"
            </p>
          </div>
        </div>
      )}

      {/* The Journey Timeline */}
      <div style={{ padding: '0 20px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
          <Calendar size={18} color="var(--accent-primary)" />
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            Our Chapters & Milestones
          </h3>
        </div>

        <div style={{ position: 'relative', paddingLeft: 20 }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: 7,
            top: 10,
            bottom: 20,
            width: 2,
            background: 'linear-gradient(to bottom, var(--accent-secondary), var(--accent-primary), var(--border-subtle))'
          }} />

          {memory.timeline?.map((step, idx) => (
            <div key={idx} style={{ position: 'relative', marginBottom: 26 }} className="animate-fade-in">
              {/* Timeline bead */}
              <div style={{
                position: 'absolute',
                left: -20,
                top: 4,
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '3px solid var(--accent-primary)',
                boxShadow: '0 0 0 3px rgba(198, 83, 114, 0.2)'
              }} />

              <div className="card-paper" style={{ padding: 18, background: 'var(--bg-card)', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {step.date}
                  </span>
                  {step.tag && (
                    <span className="badge-subtle" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                      {step.tag}
                    </span>
                  )}
                </div>

                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
                  {step.title}
                </h4>

                {step.image && (
                  <div
                    onClick={() => setActiveLightboxImg(step.image)}
                    style={{
                      borderRadius: 12,
                      overflow: 'hidden',
                      marginBottom: 10,
                      cursor: 'zoom-in',
                      position: 'relative'
                    }}
                  >
                    <img
                      src={step.image}
                      alt={step.title}
                      style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{
                      position: 'absolute',
                      right: 8,
                      bottom: 8,
                      background: 'rgba(63, 23, 38, 0.65)',
                      padding: 5,
                      borderRadius: 6,
                      color: '#FFF'
                    }}>
                      <Maximize2 size={12} />
                    </div>
                  </div>
                )}

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Highlighted Moments */}
      {memory.specialMoments?.length > 0 && (
        <div style={{ padding: '0 20px 28px' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 600, marginBottom: 14, color: 'var(--text-primary)' }}>
            Moments I Hold Quietly
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {memory.specialMoments.map((moment, idx) => (
              <div key={idx} className="card-paper" style={{
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                background: 'var(--bg-card)'
              }}>
                <span style={{ color: 'var(--accent-primary)', fontSize: '1rem', marginTop: 2 }}>✦</span>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {moment}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Memory Gallery */}
      {memory.gallery?.length > 0 && (
        <div style={{ padding: '0 20px 28px' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 600, marginBottom: 14, color: 'var(--text-primary)' }}>
            Visual Preservations
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 12
          }}>
            {memory.gallery.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setActiveLightboxImg(item.url)}
                className="card-paper"
                style={{
                  padding: 8,
                  background: 'var(--bg-card)',
                  cursor: 'zoom-in',
                  transform: idx % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)',
                  transition: 'transform 0.3s ease'
                }}
              >
                <div style={{ height: 130, borderRadius: 10, overflow: 'hidden' }}>
                  <img
                    src={item.url}
                    alt={item.caption}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: 8, textAlign: 'center', lineHeight: 1.3 }}>
                  {item.caption}
                </p>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: 2 }}>
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* The Heartfelt Personal Letter */}
      <div style={{ padding: '0 20px 32px' }}>
        <div className="keepsake-letter-mockup">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-primary)', fontWeight: 700 }}>
              Personal Letter
            </span>
            <div className="wax-seal" style={{ width: 34, height: 34 }}>
              ♥
            </div>
          </div>

          <div style={{
            fontFamily: 'var(--font-handwriting)',
            fontSize: '1.5rem',
            lineHeight: 1.6,
            color: 'var(--text-primary)',
            whiteSpace: 'pre-line'
          }}>
            {memory.letter}
          </div>

          <div style={{
            marginTop: 28,
            paddingTop: 16,
            borderTop: '1px dashed var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Created exclusively for</span>
              <p style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)' }}>{memory.recipientName}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Preserved by</span>
              <p style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)' }}>{memory.senderName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Connected Physical Keepsake Badge */}
      {memory.keepsake && (
        <div style={{ padding: '0 20px 32px' }}>
          <div className="card-paper" style={{
            padding: 18,
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: '#F8E2E6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-primary)'
              }}>
                <Sparkles size={20} color="var(--accent-primary)" />
              </div>
              <div>
                <span className="badge-gold" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                  Connected Physical Keepsake
                </span>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: 2 }}>
                  {memory.keepsake.name}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {memory.keepsake.material}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recipient Interactive Response Box */}
      <div style={{
        padding: '26px 20px 50px',
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border-subtle)',
        textAlign: 'center'
      }}>
        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>
          Send Warmth Back to {memory.senderName}
        </h4>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
          Tap the heart to send quiet love, or leave an unspoken note in return.
        </p>

        <button
          onClick={handleSendWarmth}
          className="btn-primary"
          style={{
            margin: '0 auto 20px',
            padding: '10px 24px',
            fontSize: '0.92rem'
          }}
        >
          <Heart size={16} fill="#FFFFFF" />
          Send Warmth {heartCount > 0 && `(${heartCount})`}
        </button>

        {replySent ? (
          <div className="card-paper" style={{ padding: 14, background: '#F8EFE9', maxWidth: 360, margin: '0 auto', border: '1px solid var(--border-subtle)' }}>
            <p style={{ fontSize: '0.88rem', color: 'var(--accent-hover)', fontWeight: 600 }}>
              ✓ Your gentle message was preserved and sent to {memory.senderName}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSendReply} style={{ maxWidth: 380, margin: '0 auto', textAlign: 'left' }}>
            <textarea
              placeholder={`Write a quiet message back to ${memory.senderName}...`}
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              style={{
                fontSize: '0.88rem',
                minHeight: 75,
                borderRadius: 12,
                marginBottom: 10,
                background: '#FFFFFF'
              }}
            />
            <button
              type="submit"
              className="btn-secondary"
              style={{ width: '100%', fontSize: '0.88rem', padding: '10px 16px' }}
            >
              Send Unspoken Words
            </button>
          </form>
        )}

        <div style={{ marginTop: 32, fontSize: '0.76rem', color: 'var(--text-muted)' }}>
          Preserved forever with LoveGuru • “Turn what you feel into something they can keep.”
        </div>
      </div>
    </div>
  );

  // Gentle Reveal Envelope Screen (Before recipient breaks seal)
  const renderEnvelopeScreen = () => (
    <div style={{
      width: '100%',
      minHeight: 650,
      background: 'linear-gradient(135deg, var(--hero-gradient-start) 0%, var(--hero-gradient-end) 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      textAlign: 'center',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        color: 'var(--accent-hover)',
        fontSize: '0.78rem',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        fontWeight: 600
      }}>
        <Lock size={12} color="var(--accent-primary)" />
        Private Memory Portal
      </div>

      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 22,
        padding: '38px 30px',
        maxWidth: 350,
        width: '100%',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border-subtle)',
        position: 'relative'
      }}>
        <div style={{
          width: 50,
          height: 2,
          background: 'var(--accent-primary)',
          margin: '0 auto 16px',
          opacity: 0.7
        }} />

        <p style={{
          fontSize: '0.76rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--accent-primary)',
          fontWeight: 700,
          marginBottom: 8
        }}>
          A Gift For
        </p>

        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '2.1rem',
          fontWeight: 500,
          color: 'var(--text-primary)',
          lineHeight: 1.15
        }}>
          {memory.recipientName}
        </h2>

        <p style={{
          fontSize: '0.88rem',
          color: 'var(--text-secondary)',
          marginTop: 8,
          marginBottom: 24,
          lineHeight: 1.5
        }}>
          {memory.senderName} has crafted a private digital world and physical keepsake holding the feelings and memories between you.
        </p>

        {/* The Wax Seal Button in Raspberry/Wine */}
        <div style={{ position: 'relative', margin: '20px auto 10px', display: 'inline-block' }}>
          <button
            onClick={handleOpenSeal}
            className="wax-seal animate-pulse-gentle"
            style={{
              width: 76,
              height: 76,
              cursor: 'pointer',
              border: '3px solid rgba(255, 255, 255, 0.45)',
              boxShadow: '0 8px 24px rgba(168, 63, 93, 0.45)'
            }}
            title="Click to break the seal and unfold the memory"
          >
            <Heart size={30} fill="#FFF2F4" stroke="#FFF2F4" />
          </button>
        </div>

        <p style={{
          fontSize: '0.8rem',
          color: 'var(--accent-primary)',
          fontWeight: 700,
          letterSpacing: '0.04em',
          marginTop: 14
        }}>
          Tap Seal to Unfold
        </p>
      </div>

      <p style={{
        marginTop: 28,
        fontSize: '0.8rem',
        color: 'var(--text-primary)',
        fontStyle: 'italic'
      }}>
        “Turn what you feel into something they can keep.”
      </p>
    </div>
  );

  return (
    <div style={{ width: '100%', padding: isStandaloneMobile ? 0 : '20px 0', backgroundColor: 'var(--bg-primary)' }}>
      {/* Viewport & Navigation controls (when in dashboard preview) */}
      {!isStandaloneMobile && (
        <div className="container-readable" style={{ marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {onBack && (
            <button onClick={onBack} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.82rem' }}>
              <ArrowLeft size={14} color="var(--accent-primary)" /> Back
            </button>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>View as:</span>
            <button
              onClick={() => setMobileSimulator(true)}
              className={mobileSimulator ? "btn-dark" : "btn-secondary"}
              style={{ padding: '6px 12px', fontSize: '0.78rem' }}
            >
              <Smartphone size={14} /> Mobile View
            </button>
            <button
              onClick={() => setMobileSimulator(false)}
              className={!mobileSimulator ? "btn-dark" : "btn-secondary"}
              style={{ padding: '6px 12px', fontSize: '0.78rem' }}
            >
              <Monitor size={14} /> Full View
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      {mobileSimulator && !isStandaloneMobile ? (
        <div className="mobile-device-mockup animate-fade-in">
          <div className="mobile-notch" />
          <div style={{ flex: 1, overflowY: 'auto', maxHeight: 820 }}>
            {isRevealed ? renderWorldContent() : renderEnvelopeScreen()}
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: 680, margin: '0 auto', borderRadius: 24, overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
          {isRevealed ? renderWorldContent() : renderEnvelopeScreen()}
        </div>
      )}

      {/* Image Lightbox */}
      {activeLightboxImg && (
        <div
          onClick={() => setActiveLightboxImg(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(63, 23, 38, 0.88)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
          }}
        >
          <img
            src={activeLightboxImg}
            alt="Expanded memory"
            style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: 12, objectFit: 'contain' }}
          />
        </div>
      )}
    </div>
  );
}
