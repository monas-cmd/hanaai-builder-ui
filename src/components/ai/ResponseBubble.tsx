import { useEffect, useState } from 'react';

interface ResponseBubbleProps {
  text: string;
  isUser: boolean;
}

const ResponseBubble = ({ text, isUser }: ResponseBubbleProps) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!isUser) {
      // Typewriter effect for AI responses
      let i = 0;
      const typing = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typing);
        }
      }, 20);
      
      return () => clearInterval(typing);
    } else {
      // Show user messages immediately
      setDisplayedText(text);
    }
  }, [text, isUser]);

  return (
    <div className={`bubble mb-4 ${isUser ? 'text-right' : 'text-left'}`}>
      <div className={`inline-block p-4 rounded-2xl max-w-xs md:max-w-md lg:max-w-lg ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
        {displayedText}
      </div>
    </div>
  );
};

export default ResponseBubble;