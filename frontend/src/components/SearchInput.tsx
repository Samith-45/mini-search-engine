'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Sparkles } from 'lucide-react';
import { fetchAutocomplete } from '@/lib/api';

interface SearchInputProps {
  initialQuery?: string;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  autoFocus?: boolean;
  className?: string;
}

export default function SearchInput({ 
  initialQuery = '', 
  placeholder = "Search algorithms, systems, Java, databases...", 
  size = 'md', 
  autoFocus = false, 
  className = '' 
}: SearchInputProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // Autocomplete fetch on query change
  useEffect(() => {
    if (query.trim().length === 0) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      const results = await fetchAutocomplete(query);
      setSuggestions(results);
      setIsOpen(results.length > 0);
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  // Keyboard shortcut listener: `/` to focus, `Esc` to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  const handleKeyDownInput = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelectSuggestion(suggestions[selectedIndex]);
    }
  };

  const sizeClasses = {
    sm: 'py-2 px-3 text-sm',
    md: 'py-3 px-4 text-base',
    lg: 'py-4 px-6 text-lg',
  }[size];

  return (
    <div className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative flex items-center w-full">
        <div className="relative flex-1 flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(-1);
            }}
            onKeyDown={handleKeyDownInput}
            onFocus={() => query.trim().length > 0 && setIsOpen(true)}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className={`w-full pl-12 pr-12 ${sizeClasses} rounded-xl bg-slate-900/90 text-slate-100 border border-slate-700/80 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 shadow-xl transition-all font-sans`}
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSuggestions([]);
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className="absolute right-4 p-1 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          type="submit"
          className="ml-3 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-medium text-sm shadow-lg shadow-sky-500/20 flex items-center gap-1.5 transition-all"
        >
          <span>Search</span>
        </button>

        <div className="hidden md:flex absolute right-24 top-1/2 -translate-y-1/2 items-center gap-1 px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px] text-slate-400 font-mono pointer-events-none">
          <span>/</span> to focus
        </div>
      </form>

      {/* Trie Prefix Autocomplete Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 glass-panel rounded-xl border border-slate-700/80 shadow-2xl overflow-hidden py-1">
          <div className="px-3 py-1.5 text-[11px] font-mono text-slate-400 border-b border-slate-800/80 flex items-center justify-between">
            <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-sky-400" /> Trie Prefix Autocomplete</span>
            <span>Use ↑ ↓ to navigate</span>
          </div>
          {suggestions.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectSuggestion(item)}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors ${
                idx === selectedIndex ? 'bg-sky-500/20 text-sky-300 font-medium' : 'text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span>{item}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">Trie Match</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
