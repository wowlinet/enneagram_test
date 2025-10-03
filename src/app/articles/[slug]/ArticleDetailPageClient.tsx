'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Clock, User, Calendar, Eye, Share2, BookOpen } from 'lucide-react';
import Image from 'next/image';
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

const ArticleDetailPageClient = () => {
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
            className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </button>
        </div>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto">
          {/* Featured Image */}
          {article.featuredImage && (
            <div className="aspect-video relative mb-8 rounded-2xl overflow-hidden">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover"
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
              {article.personalityType && (
                <span className="inline-block bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                  Type {article.personalityType}
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
            <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm">
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
                {article.views} views
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="max-w-none text-gray-900" style={{
              fontSize: '16px',
              lineHeight: '1.6',
            }}>
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  // 标题样式
                  h1: ({node, ...props}) => (
                    <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-6 leading-tight" {...props} />
                  ),
                  h2: ({node, ...props}) => (
                    <h2 className="text-2xl font-bold text-gray-900 mt-7 mb-5 leading-tight" {...props} />
                  ),
                  h3: ({node, ...props}) => (
                    <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4 leading-tight" {...props} />
                  ),
                  h4: ({node, ...props}) => (
                    <h4 className="text-lg font-semibold text-gray-900 mt-5 mb-3 leading-tight" {...props} />
                  ),
                  h5: ({node, ...props}) => (
                    <h5 className="text-base font-semibold text-gray-900 mt-4 mb-3 leading-tight" {...props} />
                  ),
                  h6: ({node, ...props}) => (
                    <h6 className="text-sm font-semibold text-gray-900 mt-4 mb-2 leading-tight" {...props} />
                  ),
                  // 段落样式
                  p: ({node, ...props}) => (
                    <p className="mb-6 leading-relaxed text-gray-700" style={{ marginBottom: '1.5em' }} {...props} />
                  ),
                  // 无序列表样式
                  ul: ({node, ...props}) => (
                    <ul className="list-disc ml-6 mb-6 space-y-2" style={{ 
                      paddingLeft: '1.5rem',
                      marginBottom: '1.5em'
                    }} {...props} />
                  ),
                  // 有序列表样式
                  ol: ({node, ...props}) => (
                    <ol className="list-decimal ml-6 mb-6 space-y-2" style={{ 
                      paddingLeft: '1.5rem',
                      marginBottom: '1.5em'
                    }} {...props} />
                  ),
                  // 列表项样式
                  li: ({node, ...props}) => (
                    <li className="leading-relaxed text-gray-700" style={{ 
                      marginBottom: '0.5rem',
                      lineHeight: '1.6'
                    }} {...props} />
                  ),
                  // 引用块样式
                  blockquote: ({node, ...props}) => (
                    <blockquote className="border-l-4 border-indigo-500 pl-6 py-2 my-6 italic text-gray-700 bg-gray-50 rounded-r-lg" {...props} />
                  ),
                  // 内联代码样式
                  code: ({node, inline, ...props}: any) => {
                    return inline 
                      ? <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono border" {...props} />
                      : <code className="block bg-gray-100 text-gray-800 p-4 rounded-lg text-sm font-mono overflow-x-auto border" {...props} />;
                  },
                  // 代码块样式
                  pre: ({node, ...props}) => (
                    <pre className="bg-gray-100 rounded-lg p-4 overflow-x-auto mb-6 border border-gray-200" {...props} />
                  ),
                  // 强调文本样式
                  strong: ({node, ...props}) => (
                    <strong className="font-semibold text-gray-900" {...props} />
                  ),
                  // 斜体样式
                  em: ({node, ...props}) => (
                    <em className="italic text-gray-700" {...props} />
                  ),
                  // 链接样式
                  a: ({node, ...props}) => (
                    <a className="text-indigo-600 hover:text-indigo-800 underline font-medium transition-colors" {...props} />
                  ),
                  // 表格样式
                  table: ({node, ...props}) => (
                    <table className="min-w-full border-collapse border border-gray-300 my-6 rounded-lg overflow-hidden" {...props} />
                  ),
                  th: ({node, ...props}) => (
                    <th className="border border-gray-300 px-4 py-3 bg-gray-100 font-semibold text-left text-gray-900" {...props} />
                  ),
                  td: ({node, ...props}) => (
                    <td className="border border-gray-300 px-4 py-3 text-gray-700" {...props} />
                  ),
                  // 分割线样式
                  hr: ({node, ...props}) => (
                    <hr className="my-8 border-t-2 border-gray-200" {...props} />
                  ),
                }}
              >
                {article.content}
              </ReactMarkdown>
            </div>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Tags</h3>
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
        </article>

        {/* Personality Type Details */}
        {personalityTypeDetails && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <BookOpen className="w-6 h-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">
                  About Type {personalityTypeDetails.typeNumber}
                </h2>
              </div>
              <h3 className="text-xl font-semibold text-purple-800 mb-3">
                {personalityTypeDetails.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {personalityTypeDetails.description}
              </p>
            </div>
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <article
                  key={relatedArticle.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => router.push(`/articles/${relatedArticle.slug}`)}
                >
                  {/* Featured Image */}
                  <div className="aspect-video relative">
                    <Image
                      src={relatedArticle.featuredImage || '/article_cover.jpg'}
                      alt={relatedArticle.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category & Type */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {relatedArticle.category}
                      </span>
                      {relatedArticle.personalityType && (
                        <span className="text-xs text-gray-500">
                          Type {relatedArticle.personalityType}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {relatedArticle.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetailPageClient;