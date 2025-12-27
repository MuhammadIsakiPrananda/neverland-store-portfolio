const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');

const Game = sequelize.define('Game', {
  // Primary Key
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },

  // Basic Information
  title: { 
    type: DataTypes.STRING, 
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  slug: { 
    type: DataTypes.STRING, 
    unique: true,
    allowNull: true
  },
  description: { 
    type: DataTypes.TEXT,
    allowNull: true
  },
  metaDescription: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  metaKeywords: {
    type: DataTypes.JSON, // Array of keywords
    defaultValue: []
  },

  // Pricing & Discounts
  price: { 
    type: DataTypes.FLOAT, 
    allowNull: false,
    validate: {
      min: 0
    }
  },
  originalPrice: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  discount: {
    type: DataTypes.INTEGER, // Percentage (0-100)
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100
    }
  },

  // Media Assets
  coverImage: { 
    type: DataTypes.STRING,
    allowNull: true
  },
  thumbnailImage: {
    type: DataTypes.STRING,
    allowNull: true
  },
  images: {
    type: DataTypes.JSON, // Array of image URLs
    defaultValue: []
  },
  videoTrailer: {
    type: DataTypes.STRING,
    allowNull: true
  },

  // Category & Tags
  category: { 
    type: DataTypes.ENUM(
      'Action',
      'RPG',
      'Strategy',
      'Adventure',
      'Sports',
      'Racing',
      'Simulation',
      'Puzzle',
      'Horror',
      'Fighting',
      'MMO',
      'Indie',
      'Casual',
      'Platformer',
      'Shooter'
    ),
    allowNull: false,
    defaultValue: 'Action'
  },
  tags: {
    type: DataTypes.JSON, // Array: ["Open World", "Multiplayer", "Story Rich", etc]
    defaultValue: []
  },

  // Platforms
  platforms: {
    type: DataTypes.JSON, // Array of platforms
    defaultValue: [],
    comment: 'PC, Xbox Series X|S, Xbox One, PlayStation 5, PlayStation 4, Nintendo Switch, iOS, Android'
  },

  // Rating & Reviews
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5
    }
  },
  reviewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  ageRating: {
    type: DataTypes.ENUM(
      'E',      // Everyone
      'E10+',   // Everyone 10+
      'T',      // Teen
      'M',      // Mature 17+
      'AO',     // Adults Only 18+
      'RP',     // Rating Pending
      'PEGI 3',
      'PEGI 7',
      'PEGI 12',
      'PEGI 16',
      'PEGI 18'
    ),
    allowNull: true
  },

  // Publisher & Developer
  developer: {
    type: DataTypes.STRING,
    allowNull: true
  },
  publisher: {
    type: DataTypes.STRING,
    allowNull: true
  },
  releaseDate: {
    type: DataTypes.DATE,
    allowNull: true
  },

  // Stock & Availability
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  soldCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },

  // Featured & New
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isNew: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  // Technical Information
  downloadSize: {
    type: DataTypes.FLOAT, // in GB
    allowNull: true,
    validate: {
      min: 0
    }
  },
  languages: {
    type: DataTypes.JSON, // Array of supported languages
    defaultValue: [],
    comment: 'English, Indonesian, Japanese, Korean, Chinese, Spanish, French, German, Russian, Portuguese'
  },
  systemRequirements: {
    type: DataTypes.JSON,
    defaultValue: {},
    comment: 'Object with minimum and recommended specs: {minimum: {os, processor, memory, graphics, storage}, recommended: {...}}'
  },

  // Multiplayer Information
  isSinglePlayer: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  isMultiplayer: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  maxPlayers: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1
    }
  }

}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  indexes: [
    {
      fields: ['slug']
    },
    {
      fields: ['category']
    },
    {
      fields: ['rating']
    },
    {
      fields: ['price']
    },
    {
      fields: ['isFeatured']
    },
    {
      fields: ['isNew']
    }
  ]
});

module.exports = Game;
