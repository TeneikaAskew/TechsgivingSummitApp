
import React, { useState, useMemo } from 'react';
import type { Sponsor } from '../types';
import { useNavigation } from '../NavigationContext';

const SearchIcon = () => <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const ChevronRightIcon = () => <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;
const QRCodeScannerIcon = () => <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /><path d="M3 3h2.5v2.5H3zM3 18.5h2.5V21H3zM18.5 3H21v2.5h-2.5zM18.5 18.5H21V21h-2.5z" /></svg>;


const sponsorsData: Sponsor[] = [
    { id: '1', name: 'Innovate Inc.', industry: 'Cloud Computing Solutions', logo: 'https://picsum.photos/seed/innovate/100/100', tags: ['Hiring Now', 'Platinum'] },
    { id: '2', name: 'Data Dynamics', industry: 'AI & Machine Learning Platforms', logo: 'https://picsum.photos/seed/data/100/100', tags: ['Hiring Now'] },
    { id: '3', name: 'QuantumLeap', industry: 'Next-Gen Cybersecurity', logo: 'https://picsum.photos/seed/quantum/100/100', tags: ['Gold'] },
    { id: '4', name: 'Cyber-Secure', industry: 'Cybersecurity Solutions', logo: 'https://picsum.photos/seed/cyber/100/100', tags: ['Hiring Now'] },
    { id: '5', name: 'Future Systems', industry: 'DevOps & Automation', logo: 'https://picsum.photos/seed/future/100/100', tags: ['Silver'] },
    { id: '6', name: 'Aether Cloud', industry: 'Cloud Infrastructure', logo: 'https://picsum.photos/seed/aether/100/100', tags: ['Hiring Now', 'Platinum'] },
];

const FilterButton: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
    <button onClick={onClick} className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${active ? 'bg-blue-600 text-white' : 'bg-[#161B22] text-gray-300 border border-gray-700'}`}>
        {label}
    </button>
);

const SponsorCard: React.FC<{ sponsor: Sponsor }> = ({ sponsor }) => {
    const tagColor: { [key: string]: string } = {
        'Hiring Now': 'bg-blue-600/50 text-blue-300',
        'Platinum': 'bg-yellow-600/50 text-yellow-300',
        'Gold': 'bg-amber-600/50 text-amber-300',
        'Silver': 'bg-gray-500/50 text-gray-300'
    };

    return (
        <div className="flex items-center py-4 border-b border-gray-800">
            <img src={sponsor.logo} alt={`${sponsor.name} logo`} className="w-12 h-12 rounded-md mr-4" />
            <div className="flex-grow">
                <h3 className="font-bold text-white">{sponsor.name}</h3>
                <p className="text-gray-400 text-sm">{sponsor.industry}</p>
                <div className="flex gap-2 mt-2">
                    {sponsor.tags.map(tag => (
                        <span key={tag} className={`text-xs font-semibold px-2 py-1 rounded-full ${tagColor[tag] || 'bg-gray-600/50 text-gray-300'}`}>{tag}</span>
                    ))}
                </div>
            </div>
            <ChevronRightIcon />
        </div>
    );
};

const SponsorsScreen: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('Hiring');
    const [searchTerm, setSearchTerm] = useState('');
    const { setActiveScreen } = useNavigation();

    const filters = ['Hiring', 'Platinum', 'AI', 'Cloud'];
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
    const filteredSponsors = useMemo(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return sponsorsData.filter(sponsor => {
            const filterMatch = 
                (activeFilter === 'Hiring' && sponsor.tags.includes('Hiring Now')) ||
                (activeFilter === 'Platinum' && sponsor.tags.includes('Platinum')) ||
                (activeFilter === 'AI' && sponsor.industry.toLowerCase().includes('ai')) ||
                (activeFilter === 'Cloud' && sponsor.industry.toLowerCase().includes('cloud'));

            const searchMatch = !searchTerm ||
                sponsor.name.toLowerCase().includes(lowercasedSearchTerm) ||
                sponsor.industry.toLowerCase().includes(lowercasedSearchTerm);

            return filterMatch && searchMatch;
        });
    }, [activeFilter, searchTerm]);

    return (
        <div className="bg-[#0D1117] h-full text-white">
             <div className="p-4 sticky top-0 bg-[#0D1117] z-10 border-b border-gray-800">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => setActiveScreen('Resources')} className="text-2xl">&larr;</button>
                    <h1 className="text-xl font-bold">Sponsors & Exhibitors</h1>
                    <div className="w-8"></div>
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by company name, industry..."
                        className="w-full bg-[#161B22] border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                </div>
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2 -mx-4 px-4">
                    {filters.map(filter => (
                        <FilterButton key={filter} label={filter} active={activeFilter === filter} onClick={() => setActiveFilter(filter)} />
                    ))}
                </div>
            </div>
            <div className="flex relative px-4 pb-20 overflow-y-auto">
                <div className="flex-grow pr-4">
                    {filteredSponsors.length > 0 ? filteredSponsors.map(sponsor => (
                        <SponsorCard key={sponsor.id} sponsor={sponsor} />
                    )) : <p className="text-center text-gray-400 mt-8">No sponsors found matching your criteria.</p>}
                </div>
                <div className="absolute right-0 top-0 h-full flex flex-col justify-center py-4">
                    <div className="flex flex-col items-center space-y-1">
                        {alphabet.map(letter => (
                            <a key={letter} href="#" className="text-xs text-blue-400 hover:text-white">{letter}</a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="absolute bottom-4 right-4">
                <button onClick={() => alert('QR Scanner not implemented yet.')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-4 rounded-full shadow-lg transition-transform hover:scale-105">
                    <QRCodeScannerIcon />
                </button>
            </div>
        </div>
    );
};

export default SponsorsScreen;
