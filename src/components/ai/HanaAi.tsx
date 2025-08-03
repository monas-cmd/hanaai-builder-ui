import { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import ResponseBubble from './ResponseBubble';
import VoiceButton from './VoiceButton';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';

const HanaAI = () => {
  const { step, setStep, userData, setUserData } = useAppContext();
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [isListening, setIsListening] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const speak = useTextToSpeech();

  const addMessage = useCallback(
    (text: string, isUser: boolean = false) => {
      setMessages(prev => [...prev, { text, isUser }]);
      if (!isUser && text) {
        speak(text);
      }
    },
    [speak]
  );

  // Greet user with welcome messages
  useEffect(() => {
    if (step === 'welcome' && !hasGreeted) {
      const welcomeMessages = [
        "Hello! I'm HanaAI, your website building assistant.",
        "I'll help you create a professional website for your business.",
        "First, may I know your name?"
      ];

      // Slight delay to ensure TTS engine is ready
      setTimeout(() => {
        welcomeMessages.forEach((msg, i) => {
          setTimeout(() => {
            addMessage(msg);
          }, i * 2500); // Space messages out nicely
        });
      }, 300); // Short delay before starting

      setHasGreeted(true);
      setStep('name');
    }
  }, [step, hasGreeted, setStep, addMessage]);

  const handleVoiceInput = useCallback(
    (text: string) => {
      addMessage(text, true);

      setTimeout(() => {
        if (step === 'name') {
          setUserData({ ...userData, name: text });
          addMessage(`Nice to meet you, ${text}! What's your business name?`);
          setStep('business');
        } else if (step === 'business') {
          setUserData({ ...userData, businessName: text });
          addMessage(`Great! Let's find an available domain for ${text}.`);
          setStep('domain');
        }
      }, 1000);
    },
    [step, userData, setUserData, setStep, addMessage]
  );

  return (
    <div className="hana-ai-container max-w-3xl mx-auto p-6">
      <div className="chat-container bg-white rounded-lg shadow-lg p-6 h-[500px] overflow-y-auto">
        {messages.map((msg, i) => (
          <ResponseBubble key={i} text={msg.text} isUser={msg.isUser} />
        ))}
      </div>

      <div className="voice-input mt-6 flex justify-center">
        <VoiceButton
          onResult={handleVoiceInput}
          isListening={isListening}
          setIsListening={setIsListening}
        />
      </div>
    </div>
  );
};

export default HanaAI;
