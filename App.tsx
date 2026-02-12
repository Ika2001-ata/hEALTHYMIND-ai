
import React from 'react';
import { BrandIdentity } from './components/BrandIdentity';
import { ChatInterface } from './components/ChatInterface';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#fffafa]">
      {/* Mobile Header */}
      <header className="md:hidden bg-white px-6 py-4 border-b border-rose-50 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center text-white text-lg">
            <i className="fas fa-heart"></i>
          </div>
          <span className="brand-font text-xl text-rose-900">HealthyMind</span>
        </div>
        <button className="bg-rose-50 text-rose-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
          BOOK
        </button>
      </header>

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:w-[350px] lg:w-[420px] bg-white border-r border-rose-50 p-10 flex-col justify-between shadow-lg z-20">
        <BrandIdentity />
        <footer className="text-[10px] text-rose-300 font-bold uppercase tracking-widest">
          &copy; {new Date().getFullYear()} HealthyMind Institute
        </footer>
      </aside>

      {/* Main Content (Chat) */}
      <main className="flex-1 flex flex-col h-[calc(100vh-64px)] md:h-screen p-4 md:p-8 lg:p-12">
        <div className="flex flex-col h-full max-w-5xl mx-auto w-full">
          <header className="mb-8 hidden md:block">
            <h2 className="text-4xl font-bold text-rose-900 brand-font tracking-tight">Your Path to Inner Peace</h2>
            <p className="text-rose-400 mt-2 font-medium">Experience professional care with a friendly touch.</p>
          </header>
          
          <div className="flex-1 min-h-0">
            <ChatInterface />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
