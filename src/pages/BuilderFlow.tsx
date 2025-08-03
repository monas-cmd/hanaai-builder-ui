import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import HanaAI from '../components/ai/HanaAi';
import DomainSelector from '../components/builder/DomainSelector';
import ColorPicker from '../components/builder/ColorPicker';
import ThemeSelector from '../components/builder/ThemeSelector';
import TypeSelector from '../components/builder/TypeSelector';

const BuilderFlow = () => {
  const { step } = useAppContext();
  const navigate = useNavigate();

  const renderStep = () => {
    switch (step) {
      case 'welcome':
      case 'name':
      case 'business':
        return <HanaAI />;
      case 'domain':
        return <DomainSelector />;
      case 'colors':
        return <ColorPicker />;
      case 'theme':
        return <ThemeSelector />;
      case 'type':
        return <TypeSelector />;
      case 'preview':
        navigate('/preview');
        return null;
      case 'publish':
        navigate('/published');
        return null;
      default:
        return <HanaAI />;
    }
  };

  return (
    <div className="builder-flow min-h-screen bg-gray-50">
      {renderStep()}
    </div>
  );
};

export default BuilderFlow;