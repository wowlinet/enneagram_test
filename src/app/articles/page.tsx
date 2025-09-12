'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, Clock, User, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  personality_type: number | null;
  author: string;
  published_at: string;
  reading_time: number;
  featured_image: string | null;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
}

const ArticlesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('personality_type') || '');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'Self-Discovery',
    'Relationships',
    'Career',
    'Personal Growth',
    'Psychology',
    'Spirituality'
  ];

  const personalityTypes = [
    { number: 1, name: 'The Perfectionist' },
    { number: 2, name: 'The Helper' },
    { number: 3, name: 'The Achiever' },
    { number: 4, name: 'The Individualist' },
    { number: 5, name: 'The Investigator' },
    { number: 6, name: 'The Loyalist' },
    { number: 7, name: 'The Enthusiast' },
    { number: 8, name: 'The Challenger' },
    { number: 9, name: 'The Peacemaker' }
  ];

  const fetchArticles = async (page: number = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.set('page', page.toString());
      params.set('limit', '12');
      
      if (searchQuery) params.set('search', searchQuery);
      if (selectedCategory) params.set('category', selectedCategory);
      if (selectedType) params.set('personality_type', selectedType);

      const supabase = createClient();
      const response = await fetch(`/api/articles?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch articles');
      }

      setArticles(data.articles);
      setPagination(data.pagination);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load articles');
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1');
    fetchArticles(page);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: searchQuery, page: '1' });
  };

  const updateFilters = (newFilters: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`/articles?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedType('');
    router.push('/articles');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPersonalityTypeName = (typeNumber: number) => {
    const type = personalityTypes.find(t => t.number === typeNumber);
    return type ? `Type ${typeNumber}: ${type.name}` : `Type ${typeNumber}`;
  };

  if (loading && articles.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading articles...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Enneagram Articles
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore insights, tips, and deep dives into the nine personality types
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
            
            {(selectedCategory || selectedType || searchQuery) && (
              <button
                onClick={clearFilters}
                className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      updateFilters({ category: e.target.value, page: '1' });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Personality Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personality Type
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => {
                      setSelectedType(e.target.value);
                      updateFilters({ personality_type: e.target.value, page: '1' });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    {personalityTypes.map(type => (
                      <option key={type.number} value={type.number.toString()}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Info */}
        {pagination && (
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {((pagination.currentPage - 1) * pagination.limit) + 1} - {Math.min(pagination.currentPage * pagination.limit, pagination.totalCount)} of {pagination.totalCount} articles
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => router.push(`/articles/${article.id}`)}
              >
                {/* Featured Image */}
                <div className="aspect-video bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                  {article.featured_image ? (
                    <Image
                      src={article.featured_image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-white text-6xl font-bold">
                        {article.personality_type || '📚'}
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category & Type */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {article.category}
                    </span>
                    {article.personality_type && (
                      <span className="text-xs text-gray-500">
                        Type {article.personality_type}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                    {article.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {article.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {article.reading_time} min
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(article.published_at)}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or filters
              </p>
              <button
                onClick={clearFilters}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => updateFilters({ page: (pagination.currentPage - 1).toString() })}
              disabled={!pagination.hasPrevPage}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                const pageNum = Math.max(1, pagination.currentPage - 2) + i;
                if (pageNum > pagination.totalPages) return null;
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => updateFilters({ page: pageNum.toString() })}
                    className={`px-3 py-2 text-sm font-medium rounded-lg ${
                      pageNum === pagination.currentPage
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => updateFilters({ page: (pagination.currentPage + 1).toString() })}
              disabled={!pagination.hasNextPage}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;