import { getRecommendations, getRecommendation } from '../recommendations.js';

describe('getRecommendations', () => {
  // Test single product type selections
  describe('Single product type selections', () => {
    test('should return Logo Animation for video with budget <= $2000', () => {
      const answers = {
        productType: { a: true }, // Video only
        businessGoal: { a: true },
        industry: 'a',
        deadline: 'b',
        materials: 'a',
        budget: 'a' // Up to $2000
      };

      const result = getRecommendations(answers);
      
      expect(result.items).toHaveLength(1);
      expect(result.items[0].title).toBe('Logo Animation');
      expect(result.items[0].price).toBe(499);
      expect(result.total).toBe(499);
      expect(result.discount).toBe(0);
    });

    test('should return Product Video for video with budget <= $5000', () => {
      const answers = {
        productType: { a: true }, // Video only
        businessGoal: { a: true },
        industry: 'a',
        deadline: 'b',
        materials: 'a',
        budget: 'b' // Up to $5000
      };

      const result = getRecommendations(answers);
      
      expect(result.items).toHaveLength(1);
      expect(result.items[0].title).toBe('Product Video');
      expect(result.items[0].price).toBe(2299);
      expect(result.total).toBe(2299);
      expect(result.discount).toBe(0);
    });

    test('should return Video Series for video with budget > $5000', () => {
      const answers = {
        productType: { a: true }, // Video only
        businessGoal: { a: true },
        industry: 'a',
        deadline: 'b',
        materials: 'a',
        budget: 'c' // Up to $10,000
      };

      const result = getRecommendations(answers);
      
      expect(result.items).toHaveLength(1);
      expect(result.items[0].title).toBe('Video Series');
      expect(result.items[0].price).toBe(1499);
      expect(result.items[0].isPerEpisode).toBe(true);
      expect(result.total).toBe(1499);
      expect(result.discount).toBe(0);
    });

    test('should return Landing Page for website with budget <= $2000', () => {
      const answers = {
        productType: { b: true }, // Website only
        businessGoal: { a: true },
        industry: 'a',
        deadline: 'b',
        materials: 'a',
        budget: 'a' // Up to $2000
      };

      const result = getRecommendations(answers);
      
      expect(result.items).toHaveLength(1);
      expect(result.items[0].title).toBe('Landing Page (Web Dev)');
      expect(result.items[0].price).toBe(1999);
      expect(result.total).toBe(1999);
      expect(result.discount).toBe(0);
    });

    test('should return Brand ID Kit + Web for website with budget > $2000', () => {
      const answers = {
        productType: { b: true }, // Website only
        businessGoal: { a: true },
        industry: 'a',
        deadline: 'b',
        materials: 'a',
        budget: 'b' // Up to $5000
      };

      const result = getRecommendations(answers);
      
      expect(result.items).toHaveLength(1);
      expect(result.items[0].title).toBe('Brand ID Kit + Web');
      expect(result.items[0].price).toBe(3600);
      expect(result.total).toBe(3600);
      expect(result.discount).toBe(0);
    });

    test('should return Application Development for application', () => {
      const answers = {
        productType: { c: true }, // Application only
        businessGoal: { a: true },
        industry: 'a',
        deadline: 'b',
        materials: 'a',
        budget: 'a'
      };

      const result = getRecommendations(answers);
      
      expect(result.items).toHaveLength(1);
      expect(result.items[0].title).toBe('Application Development');
      expect(result.items[0].price).toBe(3699);
      expect(result.total).toBe(3699);
      expect(result.discount).toBe(0);
    });
  });

  // Test multiple product type selections with bundle pricing
  describe('Multiple product type selections', () => {
    test('should return bundle with discount for video + website', () => {
      const answers = {
        productType: { a: true, b: true }, // Video + Website
        businessGoal: { a: true },
        industry: 'a',
        deadline: 'b',
        materials: 'a',
        budget: 'a' // Up to $2000
      };

      const result = getRecommendations(answers);
      
      expect(result.items).toHaveLength(2);
      
      // Check individual items
      const videoItem = result.items.find(item => item.title === 'Logo Animation');
      const websiteItem = result.items.find(item => item.title === 'Landing Page (Web Dev)');
      
      expect(videoItem).toBeDefined();
      expect(videoItem.price).toBe(499);
      expect(websiteItem).toBeDefined();
      expect(websiteItem.price).toBe(1999);
      
      // Check bundle pricing
      const subtotal = 499 + 1999; // 2498
      const expectedDiscount = Math.round(subtotal * 0.1); // 250
      const expectedTotal = subtotal - expectedDiscount; // 2248
      
      expect(result.discount).toBe(expectedDiscount);
      expect(result.total).toBe(expectedTotal);
    });

    test('should return bundle with discount for video + website + application', () => {
      const answers = {
        productType: { a: true, b: true, c: true }, // All three
        businessGoal: { a: true },
        industry: 'a',
        deadline: 'b',
        materials: 'a',
        budget: 'c' // Up to $10,000
      };

      const result = getRecommendations(answers);
      
      expect(result.items).toHaveLength(3);
      
      // Check individual items
      const videoItem = result.items.find(item => item.title === 'Video Series');
      const websiteItem = result.items.find(item => item.title === 'Brand ID Kit + Web');
      const appItem = result.items.find(item => item.title === 'Application Development');
      
      expect(videoItem).toBeDefined();
      expect(videoItem.price).toBe(1499);
      expect(websiteItem).toBeDefined();
      expect(websiteItem.price).toBe(3600);
      expect(appItem).toBeDefined();
      expect(appItem.price).toBe(3699);
      
      // Check bundle pricing
      const subtotal = 1499 + 3600 + 3699; // 8798
      const expectedDiscount = Math.round(subtotal * 0.1); // 880
      const expectedTotal = subtotal - expectedDiscount; // 7918
      
      expect(result.discount).toBe(expectedDiscount);
      expect(result.total).toBe(expectedTotal);
    });
  });

  // Test rush deadline surcharge
  describe('Rush deadline handling', () => {
    test('should add rush surcharge for deadline < 1 month', () => {
      const answers = {
        productType: { a: true }, // Video
        businessGoal: { a: true },
        industry: 'a',
        deadline: 'a', // Less than a month
        materials: 'a',
        budget: 'a'
      };

      const result = getRecommendations(answers);
      
      expect(result.hasRushSurcharge).toBe(true);
    });

    test('should not add rush surcharge for longer deadlines', () => {
      const answers = {
        productType: { a: true }, // Video
        businessGoal: { a: true },
        industry: 'a',
        deadline: 'b', // 1-2 months
        materials: 'a',
        budget: 'a'
      };

      const result = getRecommendations(answers);
      
      expect(result.hasRushSurcharge).toBe(false);
    });

    test('should add rush surcharge to bundles', () => {
      const answers = {
        productType: { a: true, b: true }, // Video + Website
        businessGoal: { a: true },
        industry: 'a',
        deadline: 'a', // Less than a month
        materials: 'a',
        budget: 'a'
      };

      const result = getRecommendations(answers);
      
      expect(result.hasRushSurcharge).toBe(true);
      expect(result.items).toHaveLength(2);
      expect(result.discount).toBeGreaterThan(0);
    });
  });

  // Test fallback case
  describe('Fallback recommendations', () => {
    test('should return Tech Review for no product type selected', () => {
      const answers = {
        productType: {}, // No selection
        businessGoal: { a: true },
        industry: 'a',
        deadline: 'b',
        materials: 'a',
        budget: 'a'
      };

      const result = getRecommendations(answers);
      
      expect(result.items).toHaveLength(1);
      expect(result.items[0].title).toBe('Tech Review');
      expect(result.items[0].price).toBe(799);
      expect(result.total).toBe(799);
      expect(result.discount).toBe(0);
    });

    test('should handle undefined productType', () => {
      const answers = {
        productType: undefined,
        businessGoal: { a: true },
        industry: 'a',
        deadline: 'b',
        materials: 'a',
        budget: 'a'
      };

      const result = getRecommendations(answers);
      
      expect(result.items).toHaveLength(1);
      expect(result.items[0].title).toBe('Tech Review');
      expect(result.items[0].price).toBe(799);
      expect(result.total).toBe(799);
      expect(result.discount).toBe(0);
    });
  });

  // Test edge cases
  describe('Edge cases', () => {
    test('should handle missing budget gracefully', () => {
      const answers = {
        productType: { a: true }, // Video
        businessGoal: { a: true },
        industry: 'a',
        deadline: 'b',
        materials: 'a',
        budget: undefined
      };

      const result = getRecommendations(answers);
      
      expect(result.items).toHaveLength(1);
      expect(result.items[0].title).toBe('Logo Animation'); // Should default to lowest budget tier
    });

    test('should handle invalid budget values', () => {
      const answers = {
        productType: { a: true }, // Video
        businessGoal: { a: true },
        industry: 'a',
        deadline: 'b',
        materials: 'a',
        budget: 'invalid'
      };

      const result = getRecommendations(answers);
      
      expect(result.items).toHaveLength(1);
      expect(result.items[0].title).toBe('Logo Animation'); // Should default to lowest budget tier
    });
  });
});

// Test backward compatibility with legacy getRecommendation function
describe('getRecommendation (legacy)', () => {
  test('should return single recommendation for backward compatibility', () => {
    const answers = {
      productType: { a: true }, // Video
      businessGoal: { a: true },
      industry: 'a',
      deadline: 'b',
      materials: 'a',
      budget: 'a'
    };

    const result = getRecommendation(answers);
    
    expect(result.title).toBe('Logo Animation');
    expect(result.price).toBe(499);
    expect(result.hasRushSurcharge).toBe(false);
  });

  test('should handle rush surcharge in legacy format', () => {
    const answers = {
      productType: { a: true }, // Video
      businessGoal: { a: true },
      industry: 'a',
      deadline: 'a', // Less than a month
      materials: 'a',
      budget: 'a'
    };

    const result = getRecommendation(answers);
    
    expect(result.title).toBe('Logo Animation');
    expect(result.hasRushSurcharge).toBe(true);
  });
});