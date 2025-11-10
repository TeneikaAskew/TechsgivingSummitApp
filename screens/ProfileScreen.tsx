
import React, { useState } from 'react';
import { useNavigation } from '../NavigationContext';

const DocumentIcon = () => <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const PortfolioIcon = () => <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" /></svg>;
const LinkedInIcon = () => <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>;
const ShareIcon = () => <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8m-4-6l-4-4m0 0L8 8m4-4v12" /></svg>;
const CheckCircleIcon: React.FC<{ checked: boolean }> = ({ checked }) => checked ?
    <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> :
    <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const PencilIcon = () => <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>;

const ProfileScreen: React.FC = () => {
    const [goals, setGoals] = useState({
        job: true,
        hire: false,
        mentor: true,
        network: false
    });
    const { setActiveScreen } = useNavigation();

    const toggleGoal = (goal: keyof typeof goals) => {
        setGoals(prev => ({ ...prev, [goal]: !prev[goal] }));
    };

    return (
        <div className="bg-[#0D1117] h-full text-white pb-20 overflow-y-auto">
            <header className="flex justify-between items-center p-4">
                <button onClick={() => setActiveScreen('Resources')} className="text-2xl">&larr;</button>
                <h1 className="text-xl font-bold">My Profile</h1>
                <button className="text-2xl">&#8942;</button>
            </header>

            <div className="flex flex-col items-center px-4">
                <img src="https://picsum.photos/seed/alexdoe/100/100" alt="Alex Doe" className="w-24 h-24 rounded-full border-2 border-orange-500" />
                <h2 className="text-2xl font-bold mt-4">Alex Doe</h2>
                <p className="text-gray-400">Senior Product Manager @ Innovate Inc.</p>
            </div>
            
            <section className="p-4 mt-6">
                <h3 className="font-bold text-lg mb-4 text-center">My Networking QR Code</h3>
                <div className="bg-[#161B22] border border-gray-700 rounded-lg p-6 flex flex-col items-center">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=techsgiving-profile-alex-doe" alt="QR Code" className="w-40 h-40 rounded-md bg-white p-2"/>
                    <button className="mt-6 w-full flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                       <ShareIcon /> Share Profile
                    </button>
                </div>
            </section>
            
            <section className="p-4">
                <h3 className="font-bold text-lg mb-2">My Elevator Pitch</h3>
                <p className="text-gray-300 bg-[#161B22] p-4 rounded-lg border border-gray-700">"I'm a senior product manager passionate about building accessible fintech products that empower underserved communities. Currently exploring opportunities in impact-driven tech."</p>
            </section>
            
            <section className="p-4">
                <h3 className="font-bold text-lg mb-2">Professional Links</h3>
                <div className="space-y-2">
                    <a href="#" className="flex items-center bg-[#161B22] p-3 rounded-lg border border-gray-700"><DocumentIcon /> View Resume</a>
                    <a href="#" className="flex items-center bg-[#161B22] p-3 rounded-lg border border-gray-700"><PortfolioIcon /> View Portfolio</a>
                    <a href="#" className="flex items-center bg-[#161B22] p-3 rounded-lg border border-gray-700"><LinkedInIcon /> LinkedIn</a>
                </div>
            </section>

            <section className="p-4">
                <h3 className="font-bold text-lg mb-2">My Summit Goals</h3>
                <div className="space-y-2">
                    <div onClick={() => toggleGoal('job')} className="flex items-center justify-between bg-[#161B22] p-3 rounded-lg border border-gray-700 cursor-pointer">
                        <span>Seeking Job Opportunities</span>
                        <CheckCircleIcon checked={goals.job} />
                    </div>
                    <div onClick={() => toggleGoal('hire')} className="flex items-center justify-between bg-[#161B22] p-3 rounded-lg border border-gray-700 cursor-pointer">
                        <span>Looking to Hire</span>
                        <CheckCircleIcon checked={goals.hire} />
                    </div>
                    <div onClick={() => toggleGoal('mentor')} className="flex items-center justify-between bg-[#161B22] p-3 rounded-lg border border-gray-700 cursor-pointer">
                        <span>Finding Mentorship</span>
                        <CheckCircleIcon checked={goals.mentor} />
                    </div>
                    <div onClick={() => toggleGoal('network')} className="flex items-center justify-between bg-[#161B22] p-3 rounded-lg border border-gray-700 cursor-pointer">
                        <span>General Networking</span>
                        <CheckCircleIcon checked={goals.network} />
                    </div>
                </div>
            </section>

            <div className="absolute bottom-20 right-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-4 rounded-full shadow-lg transition-transform hover:scale-105">
                    <PencilIcon />
                </button>
            </div>
        </div>
    );
};

export default ProfileScreen;
