import React from 'react';
import { motion } from 'framer-motion';

export default function BundleSummary({ items, total, discount, hasRushSurcharge }) {
  // Don't show bundle summary for single items
  if (items.length <= 1) {
    return null;
  }

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);

  const formatPrice = (price, isPerEpisode) => {
    if (isPerEpisode) {
      return `$${price.toLocaleString()} per episode`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6"
    >
      <h4 className="text-lg font-semibold text-gray-900 mb-4">Bundle Summary</h4>
      
      {/* Individual Items */}
      <div className="space-y-3 mb-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-700">{item.title}</span>
            <span className="font-medium">
              {formatPrice(item.price, item.isPerEpisode)}
            </span>
          </div>
        ))}
      </div>
      
      <hr className="border-gray-200 mb-4" />
      
      {/* Pricing Breakdown */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toLocaleString()}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between items-center text-green-600">
            <span>Bundle Discount (10%)</span>
            <span>-${discount.toLocaleString()}</span>
          </div>
        )}
        
        <hr className="border-gray-200" />
        
        <div className="flex justify-between items-center text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>from ${total.toLocaleString()}</span>
        </div>
      </div>
      
      {hasRushSurcharge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center space-x-2 text-amber-600 bg-amber-50 rounded-lg px-4 py-2 mt-4"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
          </svg>
          <span className="text-sm font-medium">
            Rush delivery: +25% surcharge applies
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}