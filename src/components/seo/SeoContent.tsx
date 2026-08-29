/**
 * SeoContent.tsx
 *
 * Server-rendered SEO block for the Hyderabad Startup Map homepage.
 * This component is intentionally visually hidden (screen-reader accessible
 * and search-engine crawlable) so it does NOT interfere with the interactive
 * map UI. It injects a crawlable H1, descriptive ecosystem content, and
 * internal anchor links into the server-rendered HTML.
 *
 * DO NOT add 'use client' — this must remain a Server Component so content
 * appears in the initial HTML response, not after JavaScript hydration.
 */
export default function SeoContent() {
  return (
    <div
      aria-hidden="false"
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0,0,0,0)',
        whiteSpace: 'nowrap',
        border: 0,
      }}
    >
      {/* Primary H1 — required for homepage SEO */}
      <h1>Hyderabad Startups Map</h1>

      {/* Requirement 4: Homepage Introduction */}
      <p>
        Explore Hyderabad startups on an interactive map. Discover startups, founders, funding, sectors and locations across Hyderabad&apos;s growing startup ecosystem.
      </p>

      {/* Location hubs section */}
      <section>
        <h2>Hyderabad Startup Hubs</h2>
        <p>
          Discover <a href="/"><strong>Hyderabad Startups</strong></a> located across primary technology corridors and hubs:
        </p>
        <ul>
          <li>
            <a href="/?area=HITEC+City">
              <strong>HITEC City</strong>
            </a>{' '}
            — Hyderabad&apos;s primary IT hub, home to marquee tech parks including
            Cyber Towers and Mindspace, housing hundreds of tech companies.
          </li>
          <li>
            <a href="/?area=Gachibowli">
              <strong>Gachibowli</strong>
            </a>{' '}
            — A fast-growing financial and technology district adjacent to HITEC City.
          </li>
          <li>
            <a href="/?area=Madhapur">
              <strong>Madhapur</strong>
            </a>{' '}
            — The heart of Hyderabad&apos;s startup belt, known for co-working spaces and accelerators.
          </li>
          <li>
            <a href="/?area=Financial+District">
              <strong>Financial District</strong>
            </a>{' '}
            — Emerging as a premium business district with multinational offices and growth-stage companies.
          </li>
        </ul>
      </section>

      {/* Ecosystem entities section */}
      <section>
        <h2><a href="/?view=ecosystem">Hyderabad Startup Ecosystem</a></h2>
        <p>
          Hyderabad hosts one of India&apos;s most mature startup ecosystems, supported by top <a href="/?view=ecosystem"><strong>Incubators</strong></a>, accelerators, and <a href="/?view=ecosystem"><strong>Investors</strong></a>.
        </p>
        <ul>
          <li>
            <strong>T-Hub</strong> — India&apos;s largest startup incubator based in Hyderabad.
          </li>
          <li>
            <strong>TASK (Telangana Academy for Skill and Knowledge)</strong> — Supporting tech talent in Telangana.
          </li>
          <li>
            <strong>RICH (Research and Innovation Circle of Hyderabad)</strong> — Facilitating deep-tech innovation.
          </li>
        </ul>
      </section>

      {/* Sector section */}
      <section>
        <h2><a href="/#sectors">Startup Sectors</a></h2>
        <p>
          Explore companies across key technology sectors in Hyderabad:
        </p>
        <ul>
          <li>
            <a href="/?industry=AI+%2F+ML">
              <strong>AI &amp; Machine Learning</strong>
            </a>
          </li>
          <li>
            <a href="/?industry=SaaS">
              <strong>SaaS</strong>
            </a>
          </li>
          <li>
            <a href="/?industry=Fintech">
              <strong>FinTech</strong>
            </a>
          </li>
          <li>
            <a href="/?industry=Healthtech">
              <strong>HealthTech</strong>
            </a>
          </li>
          <li>
            <a href="/?industry=Edtech">
              <strong>EdTech</strong>
            </a>
          </li>
        </ul>
      </section>

      {/* Funding section */}
      <section>
        <h2><a href="/#funding">Startup Funding</a></h2>
        <p>
          Discover startups, <a href="/#founders"><strong>Startup Founders</strong></a>, and venture investments across stages:
        </p>
        <ul>
          <li>
            <a href="/?fundingStage=Pre-Seed">Pre-Seed startups in Hyderabad</a>
          </li>
          <li>
            <a href="/?fundingStage=Seed">Seed-funded startups in Hyderabad</a>
          </li>
          <li>
            <a href="/?fundingStage=Series+A">Series A startups in Hyderabad</a>
          </li>
          <li>
            <a href="/?fundingStage=Series+B">Series B startups in Hyderabad</a>
          </li>
          <li>
            <a href="/?fundingStage=Bootstrapped">Bootstrapped startups in Hyderabad</a>
          </li>
        </ul>
      </section>

      {/* About section */}
      <section>
        <h2>About Hyderabad Startup Map</h2>
        <p>
          Hyderabad Startup Map is a free, community-driven resource for founders, investors, job seekers, and ecosystem stakeholders.
        </p>
      </section>
    </div>
  );
}
