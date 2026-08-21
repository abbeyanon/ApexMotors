import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDealership } from '../context/DealershipContext';
import { Calendar, User, ArrowLeft, Share2, Tag, BookOpen } from 'lucide-react';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { blogPosts, addToast } = useDealership();

  const post = blogPosts.find((p) => p.slug === slug) || blogPosts[0];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast({ type: 'success', title: 'Link Copied', message: 'Article URL copied!' });
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>

        <div className="space-y-4 mb-8">
          <span className="px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-xs font-semibold text-brand-400">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-white">By {post.author} ({post.authorRole})</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dark-850 hover:bg-dark-800 border border-slate-700 text-slate-200"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Article</span>
            </button>
          </div>
        </div>

        {/* Featured Banner Image */}
        <div className="rounded-3xl overflow-hidden border border-slate-800 mb-10 h-80 sm:h-96">
          <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Post Markdown/Text Content */}
        <div className="bg-dark-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
          <p className="font-medium text-lg text-white leading-relaxed">
            {post.excerpt}
          </p>

          <div className="whitespace-pre-line space-y-4">
            {post.content}
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-brand-500" />
            <span className="text-xs text-slate-400 mr-2">Tags:</span>
            {post.tags.map((tag, i) => (
              <span key={i} className="px-2.5 py-1 rounded-md bg-dark-850 text-xs text-slate-300 border border-slate-750">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
