import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, X } from 'lucide-react';

export default function SearchBar({ onSearch, suggestions, onSelect, onClear }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const debounceRef = useRef(null);

  /* Debounced search */
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onSearch(query), 300);
    return () => clearTimeout(debounceRef.current);
  }, [query, onSearch]);

  /* Close dropdown on outside click */
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsFocused(false);
        onClear();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClear]);

  const handleSelect = (city) => {
    setQuery(city.name);
    setIsFocused(false);
    onSelect(city);
  };

  const handleClear = () => {
    setQuery('');
    onClear();
    inputRef.current?.focus();
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="relative max-w-xl mx-auto"
    >
      {/* Input */}
      <div
        className={`glass rounded-2xl transition-all duration-300 ${
          isFocused ? 'ring-2 ring-cyan-400/50 bg-white/15' : ''
        }`}
      >
        <div className="flex items-center px-5 py-4">
          <Search className="w-5 h-5 text-white/50 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Search for a city…"
            className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-base"
          />
          {query && (
            <button
              onClick={handleClear}
              className="ml-2 text-white/40 hover:text-white/70 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 glass rounded-2xl overflow-hidden z-50"
          >
            {suggestions.map((city, index) => (
              <motion.button
                key={`${city.id}-${index}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => handleSelect(city)}
                className="w-full flex items-center px-5 py-3 hover:bg-white/10 transition-colors text-left"
              >
                <MapPin className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                <div>
                  <span className="text-white font-medium">{city.name}</span>
                  <span className="text-white/40 text-sm ml-2">
                    {[city.admin1, city.country].filter(Boolean).join(', ')}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
