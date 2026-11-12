import { useState, useEffect } from 'react';

interface PlaceholderSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const PlaceholderSettings = ({ isOpen, onClose }: PlaceholderSettingsProps) => {
  const [placeholderType, setPlaceholderType] = useState<'default' | 'custom' | 'url'>('default');
  const [customImage, setCustomImage] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('/assets/images/default-thumbnail.svg');

  useEffect(() => {
    // Load current setting from localStorage
    const saved = localStorage.getItem('zubaze_default_thumbnail');
    const savedType = localStorage.getItem('zubaze_placeholder_type') || 'default';
    
    setPlaceholderType(savedType as 'default' | 'custom' | 'url');
    
    if (saved && savedType !== 'default') {
      setCustomImage(saved);
      setPreviewUrl(saved);
    }
  }, [isOpen]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setCustomImage(base64String);
      setPreviewUrl(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setCustomImage(url);
    setPreviewUrl(url);
  };

  const handleSave = () => {
    if (placeholderType === 'default') {
      localStorage.removeItem('zubaze_default_thumbnail');
      localStorage.setItem('zubaze_placeholder_type', 'default');
      alert('✅ Default placeholder restored!');
    } else if (placeholderType === 'custom' && customImage) {
      localStorage.setItem('zubaze_default_thumbnail', customImage);
      localStorage.setItem('zubaze_placeholder_type', 'custom');
      alert('✅ Custom placeholder saved!');
    } else if (placeholderType === 'url' && customImage) {
      localStorage.setItem('zubaze_default_thumbnail', customImage);
      localStorage.setItem('zubaze_placeholder_type', 'url');
      alert('✅ Placeholder URL saved!');
    } else {
      alert('⚠️ Please provide an image or URL');
      return;
    }
    onClose();
  };

  const handleReset = () => {
    localStorage.removeItem('zubaze_default_thumbnail');
    localStorage.setItem('zubaze_placeholder_type', 'default');
    setPlaceholderType('default');
    setCustomImage('');
    setPreviewUrl('/assets/images/default-thumbnail.svg');
    alert('✅ Reset to default placeholder!');
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '40px',
        maxWidth: '700px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ margin: 0, fontSize: '28px', fontWeight: '700' }}>🎨 Default Thumbnail Settings</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '32px',
              cursor: 'pointer',
              color: '#666',
              padding: '0',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
        </div>

        <p style={{ color: '#666', marginBottom: '30px', lineHeight: '1.6' }}>
          Choose what image appears when a website doesn't have a custom thumbnail. This will be used for all your client projects without thumbnails.
        </p>

        {/* Preview */}
        <div style={{
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '15px', fontSize: '18px' }}>Preview</h3>
          <img
            src={previewUrl}
            alt="Placeholder preview"
            style={{
              maxWidth: '100%',
              height: 'auto',
              maxHeight: '300px',
              borderRadius: '8px',
              border: '2px solid #dee2e6',
              objectFit: 'contain',
              backgroundColor: 'white'
            }}
            onError={(e) => {
              e.currentTarget.src = '/assets/images/default-thumbnail.svg';
              e.currentTarget.style.border = '2px solid #ef4444';
            }}
          />
        </div>

        {/* Options */}
        <div style={{ marginBottom: '30px' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            padding: '15px',
            border: `2px solid ${placeholderType === 'default' ? '#ABFB4F' : '#dee2e6'}`,
            borderRadius: '8px',
            marginBottom: '15px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backgroundColor: placeholderType === 'default' ? '#f0fdf4' : 'white'
          }}>
            <input
              type="radio"
              name="placeholderType"
              checked={placeholderType === 'default'}
              onChange={() => {
                setPlaceholderType('default');
                setPreviewUrl('/assets/images/default-thumbnail.svg');
              }}
              style={{ marginRight: '12px', width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <div>
              <strong style={{ display: 'block', marginBottom: '4px' }}>Use Default Placeholder</strong>
              <span style={{ fontSize: '14px', color: '#666' }}>Professional gradient design with website icon</span>
            </div>
          </label>

          <label style={{
            display: 'flex',
            alignItems: 'center',
            padding: '15px',
            border: `2px solid ${placeholderType === 'custom' ? '#ABFB4F' : '#dee2e6'}`,
            borderRadius: '8px',
            marginBottom: '15px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backgroundColor: placeholderType === 'custom' ? '#f0fdf4' : 'white'
          }}>
            <input
              type="radio"
              name="placeholderType"
              checked={placeholderType === 'custom'}
              onChange={() => setPlaceholderType('custom')}
              style={{ marginRight: '12px', width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <div style={{ flex: 1 }}>
              <strong style={{ display: 'block', marginBottom: '4px' }}>Upload Custom Image</strong>
              <span style={{ fontSize: '14px', color: '#666', display: 'block', marginBottom: '10px' }}>
                Use your own logo or branded placeholder (recommended: 800x600px)
              </span>
              {placeholderType === 'custom' && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{
                    marginTop: '10px',
                    padding: '8px',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    width: '100%',
                    cursor: 'pointer'
                  }}
                />
              )}
            </div>
          </label>

          <label style={{
            display: 'flex',
            alignItems: 'center',
            padding: '15px',
            border: `2px solid ${placeholderType === 'url' ? '#ABFB4F' : '#dee2e6'}`,
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backgroundColor: placeholderType === 'url' ? '#f0fdf4' : 'white'
          }}>
            <input
              type="radio"
              name="placeholderType"
              checked={placeholderType === 'url'}
              onChange={() => setPlaceholderType('url')}
              style={{ marginRight: '12px', width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <div style={{ flex: 1 }}>
              <strong style={{ display: 'block', marginBottom: '4px' }}>Use Image URL</strong>
              <span style={{ fontSize: '14px', color: '#666', display: 'block', marginBottom: '10px' }}>
                Link to an image hosted elsewhere
              </span>
              {placeholderType === 'url' && (
                <input
                  type="url"
                  placeholder="https://example.com/my-placeholder.png"
                  value={customImage}
                  onChange={handleUrlChange}
                  style={{
                    marginTop: '10px',
                    padding: '12px',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    width: '100%',
                    fontSize: '14px'
                  }}
                />
              )}
            </div>
          </label>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'space-between' }}>
          <button
            onClick={handleReset}
            style={{
              padding: '14px 28px',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          >
            Reset to Default
          </button>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button
              onClick={onClose}
              style={{
                padding: '14px 28px',
                backgroundColor: 'white',
                color: '#374151',
                border: '2px solid #dee2e6',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#ABFB4F'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#dee2e6'}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="zubuz-default-btn"
              style={{
                padding: '14px 32px',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderSettings;
