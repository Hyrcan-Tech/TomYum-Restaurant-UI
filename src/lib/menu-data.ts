// Shared menu data between Menu management and CustomerOrder pages
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  popular: boolean;
  vegetarian: boolean;
}

// Initial menu items
export const initialMenuItems: MenuItem[] = [
  // Main Courses
  { 
    id: 1, 
    name: "Pad Thai", 
    description: "Stir-fried rice noodles with shrimp, tofu, and peanuts",
    category: "main", 
    subcategory: "noodles", 
    price: 14.99, 
    popular: true, 
    vegetarian: false 
  },
  { 
    id: 2, 
    name: "Green Curry", 
    description: "Spicy green curry with chicken and vegetables",
    category: "main", 
    subcategory: "curries", 
    price: 13.99, 
    popular: false, 
    vegetarian: false 
  },
  { 
    id: 3, 
    name: "Massaman Curry", 
    description: "Rich and mild curry with beef and potatoes",
    category: "main", 
    subcategory: "curries", 
    price: 14.99, 
    popular: true, 
    vegetarian: false 
  },
  { 
    id: 4, 
    name: "Vegetable Stir Fry", 
    description: "Fresh vegetables stir-fried with tofu",
    category: "main", 
    subcategory: "vegetables", 
    price: 12.99, 
    popular: false, 
    vegetarian: true 
  },
  
  // Desserts
  { 
    id: 5, 
    name: "Mango Sticky Rice", 
    description: "Sweet mango with coconut sticky rice",
    category: "dessert", 
    subcategory: "traditional", 
    price: 6.99, 
    popular: true, 
    vegetarian: true 
  },
  { 
    id: 6, 
    name: "Coconut Ice Cream", 
    description: "Homemade coconut ice cream",
    category: "dessert", 
    subcategory: "ice-cream", 
    price: 5.99, 
    popular: false, 
    vegetarian: true 
  },
  
  // Alcoholic Drinks
  { 
    id: 7, 
    name: "Thai Beer", 
    description: "Local Thai beer",
    category: "alcoholic", 
    subcategory: "beer", 
    price: 4.99, 
    popular: true, 
    vegetarian: true 
  },
  { 
    id: 8, 
    name: "Singha Beer", 
    description: "Premium Thai lager",
    category: "alcoholic", 
    subcategory: "beer", 
    price: 5.99, 
    popular: false, 
    vegetarian: true 
  },
  { 
    id: 9, 
    name: "Chang Beer", 
    description: "Popular Thai beer",
    category: "alcoholic", 
    subcategory: "beer", 
    price: 5.49, 
    popular: false, 
    vegetarian: true 
  },
  
  // Non-Alcoholic Drinks
  { 
    id: 10, 
    name: "Thai Iced Tea", 
    description: "Sweet and creamy iced tea",
    category: "non-alcoholic", 
    subcategory: "tea", 
    price: 3.99, 
    popular: true, 
    vegetarian: true 
  },
  { 
    id: 11, 
    name: "Coconut Water", 
    description: "Fresh coconut water",
    category: "non-alcoholic", 
    subcategory: "juice", 
    price: 4.99, 
    popular: false, 
    vegetarian: true 
  },
  { 
    id: 12, 
    name: "Lemonade", 
    description: "Freshly squeezed lemonade",
    category: "non-alcoholic", 
    subcategory: "juice", 
    price: 3.49, 
    popular: false, 
    vegetarian: true 
  },
  
  // Vegetarian Options
  { 
    id: 13, 
    name: "Tofu Satay", 
    description: "Grilled tofu with peanut sauce",
    category: "vegetarian", 
    subcategory: "appetizers", 
    price: 8.99, 
    popular: true, 
    vegetarian: true 
  },
  { 
    id: 14, 
    name: "Vegetable Spring Rolls", 
    description: "Crispy vegetable spring rolls with sweet chili sauce",
    category: "vegetarian", 
    subcategory: "appetizers", 
    price: 7.99, 
    popular: false, 
    vegetarian: true 
  },
  
  // Non-Vegetarian Options
  { 
    id: 15, 
    name: "Chicken Satay", 
    description: "Grilled chicken skewers with peanut sauce",
    category: "non-vegetarian", 
    subcategory: "appetizers", 
    price: 9.99, 
    popular: true, 
    vegetarian: false 
  },
  { 
    id: 16, 
    name: "Fish Cakes", 
    description: "Spicy fish cakes with cucumber relish",
    category: "non-vegetarian", 
    subcategory: "appetizers", 
    price: 8.99, 
    popular: false, 
    vegetarian: false 
  },
];

// Categories with icons
export const categories = [
  { id: "all", name: "All Items", icon: "Utensils" },
  { id: "main", name: "Main Course", icon: "Utensils" },
  { id: "dessert", name: "Dessert", icon: "Candy" },
  { id: "alcoholic", name: "Alcoholic", icon: "Wine" },
  { id: "non-alcoholic", name: "Non-Alcoholic", icon: "GlassWater" },
  { id: "vegetarian", name: "Vegetarian", icon: "Leaf" },
  { id: "non-vegetarian", name: "Non-Vegetarian", icon: "Beef" },
  { id: "appetizers", name: "Appetizers", icon: "Carrot" },
];