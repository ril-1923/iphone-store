import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X, Minus, Plus, Trash2 } from "lucide-react";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

export type Product = { id: string; name: string; detail: string; price: number };
export type CartItem = Product & { quantity: number };

export const products: Product[] = [
  { id: "iphone-16-pro", name: "iPhone 16 Pro", detail: "256GB · Natural Titanium", price: 999 },
  { id: "iphone-16", name: "iPhone 16", detail: "128GB · Ultramarine", price: 799 },
  { id: "iphone-16e", name: "iPhone 16e", detail: "128GB · White", price: 599 },
  { id: "iphone-16-pro-max", name: "iPhone 16 Pro Max", detail: "512GB · Black Titanium", price: 1399 },
  { id: "airpods-pro", name: "AirPods Pro", detail: "Active Noise Cancellation", price: 249 },
  { id: "silicone-case", name: "MagSafe Case", detail: "Star Fruit Silicone", price: 49 },
  { id: "magsafe", name: "MagSafe Charger", detail: "2m USB-C cable", price: 39 },
];

type StoreContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (product: Product) => void;
  adjust: (id: string, delta: number) => void;
  remove: (id: string) => void;
};

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("useStore must be used inside StoreProvider");
  return value;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const saved = window.localStorage.getItem("orbit-cart");
    if (saved) setItems(JSON.parse(saved) as CartItem[]);
  }, []);
  useEffect(() => window.localStorage.setItem("orbit-cart", JSON.stringify(items)), [items]);
  const value = useMemo<StoreContextValue>(() => ({
    items,
    open,
    setOpen,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    total: items.reduce((sum, item) => sum + item.quantity * item.price, 0),
    add: (product) => {
      setItems((current) => current.some((item) => item.id === product.id)
        ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { ...product, quantity: 1 }]);
      setOpen(true);
    },
    adjust: (id, delta) => setItems((current) => current
      .map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item)
      .filter((item) => item.quantity > 0)),
    remove: (id) => setItems((current) => current.filter((item) => item.id !== id)),
  }), [items, open]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

const links = [["/models", "iPhone"], ["/accessories", "Accessories"], ["/trade-in", "Trade In"], ["/compare", "Compare"]] as const;

export function StoreHeader() {
  const { count, setOpen } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  return <>
    <header className="store-nav">
      <div className="store-nav-inner">
        <Link to="/" className="store-wordmark" aria-label="Orbit home">ORBIT<span>.</span></Link>
        <nav className="store-links" aria-label="Main navigation">
          {links.map(([to, label]) => <Link key={to} to={to} activeProps={{ className: "active" }}>{label}</Link>)}
        </nav>
        <div className="store-actions">
          <Button variant="ghost" size="icon" aria-label="Search"><Search /></Button>
          <Button variant="storeAccent" size="default" onClick={() => setOpen(true)} aria-label={`Open bag with ${count} items`}>
            <ShoppingBag /> Bag <span className="bag-count">{count}</span>
          </Button>
          <Button variant="ghost" size="icon" className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu"><Menu /></Button>
        </div>
      </div>
      {mobileOpen && <nav className="mobile-links" aria-label="Mobile navigation">
        {links.map(([to, label]) => <Link key={to} to={to} onClick={() => setMobileOpen(false)}>{label}</Link>)}
      </nav>}
    </header>
    <CartDrawer />
  </>;
}

export function StoreFooter() {
  return <footer className="store-footer"><div className="store-footer-inner">
    <div><Link to="/" className="store-wordmark footer-mark">ORBIT<span>.</span></Link><p>Independent concept store for iPhone.</p></div>
    <div className="footer-links">{links.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}</div>
    <p className="legal">Apple and iPhone are trademarks of Apple Inc. This is a concept storefront.</p>
  </div></footer>;
}

function CartDrawer() {
  const { items, total, open, setOpen, adjust, remove } = useStore();
  return <div className={`cart-shell ${open ? "is-open" : ""}`} aria-hidden={!open}>
    <button className="cart-backdrop" aria-label="Close bag" onClick={() => setOpen(false)} />
    <aside className="cart-drawer" aria-label="Shopping bag">
      <div className="cart-head"><div><span className="eyebrow">Your selection</span><h2>Bag <em>{items.length}</em></h2></div><Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close bag"><X /></Button></div>
      <div className="cart-list">
        {items.length === 0 ? <div className="empty-bag"><ShoppingBag /><h3>Your bag is light.</h3><p>Choose an iPhone or accessory to get started.</p><Button variant="store" onClick={() => setOpen(false)}>Keep browsing</Button></div> : items.map((item) => <article className="cart-item" key={item.id}>
          <div className="cart-thumb">{item.name.slice(0, 1)}</div>
          <div><h3>{item.name}</h3><p>{item.detail}</p><div className="quantity"><Button variant="ghost" size="icon" onClick={() => adjust(item.id, -1)} aria-label={`Decrease ${item.name}`}><Minus /></Button><span>{item.quantity}</span><Button variant="ghost" size="icon" onClick={() => adjust(item.id, 1)} aria-label={`Increase ${item.name}`}><Plus /></Button></div></div>
          <div className="cart-price"><strong>${(item.price * item.quantity).toLocaleString()}</strong><Button variant="ghost" size="icon" onClick={() => remove(item.id)} aria-label={`Remove ${item.name}`}><Trash2 /></Button></div>
        </article>)}
      </div>
      {items.length > 0 && <div className="cart-summary"><div><span>Subtotal</span><strong>${total.toLocaleString()}</strong></div><p>Free delivery. Taxes calculated at checkout.</p><Button variant="storeAccent" size="lg" className="w-full">Check out</Button></div>}
    </aside>
  </div>;
}