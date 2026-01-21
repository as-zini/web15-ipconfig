import { motion } from 'framer-motion';
import type { NamingCase } from '../types/namingConvention';

interface GuidelineBoxProps {
  category: string;
  description: string;
}

export function GuidelineBox({ category, description }: GuidelineBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 rounded-md border border-gray-700 bg-gray-800 p-4 text-sm text-gray-300 shadow-md"
    >
      <h4 className="mb-1 font-semibold text-indigo-400">
        {category} Naming Tip
      </h4>
      <p className="leading-relaxed">{description}</p>
    </motion.div>
  );
}
