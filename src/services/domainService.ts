// Mock domain availability check
export const checkDomainAvailability = async (domain: string): Promise<boolean> => {
  // In a real app, this would call an API to check domain availability
  // For demo purposes, we'll simulate an API call with random availability
  return new Promise((resolve) => {
    setTimeout(() => {
      // Make some domains appear unavailable for realism
      const unavailableDomains = ['example.com', 'test.com', 'business.com'];
      resolve(!unavailableDomains.includes(domain.toLowerCase()));
    }, 500);
  });
};