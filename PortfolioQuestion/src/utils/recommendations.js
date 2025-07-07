// Recommendation logic based on user answers with multi-select support
export function getRecommendations(answers) {
  const { productType, businessGoal, industry, deadline, materials, budget } = answers;
  
  // Convert budget text to number for comparison
  const budgetValue = getBudgetValue(budget);
  
  // Get selected product types
  const selectedTypes = getSelectedProductTypes(productType);
  
  // If no types selected, return fallback
  if (selectedTypes.length === 0) {
    return {
      items: [{
        title: "Tech Review",
        blurb: "A comprehensive technical consultation to help you choose the right solution for your business needs.",
        price: 799
      }],
      total: 799,
      discount: 0
    };
  }
  
  // Get package for each selected type
  const items = selectedTypes.map(type => getPackageForType(type, budgetValue));
  
  // Calculate pricing
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const discount = items.length > 1 ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount;
  
  // Add rush surcharge notice if deadline is less than a month
  const hasRushDeadline = deadline === 'a'; // "Less than a month"
  
  return {
    items,
    total,
    discount,
    hasRushSurcharge: hasRushDeadline
  };
}

function getSelectedProductTypes(productType) {
  if (!productType) return [];
  
  const types = [];
  if (productType.a === true) types.push('video');
  if (productType.b === true) types.push('website');
  if (productType.c === true) types.push('application');
  
  return types;
}

function getPackageForType(type, budgetValue) {
  switch (type) {
    case 'video':
      if (budgetValue <= 2000) {
        return {
          title: "Logo Animation",
          blurb: "Professional animated logo that brings your brand to life with smooth, engaging motion graphics.",
          price: 499
        };
      } else if (budgetValue <= 5000) {
        return {
          title: "Product Video",
          blurb: "High-quality promotional video showcasing your product or service with professional cinematography.",
          price: 2299
        };
      } else {
        return {
          title: "Video Series",
          blurb: "Complete video series production with multiple episodes to tell your brand story effectively.",
          price: 1499,
          isPerEpisode: true
        };
      }
    
    case 'website':
      if (budgetValue <= 2000) {
        return {
          title: "Landing Page (Web Dev)",
          blurb: "Custom-designed landing page optimized for conversions and user engagement.",
          price: 1999
        };
      } else {
        return {
          title: "Brand ID Kit + Web",
          blurb: "Complete brand identity package including logo, guidelines, and professional website development.",
          price: 3600
        };
      }
    
    case 'application':
      return {
        title: "Application Development",
        blurb: "Custom mobile or web application tailored to your business needs with modern UI/UX design.",
        price: 3699
      };
    
    default:
      return {
        title: "Tech Review",
        blurb: "A comprehensive technical consultation to help you choose the right solution for your business needs.",
        price: 799
      };
  }
}

function getBudgetValue(budget) {
  switch (budget) {
    case 'a': return 2000;  // "Up to $2000"
    case 'b': return 5000;  // "Up to $5000"
    case 'c': return 10000; // "Up to $10 000"
    default: return 0;
  }
}

// Legacy function for backward compatibility
export function getRecommendation(answers) {
  const recommendations = getRecommendations(answers);
  return {
    ...recommendations.items[0],
    hasRushSurcharge: recommendations.hasRushSurcharge
  };
}