import { useEffect, useState } from "react";
import "./App.css";

// Calphine Luxury signature colour collection.
export const products = [
    {
        id: 1,
        name: "Sovereign",
        description: "A confident, statement-making lip shade.",
        price: 28,
        category: "Lipsticks",
        tag: "Signature",
        image: "https://images.unsplash.com/photo-1696255725069-0d7c0ba07f2c?w=900&auto=format&fit=crop&q=85",
    },
    {
        id: 2,
        name: "Raw Intention",
        description: "A bold expression of colour for every occasion.",
        price: 28,
        category: "Lipsticks",
        tag: "Essential",
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=900&auto=format&fit=crop&q=85",
    },
    {
        id: 3,
        name: "Silk Sheets",
        description: "A smooth, polished finish with timeless appeal.",
        price: 28,
        category: "Lipsticks",
        tag: "Signature",
        image: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=900&auto=format&fit=crop&q=85",
    },
    {
        id: 4,
        name: "Crystal Clear",
        description: "A sheer gloss for a glass-like shine.",
        price: 24,
        category: "Lip Gloss",
        tag: "Everyday",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&auto=format&fit=crop&q=85",
    },
    {
        id: 5,
        name: "Shimmering Pink",
        description: "A luminous pink gloss with a soft shimmer.",
        price: 26,
        category: "Lip Gloss",
        tag: "Glow Edit",
        image: "https://images.pexels.com/photos/3373740/pexels-photo-3373740.jpeg?cs=srgb&dl=pexels-shiny-diamond-3373740.jpg&fm=jpg",
    },
    {
        id: 6,
        name: "Rich Nude",
        description: "A versatile nude gloss with a polished finish.",
        price: 24,
        category: "Lip Gloss",
        tag: "Signature",
        image: "https://images.unsplash.com/photo-1523634118614-82b2685ee3df?w=900&auto=format&fit=crop&q=85",
    },
    {
        id: 7,
        name: "Cool Contour",
        description: "Define and shape with a cool-toned liner.",
        price: 20,
        category: "Lip Liner",
        tag: "Definition",
        image: "https://images.unsplash.com/photo-1523634118614-82b2685ee3df?w=900&auto=format&fit=crop&q=85",
    },
    {
        id: 8,
        name: "Everyday Pinky",
        description: "A soft pink liner for effortless definition.",
        price: 20,
        category: "Lip Liner",
        tag: "Everyday",
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&auto=format&fit=crop&q=85",
    },
    {
        id: 9,
        name: "Crisp Red",
        description: "A clean, classic red lip outline.",
        price: 20,
        category: "Lip Liner",
        tag: "Classic",
        image: "https://images.unsplash.com/photo-1696255725069-0d7c0ba07f2c?w=900&auto=format&fit=crop&q=85",
    },
    {
        id: 10,
        name: "Neutral Quad",
        description: "Four versatile neutrals for everyday definition.",
        price: 38,
        category: "Eyeshadow",
        tag: "Essential",
        image: "https://images.unsplash.com/photo-1768983224486-b4dcd179b4a5?w=900&auto=format&fit=crop&q=85",
    },
    {
        id: 11,
        name: "Smoky Charcoal Evening Mix",
        description: "A deeper charcoal edit for elevated evening looks.",
        price: 42,
        category: "Eyeshadow",
        tag: "Evening Edit",
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=900&auto=format&fit=crop&q=85",
    },
    {
        id: 12,
        name: "Soft Mauve/Taupe Slate",
        description: "Muted mauve and taupe tones for a soft smoky eye.",
        price: 38,
        category: "Eyeshadow",
        tag: "Signature",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&auto=format&fit=crop&q=85",
    },
];

const CART_KEY = "calphine-luxury-cart-v3";
const currency = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
});

function readCart() {
    try {
        const saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
        if (!Array.isArray(saved)) return [];

        return saved.filter(
            (item) =>
                products.some((p) => p.id === item.id) &&
                Number.isInteger(item.qty) &&
                item.qty > 0
        ).map((item) => ({
            id: item.id,
            qty: Math.min(item.qty, 99),
        }));
    } catch {
        return [];
    }
}

