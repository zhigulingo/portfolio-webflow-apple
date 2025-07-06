import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import BundleSummary from './BundleSummary';

export default function ResultCard({ recommendation, onContinue, onBack }) {
  const formatPrice = (price, isPerEpisode) => {
    if (isPerEpisode) {
      return `from $${price.toLocaleString()} per episode`;
    }
    return `from $${price.toLocaleString()}`;
  };

  // Handle both single recommendation (legacy) and multi-recommendation format
  const isBundle = recommendation.items && Array.isArray(recommendation.items);
  const items = isBundle ? recommendation.items : [recommendation];
  const hasMultipleItems = items.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="text-center"
    >
      {/* Header */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: "spring", damping: 15 }}
        className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-3xl font-semibold mb-2"
      >
        Perfect Match!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xl text-gray-600 mb-8"
      >
        Based on your answers, here's our recommendation:
      </motion.p>

      {/* Bundle Summary - only show for multiple items */}
      {isBundle && (
        <BundleSummary 
          items={recommendation.items}
          total={recommendation.total}
          discount={recommendation.discount}
          hasRushSurcharge={recommendation.hasRushSurcharge}
        />
      )}

      {/* Single Item or Main Package Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-8 mb-6"
      >
        {hasMultipleItems ? (
          // Bundle display
          <>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Complete Solution Bundle
            </h3>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              A comprehensive package combining {items.map(item => item.title.toLowerCase()).join(', ')} 
              to deliver a complete solution for your business needs.
            </p>

            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-black mb-2">
                from ${isBundle ? recommendation.total.toLocaleString() : recommendation.price.toLocaleString()}
              </div>
              
              {recommendation.discount > 0 && (
                <div className="text-green-600 font-medium">
                  You save ${recommendation.discount.toLocaleString()} with this bundle!
                </div>
              )}
            </div>
          </>
        ) : (
          // Single item display
          <>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {items[0].title}
            </h3>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {items[0].blurb}
            </p>

            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-black mb-2">
                {formatPrice(items[0].price, items[0].isPerEpisode)}
              </div>
            </div>
          </>
        )}

        {/* Rush surcharge notice for single items */}
        {!isBundle && recommendation.hasRushSurcharge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center justify-center space-x-2 text-amber-600 bg-amber-50 rounded-lg px-4 py-2 mb-6"
          >
            <ExclamationTriangleIcon className="w-5 h-5" />
            <span className="text-sm font-medium">
              Rush delivery: +25% surcharge applies
            </span>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onContinue}
          className="w-full bg-black text-white py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors duration-200"
        >
          <span>Sounds good</span>
          <ArrowRightIcon className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Footer Notes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="space-y-3"
      >
        <p className="text-sm text-gray-500">
          Final quote may vary after detailed brief.
        </p>
        
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors duration-200"
        >
          ← Back to edit answers
        </button>
      </motion.div>
    </motion.div>
  );
}