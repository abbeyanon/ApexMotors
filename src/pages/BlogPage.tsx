import React from 'react';
import { Link } from 'react-router-dom';
import { useDealership } from '../context/DealershipContext';
import { BookOpen, ArrowRight, Calendar, User, Tag } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { blogPosts } = useDealership();

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 py-12">
      <div className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Automotive Journalism & Buying Advice</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Apex Motors Journal & News
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Expert insights on vehicle maintenance in Kenya, bank loan pre-approvals, comparison breakdowns, and car reviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-dark-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-slate-700 transition flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-dark-950/80 backdrop-blur-sm text-xs font-semibold text-brand-400">
                    {post.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="block text-lg font-bold text-white hover:text-brand-400 transition mb-3 leading-snug"
                  >
                    {post.title}
                  </Link>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-4">
                <span className="text-xs text-slate-400 font-medium">By {post.author}</span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-400 hover:text-brand-300 transition"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
