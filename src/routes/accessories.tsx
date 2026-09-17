import { createFileRoute } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { products, useStore } from "@/lib/store"
import accessoriesImage from "@/assets/accessories.jpg"

export const Route = createFileRoute("/accessories")({
  head: () => ({
    meta: [
      {
        title: "iPhone Accessories — Orbit",
      },
      {
        name: "description",
        content:
          "Colorful cases, AirPods, MagSafe chargers, and more.",
      },
      {
        property: "og:title",
        content: "iPhone Accessories — Orbit",
      },
      {
        property: "og:description",
        content: "The finishing touches for your iPhone.",
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
        href: "/accessories",
      },
    ],
  }),

  component: AccessoriesPage,
})

function AccessoriesPage() {
  const { add } = useStore()

  // Products after the first 4 are treated as accessories
  const accessories = products.slice(4)

  return (
    <main className="accessories-page themed-page">
      {/* Hero Section */}
      <section className="accessory-hero">
        <div className="reveal">
          <span className="kicker">Made to click</span>

          <h1>
            Color outside
            <br />
            <em>the phone.</em>
          </h1>

          <p>
            Cases, sound, and power designed to snap beautifully
            into your everyday.
          </p>
        </div>

        <img
          className="reveal delay-1"
          src={accessoriesImage}
          width={1024}
          height={1024}
          alt="Coral iPhone case, earbuds, charging cable and battery pack"
        />
      </section>

      {/* Accessories Grid */}
      <section className="accessory-grid">
        {accessories.map((p, i) => (
          <article
            key={p.id}
            className={`accessory-card accessory-${i}`}
          >
            <span className="eyebrow">
              0{i + 1} · Essential
            </span>

            <h2>{p.name}</h2>

            <p>{p.detail}</p>

            <div className="accessory-card-footer">
              <strong>${p.price}</strong>

              <Button
                variant={i === 1 ? "storeAccent" : "store"}
                onClick={() => add(p)}
              >
                Add
              </Button>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}