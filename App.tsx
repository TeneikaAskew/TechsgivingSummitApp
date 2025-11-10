
import React, { useState } from 'react';
import OnboardingScreen from './screens/OnboardingScreen';
import AgendaScreen from './screens/AgendaScreen';
import SponsorsScreen from './screens/SponsorsScreen';
import VenueMapScreen from './screens/VenueMapScreen';
import ResourceHubScreen from './screens/ResourceHubScreen';
import ProfileScreen from './screens/ProfileScreen';
import BottomNav from './components/BottomNav';
import { NavigationContext } from './NavigationContext';

export type Screen = 'Agenda' | 'Sponsors' | 'Venue' | 'Resources' | 'Profile';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeScreen, setActiveScreen] = useState<Screen>('Resources');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'Agenda':
        return <AgendaScreen />;
      case 'Sponsors':
        return <SponsorsScreen />;
      case 'Venue':
        return <VenueMapScreen />;
      case 'Resources':
        return <ResourceHubScreen />;
      case 'Profile':
        return <ProfileScreen />;
      default:
        return <ResourceHubScreen />;
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-800 flex items-center justify-center font-sans">
      <div className="w-full max-w-sm h-full sm:h-[90vh] sm:max-h-[800px] bg-[#0D1117] text-white overflow-hidden shadow-2xl rounded-lg flex flex-col relative">
        {!isLoggedIn ? (
          <OnboardingScreen onLogin={handleLogin} />
        ) : (
          <NavigationContext.Provider value={{ activeScreen, setActiveScreen }}>
            <main className="flex-grow overflow-y-auto">
              {renderScreen()}
            </main>
            <BottomNav />
          </NavigationContext.Provider>
        )}
      </div>
    </div>
  );
};

export default App;
