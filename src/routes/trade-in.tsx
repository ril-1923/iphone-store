import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/trade-in")({
  head: () => ({
    meta: [
      {
        title: "Trade In Your iPhone — Orbit",
      },
      {
        name: "description",
        content:
          "Estimate your iPhone trade-in value in a few quick steps.",
      },
      {
        property: "og:title",
        content: "Trade In — Orbit",
      },
      {
        property: "og:description",
        content:
          "Turn your current iPhone into credit for a new one.",
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
        href: "/trade-in",
      },
    ],
  }),

  component: TradeInPage,
});

function TradeInPage() {
  return (
    <main className="trade-page themed-page">
      {/* Hero Section */}
      <section className="trade-hero reveal">
        <Recycle className="trade-icon" size={48} aria-hidden="true" />

        <span className="kicker">Orbit Trade In</span>

        <h1>
          Old phone.
          <br />
          <em>New possibilities.</em>
        </h1>

        <p>
          Get up to $650 credit toward a new iPhone. Good for your
          wallet, better for the planet.
        </p>

        <Button variant="storeAccent" size="lg">
          Get your estimate
          <ArrowRight size={20} />
        </Button>
      </section>

      {/* Trade-In Steps */}
      <section className="trade-steps">
        <article>
          <b>01</b>

          <h2>Tell us your model</h2>

          <p>
            Answer a few questions about your current iPhone.
          </p>
        </article>

        <article>
          <b>02</b>

          <h2>See your value</h2>

          <p>
            Get an instant estimate with no surprises.
          </p>
        </article>

        <article>
          <b>03</b>

          <h2>Send it free</h2>

          <p>
            Use our prepaid kit or bring it into a store.
          </p>
        </article>
      </section>
    </main>
  );
}