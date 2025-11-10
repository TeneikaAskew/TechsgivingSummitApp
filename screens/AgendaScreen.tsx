import React, { useState, useMemo } from 'react';
import type { Session } from '../types';
import { SessionType } from '../types';
import { useNavigation } from '../NavigationContext';

const SearchIcon = () => <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const FilterIcon = () => <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8v-2m0 2a2 2 0 100 4m0-4a2 2 0 110 4m0-4v-2m0 2a2 2 0 100 4m0-4a2 2 0 110 4m6-14v-2m0 2a2 2 0 100 4m0-4a2 2 0 110 4m0-4v-2m0 2a2 2 0 100 4m0-4a2 2 0 110 4" /></svg>;
const BookmarkIcon: React.FC<{ active: boolean }> = ({ active }) => <svg className="w-6 h-6" fill={active ? '#F97316' : 'none'} viewBox="0 0 24 24" stroke={active ? '#F97316' : 'currentColor'} strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.5 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" /></svg>;
const MyAgendaIcon = () => <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 2v4M17 2v4M3 11h18" /></svg>;


const allSessions: Session[] = [
    { id: '1', day: 'Nov 22', time: '9:00 AM', type: SessionType.Keynote, title: 'The Future of AI in Product Design', location: 'Main Hall B', bookmarked: true },
    { id: '2', day: 'Nov 22', time: '10:15 AM', type: SessionType.Workshop, title: 'Building for a Billion Users', location: 'Grand Ballroom', bookmarked: false },
    { id: '3', day: 'Nov 22', time: '10:15 AM', type: SessionType.DesignTrack, title: 'UX Principles for AR/VR', location: 'Room 201', bookmarked: false },
    { id: '4', day: 'Nov 22', time: '11:30 AM', type: SessionType.AIMLTrack, title: 'Ethical AI: A Practical Guide', location: 'Main Hall A', bookmarked: true },
    { id: '5', day: 'Nov 22', time: '1:00 PM', type: SessionType.DesignTrack, title: 'Advanced Prototyping Techniques', location: 'Room 201', bookmarked: false },
    { id: '6', day: 'Nov 22', time: '1:00 PM', type: SessionType.Workshop, title: 'Cloud-Native Development Patterns', location: 'Grand Ballroom', bookmarked: false },
    { id: '7', day: 'Nov 23', time: '9:00 AM', type: SessionType.Keynote, title: 'Designing for Trust in the Digital Age', location: 'Main Hall B', bookmarked: false },
    { id: '8', day: 'Nov 23', time: '10:15 AM', type: SessionType.AIMLTrack, title: 'Large Language Models in Production', location: 'Main Hall A', bookmarked: true },
    { id: '9', day: 'Nov 24', time: '11:30 AM', type: SessionType.DesignTrack, title: 'The Psychology of Color in UI', location: 'Room 202', bookmarked: false },
];

const SessionCard: React.FC<{ session: Session; onBookmark: (id: string) => void }> = ({ session, onBookmark }) => {
    const typeColor = {
        [SessionType.Keynote]: 'bg-yellow-500/20 text-yellow-400',
        [SessionType.Workshop]: 'bg-blue-500/20 text-blue-400',
        [SessionType.DesignTrack]: 'bg-green-500/20 text-green-400',
        [SessionType.AIMLTrack]: 'bg-red-500/20 text-red-400',
    };
    return (
        <div className="bg-[#161B22] rounded-lg p-4 flex justify-between items-start border border-gray-700">
            <div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${typeColor[session.type]}`}>{session.type}</span>
                <h3 className="font-bold text-white mt-2">{session.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{session.location}</p>
            </div>
            <button onClick={() => onBookmark(session.id)} aria-label={`Bookmark ${session.title}`}>
                <BookmarkIcon active={session.bookmarked} />
            </button>
        </div>
    );
};

const AgendaScreen: React.FC = () => {
    const [activeDay, setActiveDay] = useState<'Nov 22' | 'Nov 23' | 'Nov 24'>('Nov 22');
    const [sessions, setSessions] = useState<Session[]>(allSessions);
    const [searchTerm, setSearchTerm] = useState('');
    const [showMyAgenda, setShowMyAgenda] = useState(false);
    const { setActiveScreen } = useNavigation();

    const handleBookmark = (id: string) => {
        setSessions(sessions.map(s => s.id === id ? { ...s, bookmarked: !s.bookmarked } : s));
    };

    const displayedSessions = useMemo(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return sessions.filter(session => {
            const dayMatch = session.day === activeDay;
            const agendaMatch = !showMyAgenda || session.bookmarked;
            const searchMatch = !searchTerm ||
                session.title.toLowerCase().includes(lowercasedSearchTerm) ||
                session.location.toLowerCase().includes(lowercasedSearchTerm) ||
                session.type.toLowerCase().includes(lowercasedSearchTerm);
            
            return dayMatch && agendaMatch && searchMatch;
        });
    }, [sessions, activeDay, searchTerm, showMyAgenda]);

    const groupedSessions = displayedSessions.reduce<Record<string, Session[]>>((acc, session) => {
        const time = session.time;
        if (!acc[time]) acc[time] = [];
        acc[time].push(session);
        return acc;
    }, {});

    return (
        <div className="bg-[#0D1117] h-full text-white relative">
            <div className="p-4 sticky top-0 bg-[#0D1117] z-10 border-b border-gray-800">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => setActiveScreen('Resources')} className="text-2xl">&larr;</button>
                    <h1 className="text-xl font-bold">{showMyAgenda ? 'My Agenda' : 'Full Schedule'}</h1>
                    <button><FilterIcon /></button>
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search sessions, speakers..."
                        className="w-full bg-[#161B22] border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                </div>
                <div className="flex justify-around mt-4 bg-[#161B22] rounded-lg p-1">
                    {['Nov 22', 'Nov 23', 'Nov 24'].map(day => (
                        <button
                            key={day}
                            onClick={() => setActiveDay(day as any)}
                            className={`w-full py-2 text-sm font-semibold rounded-md transition-colors ${activeDay === day ? 'bg-orange-500 text-white' : 'text-gray-400'}`}
                        >
                            {day}
                        </button>
                    ))}
                </div>
            </div>

            <div className="px-4 pb-24">
                {/* FIX: Switched from Object.entries to Object.keys to avoid a type inference issue with sessionGroup being 'unknown'. By iterating over keys and accessing the value directly, we ensure TypeScript correctly infers the type of the session group as Session[]. */}
                {Object.keys(groupedSessions).length > 0 ? Object.keys(groupedSessions).map((time) => (
                    <div key={time} className="flex mb-6">
                        <div className="w-16 text-right pr-4 text-gray-400 text-sm font-medium pt-4">{time}</div>
                        <div className="flex-1 border-l border-gray-700 pl-4 space-y-4">
                            {groupedSessions[time].map(session => <SessionCard key={session.id} session={session} onBookmark={handleBookmark} />)}
                        </div>
                    </div>
                )) : <p className="text-center text-gray-400 mt-8">No sessions found for this day.</p>}
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-auto">
                <button onClick={() => setShowMyAgenda(!showMyAgenda)} className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform hover:scale-105">
                    <MyAgendaIcon />
                    {showMyAgenda ? 'Full Schedule' : 'My Agenda'}
                </button>
            </div>
        </div>
    );
};

export default AgendaScreen;