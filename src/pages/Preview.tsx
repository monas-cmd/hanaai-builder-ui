import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const Preview = () => {
  const { userData } = useAppContext();
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  // Generate HTML mockup
  const generateMockup = () => {
    const colors = {
      'Ocean Blue': { primary: '#0a4da3', secondary: '#1e88e5' },
      'Forest Green': { primary: '#1b5e20', secondary: '#388e3c' },
      'Sunset Orange': { primary: '#e65100', secondary: '#f57c00' },
      'Royal Purple': { primary: '#4a148c', secondary: '#7b1fa2' },
      'Modern Gray': { primary: '#212121', secondary: '#424242' }
    };

    const palette = colors[userData.colorPalette as keyof typeof colors] || colors['Ocean Blue'];

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${userData.businessName} Preview</title>
        <style>
          body { 
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
          }
          .header {
            background: linear-gradient(135deg, ${palette.primary}, ${palette.secondary});
            color: white;
            padding: 3rem 1rem;
            text-align: center;
          }
          .content {
            max-width: 1200px;
            margin: 2rem auto;
            padding: 0 1rem;
          }
          .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
          }
          .feature-card {
            background: white;
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${userData.businessName}</h1>
          <p>${userData.theme} Theme Preview</p>
        </div>
        <div class="content">
          <div class="features">
            <div class="feature-card">
              <h3>Our Services</h3>
              <p>Professional services tailored to your needs</p>
            </div>
            <div class="feature-card">
              <h3>About Us</h3>
              <p>Learn about our company and values</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  // Load mockup into iframe
  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const handleLoad = () => setIsIframeLoaded(true);

      iframe.addEventListener('load', handleLoad);
      
      const iframeDoc = iframe.contentDocument;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(generateMockup());
        iframeDoc.close();
      }

      return () => {
        iframe.removeEventListener('load', handleLoad);
      };
    }
  }, [userData]);

  const handlePublish = () => {
    // Publish logic here
    navigate('/published');
  };

  return (
    <div className="preview-page max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Website Preview</h2>
      
      {/* Preview Container */}
      <div className="mb-8 border-2 border-gray-200 rounded-lg overflow-hidden">
        {/* Browser Chrome */}
        <div className="bg-gray-100 p-2 flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-sm text-gray-600 truncate">
            {userData.domain || 'yourwebsite.com'}
          </div>
        </div>
        
        {/* Iframe Preview */}
        {!isIframeLoaded && (
          <div className="h-96 flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        <iframe
          ref={iframeRef}
          title="Website Preview"
          className={`w-full h-[500px] bg-white ${isIframeLoaded ? 'block' : 'hidden'}`}
          sandbox="allow-same-origin"
        />
      </div>

      {/* Publish Button - Always visible */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg"
        >
          Back
        </button>
        <button
          onClick={handlePublish}
          disabled={!isIframeLoaded}
          className={`px-6 py-2 rounded-lg text-white ${
            isIframeLoaded 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Publish Website
        </button>
      </div>
    </div>
  );
};

export default Preview;