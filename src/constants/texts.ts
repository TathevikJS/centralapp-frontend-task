export const TEXTS = {
  // Main titles and headers
  CATEGORY_MANAGER: 'Category Manager',
  ADD_AND_ORGANIZE: 'Add and organize your categories',
  YOUR_CATEGORIES: 'Your Categories',
  
  // Search related
  SEARCH_PLACEHOLDER: 'Search categories...',
  SEARCHING: 'Searching...',
  NO_CATEGORIES_FOUND: 'No categories found',
  
  // Empty state
  NO_CATEGORIES_YET: 'No categories yet',
  EMPTY_STATE_DESCRIPTION: 'Search and add categories using the search bar above to get started',
  
  // Toast messages
  ADDED_SUCCESSFULLY: 'added successfully!',
  ALREADY_ADDED: 'is already added',
  REMOVED: 'removed',
  
  // Loading states
  LOADING: 'Loading...',
} as const;

// Export individual constants for easier importing
export const {
  CATEGORY_MANAGER,
  ADD_AND_ORGANIZE,
  YOUR_CATEGORIES,
  SEARCH_PLACEHOLDER,
  SEARCHING,
  NO_CATEGORIES_FOUND,
  NO_CATEGORIES_YET,
  EMPTY_STATE_DESCRIPTION,
  ADDED_SUCCESSFULLY,
  ALREADY_ADDED,
  REMOVED,
  LOADING,
} = TEXTS; 