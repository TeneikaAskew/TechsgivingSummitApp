
import React from 'react';
import type { Screen } from '../App';
import { AgendaIcon, SponsorsIcon, MapIcon, ResourcesIcon, ProfileIcon } from './icons/NavIcons';
import { useNavigation } from '../NavigationContext';

interface BottomNavProps {}

const NavItem: React.FC<{
  label: Screen;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-1/5 pt-2 pb-1 text-xs transition-colors duration-200 ${
      isActive ? 'text-orange-400' : 'text-gray-400 hover:text-white'
    }`}
    aria-label={`Go to ${label} screen`}
    aria-current={isActive ? 'page' : undefined}
  >
    {icon}
    <span className="mt-1">{label}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = () => {
  const { activeScreen, setActiveScreen } = useNavigation();
  const navItems: { label: Screen; icon: React.ReactNode }[] = [
    { label: 'Resources', icon: <ResourcesIcon /> },
    { label: 'Agenda', icon: <AgendaIcon /> },
    { label: 'Venue', icon: <MapIcon /> },
    { label: 'Sponsors', icon: <SponsorsIcon /> },
    { label: 'Profile', icon: <ProfileIcon /> },
  ];

  return (
    <nav className="flex justify-around bg-[#161B22] border-t border-gray-700">
      {navItems.map((item) => (
        <NavItem
          key={item.label}
          label={item.label}
          icon={item.icon}
          isActive={activeScreen === item.label}
          onClick={() => setActiveScreen(item.label)}
        />
      ))}
    </nav>
  );
};

export default BottomNav;
