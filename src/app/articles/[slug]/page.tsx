'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Clock, User, Calendar, Eye, Share2, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  category: string;
  personalityType: number | null;
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  views: number;
  featuredImage: string | null;
  tags: string[];
  seoTitle: string | null;
  seoDescription: string | null;
}

interface PersonalityTypeDetails {
  typeNumber: number;
  title: string;
  description: string;
}

interface RelatedArticle {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  personalityType: number | null;
  publishedAt: string;
  readingTime: number;
  featuredImage: string | null;
}

const ArticleDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [personalityTypeDetails, setPersonalityTypeDetails] = useState<PersonalityTypeDetails | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const supabase = createClient();
        const response = await fetch(`/api/articles/${params.slug}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch article');
        }

        setArticle(data.article);
        setPersonalityTypeDetails(data.personalityTypeDetails);
        setRelatedArticles(data.relatedArticles || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load article');
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchArticle();
    }
  }, [params.slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareArticle = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading article...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The article could not be loaded.'}</p>
            <button
              onClick={() => router.push('/articles')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Browse Articles
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push('/articles')}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Articles
          </button>
          
          <button
            onClick={shareArticle}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </button>
        </div>

        {/* Article */}
        <article className="max-w-4xl mx-auto">
          {/* Featured Image */}
          {article.featuredImage && (
            <div className="aspect-video mb-8 rounded-2xl overflow-hidden">
              <Image
                src={article.featuredImage}
                alt={article.title}
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Header */}
          <header className="mb-8">
            {/* Category & Type */}
            <div className="flex items-center space-x-4 mb-4">
              <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                {article.category}
              </span>
              {article.personalityType && personalityTypeDetails && (
                <span className="inline-block bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                  Type {personalityTypeDetails.typeNumber}: {personalityTypeDetails.title}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 pb-6 border-b border-gray-200">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {formatDate(article.publishedAt)}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {article.readingTime} min read
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                {article.views}+ views
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg prose-indigo max-w-none mb-12 text-gray-700 leading-relaxed">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-semibold text-gray-900 mt-5 mb-2" {...props} />,
                h4: ({node, ...props}) => <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-gray-700" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
                li: ({node, ...props}) => <li className="ml-4" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-700 my-4" {...props} />,
                code: ({node, ...props}: any) => {
                  const isInline = props.inline;
                  return isInline 
                    ? <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm font-mono" {...props} />
                    : <code className="block bg-gray-100 text-gray-800 p-4 rounded-lg text-sm font-mono overflow-x-auto" {...props} />;
                },
                pre: ({node, ...props}) => <pre className="bg-gray-100 rounded-lg p-4 overflow-x-auto mb-4" {...props} />,
                strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
                em: ({node, ...props}) => <em className="italic" {...props} />,
                a: ({node, ...props}) => <a className="text-indigo-600 hover:text-indigo-800 underline" {...props} />,
                table: ({node, ...props}) => <table className="min-w-full border-collapse border border-gray-300 my-4" {...props} />,
                th: ({node, ...props}) => <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left" {...props} />,
                td: ({node, ...props}) => <td className="border border-gray-300 px-4 py-2" {...props} />,
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Personality Type Details */}
          {personalityTypeDetails && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-8 mb-12">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xl font-bold rounded-full flex items-center justify-center mr-4">
                  {personalityTypeDetails.typeNumber}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {personalityTypeDetails.title}
                  </h3>
                  <p className="text-gray-600">Enneagram Type {personalityTypeDetails.typeNumber}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                {personalityTypeDetails.description}
              </p>
              <button
                onClick={() => router.push('/test')}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Take the Test
              </button>
            </div>
          )}
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="max-w-6xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <article
                  key={relatedArticle.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => router.push(`/articles/${relatedArticle.slug}`)}
                >
                  {/* Featured Image */}
                  <div className="aspect-video bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                    {relatedArticle.featuredImage ? (
                      <Image
                        src={relatedArticle.featuredImage}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-white text-4xl font-bold">
                          {relatedArticle.personalityType || '📚'}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category */}
                    <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-3">
                      {relatedArticle.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {relatedArticle.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                      {relatedArticle.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {relatedArticle.readingTime} min
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(relatedArticle.publishedAt)}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ArticleDetailPage;