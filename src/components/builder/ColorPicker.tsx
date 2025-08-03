import { useAppContext } from '../../contexts/AppContext';
import { useState, useEffect } from 'react';
const colorPalettes = [
  {
    name: 'Ocean Blue',
    colors: ['#0a4da3', '#1e88e5', '#64b5f6', '#e3f2fd']
  },
  {
    name: 'Forest Green',
    colors: ['#1b5e20', '#388e3c', '#66bb6a', '#c8e6c9']
  },
  {
    name: 'Sunset Orange',
    colors: ['#e65100', '#f57c00', '#ffb74d', '#ffe0b2']
  },
  {
    name: 'Royal Purple',
    colors: ['#4a148c', '#7b1fa2', '#ba68c8', '#e1bee7']
  },
  {
    name: 'Modern Gray',
    colors: ['#212121', '#424242', '#757575', '#e0e0e0']
  }
];

const ColorPicker = () => {
  const { userData, setUserData, setStep } = useAppContext();
  const [selectedPalette, setSelectedPalette] = useState('');

  const handleContinue = () => {
    setUserData({ ...userData, colorPalette: selectedPalette });
    setStep('theme');
  };

  return (
    <div className="color-picker max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Select Color Palette</h2>
      
      <p className="mb-6 text-gray-600">
        Choose a color scheme that matches your brand identity
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {colorPalettes.map((palette) => (
          <div 
            key={palette.name}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedPalette === palette.name ? 'ring-2 ring-blue-500' : 'hover:border-blue-300'}`}
            onClick={() => setSelectedPalette(palette.name)}
          >
            <h3 className="font-medium mb-3">{palette.name}</h3>
            <div className="flex h-8 rounded-md overflow-hidden">
              {palette.colors.map((color, idx) => (
                <div 
                  key={idx} 
                  className="flex-1" 
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button 
          onClick={() => setStep('domain')}
          className="px-6 py-2 text-gray-600 hover:text-gray-800"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!selectedPalette}
          className={`px-6 py-2 rounded-lg ${selectedPalette ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ColorPicker;