import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, useStore } from "@/lib/store";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      {
        title: "Compare iPhone Models — Orbit",
      },
      {
        name: "description",
        content:
          "Compare iPhone display, chip, camera, battery, and pricing.",
      },
      {
        property: "og:title",
        content: "Compare iPhone Models — Orbit",
      },
      {
        property: "og:description",
        content: "Put every iPhone feature side by side.",
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
        href: "/compare",
      },
    ],
  }),

  component: ComparePage,
});

function ComparePage() {
  const { add } = useStore();

  // Display the first four products for comparison
  const list = products.slice(0, 4);

  const comparisonRows = [
    ["Display", "6.3″ ProMotion", "6.1″ OLED", "6.1″ OLED", "6.9″ ProMotion"],
    ["Chip", "A18 Pro", "A18", "A18", "A18 Pro"],
    ["Camera", "Pro 48MP", "Dual 48MP", "Fusion 48MP", "Pro 48MP"],
    ["Battery", "Up to 27 hrs", "Up to 22 hrs", "Up to 26 hrs", "Up to 33 hrs"],
  ];

  return (
    <main className="compare-page themed-page">
      {/* Page Header */}
      <section className="page-title reveal">
        <span className="kicker">Side by side</span>

        <h1>
          The <em>big comparison.</em>
        </h1>

        <p>Four great iPhones. One clear view.</p>
      </section>

      {/* Comparison Table */}
      <section className="compare-wrap">
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Feature</th>

                {list.map((product) => (
                  <th key={product.id}>
                    <span>{product.name}</span>

                    <small>
                      From ${product.price.toLocaleString()}
                    </small>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {comparisonRows.map(([feature, ...values]) => (
                <tr key={feature}>
                  <th>{feature}</th>

                  {values.map((value, index) => (
                    <td key={`${feature}-${index}`}>
                      <Check size={18} strokeWidth={2.5} />
                      <span>{value}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td></td>

                {list.map((product) => (
                  <td key={product.id}>
                    <Button
                      variant="storeAccent"
                      onClick={() => add(product)}
                    >
                      Choose
                    </Button>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </main>
  );
}