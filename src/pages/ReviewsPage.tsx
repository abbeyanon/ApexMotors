import React from 'react';
import { ReviewsSection } from '../components/ReviewsSection';
import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-950 py-12">
      <div className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6 mb-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>4.9 / 5.0 Star Rating Across 850+ Verified Sales</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Customer Testimonials & Reviews
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Real stories and ratings from clients who purchased or traded in their vehicles with Apex Motors Kenya.
          </p>
        </div>
      </div>

      <ReviewsSection />
    </div>
  );
};
