import React, { useState } from 'react';
import {
  Heart,
  Calendar,
  Sparkles,
  Camera,
  Image as ImageIcon,
  Feather,
  Music,
  ShoppingBag,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  Wand2,
  Eye
} from 'lucide-react';
import QRCodeView from './QRCodeView';

const CURATED_PHOTO_PRESETS = [
  { url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80", label: "Holding Hands Sunset" },
  { url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80", label: "Rainy Cozy Café" },
  { url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80", label: "Coast Highway Detour" },
  { url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80", label: "First Shared Living Room" },
  { url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80", label: "Father's Wood Workshop" },
  { url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80", label: "Celebrating Milestone" }
];

export default function CreationWizard({
  onSaveMemory,
  onOpenExpressionLab,
  onCancel = null
}) {
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    recipientName: '',
    senderName: '',
    relationship: 'Life Partner',
    occasion: 'Anniversary',
    keyDate: 'October 14, 2021',
    daysCount: 1082,
    feelingTag: 'Quiet devotion & unshakeable gratitude',
    emotionalFeeling: 'Overwhelming gratitude for the way you soften every hard day, and how our quiet mornings make the entire world feel gentle.',
    coreStory: 'We began with a rainy afternoon and an umbrella that could not keep us dry. Since that day, every challenge has felt smaller because we carried it together.',
    coverImage: CURATED_PHOTO_PRESETS[0].url,
    musicTrack: 'Acoustic Piano & Soft Cello',
    voiceNoteTitle: 'Voice note from the night before',
    voiceNoteDuration: '1:20',
    voiceNoteTranscript: 'Hey, I wanted you to hear my voice when you open this. Thank you for being my anchor.',
    timeline: [
      {
        date: 'October 14, 2021',
        title: 'Where It Began',
        description: 'The little café where we sat until closing time talking about everything we were afraid to tell other people.',
        image: CURATED_PHOTO_PRESETS[1].url,
        tag: 'First Spark'
      },
      {
        date: 'Summer 2023',
        title: 'The Road Trip Through the Fog',
        description: 'Our car broke down, but we sat by the ocean laughing at how little control we have over anything except our love.',
        image: CURATED_PHOTO_PRESETS[2].url,
        tag: 'Unplanned Magic'
      }
    ],
    specialMoments: [
      'The quiet morning coffee before the world starts moving',
      'The way you hold my coat when the autumn wind picks up'
    ],
    gallery: [
      { url: CURATED_PHOTO_PRESETS[0].url, caption: 'Sunset walk by the harbor', date: 'October 2021' },
      { url: CURATED_PHOTO_PRESETS[3].url, caption: 'First night in our new space', date: 'December 2023' }
    ],
    letter: `Dearest,\n\nWhen I look back on everything we have walked through, I realize that love isn’t found in grand speeches. It is built in the quiet mornings, the cups of tea left on the bedside table, and the way you always make room for me.\n\nThank you for choosing me every single day.\n\nAlways,\nYours`,
    keepsakeType: 'frame',
    keepsakeMaterial: 'Solid American Walnut with Laser-Etched QR Plaque'
  });

  const [newMomentText, setNewMomentText] = useState('');

  const updateField = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleAddTimelineStep = () => {
    setFormData(prev => ({
      ...prev,
      timeline: [
        ...prev.timeline,
        {
          date: 'Date / Year',
          title: 'New Milestone Chapter',
          description: 'Describe this memorable moment...',
          image: CURATED_PHOTO_PRESETS[0].url,
          tag: 'Cherished'
        }
      ]
    }));
  };

  const handleRemoveTimelineStep = (idx) => {
    setFormData(prev => ({
      ...prev,
      timeline: prev.timeline.filter((_, i) => i !== idx)
    }));
  };

  const handleUpdateTimelineStep = (idx, field, val) => {
    setFormData(prev => {
      const updated = [...prev.timeline];
      updated[idx] = { ...updated[idx], [field]: val };
      return { ...prev, timeline: updated };
    });
  };

  const handleAddMoment = () => {
    if (!newMomentText.trim()) return;
    setFormData(prev => ({
      ...prev,
      specialMoments: [...prev.specialMoments, newMomentText.trim()]
    }));
    setNewMomentText('');
  };

  const handleRemoveMoment = (idx) => {
    setFormData(prev => ({
      ...prev,
      specialMoments: prev.specialMoments.filter((_, i) => i !== idx)
    }));
  };

  const handleFinish = () => {
    const slug = (formData.recipientName || 'memory')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(1000 + Math.random() * 9000);

    const completedMemory = {
      ...formData,
      id: `mem-${Date.now()}`,
      slug,
      title: `${formData.recipientName}’s Emotional Memory`,
      keepsake: {
        type: formData.keepsakeType,
        name: formData.keepsakeType === 'frame' ? 'The Archival Walnut Memory Frame' : 'The Pressed Cotton Letter & Wax Seal',
        material: formData.keepsakeMaterial,
        engravedText: `${formData.recipientName} & ${formData.senderName} • ${formData.keyDate}`,
        status: 'Ready to Craft',
        orderDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      }
    };

    onSaveMemory(completedMemory);
  };

  const STEPS = [
    { num: 1, label: 'Recipient' },
    { num: 2, label: 'Occasion & Date' },
    { num: 3, label: 'Story & Feelings' },
    { num: 4, label: 'Media & Timeline' },
    { num: 5, label: 'Letter' },
    { num: 6, label: 'Audio & Music' },
    { num: 7, label: 'Keepsake' },
    { num: 8, label: 'Review' }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', padding: '30px 20px 80px' }}>
      <div className="container-readable">
        {/* Wizard Progress Bar */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span className="badge-subtle">Branch 1: Emotional Memory Wizard</span>
            <span style={{ fontSize: '0.82rem', color: 'var(--accent-hover)', fontWeight: 600 }}>
              Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].label}
            </span>
          </div>

          {/* Step dots with Rosacea colors */}
          <div style={{ display: 'flex', gap: 6 }}>
            {STEPS.map((s) => (
              <div
                key={s.num}
                onClick={() => setCurrentStep(s.num)}
                style={{
                  flex: 1,
                  height: 6,
                  borderRadius: 4,
                  background: currentStep >= s.num ? 'var(--accent-primary)' : 'var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease'
                }}
                title={`Go to step ${s.num}: ${s.label}`}
              />
            ))}
          </div>
        </div>

        {/* Wizard Content Card in Ivory */}
        <div className="card-paper" style={{ padding: 34, background: 'var(--bg-card)' }}>
          {/* Step 1: Recipient & Relationship */}
          {currentStep === 1 && (
            <div className="animate-fade-in">
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>
                Who is this memory created for?
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 24 }}>
                Begin by establishing the recipient, your relationship, and the heart of your bond.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label>Recipient's First Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah, Dad, Maya"
                      value={formData.recipientName}
                      onChange={(e) => updateField('recipientName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Your Name (Sender)</label>
                    <input
                      type="text"
                      placeholder="e.g. Julian, Marcus"
                      value={formData.senderName}
                      onChange={(e) => updateField('senderName', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label>Nature of Your Relationship</label>
                  <select
                    value={formData.relationship}
                    onChange={(e) => updateField('relationship', e.target.value)}
                  >
                    <option value="Life Partner">Life Partner / Spouse / Soulmate</option>
                    <option value="Parent & Child">Parent & Child (Father / Mother)</option>
                    <option value="Best Friend">Best Friend / Chosen Family</option>
                    <option value="Sibling">Sibling / Brother / Sister</option>
                    <option value="Mentor & Guide">Mentor & Guide</option>
                    <option value="Daughter / Son">Child (Daughter / Son)</option>
                  </select>
                </div>

                <div>
                  <label>Emotional Bond Tagline (Short description)</label>
                  <input
                    type="text"
                    placeholder="e.g. Quiet devotion & unshakeable gratitude"
                    value={formData.feelingTag}
                    onChange={(e) => updateField('feelingTag', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Occasion & Date */}
          {currentStep === 2 && (
            <div className="animate-fade-in">
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>
                Occasion & Key Milestone Date
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 24 }}>
                Ground this memory in a specific time or milestone that signifies your shared journey.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label>Occasion / Reason</label>
                    <input
                      type="text"
                      placeholder="e.g. 3rd Anniversary, 60th Birthday, Just Because"
                      value={formData.occasion}
                      onChange={(e) => updateField('occasion', e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Milestone Date</label>
                    <input
                      type="text"
                      placeholder="e.g. October 14, 2021"
                      value={formData.keyDate}
                      onChange={(e) => updateField('keyDate', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label>Approximate Days Shared or Cherished (Optional)</label>
                  <input
                    type="number"
                    placeholder="e.g. 1082"
                    value={formData.daysCount}
                    onChange={(e) => updateField('daysCount', parseInt(e.target.value) || 0)}
                  />
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: 4, display: 'block' }}>
                    This will appear as an elegant milestone metric on their digital world entrance.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Story & Feelings */}
          {currentStep === 3 && (
            <div className="animate-fade-in">
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>
                The Core Story & Emotional Feeling
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 24 }}>
                What is the emotional essence of this relationship? Capture what you feel deep inside.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label>The Emotional Thesis (The one sentence that sums up your heart)</label>
                  <textarea
                    placeholder="e.g. Overwhelming gratitude for the way you soften every hard day..."
                    value={formData.emotionalFeeling}
                    onChange={(e) => updateField('emotionalFeeling', e.target.value)}
                    style={{ minHeight: 80 }}
                  />
                </div>

                <div>
                  <label>The Story Behind It (How did you get here? What was the turning point?)</label>
                  <textarea
                    placeholder="Tell the story in your own voice..."
                    value={formData.coreStory}
                    onChange={(e) => updateField('coreStory', e.target.value)}
                    style={{ minHeight: 110 }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Media & Timeline */}
          {currentStep === 4 && (
            <div className="animate-fade-in">
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>
                Memories, Photos & Milestone Chapters
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 20 }}>
                Curate the visuals and milestone chapters that make this memory unforgettable.
              </p>

              {/* Select Cover Photo */}
              <div style={{ marginBottom: 24 }}>
                <label>Choose Hero Cover Photograph</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 8 }}>
                  {CURATED_PHOTO_PRESETS.map((p, idx) => (
                    <div
                      key={idx}
                      onClick={() => updateField('coverImage', p.url)}
                      style={{
                        height: 80,
                        borderRadius: 10,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: formData.coverImage === p.url ? '3px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                        position: 'relative'
                      }}
                    >
                      <img src={p.url} alt={p.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline Chapters Builder */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <label style={{ margin: 0 }}>Timeline Chapters ({formData.timeline.length})</label>
                  <button
                    type="button"
                    onClick={handleAddTimelineStep}
                    className="btn-secondary"
                    style={{ padding: '4px 12px', fontSize: '0.78rem' }}
                  >
                    <Plus size={14} color="var(--accent-primary)" /> Add Chapter
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {formData.timeline.map((step, idx) => (
                    <div key={idx} style={{ background: '#FFFBF7', padding: 14, borderRadius: 12, border: '1px solid var(--border-subtle)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <input
                          type="text"
                          placeholder="Date (e.g. October 2021)"
                          value={step.date}
                          onChange={(e) => handleUpdateTimelineStep(idx, 'date', e.target.value)}
                          style={{ width: '48%', fontSize: '0.85rem', padding: '6px 10px' }}
                        />
                        <input
                          type="text"
                          placeholder="Chapter Title"
                          value={step.title}
                          onChange={(e) => handleUpdateTimelineStep(idx, 'title', e.target.value)}
                          style={{ width: '48%', fontSize: '0.85rem', padding: '6px 10px' }}
                        />
                      </div>
                      <textarea
                        placeholder="Story of this milestone..."
                        value={step.description}
                        onChange={(e) => handleUpdateTimelineStep(idx, 'description', e.target.value)}
                        style={{ fontSize: '0.82rem', minHeight: 60, marginBottom: 8 }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <input
                          type="text"
                          placeholder="Tag (e.g. First Spark)"
                          value={step.tag || ''}
                          onChange={(e) => handleUpdateTimelineStep(idx, 'tag', e.target.value)}
                          style={{ width: '40%', fontSize: '0.78rem', padding: '4px 8px' }}
                        />
                        {formData.timeline.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveTimelineStep(idx)}
                            style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontSize: '0.78rem' }}
                          >
                            <Trash2 size={14} /> Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Highlighted Moments */}
              <div>
                <label>Quiet Moments / Little Things ({formData.specialMoments.length})</label>
                <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                  <input
                    type="text"
                    placeholder="e.g. How you save the crispy corner piece of toast for me..."
                    value={newMomentText}
                    onChange={(e) => setNewMomentText(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleAddMoment}
                    className="btn-secondary"
                    style={{ padding: '0 16px' }}
                  >
                    Add
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {formData.specialMoments.map((m, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFBF7', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
                      <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>✦ {m}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMoment(idx)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Letter */}
          {currentStep === 5 && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Personal Letter
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    This letter will be displayed in an authentic handwritten deckled parchment view.
                  </p>
                </div>

                {onOpenExpressionLab && (
                  <button
                    type="button"
                    onClick={() => onOpenExpressionLab(formData)}
                    className="btn-secondary"
                    style={{ padding: '6px 14px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                  >
                    <Wand2 size={14} color="var(--accent-primary)" /> Open Expression Assistant
                  </button>
                )}
              </div>

              <textarea
                value={formData.letter}
                onChange={(e) => updateField('letter', e.target.value)}
                style={{
                  fontFamily: 'var(--font-handwriting)',
                  fontSize: '1.45rem',
                  lineHeight: 1.6,
                  minHeight: 280,
                  background: '#FFFBF7',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 12,
                  padding: 20,
                  color: 'var(--text-primary)'
                }}
              />
            </div>
          )}

          {/* Step 6: Audio & Music */}
          {currentStep === 6 && (
            <div className="animate-fade-in">
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>
                Audio Atmosphere & Voice Note
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 24 }}>
                Music and voice lend an intimate, filmic quality to the recipient’s experience.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <label>Ambient Soundscape Selection</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
                    {[
                      { id: 'Acoustic Piano & Soft Cello', desc: 'Warm, slow chords and gentle acoustic intimacy' },
                      { id: 'Golden Hour Strings', desc: 'Cinematic, uplifting, and nostalgic melody' },
                      { id: 'Vintage Acoustic Guitar', desc: 'Organic, tape-recorded warmth' }
                    ].map((track) => (
                      <div
                        key={track.id}
                        onClick={() => updateField('musicTrack', track.id)}
                        style={{
                          padding: 14,
                          borderRadius: 14,
                          background: formData.musicTrack === track.id ? '#F8E2E6' : '#FFFBF7',
                          border: formData.musicTrack === track.id ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                          cursor: 'pointer'
                        }}
                      >
                        <Music size={16} color="var(--accent-primary)" style={{ marginBottom: 6 }} />
                        <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{track.id}</p>
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{track.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label>Spoken Voice Note Transcript (Optional)</label>
                  <textarea
                    placeholder="What is said in the recorded voice note? (e.g. 'Hey, I wanted you to hear this...')"
                    value={formData.voiceNoteTranscript}
                    onChange={(e) => updateField('voiceNoteTranscript', e.target.value)}
                    style={{ minHeight: 80 }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 7: Keepsake */}
          {currentStep === 7 && (
            <div className="animate-fade-in">
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>
                Connected Physical Keepsake
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 24 }}>
                Choose which heirloom keepsake will carry the engraved QR code for this memory.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                {[
                  { id: 'frame', name: 'The Archival Memory Frame', desc: 'Solid Walnut with laser-engraved QR plaque', price: '$98' },
                  { id: 'letter', name: 'Pressed Cotton Letter', desc: 'Hand-deckled cotton paper with wax seal QR', price: '$48' },
                  { id: 'keychain', name: 'Solid Brass Token', desc: 'Vegetable-tanned leather & brass QR medal', price: '$54' },
                  { id: 'tshirt', name: 'Heirloom Coordinate Tee', desc: 'Organic heavyweight cotton with woven QR', price: '$68' }
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => updateField('keepsakeType', item.id)}
                    style={{
                      padding: 16,
                      borderRadius: 14,
                      background: formData.keepsakeType === item.id ? '#F8E2E6' : '#FFFBF7',
                      border: formData.keepsakeType === item.id ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</span>
                      <span style={{ fontSize: '0.84rem', color: 'var(--accent-primary)', fontWeight: 700 }}>{item.price}</span>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 8: Review & Publish */}
          {currentStep === 8 && (
            <div className="animate-fade-in" style={{ textAlign: 'center' }}>
              <div className="wax-seal" style={{ width: 68, height: 68, margin: '0 auto 16px', fontSize: '1.7rem' }}>
                ♥
              </div>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 500, marginBottom: 8, color: 'var(--text-primary)' }}>
                Memory Ready to Preserve
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto 24px' }}>
                You have crafted a sacred space for <strong>{formData.recipientName}</strong>. This memory will be saved to your Creator Dashboard and linked to your physical keepsake.
              </p>

              <div style={{
                background: '#FFFBF7',
                borderRadius: 18,
                padding: 24,
                textAlign: 'left',
                maxWidth: 440,
                margin: '0 auto 28px',
                border: '1px solid var(--border-subtle)'
              }}>
                <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--accent-primary)', fontWeight: 700 }}>
                  Memory Overview
                </p>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginTop: 4, color: 'var(--text-primary)' }}>
                  For {formData.recipientName} from {formData.senderName}
                </h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                  {formData.occasion} • {formData.keyDate}
                </p>
                <p style={{ fontSize: '0.86rem', fontStyle: 'italic', color: 'var(--text-primary)', marginTop: 8 }}>
                  "{formData.emotionalFeeling}"
                </p>

                <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  <span>{formData.timeline.length} Milestone Chapters</span>
                  <span>{formData.specialMoments.length} Quiet Moments</span>
                </div>
              </div>
            </div>
          )}

          {/* Wizard Footer Controls */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 32,
            paddingTop: 20,
            borderTop: '1px solid var(--border-subtle)'
          }}>
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="btn-secondary"
              >
                <ArrowLeft size={16} /> Back
              </button>
            ) : (
              <div />
            )}

            {currentStep < STEPS.length ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="btn-primary"
              >
                Continue to {STEPS[currentStep].label} <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="btn-primary"
              >
                <CheckCircle2 size={18} />
                Publish Memory & Generate Keepsake Key
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
