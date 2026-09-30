import React, { useState } from 'react';
import {
  Sparkles,
  ExternalLink,
  Edit3,
  QrCode,
  Package,
  Calendar,
  Clock,
  Heart,
  Share2,
  Trash2,
  CheckCircle,
  Truck,
  Plus,
  Eye,
  Layers,
  ChevronRight
} from 'lucide-react';
import QRCodeView from './QRCodeView';

export default function CreatorDashboard({
  memories = [],
  orders = [],
  onOpenDigitalWorld,
  onStartNewMemory,
  onDeleteMemory,
  onUpdateMemory
}) {
  const [activeTab, setActiveTab] = useState('memories'); // 'memories' | 'orders'
  const [activeQrModal, setActiveQrModal] = useState(null);
  const [editingMemory, setEditingMemory] = useState(null);

  // Edit memory form state
  const [editFormData, setEditFormData] = useState({
    title: '',
    emotionalFeeling: '',
    letter: '',
    keyDate: ''
  });

  const handleStartEdit = (mem) => {
    setEditingMemory(mem);
    setEditFormData({
      title: mem.title,
      emotionalFeeling: mem.emotionalFeeling,
      letter: mem.letter,
      keyDate: mem.keyDate
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingMemory) return;
    const updated = {
      ...editingMemory,
      title: editFormData.title,
      emotionalFeeling: editFormData.emotionalFeeling,
      letter: editFormData.letter,
      keyDate: editFormData.keyDate
    };
    onUpdateMemory(updated);
    setEditingMemory(null);
  };

  const totalDays = memories.reduce((acc, m) => acc + (m.daysCount || 0), 0);

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', padding: '30px 20px 80px' }}>
      <div className="container-narrow">
        {/* Dashboard Header & Metrics */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="badge-subtle" style={{ marginBottom: 6 }}>
              Creator Sanctuary
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 500, color: 'var(--text-primary)' }}>
              Your Memory Studio
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem' }}>
              Manage the emotional worlds you’ve built, track artisan handcrafting, and access physical keepsake QR keys.
            </p>
          </div>

          <button
            onClick={onStartNewMemory}
            className="btn-primary"
            style={{ padding: '12px 24px' }}
          >
            <Plus size={16} /> Create New Memory
          </button>
        </div>

        {/* Metrics Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 16,
          marginBottom: 36
        }}>
          <div className="card-paper" style={{ padding: '20px', background: 'var(--bg-card)' }}>
            <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
              Preserved Memories
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', color: 'var(--text-primary)', marginTop: 4 }}>
              {memories.length}
            </h3>
            <p style={{ fontSize: '0.76rem', color: 'var(--accent-primary)', marginTop: 2, fontWeight: 500 }}>
              Active digital worlds
            </p>
          </div>

          <div className="card-paper" style={{ padding: '20px', background: 'var(--bg-card)' }}>
            <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
              Physical Keepsakes
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', color: 'var(--text-primary)', marginTop: 4 }}>
              {orders.length + memories.filter(m => m.keepsake).length}
            </h3>
            <p style={{ fontSize: '0.76rem', color: 'var(--accent-hover)', marginTop: 2, fontWeight: 500 }}>
              Handcrafted with QR plaques
            </p>
          </div>

          <div className="card-paper" style={{ padding: '20px', background: 'var(--bg-card)' }}>
            <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
              Days of Love Anchored
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', color: 'var(--text-primary)', marginTop: 4 }}>
              {totalDays.toLocaleString()}
            </h3>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: 2 }}>
              Cherished milestones
            </p>
          </div>

          <div className="card-paper" style={{ padding: '20px', background: 'var(--bg-card)' }}>
            <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
              Recipient Status
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', color: 'var(--accent-primary)', marginTop: 4 }}>
              Active
            </h3>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: 2 }}>
              Encrypted & accessible
            </p>
          </div>
        </div>

        {/* Navigation Tabs (Memories vs Keepsake Orders) */}
        <div style={{ display: 'flex', gap: 12, borderBottom: '1px solid var(--border-subtle)', marginBottom: 28 }}>
          <button
            onClick={() => setActiveTab('memories')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'memories' ? '2px solid var(--accent-primary)' : '2px solid transparent',
              color: activeTab === 'memories' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer'
            }}
          >
            Preserved Memories ({memories.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'orders' ? '2px solid var(--accent-primary)' : '2px solid transparent',
              color: activeTab === 'orders' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer'
            }}
          >
            Keepsake Orders & Handcrafting Status ({orders.length})
          </button>
        </div>

        {/* Tab 1: Memories List */}
        {activeTab === 'memories' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {memories.map((mem) => {
              const memoryUrl = `${window.location.origin}/#memory=${mem.slug}`;
              return (
                <div
                  key={mem.id}
                  className="card-paper"
                  style={{
                    padding: 24,
                    background: 'var(--bg-card)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 20,
                    alignItems: 'center'
                  }}
                >
                  {/* Left: Thumbnail & Info */}
                  <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
                    <img
                      src={mem.coverImage}
                      alt={mem.title}
                      style={{ width: 92, height: 92, borderRadius: 14, objectFit: 'cover', border: '1px solid var(--border-subtle)' }}
                    />
                    <div>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
                        <span className="badge-subtle" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                          {mem.occasion}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          {mem.keyDate}
                        </span>
                      </div>

                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {mem.title}
                      </h4>

                      <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                        For <strong>{mem.recipientName}</strong> from <strong>{mem.senderName}</strong> ({mem.relationship})
                      </p>

                      {mem.keepsake && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.74rem', color: 'var(--accent-hover)', marginTop: 6, fontWeight: 500 }}>
                          <CheckCircle size={12} color="var(--accent-primary)" /> Linked to {mem.keepsake.name}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => onOpenDigitalWorld(mem)}
                      className="btn-primary"
                      style={{ padding: '8px 16px', fontSize: '0.84rem' }}
                      title="Experience as Recipient"
                    >
                      <Eye size={14} />
                      Preview Digital World
                    </button>

                    <button
                      onClick={() => setActiveQrModal(mem)}
                      className="btn-secondary"
                      style={{ padding: '8px 14px', fontSize: '0.84rem' }}
                      title="View & Download QR Code"
                    >
                      <QrCode size={14} color="var(--accent-primary)" />
                      QR Key
                    </button>

                    <button
                      onClick={() => handleStartEdit(mem)}
                      className="btn-secondary"
                      style={{ padding: '8px 12px', fontSize: '0.84rem' }}
                      title="Edit Story or Letter"
                    >
                      <Edit3 size={14} color="var(--accent-primary)" />
                    </button>

                    {memories.length > 1 && (
                      <button
                        onClick={() => onDeleteMemory(mem.id)}
                        className="btn-secondary"
                        style={{ padding: '8px 12px', fontSize: '0.84rem', color: 'var(--accent-hover)' }}
                        title="Delete Memory"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Orders Tracking */}
        {activeTab === 'orders' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {orders.length === 0 ? (
              <div className="card-paper" style={{ padding: 40, textAlign: 'center', background: 'var(--bg-card)' }}>
                <Package size={36} color="var(--accent-primary)" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--text-primary)' }}>No Physical Orders Placed Yet</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: 4 }}>
                  Visit the Physical Keepsakes Atelier to turn any of your digital memories into a hand-finished heirloom frame, keychain, or wax-sealed letter.
                </p>
              </div>
            ) : (
              orders.map((ord) => (
                <div key={ord.orderId} className="card-paper" style={{ padding: 24, background: 'var(--bg-card)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
                    <div>
                      <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                        Order Ref: {ord.orderId} • {ord.date}
                      </span>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: 2 }}>
                        {ord.keepsake?.name || "Keepsake"}
                      </h4>
                    </div>
                    <span className="badge-gold">
                      {ord.status}
                    </span>
                  </div>

                  <div style={{ background: '#FFFBF7', padding: 14, borderRadius: 12, marginBottom: 16, border: '1px solid var(--border-subtle)' }}>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-primary)' }}>
                      <strong>Engraving:</strong> "{ord.customEngraving}"
                    </p>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                      Destination: {ord.shippingInfo?.recipientName || "Recipient"} • {ord.shippingInfo?.address}, {ord.shippingInfo?.city}
                    </p>
                  </div>

                  {/* Real-time Artisan Handcrafting Progress Steps */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginTop: 20 }}>
                    {[
                      { step: 'Order Placed', done: true },
                      { step: 'Artisan Wood & Leather Crafting', done: true },
                      { step: 'Laser-Etching QR Code', done: true },
                      { step: 'Wax Seal & Luxury Packaging', done: false },
                      { step: 'Dispatched with Care', done: false }
                    ].map((s, idx) => (
                      <div key={idx} style={{ textAlign: 'center', flex: 1, position: 'relative' }}>
                        <div style={{
                          width: 22,
                          height: 22,
                          borderRadius: '50%',
                          background: s.done ? 'var(--accent-primary)' : 'var(--border-subtle)',
                          color: '#FFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 6px',
                          fontSize: '11px',
                          fontWeight: 700
                        }}>
                          {s.done ? '✓' : idx + 1}
                        </div>
                        <span style={{ fontSize: '0.72rem', color: s.done ? 'var(--text-primary)' : 'var(--text-secondary)', lineHeight: 1.25, display: 'block' }}>
                          {s.step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* QR Key Modal */}
        {activeQrModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(63, 23, 38, 0.72)',
            backdropFilter: 'blur(5px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
          }}>
            <div className="card-paper" style={{ maxWidth: 390, width: '100%', background: 'var(--bg-card)', padding: 28, textAlign: 'center', borderRadius: 22, border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span className="badge-subtle" style={{ fontSize: '0.72rem' }}>Physical + Digital Portal</span>
                <button
                  onClick={() => setActiveQrModal(null)}
                  style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: 'var(--text-secondary)' }}
                >
                  ×
                </button>
              </div>

              <QRCodeView
                url={`${window.location.origin}/#memory=${activeQrModal.slug}`}
                recipientName={activeQrModal.recipientName}
                title={activeQrModal.title}
                size={180}
                onSimulateScan={() => {
                  setActiveQrModal(null);
                  onOpenDigitalWorld(activeQrModal);
                }}
              />

              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 16 }}>
                Laser-etch or print this QR code to connect physical keepsakes directly to {activeQrModal.recipientName}’s memory world.
              </p>
            </div>
          </div>
        )}

        {/* Edit Memory Modal */}
        {editingMemory && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(63, 23, 38, 0.72)',
            backdropFilter: 'blur(5px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
          }}>
            <div className="card-paper" style={{ maxWidth: 560, width: '100%', background: 'var(--bg-card)', padding: 30, borderRadius: 22, maxHeight: '90vh', overflowY: 'auto', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-primary)' }}>
                  Edit Memory Content
                </h3>
                <button
                  onClick={() => setEditingMemory(null)}
                  style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: 'var(--text-secondary)' }}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label>Memory Title</label>
                  <input
                    type="text"
                    value={editFormData.title}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label>Key Date</label>
                  <input
                    type="text"
                    value={editFormData.keyDate}
                    onChange={(e) => setEditFormData({ ...editFormData, keyDate: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label>Emotional Thesis / Core Feeling</label>
                  <textarea
                    value={editFormData.emotionalFeeling}
                    onChange={(e) => setEditFormData({ ...editFormData, emotionalFeeling: e.target.value })}
                    style={{ minHeight: 70 }}
                  />
                </div>

                <div>
                  <label>Personal Letter (Deckled View)</label>
                  <textarea
                    value={editFormData.letter}
                    onChange={(e) => setEditFormData({ ...editFormData, letter: e.target.value })}
                    style={{ minHeight: 180, fontFamily: 'var(--font-handwriting)', fontSize: '1.35rem', color: 'var(--text-primary)' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                  <button
                    type="button"
                    onClick={() => setEditingMemory(null)}
                    className="btn-secondary"
                    style={{ flex: 1 }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ flex: 2 }}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
