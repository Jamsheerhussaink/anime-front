'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import AnimeFilters from '../components/AnimeFilters'
import ResultsList from '../components/ResultsList'

// Define types
interface Anime {
  name: string
  genre: string
  type: string
  episodes: number
  rating: number
  members: number
}

interface Filters {
  genres: string[]
  types: string[]
  ratings: string[]
}

// Header component
const Header = () => (
  <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
    <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block mb-4">
      <Sparkles className="w-16 h-16 text-yellow-300" />
    </motion.div>
    <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
      Anime Finder
    </h1>
    <p className="text-xl text-purple-200">Discover your next favorite anime</p>
  </motion.div>
);

// BackgroundVideo component
const BackgroundVideo = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[-1]">
    <div className="absolute inset-0 bg-black opacity-50" />
    <video
      src="/bg.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
    />
  </div>
);

export default function Home() {
  const [filters, setFilters] = useState<Filters>({ genres: [], types: [], ratings: [] });
  const [genre, setGenre] = useState('');
  const [type, setType] = useState('');
  const [rating, setRating] = useState('');
  const [recommendations, setRecommendations] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFilters();
  }, []);

  const fetchFilters = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/filters');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setFilters(data);
    } catch (err) {
      setError('Failed to load filters. Is the backend server running?');
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setRecommendations([]);

    try {
      const response = await fetch('http://localhost:5000/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ genre, type, rating }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setRecommendations(data.recommendations);

    } catch (err) {
      setError('Failed to get recommendations. Check the browser console for more info.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundVideo />
      <div className="relative z-10 container mx-auto px-4 py-12">
        <Header />
        
        <AnimeFilters
          filters={filters}
          genre={genre}
          setGenre={setGenre}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
          handleSubmit={handleSubmit}
          loading={loading}
        />

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto mb-6 p-4 rounded-xl bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-200"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <ResultsList recommendations={recommendations} />
      </div>
    </div>
  );
}