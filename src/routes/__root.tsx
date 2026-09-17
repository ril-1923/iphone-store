import { Outlet, createRootRoute } from "@tanstack/react-router";
import type React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { reportLovableError } from "../lib/lovable-error-reporting";
import {
  StoreFooter,
  StoreHeader,
  StoreProvider,
} from "../lib/store";

const queryClient = new QueryClient();

function NotFoundComponent() {
  return (
    <main className="not-found-page themed-page">
      <section className="page-title reveal">
        <span className="kicker">404</span>

        <h1>
          Page <em>not found.</em>
        </h1>

        <p>
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <a href="/" className="store-button">
          Back to home
        </a>
      </section>
    </main>
  );
}

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <div className="site-shell">
          <StoreHeader />

          {children}

          <StoreFooter />
        </div>
      </StoreProvider>
    </QueryClientProvider>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Orbit — iPhone Store",
      },
      {
        name: "description",
        content:
          "Discover iPhone models, accessories, trade-in options, and more at Orbit.",
      },
      {
        name: "author",
        content: "Orbit",
      },
      {
        property: "og:title",
        content: "Orbit — iPhone Store",
      },
      {
        property: "og:description",
        content:
          "Discover iPhone models, accessories, trade-in options, and more at Orbit.",
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
        rel: "icon",
        href: "/favicon.ico",
        type: "image/x-icon",
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Anton&family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),

  notFoundComponent: NotFoundComponent,

  shellComponent: RootShell,

  errorComponent: ({ error }) => {
    reportLovableError(error);

    return (
      <main className="error-page themed-page">
        <section className="page-title">
          <span className="kicker">Something went wrong</span>

          <h1>
            An <em>unexpected error.</em>
          </h1>

          <p>Please refresh the page and try again.</p>

          <a href="/" className="store-button">
            Back to home
          </a>
        </section>
      </main>
    );
  },

  component: RootComponent,
});

function RootComponent() {
  return <Outlet />;
}