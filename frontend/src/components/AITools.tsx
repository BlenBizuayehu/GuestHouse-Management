
import React, { useState } from 'react';
import { api, useAuth } from '../App';
import { Sparkles, Wand2 } from './ui/Icons';

interface AIToolCardProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

const AIToolCard: React.FC<AIToolCardProps> = ({ title, icon, children }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-full flex flex-col">
        <div className="flex items-center mb-4">
            {icon}
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white ml-3">{title}</h3>
        </div>
        <div className="space-y-4 flex-grow flex flex-col">
            {children}
        </div>
    </div>
);


const AITools: React.FC = () => {
    const [reviews, setReviews] = useState('');
    const [summary, setSummary] = useState('');
    const [isSummarizing, setIsSummarizing] = useState(false);

    const [guestName, setGuestName] = useState('');
    const [bookingDetails, setBookingDetails] = useState('');
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const { token } = useAuth();

    const handleSummarize = async () => {
        if (!reviews) return;
        setIsSummarizing(true);
        setSummary('');
        try {
            const result = await api.post('/ai/summarize', token, { reviews });
            setSummary(result.summary);
        } catch (error: any) {
            console.error("Error summarizing reviews:", error);
            setSummary(error.message || "Sorry, I couldn't summarize the reviews at this time.");
        } finally {
            setIsSummarizing(false);
        }
    };

    const handleGenerateWelcome = async () => {
        if (!guestName || !bookingDetails) return;
        setIsGenerating(true);
        setWelcomeMessage('');
        try {
            const result = await api.post('/ai/generate-welcome', token, { guestName, bookingDetails });
            setWelcomeMessage(result.message);
        } catch(error: any) {
            console.error("Error generating welcome message:", error);
            setWelcomeMessage(error.message || "Sorry, I couldn't generate a welcome message at this time.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <AIToolCard title="Guest Review Summarizer" icon={<Sparkles className="h-6 w-6 text-indigo-500" />}>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Paste raw text from guest reviews below and the AI will provide a concise summary of strengths and weaknesses.
                </p>
                <textarea
                    className="w-full flex-grow p-3 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500 transition"
                    placeholder="e.g., The room was clean, but the breakfast was cold... The staff was very friendly and helpful."
                    value={reviews}
                    onChange={(e) => setReviews(e.target.value)}
                    rows={5}
                />
                <button
                    onClick={handleSummarize}
                    disabled={isSummarizing || !reviews}
                    className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                    {isSummarizing ? 'Summarizing...' : 'Summarize Reviews'}
                </button>
                {summary && (
                    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-900/50 rounded-md border border-gray-200 dark:border-gray-700">
                        <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">Summary:</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{summary}</p>
                    </div>
                )}
            </AIToolCard>

            <AIToolCard title="Personalized Welcome Message" icon={<Wand2 className="h-6 w-6 text-teal-500" />}>
                 <p className="text-sm text-gray-600 dark:text-gray-400">
                    Enter guest details to generate a warm, personalized welcome message for their arrival.
                </p>
                <input
                    type="text"
                    className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-teal-500 transition"
                    placeholder="Guest Name (e.g., Jane Doe)"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                />
                <textarea
                    className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-teal-500 transition"
                    placeholder="Booking details (e.g., 'Honeymoon trip, requested late check-out')"
                    value={bookingDetails}
                    onChange={(e) => setBookingDetails(e.target.value)}
                />
                <button
                    onClick={handleGenerateWelcome}
                    disabled={isGenerating || !guestName || !bookingDetails}
                    className="w-full flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors disabled:bg-teal-400 disabled:cursor-not-allowed"
                >
                    {isGenerating ? 'Generating...' : 'Generate Message'}
                </button>
                {welcomeMessage && (
                    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-900/50 rounded-md border border-gray-200 dark:border-gray-700">
                        <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">Generated Message:</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{welcomeMessage}</p>
                    </div>
                )}
            </AIToolCard>
        </div>
    );
};

export default AITools;
