
import React from 'react';

export const BrandIdentity: React.FC = () => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-rose-500 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
          <i className="fas fa-heart"></i>
        </div>
        <div>
          <h1 className="brand-font text-2xl text-rose-900 leading-tight">HealthyMind</h1>
          <p className="text-xs text-rose-600 font-medium tracking-widest uppercase italic">Compassionate Care</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-rose-50 rounded-xl border border-rose-100">
          <h3 className="text-sm font-bold text-rose-900 mb-2 underline decoration-rose-200 underline-offset-4">Our Promise</h3>
          <p className="text-xs text-rose-800 leading-relaxed font-medium">
            We provide a sanctuary for healing, growth, and self-discovery. Our licensed therapists use evidence-based approaches to help you navigate life's challenges with grace and strength.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact Info</h4>
          <div className="flex items-start space-x-3 text-sm text-gray-600">
            <i className="fas fa-map-marker-alt mt-1 text-rose-400"></i>
            <span>123 Wellness Way, Mindful City, MC 54321</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <i className="fas fa-phone mt-1 text-rose-400"></i>
            <span>+1 (555) HEALTHY</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <i className="fas fa-envelope mt-1 text-rose-400"></i>
            <span>care@healthymind.org</span>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <button className="w-full bg-rose-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-rose-700 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2">
          <span>Schedule Visit</span>
          <i className="fas fa-calendar-heart"></i>
        </button>
      </div>
    </div>
  );
};
