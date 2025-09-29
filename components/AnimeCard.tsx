import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Anime {
  name: string;
  genre: string;
  type: string;
  episodes: number;
  rating: number;
}

interface AnimeCardProps {
  anime: Anime;
  index: number;
}

const AnimeCard = ({ anime, index }: AnimeCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ delay: index * 0.1, duration: 0.2 }}
      className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/10 hover:border-pink-400/50 transition-all cursor-pointer group" // UI CHANGE
    >
      <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-pink-300 transition-colors">{anime.name}</h3> {/* UI CHANGE */}
      <div className="space-y-2 text-pink-200"> {/* UI CHANGE */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Type:</span>
          <span className="px-2 py-1 bg-pink-500/30 rounded-lg text-xs">{anime.type}</span> {/* UI CHANGE */}
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="font-semibold">{anime.rating.toFixed(1)}</span>
        </div>
        <div className="text-sm">
          <span className="font-medium">Episodes:</span> {anime.episodes || 'N/A'}
        </div>
        <div className="text-xs mt-3 line-clamp-2 text-pink-300"> {/* UI CHANGE */}
          {anime.genre}
        </div>
      </div>
    </motion.div>
  );
};

export default AnimeCard;