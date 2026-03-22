const products = [
    {
        id: "serum-glow",
        name: "Radiant Dew Serum",
        category: "skincare",
        badge: "Best seller",
        price: 42,
        originalPrice: 52,
        rating: 4.9,
        image: "/images/tranding1.jpg",
        description: "A cushiony niacinamide serum that brightens dullness and leaves a glassy finish without feeling sticky."
    },
    {
        id: "velvet-tint",
        name: "Velvet Cloud Tint",
        category: "makeup",
        badge: "New",
        price: 28,
        originalPrice: 34,
        rating: 4.8,
        image: "/images/trending2.jpg",
        description: "Soft-focus lip and cheek tint with a blurred matte texture that layers beautifully for everyday glam."
    },
    {
        id: "repair-mask",
        name: "Midnight Repair Mask",
        category: "skincare",
        badge: "Editor pick",
        price: 36,
        originalPrice: 44,
        rating: 4.7,
        image: "/images/trending3.jpg",
        description: "An overnight treatment packed with ceramides and peptides to calm stressed skin by morning."
    },
    {
        id: "shine-oil",
        name: "Silk Finish Hair Oil",
        category: "haircare",
        badge: "Hot",
        price: 24,
        originalPrice: 30,
        rating: 4.8,
        image: "/images/trending4.jpg",
        description: "Lightweight smoothing oil that adds shine, controls frizz, and protects lengths from heat styling."
    },
    {
        id: "spf-mist",
        name: "Glow Guard SPF Mist",
        category: "skincare",
        badge: "Travel favorite",
        price: 31,
        originalPrice: 38,
        rating: 4.6,
        image: "/images/hero.jpg",
        description: "Refresh sunscreen on the go with an invisible mist that sits well over skincare and makeup."
    },
    {
        id: "brow-lift",
        name: "Feather Brow Sculpt",
        category: "makeup",
        badge: "Trending",
        price: 19,
        originalPrice: 24,
        rating: 4.5,
        image: "/images/first.jpg",
        description: "Flexible brow wax that lifts, shapes, and holds without flakes or a crunchy finish."
    }
];

const categories = ["skincare", "makeup", "haircare"];

module.exports = {
    categories,
    products
};
