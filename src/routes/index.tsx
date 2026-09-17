
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Camera, Cpu, ScanFace } from "lucide-react";

import { Button } from "@/components/ui/button";
import { products, useStore } from "@/lib/store";

import heroImage from "@/assets/iphone-hero.jpg";
import lineupImage from "@/assets/iphone-lineup.jpg";

// Home route
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Orbit iPhone Store — iPhone 16 Pro",
      },
      {
        name: "description",
        content:
          "Shop and compare the latest iPhone models and accessories at Orbit.",
      },
      {
        property: "og:title",
        content: "Orbit iPhone Store",
      },
      {
        property: "og:description",
        content: "A vivid new way to shop the latest iPhone.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "/",
      },
    ],
  }),

  component: Index,
});

function Index() {
  const { add } = useStore();

  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-copy reveal">
          <span className="kicker">New · Titanium goes lighter</span>

          <h1>
            iPhone <span>16 Pro</span>
          </h1>

          <p>
            Built for Apple Intelligence. A18 Pro power. Camera Control. And a
            huge leap in battery life.
          </p>

          <div className="hero-buttons">
            <Button
              variant="store"
              size="lg"
              onClick={() => add(products[0])}
            >
              Add to bag — $999
            </Button>

            <Button
              variant="storeOutline"
              size="lg"
              asChild
            >
              <Link to="/compare">Compare models</Link>
            </Button>
          </div>

          <div className="spec-pills">
            <span>A18 Pro</span>
            <span>48MP Fusion</span>
            <span>Grade 5 titanium</span>
          </div>
        </div>

        <div className="hero-visual reveal delay-1">
          <div className="shape sun" />
          <div className="shape mint" />

          <img
            src={heroImage}
            width={1024}
            height={1280}
            alt="Titanium iPhone 16 Pro shown from the front and back"
          />

          <div className="price-tag">
            <small>From</small>
            <strong>$999</strong>
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="model-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">The family</span>
            <h2>Pick your iPhone.</h2>
          </div>

          <Link to="/models">
            All models <ArrowRight />
          </Link>
        </div>

        <div className="model-grid">
          {products.slice(0, 4).map((product, index) => (
            <article
              className={`model-card model-${index + 1}`}
              key={product.id}
            >
              <span className="eyebrow">
                {[
                  "Pro power",
                  "Everyone's favorite",
                  "Essential",
                  "The ultimate",
                ][index]}
              </span>

              <div className="phone-crop">
                <img
                  src={lineupImage}
                  width={1536}
                  height={1024}
                  loading="lazy"
                  alt="iPhone color lineup"
                />
              </div>

              <h3>{product.name}</h3>

              <p>{product.detail}</p>

              <div className="card-buy">
                <strong>${product.price.toLocaleString()}</strong>

                <Button
                  variant={index === 1 ? "store" : "secondary"}
                  onClick={() => add(product)}
                >
                  Add
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="feature-band">
        <div className="feature-intro">
          <span className="eyebrow">Why iPhone</span>

          <h2>
            Serious technology.
            <br />
            <em>Delightfully simple.</em>
          </h2>
        </div>

        <div className="feature-list">
          <article>
            <Cpu />

            <div>
              <h3>A18 Pro</h3>
              <p>
                Powerful enough for console-level games and Apple Intelligence.
              </p>
            </div>
          </article>

          <article>
            <Camera />

            <div>
              <h3>Pro camera system</h3>
              <p>
                Capture 48MP detail and cinematic 4K Dolby Vision.
              </p>
            </div>
          </article>

          <article>
            <ScanFace />

            <div>
              <h3>Designed to last</h3>
              <p>
                Titanium strength, Ceramic Shield, and years of iOS updates.
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}


