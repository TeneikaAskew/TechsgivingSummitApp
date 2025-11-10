import React, { useState } from 'react';
import { useNavigation } from '../NavigationContext';

const SearchIcon = () => <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const PlusIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const MinusIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" /></svg>;
const LocateIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

const FilterChip: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
    <button onClick={onClick} className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${active ? 'bg-red-600 text-white' : 'bg-gray-700/50 text-gray-200'}`}>
        {label}
    </button>
);

const VenueMapScreen: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [activeFloor, setActiveFloor] = useState('Floor 2');
    const { setActiveScreen } = useNavigation();

    const filters = ['All', 'Sessions', 'Exhibitors', 'Food', 'Restrooms'];
    const floors = ['Floor 1', 'Floor 2', 'Exhibition'];
    
    const apiKey = process.env.API_KEY;
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=Nationals+Park,Washington+DC`;

    return (
        <div className="bg-gray-800 h-full relative text-white flex flex-col">
            <div className="absolute top-0 left-0 right-0 p-4 z-20 bg-gradient-to-b from-black/70 to-transparent">
                <div className="flex justify-between items-center">
                    <button onClick={() => setActiveScreen('Resources')} className="text-2xl p-2 bg-black/20 rounded-full">&larr;</button>
                    <h1 className="text-xl font-bold">Venue Map</h1>
                    <button className="text-2xl p-2 bg-black/20 rounded-full">&#8942;</button>
                </div>
                <div className="relative mt-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for a speaker, company, or room"
                        className="w-full bg-gray-700/80 border border-gray-600 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-orange-500 placeholder-gray-400"
                    />
                </div>
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2 -mx-4 px-4">
                    {filters.map(filter => (
                        <FilterChip key={filter} label={filter} active={activeFilter === filter} onClick={() => setActiveFilter(filter)} />
                    ))}
                </div>
            </div>
            
            <div className="flex-grow h-full z-0">
                {apiKey ? (
                    <iframe
                        src={mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Venue Map: Nationals Park"
                    ></iframe>
                ) : (
                    <div className="flex-grow h-full z-0 flex flex-col items-center justify-center bg-gray-900 p-8 text-center">
                        <svg className="w-16 h-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h2 className="text-xl font-bold text-white mb-2">Map Unavailable</h2>
                        <p className="text-gray-400">
                            The interactive map could not be loaded. This feature requires a valid Google Maps API key to be configured for the application.
                        </p>
                    </div>
                )}
            </div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
                <div className="bg-gray-800 rounded-lg shadow-lg flex flex-col">
                    <button className="p-3 border-b border-gray-700"><PlusIcon /></button>
                    <button className="p-3"><MinusIcon /></button>
                </div>
                <button className="bg-red-600 p-3 rounded-full shadow-lg"><LocateIcon /></button>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] z-10">
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-1 flex justify-around shadow-lg">
                    {floors.map(floor => (
                        <button key={floor} onClick={() => setActiveFloor(floor)} className={`w-full py-2 text-sm font-semibold rounded-md transition-colors ${activeFloor === floor ? 'bg-red-600 text-white' : 'text-gray-300'}`}>
                            {floor}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VenueMapScreen;