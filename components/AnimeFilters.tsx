import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface Filters {
  genres: string[];
  types: string[];
  ratings: string[];
}

interface AnimeFiltersProps {
  filters: Filters;
  genre: string;
  setGenre: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  rating: string;
  setRating: (value: string) => void;
  handleSubmit: () => void;
  loading: boolean;
}

const AnimeFilters = ({ filters, genre, setGenre, type, setType, rating, setRating, handleSubmit, loading }: AnimeFiltersProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="max-w-4xl mx-auto mb-12"
    >
      <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-pink-200 mb-2">Genre</label> {/* UI CHANGE */}
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              // UI CHANGE: Focus ring color
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
            >
              {filters.genres.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-pink-200 mb-2">Type</label> {/* UI CHANGE */}
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              // UI CHANGE: Focus ring color
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
            >
              {filters.types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-pink-200 mb-2">Rating</label> {/* UI CHANGE */}
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              // UI CHANGE: Focus ring color
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
            >
              {filters.ratings.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* UI CHANGE: Updated button gradient and hover shadow */}
        <motion.button
          onClick={handleSubmit}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-red-800/80 via-pink-700/80 to-red-800/80 text-white font-semibold shadow-lg hover:shadow-pink-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-300"
        >
          {loading ? <LoadingSpinner /> : <><Search className="w-5 h-5" /> Find Anime</>}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AnimeFilters;