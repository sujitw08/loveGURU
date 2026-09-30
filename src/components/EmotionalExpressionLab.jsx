import React, { useState } from 'react';
import { Heart, Sparkles, Feather, Copy, Check, ArrowRight, RefreshCw, Wand2 } from 'lucide-react';
import { generateEmotionalLetters } from '../utils/emotionalExpression';

export default function EmotionalExpressionLab({
  initialData = {},
  onSelectLetter = null
}) {
  const [formData, setFormData] = useState({
    name: initialData.recipientName || "Sarah",
    sender: initialData.senderName || "Julian",
    relationship: initialData.relationship || "Life Partner",
    trigger: "Celebrating three years of building our quiet home together",
    feeling: "A quiet, steady certainty that you are my favorite sanctuary in this world",
    memory: "The rainy afternoon in Kyoto when our umbrella broke and we didn't care",
    unspoken: "That you never have to be anything other than your honest self with me",
    tone: "intimate"
  });

  const [generatedDrafts, setGeneratedDrafts] = useState(() =>
    generateEmotionalLetters(formData)
  );

  const [activeTab, setActiveTab] = useState(0);
  const [editableContent, setEditableContent] = useState(() =>
    generatedDrafts[0]?.content || ""
  );
  const [copied, setCopied] = useState(false);

  const handleInputChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleGenerate = (e) => {
    if (e) e.preventDefault();
    const drafts = generateEmotionalLetters(formData);
    setGeneratedDrafts(drafts);
    setEditableContent(drafts[activeTab]?.content || drafts[0]?.content || "");
  };

  const handleSelectTab = (index) => {
    setActiveTab(index);
    setEditableContent(generatedDrafts[index]?.content || "");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editableContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadExample = (type) => {
    if (type === 'partner') {
      const data = {
        name: "Elena",
        sender: "Liam",
        relationship: "Life Partner",
        trigger: "Waking up this morning and watching the sunlight hit your face while you were still sleeping",
        feeling: "Total peace and gratitude that of all the people on earth, we found each other",
        memory: "Our first road trip when the car broke down and we danced in the rain by the gas station",
        unspoken: "No matter how loud the world gets, I will always choose you, every single day",
        tone: "intimate"
      };
      setFormData(data);
      const drafts = generateEmotionalLetters(data);
      setGeneratedDrafts(drafts);
      setEditableContent(drafts[0].content);
    } else if (type === 'parent') {
      const data = {
        name: "Mom",
        sender: "David",
        relationship: "Parent & Child",
        trigger: "Cooking your stew recipe alone in my first apartment and feeling your presence",
        feeling: "Deep awe and gratitude for every quiet sacrifice you made without ever complaining",
        memory: "You waiting up for me at the kitchen table with a cup of tea during exam week",
        unspoken: "Everything good and gentle in me came from the way you loved me",
        tone: "gratitude"
      };
      setFormData(data);
      const drafts = generateEmotionalLetters(data);
      setGeneratedDrafts(drafts);
      setEditableContent(drafts[0].content);
    } else if (type === 'friend') {
      const data = {
        name: "Maya",
        sender: "Chloe",
        relationship: "Best Friend",
        trigger: "Reflecting on ten years of friendship across three different cities",
        feeling: "Grateful that distance has never changed how deeply we understand each other",
        memory: "Sitting on the library floor at 2 AM crying with laughter over nothing",
        unspoken: "You are the sister I chose, and I will always have your back no matter where life leads",
        tone: "timeless"
      };
      setFormData(data);
      const drafts = generateEmotionalLetters(data);
      setGeneratedDrafts(drafts);
      setEditableContent(drafts[0].content);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', padding: '30px 20px 70px' }}>
      <div className="container-narrow">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span className="badge-subtle" style={{ marginBottom: 8 }}>
            Branch 3: Emotional Expression
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 500, color: 'var(--text-primary)' }}>
            Turn Your Unspoken Feelings into Authentic Words
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 640, margin: '8px auto 0', fontSize: '0.98rem' }}>
            We don't create artificially dramatic Hollywood scripts. LoveGuru guides you through what actually happened, what you genuinely feel, and turns it into sincere, beautifully written letters you can edit.
          </p>

          {/* Quick Example Presets */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-primary)', alignSelf: 'center', fontWeight: 500 }}>Try an authentic story:</span>
            <button onClick={() => loadExample('partner')} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
              💌 For Partner
            </button>
            <button onClick={() => loadExample('parent')} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
              🌿 For Parent
            </button>
            <button onClick={() => loadExample('friend')} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
              ✨ For Best Friend
            </button>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 32,
          alignItems: 'start'
        }}>
          {/* Left Column: The 6 Guided Questions in Ivory Card */}
          <div className="card-paper" style={{ padding: 28, background: 'var(--bg-card)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div className="wax-seal" style={{ width: 32, height: 32, fontSize: '0.8rem' }}>
                ✦
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Guided Emotional Questions
              </h3>
            </div>

            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label>1. Who is this for?</label>
                  <input
                    type="text"
                    placeholder="Their name (e.g. Sarah)"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Your Name</label>
                  <input
                    type="text"
                    placeholder="Your name (e.g. Julian)"
                    value={formData.sender}
                    onChange={(e) => handleInputChange('sender', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label>Relationship & Bond</label>
                <select
                  value={formData.relationship}
                  onChange={(e) => handleInputChange('relationship', e.target.value)}
                >
                  <option value="Life Partner">Life Partner / Soulmate</option>
                  <option value="Parent & Child">Parent / Father / Mother</option>
                  <option value="Best Friend">Best Friend</option>
                  <option value="Sibling">Sibling / Brother / Sister</option>
                  <option value="Mentor / Guide">Mentor / Guide</option>
                  <option value="Child / Son / Daughter">Child</option>
                </select>
              </div>

              <div>
                <label>2. What happened or inspired you to write this now?</label>
                <textarea
                  placeholder="What prompted this feeling? (e.g. An anniversary, a hard month we survived, or a quiet realization...)"
                  value={formData.trigger}
                  onChange={(e) => handleInputChange('trigger', e.target.value)}
                  style={{ minHeight: 70 }}
                />
              </div>

              <div>
                <label>3. What do you feel deep down that is hard to say out loud?</label>
                <textarea
                  placeholder="The feeling underneath everything (e.g. Total relief when you are near, quiet certainty...)"
                  value={formData.feeling}
                  onChange={(e) => handleInputChange('feeling', e.target.value)}
                  style={{ minHeight: 70 }}
                />
              </div>

              <div>
                <label>4. What specific memory matters most between you?</label>
                <textarea
                  placeholder="A sensory, unforgettable moment (e.g. The flat tire on highway 1, drinking tea at 2 AM...)"
                  value={formData.memory}
                  onChange={(e) => handleInputChange('memory', e.target.value)}
                  style={{ minHeight: 70 }}
                />
              </div>

              <div>
                <label>5. What do you want them to know, understand, or never forget?</label>
                <textarea
                  placeholder="The core truth you want them to keep (e.g. That you never have to face anything alone...)"
                  value={formData.unspoken}
                  onChange={(e) => handleInputChange('unspoken', e.target.value)}
                  style={{ minHeight: 70 }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', marginTop: 8 }}
              >
                <Wand2 size={16} />
                Synthesize Authentic Expressions
              </button>
            </form>
          </div>

          {/* Right Column: Crafted Results & In-Place Editor */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Tone / Version Tabs */}
            <div style={{ display: 'flex', gap: 8, background: '#EED0D3', padding: 4, borderRadius: 14, border: '1px solid var(--border-subtle)' }}>
              {generatedDrafts.map((draft, idx) => (
                <button
                  key={draft.id}
                  onClick={() => handleSelectTab(idx)}
                  style={{
                    flex: 1,
                    padding: '9px 12px',
                    border: 'none',
                    borderRadius: 10,
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: activeTab === idx ? 'var(--bg-card)' : 'transparent',
                    color: activeTab === idx ? 'var(--accent-hover)' : 'var(--text-secondary)',
                    boxShadow: activeTab === idx ? 'var(--shadow-sm)' : 'none',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  {draft.title}
                </button>
              ))}
            </div>

            {/* Letter Presentation & Editor in Ivory Card */}
            <div className="card-paper" style={{ padding: 24, background: 'var(--bg-card)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <span className="badge-gold" style={{ fontSize: '0.72rem' }}>
                    {generatedDrafts[activeTab]?.vibe}
                  </span>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                    {generatedDrafts[activeTab]?.description}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    onClick={handleCopy}
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                  >
                    {copied ? <Check size={14} color="#2A7B4C" /> : <Copy size={14} color="var(--accent-primary)" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 8 }}>
                Complete Editing: Polish words to sound 100% true to your personal voice
              </label>

              <textarea
                value={editableContent}
                onChange={(e) => setEditableContent(e.target.value)}
                style={{
                  fontFamily: 'var(--font-handwriting)',
                  fontSize: '1.45rem',
                  lineHeight: 1.6,
                  minHeight: 340,
                  background: '#FFFBF7',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 12,
                  padding: 18,
                  color: 'var(--text-primary)'
                }}
              />

              {/* Transfer to Memory Wizard Action */}
              <div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                {onSelectLetter && (
                  <button
                    onClick={() => onSelectLetter(editableContent)}
                    className="btn-primary"
                    style={{ width: '100%' }}
                  >
                    <Feather size={16} />
                    Transfer into Memory Letter
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
