import { useState, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';

const themes = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, simple design with focus on content',
    preview: '/assets/themes/minimal-preview.jpg'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Sleek design with bold typography and ample whitespace',
    preview: '/assets/themes/modern-preview.jpg'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Corporate look with structured layout',
    preview: '/assets/themes/professional-preview.jpg'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Artistic layout with unique design elements',
    preview: '/assets/themes/creative-preview.jpg'
  }
];

const ThemeSelector = () => {
  const { userData, setUserData, setStep } = useAppContext();
  const [selectedTheme, setSelectedTheme] = useState('');

  const handleContinue = () => {
    setUserData({ ...userData, theme: selectedTheme });
    setStep('type');
  };

  return (
    <div className="theme-selector max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Select Website Theme</h2>
      
      <p className="mb-6 text-gray-600">
        Choose a design template that fits your business style
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {themes.map((theme) => (
          <div 
            key={theme.id}
            className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${selectedTheme === theme.id ? 'ring-2 ring-blue-500' : 'hover:border-blue-300'}`}
            onClick={() => setSelectedTheme(theme.id)}
          >
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              {theme.preview ? (
                <img 
                  src={theme.preview} 
                  alt={`${theme.name} theme preview`} 
                  className="object-cover h-full w-full"
                />
              ) : (
                <span className="text-gray-400">Theme Preview</span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg">{theme.name}</h3>
              <p className="text-gray-600">{theme.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button 
          onClick={() => setStep('colors')}
          className="px-6 py-2 text-gray-600 hover:text-gray-800"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!selectedTheme}
          className={`px-6 py-2 rounded-lg ${selectedTheme ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ThemeSelector;