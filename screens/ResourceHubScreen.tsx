
import React from 'react';
import { useNavigation } from '../NavigationContext';
import { AgendaIcon, MapIcon } from '../components/icons/NavIcons';
import { WifiIcon, SosIcon } from '../components/icons/ResourceIcons';


const SearchIcon = () => <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const ProfileIcon = () => <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ChevronRightIcon = () => <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;

const ResourceHubScreen: React.FC = () => {
    const { setActiveScreen } = useNavigation();
    
    const quickLinks = [
        { name: 'Venue Map', icon: <MapIcon />, action: () => setActiveScreen('Venue') },
        { name: 'Agenda', icon: <AgendaIcon />, action: () => setActiveScreen('Agenda') },
        { name: 'Wi-Fi Info', icon: <WifiIcon />, action: () => alert('Wi-Fi Info: Not implemented yet.') },
        { name: 'Emergency', icon: <SosIcon />, action: () => alert('Emergency Info: Not implemented yet.') },
    ];

    const strategySections = [
        { title: 'Career Development', description: 'Resume reviews, interview prep, and more.' },
        { title: 'Networking Strategy', description: 'Tips for breaking the ice and following up.' },
        { title: 'Summit Logistics', description: 'Code of conduct, FAQs, and health info.' },
        { title: 'Techsgiving Community', description: 'Learn about our mission and get involved.' },
    ];

    return (
        <div className="bg-[#0D1117] h-full text-white p-4 pb-20 overflow-y-auto">
            <header className="flex justify-between items-center mb-4">
                <div>{/* spacer */}</div>
                <h1 className="text-xl font-bold">Resource Hub</h1>
                <button onClick={() => setActiveScreen('Profile')} aria-label="Go to profile">
                    <ProfileIcon />
                </button>
            </header>

            <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon />
                </div>
                <input
                    type="text"
                    placeholder="Search resources (e.g. 'Resume Tips')"
                    className="w-full bg-[#161B22] border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
                <div className="flex-shrink-0 w-48 h-32 rounded-lg bg-cover bg-center flex flex-col justify-end p-3" style={{backgroundImage: "url('https://picsum.photos/seed/keynote/300/200')"}}>
                    <h3 className="text-white font-bold text-lg shadow-md">Day 1 Keynote Info</h3>
                    <p className="text-white/80 text-sm shadow-md">Don't miss the opening remarks.</p>
                </div>
                <div className="flex-shrink-0 w-48 h-32 rounded-lg bg-cover bg-center flex flex-col justify-end p-3" style={{backgroundImage: "url('https://picsum.photos/seed/network/300/200')"}}>
                    <h3 className="text-white font-bold text-lg shadow-md">Networking Mixer</h3>
                    <p className="text-white/80 text-sm shadow-md">Join us at the grand ballroom.</p>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4 my-6 text-center">
                {quickLinks.map(link => (
                    <button key={link.name} onClick={link.action} className="flex flex-col items-center p-2 rounded-lg bg-[#161B22] border border-gray-700 hover:bg-gray-700/50 transition-colors group">
                        {React.cloneElement(link.icon, { className: "w-8 h-8 mb-2 text-gray-300 group-hover:text-orange-400 transition-colors" })}
                        <span className="text-xs mt-1 text-gray-300">{link.name}</span>
                    </button>
                ))}
            </div>

            <div className="space-y-3">
                {strategySections.map(section => (
                    <div key={section.title} className="bg-[#161B22] border border-gray-700 rounded-lg p-4 flex justify-between items-center hover:bg-gray-700/50 cursor-pointer" onClick={() => alert(`${section.title}: Not implemented yet.`)}>
                        <div>
                            <h3 className="font-semibold text-white">{section.title}</h3>
                            <p className="text-sm text-gray-400 mt-1">{section.description}</p>
                        </div>
                        <ChevronRightIcon />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResourceHubScreen;