export default function App() {
    const [cart, setCart] = useState(readCart);
    const [cartOpen, setCartOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("featured");
    const [category, setCategory] = useState("All");
    const [signupMessage, setSignupMessage] = useState("");
    const [checkoutMessage, setCheckoutMessage] = useState("");

    const categories = ["All", "Lipsticks", "Lip Gloss", "Lip Liner", "Eyeshadow"];

    const cartCount = cart.reduce(
        (total, item) => total + item.qty,
        0
    );

    const cartTotal = cart.reduce((total, item) => {
        const product = products.find((p) => p.id === item.id);
        return total + (product?.price || 0) * item.qty;
    }, 0);

    const filteredProducts = products
        .filter((product) => {
            const matchesCategory =
                category === "All" || product.category === category;

            const matchesSearch =
                `${product.name} ${product.description}`
                    .toLowerCase()
                    .includes(search.toLowerCase().trim());

            return matchesCategory && matchesSearch;
        })
        .sort((a, b) => {
            if (sort === "low") return a.price - b.price;
            if (sort === "high") return b.price - a.price;
            return a.id - b.id;
        });

    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        function handleEscape(event) {
            if (event.key === "Escape") {
                setCartOpen(false);
                setMenuOpen(false);
            }
        }

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, []);

    useEffect(() => {
        document.body.style.overflow = cartOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [cartOpen]);

    function addToCart(productId) {
        setCart((previousCart) => {
            const existing = previousCart.find(
                (item) => item.id === productId
            );

            if (existing) {
                return previousCart.map((item) =>
                    item.id === productId
                        ? { ...item, qty: Math.min(99, item.qty + 1) }
                        : item
                );
            }

            return [...previousCart, { id: productId, qty: 1 }];
        });

        setCartOpen(true);
    }

    function changeQuantity(productId, amount) {
        setCart((previousCart) =>
            previousCart
                .map((item) =>
                    item.id === productId
                        ? {
                            ...item,
                            qty: Math.max(0, Math.min(99, item.qty + amount)),
                        }
                        : item
                )
                .filter((item) => item.qty > 0)
        );
    }

    function removeFromCart(productId) {
        setCart((previousCart) =>
            previousCart.filter((item) => item.id !== productId)
        );
    }

    function handleNewsletter(event) {
        event.preventDefault();
        setSignupMessage(
            "Thank you for your interest! Email subscriptions will be available soon."
        );
        event.currentTarget.reset();
    }

    function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <>
            {/* ANNOUNCEMENT BAR */}
            <div className="announcement">
                ✦ WELCOME TO CALPHINE LUXURY — BEAUTY WITHOUT LIMITS ✦
            </div>

            {/* HEADER */}
            <header className="header">
                <button
                    type="button"
                    className="mobile-menu"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation"
                    aria-expanded={menuOpen}
                >
                    ☰
                </button>

                <nav className={`nav ${menuOpen ? "mobile-open" : ""}`}>
                    <a href="#shop" onClick={closeMenu}>SHOP</a>
                    <a href="#story" onClick={closeMenu}>OUR STORY</a>
                    <a href="#newsletter" onClick={closeMenu}>THE GLOW CLUB</a>
                </nav>

                {/* ORIGINAL CALPHINE LUXURY LOGO */}
                <a
                    href="#top"
                    className="brand"
                    aria-label="Calphine Luxury home"
                    onClick={closeMenu}
                >
                    <img
                        src="/calphine-logo.png"
                        alt="Calphine Luxury Official Logo"
                        className="brand-logo"
                    />
                </a>

                <button
                    type="button"
                    className="bag-button"
                    onClick={() => setCartOpen(true)}
                >
                    BAG ({cartCount})
                </button>
            </header>

            <main id="top">
                {/* HERO SECTION */}
                <section className="hero">
                    <div className="hero-content">
                        <p className="eyebrow">THE SIGNATURE COLLECTION</p>

                        <h1>
                            BEAUTY IS
                            <br />
                            YOUR <em>POWER.</em>
                        </h1>

                        <p className="hero-description">
                            Discover the beauty of confidence.
                            Luxurious colour, timeless elegance,
                            and a glow that is entirely yours.
                        </p>

                        <a href="#shop" className="gold-button">
                            DISCOVER THE COLLECTION ↗
                        </a>
                    </div>

                    <div className="hero-image">
                        <img
                            src="https://images.splitshire.com/full/image_6e53d8.jpg"
                            alt="Black woman in a luxury beauty editorial portrait"
                        />
                        <span className="hero-stamp">OWN YOUR GLOW ✦</span>
                    </div>
                </section>

                {/* BRAND STRIP */}
                <div className="brand-strip">
                    <span>CONFIDENTLY YOU</span>
                    <span>✦</span>
                    <span>EVERYDAY LUXURY</span>
                    <span>✦</span>
                    <span>MADE TO SHINE</span>
                </div>

                {/* ORIGINAL LOGO FEATURE */}
                <section className="logo-feature">
                    <p className="eyebrow">WELCOME TO THE WORLD OF</p>

                    <img
                        src="/calphine-logo.png"
                        alt="Calphine Luxury gold monogram"
                        className="featured-logo"
                    />

                    <p className="logo-tagline">
                        WHERE BEAUTY MEETS ELEGANCE
                    </p>
                </section>

                {/* PRODUCT CATALOGUE */}
                <section className="shop-section" id="shop">
                    <div className="section-heading">
                        <p className="eyebrow">YOUR BEAUTY ESSENTIALS</p>
                        <h2>THE SIGNATURE EDIT</h2>
                        <p>
                            Four signature collections. Twelve essentials. Beauty that celebrates you.
                        </p>
                    </div>

                    <div className="catalog-controls">
                        <div className="categories">
                            {categories.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    className={category === item ? "active" : ""}
                                    onClick={() => setCategory(item)}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                        <div className="search-sort">
                            <input
                                type="search"
                                placeholder="Search products..."
                                aria-label="Search products"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <select
                                aria-label="Sort products"
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                            >
                                <option value="featured">Featured</option>
                                <option value="low">Price: Low to High</option>
                                <option value="high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    <div className="product-grid">
                        {filteredProducts.map((product) => (
                            <article className="product-card" key={product.id}>
                                <div className="product-image">
                                    <span className="product-tag">{product.tag}</span>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        loading="lazy"
                                    />
                                </div>

                                <div className="product-details">
                                    <p className="product-category">
                                        {product.category}
                                    </p>

                                    <div className="product-title-row">
                                        <h3>{product.name}</h3>
                                        <span>{currency.format(product.price)}</span>
                                    </div>

                                    <p>{product.description}</p>

                                    <button
                                        type="button"
                                        className="add-button"
                                        onClick={() => addToCart(product.id)}
                                    >
                                        ADD TO BAG +
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <p className="empty-message">
                            No matching products found.
                        </p>
                    )}
                </section>

                {/* ABOUT THE BRAND */}
                <section className="story-section" id="story">
                    <div className="story-image">
                        <img
                            src="https://images.unsplash.com/photo-1699726242741-11e3ccc06610?w=1100&auto=format&fit=crop&q=85"
                            alt="Black woman in a beauty editorial applying makeup"
                            loading="lazy"
                        />
                    </div>

                    <div className="story-content">
                        <p className="eyebrow">THE CALPHINE PHILOSOPHY</p>

                        <h2>
                            A LITTLE GLAMOUR.
                            <br />
                            A LOT OF <em>CONFIDENCE.</em>
                        </h2>

                        <p>
                            Beauty isn't about becoming someone else.
                            It's about showing up as the most radiant
                            version of yourself.
                        </p>

                        <p>
                            Calphine Luxury celebrates elegance,
                            individuality, and confidence through
                            beauty that makes every moment feel special.
                        </p>

                        <div className="story-quote">
                            “YOUR BEAUTY. YOUR RULES.”
                        </div>
                    </div>
                </section>

                {/* BRAND BENEFITS */}
                <section className="benefits">
                    <div>
                        <span>✦</span>
                        <h3>LUXURY IN EVERY DETAIL</h3>
                        <p>Thoughtful beauty essentials with an elevated feel.</p>
                    </div>

                    <div>
                        <span>♡</span>
                        <h3>BEAUTY THAT FEELS LIKE YOU</h3>
                        <p>Makeup for your mood, your moment, your style.</p>
                    </div>

                    <div>
                        <span>✧</span>
                        <h3>OWN YOUR GLOW</h3>
                        <p>Confidence is always the best finishing touch.</p>
                    </div>
                </section>

                {/* NEWSLETTER */}
                <section className="newsletter" id="newsletter">
                    <p className="eyebrow">JOIN THE GLOW CLUB</p>

                    <h2>BE FIRST IN LINE.</h2>

                    <p>
                        Discover new beauty collections, exclusive
                        launches, and a little luxury in your inbox.
                    </p>

                    <form onSubmit={handleNewsletter}>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            aria-label="Email address"
                            required
                        />
                        <button type="submit">JOIN THE LIST</button>
                    </form>

                    <p className="signup-message" role="status">
                        {signupMessage}
                    </p>
                </section>
            </main>

            {/* FOOTER */}
            <footer className="footer">
                <img
                    src="/calphine-logo.png"
                    alt="Calphine Luxury Official Logo"
                    className="footer-logo-image"
                />

                <div className="footer-links">
                    <a href="#shop">SHOP</a>
                    <a href="#story">ABOUT</a>
                    <a href="#newsletter">CONTACT</a>
                </div>

                <p>
                    © {new Date().getFullYear()} CALPHINE LUXURY.
                    ALL RIGHTS RESERVED.
                </p>
                <p className="demo-note">
                    Storefront preview — sample products and pricing.
                </p>
            </footer>

            {/* CART OVERLAY */}
            {cartOpen && (
                <div
                    className="cart-overlay"
                    onClick={() => setCartOpen(false)}
                />
            )}

            {/* SHOPPING CART */}
            <aside
                className={`cart-drawer ${cartOpen ? "open" : ""}`}
                aria-label="Shopping bag"
                aria-hidden={!cartOpen}
                inert={!cartOpen}
            >
                <div className="cart-header">
                    <h2>YOUR BAG</h2>

                    <button
                        type="button"
                        aria-label="Close shopping bag"
                        onClick={() => setCartOpen(false)}
                    >
                        ×
                    </button>
                </div>

                <div className="cart-items">
                    {cart.length === 0 ? (
                        <p className="empty-message">
                            Your bag is empty. Discover something beautiful.
                        </p>
                    ) : (
                        cart.map((item) => {
                            const product = products.find(
                                (p) => p.id === item.id
                            );

                            if (!product) return null;

                            return (
                                <div className="cart-item" key={item.id}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                    />

                                    <div className="cart-product-info">
                                        <h3>{product.name}</h3>
                                        <p>{currency.format(product.price)}</p>

                                        <div className="quantity-control">
                                            <button
                                                type="button"
                                                aria-label={`Decrease ${product.name} quantity`}
                                                onClick={() =>
                                                    changeQuantity(item.id, -1)
                                                }
                                            >
                                                −
                                            </button>

                                            <span>{item.qty}</span>

                                            <button
                                                type="button"
                                                aria-label={`Increase ${product.name} quantity`}
                                                disabled={item.qty >= 99}
                                                onClick={() =>
                                                    changeQuantity(item.id, 1)
                                                }
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            type="button"
                                            className="remove-button"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="cart-footer">
                    <div className="cart-total">
                        <span>SUBTOTAL</span>
                        <strong>{currency.format(cartTotal)}</strong>
                    </div>

                    {cart.length > 0 && (
                        <button
                            type="button"
                            className="clear-button"
                            onClick={() => setCart([])}
                        >
                            CLEAR BAG
                        </button>
                    )}

                    <button
                        type="button"
                        className="checkout-button"
                        disabled={cart.length === 0}
                        onClick={() =>
                            setCheckoutMessage(
                                "Checkout is not connected yet. Shopify integration is coming next."
                            )
                        }
                    >
                        CONTINUE TO CHECKOUT ↗
                    </button>

                    <p className="checkout-message" role="status">
                        {checkoutMessage ||
                            "Checkout is currently a demo. No payments are processed."}
                    </p>
                </div>
            </aside>
        </>
    );
}