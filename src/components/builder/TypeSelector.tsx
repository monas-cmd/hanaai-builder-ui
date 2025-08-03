import { useState } from 'react'; // Add this import
import { useAppContext } from '../../contexts/AppContext';

const websiteTypes = [
  {
    id: 'static',
    name: 'Static Website',
    description: 'Simple, fast-loading pages with fixed content. Perfect for portfolios, brochures, and small business sites.',
    features: [
      'Faster loading',
      'Lower cost',
      'Easier to maintain',
      'Basic functionality'
    ]
  },
  {
    id: 'dynamic',
    name: 'Dynamic Website',
    description: 'Interactive sites with database integration. Ideal for e-commerce, blogs, and member portals.',
    features: [
      'User accounts',
      'Content management',
      'E-commerce functionality',
      'Custom interactivity'
    ]
  }
];

const TypeSelector = () => {
  const { userData, setUserData, setStep } = useAppContext();
  const [selectedType, setSelectedType] = useState<'static' | 'dynamic'>(userData.websiteType);

  const handleContinue = () => {
    setUserData({ ...userData, websiteType: selectedType });
    setStep('preview');
  };

  return (
    <div className="type-selector max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Select Website Type</h2>
      
      <div className="grid grid-cols-1 gap-6 mb-8">
        {websiteTypes.map((type) => (
          <div 
            key={type.id}
            className={`p-6 border rounded-lg cursor-pointer transition-all ${selectedType === type.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
            onClick={() => setSelectedType(type.id as 'static' | 'dynamic')}
          >
            <div className="flex items-start">
              <div className={`h-6 w-6 mt-1 rounded-full border flex items-center justify-center mr-4 ${selectedType === type.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                {selectedType === type.id && (
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">{type.name}</h3>
                <p className="text-gray-600 mb-3">{type.description}</p>
                <ul className="text-sm text-gray-500">
                  {type.features.map((feature, index) => (
                    <li key={index} className="mb-1 flex items-center">
                      <svg className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button 
          onClick={() => setStep('theme')}
          className="px-6 py-2 text-gray-600 hover:text-gray-800"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Preview Website
        </button>
      </div>
    </div>
  );
};

export default TypeSelector;