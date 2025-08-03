import { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { checkDomainAvailability } from '../../services/domainService';

const DomainSelector = () => {
  const { userData, setUserData, setStep, availableDomains, setAvailableDomains } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState('');

  useEffect(() => {
    const generateDomains = async () => {
      setIsLoading(true);
      try {
        // Generate domain suggestions based on business name
        const suggestions = [
          `${userData.businessName.toLowerCase().replace(/\s+/g, '')}.com`,
          `${userData.businessName.toLowerCase().replace(/\s+/g, '-')}.com`,
          `${userData.businessName.toLowerCase().split(' ')[0]}.com`,
          `get${userData.businessName.toLowerCase().replace(/\s+/g, '')}.com`
        ];

        // Check availability for each domain
        const available = await Promise.all(
          suggestions.map(async (domain) => {
            const isAvailable = await checkDomainAvailability(domain);
            return isAvailable ? domain : null;
          })
        );

        const filteredDomains = available.filter(domain => domain !== null) as string[];
        setAvailableDomains(filteredDomains);
        if (filteredDomains.length > 0) {
          setSelectedDomain(filteredDomains[0]);
        }
      } catch (error) {
        console.error('Error checking domains:', error);
      } finally {
        setIsLoading(false);
      }
    };

    generateDomains();
  }, [userData.businessName, setAvailableDomains]);

  const handleContinue = () => {
    setUserData({ ...userData, domain: selectedDomain });
    setStep('colors');
  };

  return (
    <div className="domain-selector max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Choose Your Domain</h2>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <p className="mb-4 text-gray-600">
            We found these available domains for <span className="font-semibold">{userData.businessName}</span>:
          </p>
          
          <div className="space-y-3 mb-6">
            {availableDomains.map((domain) => (
              <div 
                key={domain} 
                className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedDomain === domain ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => setSelectedDomain(domain)}
              >
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    checked={selectedDomain === domain}
                    className="h-5 w-5 text-blue-600"
                    readOnly
                  />
                  <span className="ml-3 font-mono text-lg">{domain}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <button 
              onClick={() => setStep('business')}
              className="px-6 py-2 text-gray-600 hover:text-gray-800"
            >
              Back
            </button>
            <button
              onClick={handleContinue}
              disabled={!selectedDomain}
              className={`px-6 py-2 rounded-lg ${selectedDomain ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              Continue
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DomainSelector;