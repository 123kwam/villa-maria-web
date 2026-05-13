export type SingleItem = {
  name: string;
  spanish?: string;
  description?: string;
  price: string;
};

export type WeightedItem = {
  name: string;
  spanish?: string;
  weights: Array<{ weight: string; price: string }>;
};

export type MenuItem = SingleItem | WeightedItem;

export type MenuSection = {
  key: string;
  weightHeaders?: string[];
  items: MenuItem[];
};

export const isWeighted = (item: MenuItem): item is WeightedItem =>
  "weights" in item;

export const menu: MenuSection[] = [
  {
    key: "soups",
    items: [
      { name: "Onion Soup", price: "€8.20" },
      { name: "Tomato Cream Soup", price: "€8.20" },
      { name: "Argentinian Goulash Soup", price: "€9.20" },
      { name: "Fish Soup", price: "€9.60" },
    ],
  },
  {
    key: "coldStarters",
    items: [
      {
        name: "Carpaccio",
        description: "tenderloin, olive oil, parmesan, capers, pine nuts",
        price: "€13.90",
      },
      { name: "Cured Ham with Melon", price: "€12.00" },
      { name: "Shrimp Cocktail with Sauce", price: "€12.50" },
    ],
  },
  {
    key: "salads",
    items: [
      { name: "Mixed Salad", price: "€8.50" },
      { name: "Tomato Salad", price: "€8.50" },
      { name: "Salad with Grilled Chicken", price: "€11.90" },
      { name: "Salad with Feta Cheese", price: "€11.90" },
      {
        name: "Caesar Salad",
        description: "croutons & parmesan",
        price: "€13.00",
      },
      {
        name: "Villa Maria Salad",
        description: "tuna, salmon, chicken, cheese",
        price: "€14.90",
      },
    ],
  },
  {
    key: "warmStarters",
    items: [
      { name: "Grilled Shrimps with Garlic", price: "€13.00" },
      { name: "Spiced Chicken Wings", price: "€8.50" },
      { name: "Grilled Sausages", price: "€9.90" },
      { name: "Vegetarian Patties", price: "€9.90" },
      { name: "Argentinian Meat Patties", price: "€10.00" },
      { name: "Nachos with Cheese Gratin", price: "€10.00" },
      { name: "Fried Mushrooms with Garlic", price: "€10.60" },
      {
        name: "Argentine Tapas",
        description: "variation of small bites",
        price: "€19.90",
      },
    ],
  },
  {
    key: "sides",
    items: [
      { name: "Garlic Bread with Olives", price: "€3.90" },
      { name: "Fries", price: "€3.90" },
      { name: "Jacket Potato with Sour Cream", price: "€4.50" },
      { name: "Rice with Spices & Vegetables", price: "€3.90" },
      { name: "Grilled Tomato", price: "€4.10" },
      { name: "Mushroom Skewer", price: "€4.10" },
      { name: "Grilled Corn on the Cob", price: "€4.60" },
      { name: "Deep Fried Onion Rings", price: "€5.30" },
      { name: "Mashed Potatoes", price: "€4.60" },
      {
        name: "Veggie Skewer",
        description: "corn, pepper, onion, mushroom, zucchini, eggplant",
        price: "€5.90",
      },
      { name: "Sweet Potato Fries", price: "€4.60" },
    ],
  },
  {
    key: "sauces",
    items: [
      { name: "Tomato", price: "€2.50" },
      { name: "Pepper", price: "€2.50" },
      { name: "Garlic", price: "€2.50" },
      { name: "Mushroom", price: "€2.50" },
      { name: "Argentinian", price: "€2.50" },
      { name: "Spicy", price: "€2.50" },
      { name: "Barbecue", price: "€2.50" },
    ],
  },
  {
    key: "grilledMeat",
    weightHeaders: ["200g", "300g", "400g", "500g"],
    items: [
      {
        name: "Rumpsteak",
        spanish: "Bife de cuadril",
        weights: [
          { weight: "200g", price: "€17.00" },
          { weight: "300g", price: "€22.50" },
          { weight: "400g", price: "€27.50" },
          { weight: "500g", price: "€32.50" },
        ],
      },
      {
        name: "Sirloin",
        spanish: "Bife de chorizo",
        weights: [
          { weight: "200g", price: "€20.50" },
          { weight: "300g", price: "€29.50" },
          { weight: "400g", price: "€35.50" },
          { weight: "500g", price: "€42.50" },
        ],
      },
      {
        name: "Rib Eye",
        spanish: "Bife ancho",
        weights: [
          { weight: "200g", price: "€24.50" },
          { weight: "300g", price: "€31.90" },
          { weight: "400g", price: "€38.90" },
          { weight: "500g", price: "€44.00" },
        ],
      },
      {
        name: "Tenderloin",
        spanish: "Bife de lomo",
        weights: [
          { weight: "200g", price: "€30.20" },
          { weight: "300g", price: "€40.40" },
          { weight: "400g", price: "€48.90" },
          { weight: "500g", price: "€55.90" },
        ],
      },
      { name: "T-Bone Steak", description: "500g", price: "€43.50" },
      {
        name: "Spare Ribs Villa Maria",
        description: "BBQ, spicy",
        price: "€23.00",
      },
    ],
  },
  {
    key: "vegetarian",
    items: [
      { name: "Vegetable Quiche", price: "€20.20" },
      {
        name: "Vegetarian Plate",
        description: "salad, skewer, vegetables, jacket potato",
        price: "€24.60",
      },
      { name: "Vegan Burger", price: "€13.50" },
    ],
  },
  {
    key: "completeDishes",
    items: [
      { name: "Chicken Filet Piri-Piri", price: "€22.60" },
      { name: "Grilled Chicken Filet", price: "€20.60" },
      { name: "Chicken & Veggie Skewer", price: "€22.80" },
      { name: "Chicken Filet with Spare Rib", price: "€23.50" },
      { name: "French Rack Lamb Chops", price: "€27.90" },
      { name: "Pork Filet", price: "€21.60" },
      { name: "Argentinian Beef Skewer", price: "€29.90" },
      {
        name: "Tres Carnes",
        description: "rumpsteak, sirloin, tenderloin",
        price: "€36.20",
      },
      {
        name: "Surf & Turf",
        description: "tenderloin + shrimps",
        price: "€39.90",
      },
      { name: "Mixed Grill for Two", price: "€66.80" },
      { name: "Gran Parillada Villa Maria for Two", price: "€84.80" },
      {
        name: "Rumpsteak with Fried Eggs",
        description: "250g",
        price: "€32.90",
      },
      {
        name: "Sirloin with Pepper or Mushroom Sauce",
        description: "200g",
        price: "€31.90",
      },
      {
        name: "Tenderloin with Pepper or Mushroom Sauce",
        description: "200g",
        price: "€39.90",
      },
      {
        name: "Rib Eye with Pepper or Mushroom Sauce",
        description: "200g",
        price: "€35.90",
      },
      {
        name: "Villa Maria Combo",
        description: "150g tenderloin + 150g sirloin, grilled tomato & pepper",
        price: "€41.90",
      },
      {
        name: "Beef Fajitas",
        description: "with tortillas, cheese, guacamole, sour cream",
        price: "€29.90",
      },
      { name: "Chicken Fajitas", price: "€26.20" },
    ],
  },
  {
    key: "fish",
    items: [
      { name: "Grilled Salmon Filet", price: "€26.90" },
      { name: "Grilled Tuna", price: "€26.90" },
      { name: "Big Shrimps with Garlic", price: "€33.90" },
      { name: "Fried Squid Rings", price: "€25.50" },
      { name: "Grilled Dorade Royale", price: "€29.90" },
    ],
  },
];
