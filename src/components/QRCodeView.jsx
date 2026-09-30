import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download, ExternalLink, Check, Copy } from 'lucide-react';

export default function QRCodeView({
  url,
  title = "Private Memory Portal",
  recipientName = "Recipient",
  size = 200,
  onSimulateScan = null
}) {
  const [dataUrl, setDataUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!url) return;
    QRCode.toDataURL(url, {
      width: size * 2,
      margin: 2,
      color: {
        dark: '#3F1726',  /* Velvet Deep Berry for QR modules */
        light: '#FFF8F2'  /* Ivory for light background */
      },
      errorCorrectionLevel: 'H'
    })
      .then(res => setDataUrl(res))
      .catch(err => console.error("QR Code generation error:", err));
  }, [url, size]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `LoveGuru-Memory-QR-${recipientName.replace(/\s+/g, '_')}.png`;
    a.click();
  };

  return (
    <div className="qr-frame animate-fade-in" style={{ maxWidth: size + 60, background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
      <div style={{ position: 'relative', width: size, height: size, background: '#FFF8F2', padding: 8, borderRadius: 14 }}>
        {dataUrl ? (
          <img
            src={dataUrl}
            alt={`QR Code for ${title}`}
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', borderRadius: 8 }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            Generating...
          </div>
        )}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'var(--accent-primary)',
          border: '2px solid #FFF8F2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          boxShadow: '0 2px 8px rgba(198, 83, 114, 0.4)'
        }}>
          <span style={{ fontSize: '14px', lineHeight: 1 }}>♥</span>
        </div>
      </div>

      <div style={{ marginTop: 12, textAlign: 'center' }}>
        <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-hover)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Memory Key
        </p>
        <p style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: 2 }}>
          {recipientName}’s Digital World
        </p>
      </div>

      <div style={{ display: 'flex', gap: 6, marginTop: 12, width: '100%' }}>
        <button
          onClick={handleCopyLink}
          className="btn-secondary"
          style={{ flex: 1, padding: '7px 10px', fontSize: '0.78rem' }}
          title="Copy private link"
        >
          {copied ? <Check size={14} color="#2A7B4C" /> : <Copy size={14} color="var(--accent-primary)" />}
          {copied ? "Copied" : "Copy Link"}
        </button>

        <button
          onClick={handleDownload}
          className="btn-secondary"
          style={{ padding: '7px 10px', fontSize: '0.78rem' }}
          title="Download printable PNG"
        >
          <Download size={14} color="var(--accent-primary)" />
        </button>

        {onSimulateScan && (
          <button
            onClick={onSimulateScan}
            className="btn-primary"
            style={{ padding: '7px 12px', fontSize: '0.78rem' }}
            title="Simulate scanning this QR code"
          >
            <ExternalLink size={14} />
            Scan
          </button>
        )}
      </div>
    </div>
  );
}
