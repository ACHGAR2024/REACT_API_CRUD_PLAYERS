// src/components/PokemonCard.jsx

import { motion } from 'framer-motion';

const Card = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-lg p-4 hover:scale-105 cursor-zoom-in">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={`https://picsum.photos/200/300?random=${i}`}  // Replace with the path to your image
              alt={`random image ${i}`}
              className="w-full h-auto object-cover rounded-lg sm:h-64 md:h-48 lg:h-64"
            />
          </motion.div>
        </div>
      ))}
    </div>
  );
};



export default Card;
