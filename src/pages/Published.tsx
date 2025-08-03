import { useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { publishWebsite } from '../services/api';

const Published = () => {
  const { userData, setUserData } = useAppContext();

  useEffect(() => {
    // Simulate publishing the website
    const publish = async () => {
      try {
        await publishWebsite(userData);
        setUserData({ ...userData, isPublished: true });
      } catch (error) {
        console.error('Publishing failed:', error);
      }
    };

    if (!userData.isPublished) {
      publish();
    }
  }, [userData, setUserData]);

  return (
    <div className="published-page max-w-2xl mx-auto p-6 text-center">
      {userData.isPublished ? (
        <>
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-2 text-gray-800">Congratulations!</h2>
            <p className="text-xl text-gray-600">Your website is now live!</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <p className="mb-4">Your new website is available at:</p>
            <a 
              href={`https://${userData.domain}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl font-mono text-blue-600 hover:underline"
            >
              {userData.domain}
            </a>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-600">What would you like to do next?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://${userData.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Visit Your Site
              </a>
              <button className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg">
                Customize Further
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-12 w-12 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-2 text-gray-800">Publishing Your Website</h2>
            <p className="text-xl text-gray-600">This may take a few moments...</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full animate-pulse" style={{width: '45%'}}></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Published;