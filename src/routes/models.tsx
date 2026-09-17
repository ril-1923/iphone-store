
import { createFileRoute } from "@tanstack/react-router";
import { BatteryFull, Camera, Cpu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { products, useStore } from "@/lib/store";

import lineupImage from "@/assets/iphone-lineup.jpg";

export const Route = createFileRoute("/models")({
  head: () => ({
    meta: [
      {
        title: "Shop iPhone — Orbit",
      },
      {
        name: "description",
        content:
          "Explore every current iPhone model, finish, and price.",
      },
      {
        property: "og:title",
        content: "Shop iPhone — Orbit",
      },
      {
        property: "og:description",
        content: "Find the iPhone that fits you.",
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
        href: "/models",
      },
    ],
  }),

  component: ModelsPage,
});

function ModelsPage() {
  const { add } = useStore();

  return (
    <main className="models-page themed-page">
      {/* Page Header */}
      <section className="page-title reveal">
        <span className="kicker">Every model. One place.</span>

        <h1>
          Which iPhone is <em>your iPhone?</em>
        </h1>

        <p>
          Big, small, Pro, or simply essential. Meet the whole family.
        </p>
      </section>

      {/* Lineup Image */}
      <section className="lineup-stage reveal delay-1">
        <img
          src={lineupImage}
          width={1536}
          height={1024}
          alt="Four iPhone models in titanium, white, blue and black"
        />

        <span>Swipe the spectrum.</span>
      </section>

      {/* Product Catalog */}
      <section className="catalog-grid">
        {products.slice(0, 4).map((product, index) => (
          <article
            className="catalog-item"
            key={product.id}
          >
            {/* Product Number */}
            <div className={`catalog-number n-${index}`}>
              0{index + 1}
            </div>

            {/* Product Detail */}
            <span className="eyebrow">
              {product.detail}
            </span>

            <h2>{product.name}</h2>

            {/* Specifications */}
            <div className="mini-specs">
              <span>
                <Cpu />

                A18
                {index === 0 || index === 3 ? " Pro" : ""}
              </span>

              <span>
                <Camera />

                {index === 2 ? "48MP" : "Pro camera"}
              </span>

              <span>
                <BatteryFull />

                All day
              </span>
            </div>

            {/* Price & Add Button */}
            <div className="catalog-buy">
              <strong>
                From ${product.price.toLocaleString()}
              </strong>

              <Button
                variant="store"
                onClick={() => add(product)}
              >
                Add to bag
              </Button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}


