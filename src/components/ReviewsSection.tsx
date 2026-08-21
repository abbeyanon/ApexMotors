import React, { useState } from 'react';
import { useDealership } from '../context/DealershipContext';
import { Star, Quote, Plus, CheckCircle2, MessageSquare, Car, X } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { reviews, addReview } = useDealership();
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [carPurchased, setCarPurchased] = useState('');
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !reviewText) return;

    addReview({
      customerName: name,
      location: location || 'Nairobi, Kenya',
      rating,
      vehiclePurchased: carPurchased || 'Verified Purchase',
      review: reviewText
    });

    setIsWriteModalOpen(false);
    setName('');
    setLocation('');
    setCarPurchased('');
    setReviewText('');
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-50 dark:bg-dark-950 transition-colors">
      <div className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              <span>Customer Satisfaction</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
              What Our Clients Say
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Read verified feedback from car owners who found their vehicles at Apex Motors.
            </p>
          </div>

          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-white dark:bg-dark-850 hover:bg-slate-50 dark:hover:bg-dark-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition"
          >
            <Plus className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>Write a Customer Review</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.slice(0, 4).map((rev) => (
            <div
              key={rev.id}
              className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-brand-500 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">{rev.date}</span>
                </div>

                <Quote className="w-6 h-6 text-brand-500/20 mb-2" />
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic mb-6">
                  "{rev.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
                {rev.avatar ? (
                  <img
                    src={rev.avatar}
                    alt={rev.customerName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-900/60 border border-brand-500/30 flex items-center justify-center font-bold text-brand-600 dark:text-brand-400 text-xs">
                    {rev.customerName.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    <span>{rev.customerName}</span>
                    <span title="Verified Customer">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 inline" />
                    </span>
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{rev.location}</p>
                  <p className="text-[10px] text-brand-600 dark:text-brand-400 font-medium truncate max-w-[170px] mt-0.5">
                    🚗 {rev.vehiclePurchased}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write a review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 dark:bg-dark-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsWriteModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-dark-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Share Your Experience</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Help fellow car buyers make informed decisions.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 uppercase tracking-wider">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Mwangi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 uppercase tracking-wider">City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Lavington, Nairobi"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 uppercase tracking-wider">Car Model Purchased</label>
                  <input
                    type="text"
                    placeholder="e.g. Toyota Prado TX-L"
                    value={carPurchased}
                    onChange={(e) => setCarPurchased(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 uppercase tracking-wider">Rating (1 to 5 Stars)</label>
                <div className="flex gap-2 py-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-slate-400 hover:text-amber-500 transition"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 uppercase tracking-wider">Your Review *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share details about your vehicle quality, financing process, and customer service experience..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="w-1/3 py-2.5 rounded-xl bg-slate-100 dark:bg-dark-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-dark-750"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-glow"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
