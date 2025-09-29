import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import AnimeCard from './AnimeCard';

interface Anime {
  name: string;
  genre: string;
  type: string;
  episodes: number;
  rating: number;
}

interface ResultsListProps {
  recommendations: Anime[];
}

const ResultsList = ({ recommendations }: ResultsListProps) => {
  return (
    <AnimatePresence>
      {recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            // UI CHANGE: Accent color for the heading
            className="text-3xl font-bold text-white mb-6 flex items-center gap-3"
          >
            <TrendingUp className="w-8 h-8 text-pink-300" /> {/* UI CHANGE */}
            Recommended for You ({recommendations.length})
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((anime, index) => (
              <AnimeCard key={anime.name} anime={anime} index={index} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResultsList;