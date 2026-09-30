import React, { useState } from 'react';
import {
  Sparkles,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Box,
  Layers,
  ArrowRight
} from 'lucide-react';
import QRCodeView from './QRCodeView';
import { KEEPSAKE_CATALOG } from '../data/initialMemories';

export default function PhysicalKeepsakesAtelier({
  memories = [],
  activeMemory = null,
  onOpenDigitalWorld = null,
  onOrderPlaced = null
}) {
  const [selectedKeepsakeId, setSelectedKeepsakeId] = useState('frame');
  const [selectedMemoryId, setSelectedMemoryId] = useState(
    activeMemory ? activeMemory.id : (memories[0]?.id || '')
  );

  // Customization options
  const [frameWood, setFrameWood] = useState('walnut'); // walnut, oak, ebony
  const [shirtColor, setShirtColor] = useState('oatmeal'); // oatmeal, terracotta, black
  const [shirtSize, setShirtSize] = useState('M');
  const [waxColor, setWaxColor] = useState('crimson'); // crimson, gold, sage
  const [customEngraving, setCustomEngraving] = useState('');
  const [giftBoxIncluded, setGiftBoxIncluded] = useState(true);
  const [giftNote, setGiftNote] = useState('Wrapped with quiet love. Scan the QR code to unveil your memory.');

  // Order modal state
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    recipientName: '',
    address: '742 Evergreen Terrace',
    city: 'San Francisco',
    postalCode: '94107',
    country: 'United States'
  });

  const currentKeepsake = KEEPSAKE_CATALOG.find(k => k.id === selectedKeepsakeId) || KEEPSAKE_CATALOG[0];
  const linkedMemory = memories.find(m => m.id === selectedMemoryId) || memories[0];

  const memoryUrl = linkedMemory
    ? `${window.location.origin}/#memory=${linkedMemory.slug}`
    : `${window.location.origin}/#memory=preview`;

  const handleSimulateScan = () => {
    if (onOpenDigitalWorld && linkedMemory) {
      onOpenDigitalWorld(linkedMemory);
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const newOrder = {
      orderId: `LG-${Math.floor(1000 + Math.random() * 9000)}-${currentKeepsake.id.toUpperCase()}`,
      keepsake: currentKeepsake,
      memory: linkedMemory,
      customEngraving: customEngraving || `${linkedMemory?.recipientName || "Recipient"} • ${linkedMemory?.keyDate || "Cherished"}`,
      options: { frameWood, shirtColor, shirtSize, waxColor, giftBoxIncluded, giftNote },
      shippingInfo,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: "In Artisan Handcrafting",
      qrUrl: memoryUrl
    };

    if (onOrderPlaced) {
      onOrderPlaced(newOrder);
    }
    setOrderSuccess(true);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', padding: '30px 20px 70px' }}>
      <div className="container-narrow">
        {/* Branch Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="badge-subtle" style={{ marginBottom: 8 }}>
            Branch 4 & 5: Physical Keepsakes + Digital QR Bridge
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 500, color: 'var(--text-primary)' }}>
            Turn Memories Into Tangible Heirlooms
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 680, margin: '10px auto 0', fontSize: '0.98rem' }}>
            LoveGuru never sells generic merchandise. Every keepsake is hand-finished and physically linked via precision QR engraving to the exact digital memory world you created.
          </p>
        </div>

        {/* Keepsake Selector Tabs */}
        <div style={{
          display: 'flex',
          gap: 12,
          overflowX: 'auto',
          paddingBottom: 12,
          marginBottom: 32,
          justifyContent: 'center'
        }}>
          {KEEPSAKE_CATALOG.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedKeepsakeId(item.id)}
              style={{
                padding: '12px 18px',
                borderRadius: 16,
                border: selectedKeepsakeId === item.id ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                background: selectedKeepsakeId === item.id ? 'var(--bg-card)' : 'rgba(255, 248, 242, 0.6)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                minWidth: 160,
                boxShadow: selectedKeepsakeId === item.id ? 'var(--shadow-md)' : 'none',
                transition: 'var(--transition-smooth)'
              }}
            >
              <div style={{ textAlign: 'left' }}>
                <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {item.name.replace("The ", "")}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 700 }}>
                  {item.price}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Main Keepsake Customization Workspace */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 36,
          alignItems: 'start'
        }}>
          {/* Left: Dynamic Live Physical Keepsake Mockup with Active QR code */}
          <div>
            <div className="card-paper" style={{ padding: 24, background: 'var(--bg-card)', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span className="badge-gold">
                  {currentKeepsake.badge}
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Handcrafted to order
                </span>
              </div>

              {/* Visual Keepsake Mockup Stage in Rosacea Warmth */}
              <div style={{
                minHeight: 380,
                background: 'linear-gradient(135deg, #F8E2E6 0%, #F5D7B5 100%)',
                borderRadius: 18,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid var(--border-subtle)'
              }}>
                {/* Product Type 1: Frame */}
                {selectedKeepsakeId === 'frame' && (
                  <div style={{
                    width: 260,
                    background: frameWood === 'walnut' ? '#3F1726' : frameWood === 'oak' ? '#A3774A' : '#1C1918',
                    padding: 18,
                    borderRadius: 8,
                    boxShadow: '0 20px 40px rgba(101, 38, 62, 0.28)',
                    transition: 'background 0.3s ease'
                  }}>
                    <div style={{ background: '#FFF8F2', padding: 14, borderRadius: 3, textAlign: 'center' }}>
                      <img
                        src={linkedMemory?.coverImage || currentKeepsake.image}
                        alt="Mounted photograph"
                        style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 2 }}
                      />
                      <div style={{ marginTop: 10, borderTop: '1px solid #E5BFC5', paddingTop: 8 }}>
                        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {customEngraving || `${linkedMemory?.recipientName || "Sarah"} & ${linkedMemory?.senderName || "Julian"}`}
                        </p>
                        {/* Brass laser QR code badge simulation */}
                        <div style={{
                          marginTop: 6,
                          background: 'linear-gradient(135deg, #DEBA70, #9E7B35)',
                          padding: '4px 8px',
                          borderRadius: 4,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          color: '#281E12',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
                        }}>
                          <span>QR PORTAL</span>
                          <span style={{ fontSize: '0.75rem' }}>☲</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Product Type 2: Letter */}
                {selectedKeepsakeId === 'letter' && (
                  <div className="keepsake-letter-mockup" style={{ width: 280, padding: 22, textAlign: 'left', background: '#FFFBF7' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{ fontSize: '0.68rem', color: 'var(--accent-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                        300gsm Cotton Rag
                      </span>
                      <div
                        className="wax-seal"
                        style={{
                          width: 28,
                          height: 28,
                          background: waxColor === 'crimson' ? 'radial-gradient(circle, #D95D7D, #8C223E)' : waxColor === 'gold' ? 'radial-gradient(circle, #E5C158, #9A7B2C)' : 'radial-gradient(circle, #6C8E68, #375334)'
                        }}
                      >
                        ♥
                      </div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.1rem', lineHeight: 1.4, color: 'var(--text-primary)', height: 140, overflow: 'hidden' }}>
                      {linkedMemory?.letter?.substring(0, 160) || "When I think about our journey, it is the quiet spaces in between that matter most..."}
                    </div>
                    <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: 8, marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>QR Code on Envelope Seal</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>LoveGuru Artisan</span>
                    </div>
                  </div>
                )}

                {/* Product Type 3: Keychain */}
                {selectedKeepsakeId === 'keychain' && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', border: '4px solid #C49747', marginBottom: -10, zIndex: 1 }} />
                    <div style={{
                      background: '#3F1726',
                      padding: '24px 20px',
                      borderRadius: 14,
                      width: 220,
                      boxShadow: '0 12px 28px rgba(63, 23, 38, 0.35)',
                      border: '1px dashed var(--accent-secondary)',
                      textAlign: 'center',
                      color: '#FFF8F2'
                    }}>
                      <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-highlight)' }}>
                        Vegetable-Tanned Bridle
                      </span>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', marginTop: 4 }}>
                        {customEngraving || linkedMemory?.recipientName?.toUpperCase() || "SARAH"}
                      </h4>
                      <div style={{
                        margin: '12px auto 0',
                        width: 58,
                        height: 58,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #DEBA70, #8A641B)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#281E12',
                        fontWeight: 700,
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                      }}>
                        <div style={{ textAlign: 'center', lineHeight: 1 }}>
                          <span style={{ fontSize: '18px' }}>☲</span>
                          <span style={{ display: 'block', fontSize: '8px', marginTop: 2 }}>SCANNABLE</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Product Type 4: T-shirt */}
                {selectedKeepsakeId === 'tshirt' && (
                  <div style={{
                    width: 260,
                    background: shirtColor === 'oatmeal' ? '#FFF8F2' : shirtColor === 'terracotta' ? '#C65372' : '#3F1726',
                    color: shirtColor === 'black' || shirtColor === 'terracotta' ? '#FFF8F2' : 'var(--text-primary)',
                    borderRadius: 16,
                    padding: 24,
                    boxShadow: '0 12px 30px rgba(101, 38, 62, 0.15)',
                    position: 'relative',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <div style={{ width: 60, height: 18, borderBottom: '2px solid rgba(0,0,0,0.15)', margin: '0 auto 20px', borderRadius: '0 0 50% 50%' }} />
                    <div style={{ textAlign: 'left', paddingLeft: 10 }}>
                      <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.8 }}>
                        Heart Embroidery:
                      </span>
                      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.98rem', fontWeight: 600 }}>
                        {linkedMemory?.keyDate || "October 14, 2021"}
                      </p>
                    </div>

                    <div style={{
                      position: 'absolute',
                      bottom: 12,
                      right: 16,
                      background: '#FFFFFF',
                      color: 'var(--text-primary)',
                      padding: '4px 8px',
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      border: '1px solid var(--border-subtle)'
                    }}>
                      <span>QR</span>
                      <span style={{ fontSize: '0.75rem' }}>☲</span>
                    </div>
                  </div>
                )}

                {/* Product Type 5: Card */}
                {selectedKeepsakeId === 'card' && (
                  <div style={{
                    width: 250,
                    background: '#FFF8F2',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 10,
                    padding: 20,
                    boxShadow: 'var(--shadow-md)',
                    textAlign: 'center'
                  }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#F8E2E6', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                      ♥
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {linkedMemory?.title || "Three Years of Sunrises"}
                    </h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                      600gsm Letterpress Cotton Card
                    </p>
                    <div style={{
                      margin: '16px auto',
                      width: 70,
                      height: 70,
                      border: '2px dashed var(--accent-primary)',
                      borderRadius: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#FFF'
                    }}>
                      <span style={{ fontSize: '18px', color: 'var(--accent-primary)' }}>☲</span>
                      <span style={{ fontSize: '8px', fontWeight: 700, color: 'var(--accent-primary)' }}>QR WINDOW</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Test QR Scan Bridge Button */}
              <div style={{ marginTop: 20, padding: 14, background: '#FFF8F2', borderRadius: 14, border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ textAlign: 'left' }}>
                  <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--accent-primary)', fontWeight: 700 }}>
                    Physical + Digital Bridge
                  </span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    How the recipient transitions from gift to story:
                  </p>
                </div>

                <button
                  onClick={handleSimulateScan}
                  className="btn-primary"
                  style={{ padding: '8px 14px', fontSize: '0.82rem' }}
                >
                  <ExternalLink size={14} />
                  Simulate Recipient QR Scan
                </button>
              </div>
            </div>
          </div>

          {/* Right: Customization Controls & Gifting Box */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="card-paper" style={{ padding: 26, background: 'var(--bg-card)' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, marginBottom: 14, color: 'var(--text-primary)' }}>
                Customize Your Keepsake
              </h3>

              {/* Select Connected Memory */}
              <div style={{ marginBottom: 18 }}>
                <label>Connect to Which Emotional Memory?</label>
                <select
                  value={selectedMemoryId}
                  onChange={(e) => setSelectedMemoryId(e.target.value)}
                >
                  {memories.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.title} — For {m.recipientName} ({m.occasion})
                    </option>
                  ))}
                </select>
              </div>

              {/* Specific options per keepsake type */}
              {selectedKeepsakeId === 'frame' && (
                <div style={{ marginBottom: 18 }}>
                  <label>Wood Selection & Finish</label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {[
                      { id: 'walnut', name: 'Solid Walnut' },
                      { id: 'oak', name: 'Natural Oak' },
                      { id: 'ebony', name: 'Matte Ebony' }
                    ].map(w => (
                      <button
                        key={w.id}
                        onClick={() => setFrameWood(w.id)}
                        className={frameWood === w.id ? 'btn-dark' : 'btn-secondary'}
                        style={{ flex: 1, padding: '8px 10px', fontSize: '0.82rem' }}
                      >
                        {w.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedKeepsakeId === 'letter' && (
                <div style={{ marginBottom: 18 }}>
                  <label>Artisanal Beeswax Seal Color</label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {[
                      { id: 'crimson', name: 'Crimson Rose' },
                      { id: 'gold', name: 'Champagne Gold' },
                      { id: 'sage', name: 'Botanical Sage' }
                    ].map(w => (
                      <button
                        key={w.id}
                        onClick={() => setWaxColor(w.id)}
                        className={waxColor === w.id ? 'btn-dark' : 'btn-secondary'}
                        style={{ flex: 1, padding: '8px 10px', fontSize: '0.82rem' }}
                      >
                        {w.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedKeepsakeId === 'tshirt' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }}>
                  <div>
                    <label>Tee Fabric Color</label>
                    <select value={shirtColor} onChange={(e) => setShirtColor(e.target.value)}>
                      <option value="oatmeal">Vintage Ivory</option>
                      <option value="terracotta">Raspberry Rose</option>
                      <option value="black">Velvet Berry</option>
                    </select>
                  </div>
                  <div>
                    <label>Size (Relaxed Fit)</label>
                    <select value={shirtSize} onChange={(e) => setShirtSize(e.target.value)}>
                      <option value="XS">XS (Unisex)</option>
                      <option value="S">S (Unisex)</option>
                      <option value="M">M (Unisex)</option>
                      <option value="L">L (Unisex)</option>
                      <option value="XL">XL (Unisex)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Custom Laser Engraving or Text */}
              <div style={{ marginBottom: 18 }}>
                <label>Custom Debossed or Laser-Etched Text</label>
                <input
                  type="text"
                  placeholder={`e.g. ${linkedMemory?.recipientName || "Sarah"} & ${linkedMemory?.senderName || "Julian"} • ${linkedMemory?.keyDate || "2024"}`}
                  value={customEngraving}
                  onChange={(e) => setCustomEngraving(e.target.value)}
                />
                <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: 4, display: 'block' }}>
                  Hand-etched onto the keepsake alongside the QR portal medallion.
                </span>
              </div>

              {/* Packaging & Presentation Box Option */}
              <div style={{
                background: '#FFFBF7',
                borderRadius: 14,
                padding: 16,
                marginBottom: 20,
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Box size={20} color="var(--accent-primary)" />
                    <div>
                      <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        Signature Luxury Unboxing Package
                      </span>
                      <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                        Rigid magnetic keepsake box, gold foil embossing & hand-stamped wax seal (+Complimentary)
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={giftBoxIncluded}
                    onChange={(e) => setGiftBoxIncluded(e.target.checked)}
                    style={{ width: 18, height: 18, accentColor: 'var(--accent-primary)' }}
                  />
                </div>

                {giftBoxIncluded && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-subtle)' }}>
                    <label style={{ fontSize: '0.8rem' }}>Accompanying Calligraphy Note in Box</label>
                    <input
                      type="text"
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      style={{ fontSize: '0.85rem', padding: '8px 12px' }}
                    />
                  </div>
                )}
              </div>

              {/* Price & Order Action Button */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--border-subtle)' }}>
                <div>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Total Keepsake Value
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                    {currentKeepsake.price}
                  </h4>
                </div>

                <button
                  onClick={() => setOrderModalOpen(true)}
                  className="btn-primary"
                  style={{ padding: '12px 28px', fontSize: '0.95rem' }}
                >
                  <ShoppingBag size={18} />
                  Order Keepsake with QR Bridge
                </button>
              </div>
            </div>

            {/* Connected QR Code Viewer Card */}
            <div className="card-paper" style={{ padding: 22, background: 'var(--bg-card)', display: 'flex', alignItems: 'center', gap: 20 }}>
              <QRCodeView
                url={memoryUrl}
                recipientName={linkedMemory?.recipientName || "Recipient"}
                title={linkedMemory?.title || "Memory"}
                size={120}
                onSimulateScan={handleSimulateScan}
              />
              <div>
                <span className="badge-subtle" style={{ fontSize: '0.7rem' }}>Live QR Matrix</span>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: 4 }}>
                  Ready to Print or Laser-Engrave
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                  This QR code links directly to <strong>{linkedMemory?.recipientName}’s</strong> private memory world. You can download it right now for custom cards, or we will laser-etch it onto your chosen physical keepsake.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Checkout Modal */}
        {orderModalOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(63, 23, 38, 0.72)',
            backdropFilter: 'blur(6px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
          }}>
            <div className="card-paper" style={{
              maxWidth: 500,
              width: '100%',
              background: 'var(--bg-card)',
              padding: 30,
              borderRadius: 22,
              maxHeight: '90vh',
              overflowY: 'auto',
              border: '1px solid var(--border-subtle)'
            }}>
              {!orderSuccess ? (
                <form onSubmit={handlePlaceOrder}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      Complete Keepsake Order
                    </h3>
                    <button
                      type="button"
                      onClick={() => setOrderModalOpen(false)}
                      style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: 'var(--text-muted)' }}
                    >
                      ×
                    </button>
                  </div>

                  <div style={{ background: '#FFFBF7', padding: 14, borderRadius: 12, marginBottom: 18, border: '1px solid var(--border-subtle)' }}>
                    <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {currentKeepsake.name} ({currentKeepsake.price})
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      Linked to: {linkedMemory?.title} (for {linkedMemory?.recipientName})
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                      <label>Recipient Delivery Name</label>
                      <input
                        type="text"
                        required
                        placeholder={linkedMemory?.recipientName || "Sarah Jenkins"}
                        value={shippingInfo.recipientName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, recipientName: e.target.value })}
                      />
                    </div>

                    <div>
                      <label>Shipping Address</label>
                      <input
                        type="text"
                        required
                        placeholder="Street address"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      <div>
                        <label>City</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        />
                      </div>
                      <div>
                        <label>Postal Code</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.postalCode}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 22, display: 'flex', gap: 10 }}>
                    <button
                      type="button"
                      onClick={() => setOrderModalOpen(false)}
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
                      Confirm & Start Handcrafting
                    </button>
                  </div>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div className="wax-seal" style={{ width: 64, height: 64, margin: '0 auto 16px', fontSize: '1.6rem' }}>
                    ♥
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Keepsake Order Placed!
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: 8, lineHeight: 1.5 }}>
                    Our artisans are preparing your <strong>{currentKeepsake.name}</strong> with the custom QR engraving connected to <strong>{linkedMemory?.recipientName}’s</strong> memory.
                  </p>
                  <div style={{ marginTop: 24 }}>
                    <button
                      onClick={() => {
                        setOrderModalOpen(false);
                        setOrderSuccess(false);
                      }}
                      className="btn-primary"
                      style={{ width: '100%' }}
                    >
                      View in Creator Dashboard
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
