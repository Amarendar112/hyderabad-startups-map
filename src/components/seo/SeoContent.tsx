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
      <h1>Hyderabad Startup Map</h1>

      {/* Ecosystem overview paragraph */}
      <p>
        Hyderabad Startup Map is an interactive directory of 650+ verified startups,
        founders, investors, and incubators across Hyderabad&apos;s thriving tech
        ecosystem. Explore startups by location, sector, funding stage, and more —
        all plotted on a live map.
      </p>

      {/* Location hubs section */}
      <section>
        <h2>Hyderabad Startup Hubs</h2>
        <p>
          Hyderabad&apos;s startup activity is concentrated across several key tech corridors:
        </p>
        <ul>
          <li>
            <a href="/?area=HITEC+City">
              <strong>HITEC City</strong>
            </a>{' '}
            — Hyderabad&apos;s primary IT hub, home to marquee tech parks including
            Cyber Towers and Mindspace, housing hundreds of product and SaaS startups.
          </li>
          <li>
            <a href="/?area=Gachibowli">
              <strong>Gachibowli</strong>
            </a>{' '}
            — A fast-growing financial and technology district adjacent to HITEC City,
            with strong presence of fintech, enterprise software, and deep-tech companies.
          </li>
          <li>
            <a href="/?area=Madhapur">
              <strong>Madhapur</strong>
            </a>{' '}
            — The heart of Hyderabad&apos;s startup belt, known for co-working spaces,
            accelerators, and a dense network of early-stage startups.
          </li>
          <li>
            <a href="/?area=Financial+District">
              <strong>Financial District</strong>
            </a>{' '}
            — Emerging as a premium business district with multinational offices and
            growth-stage startups in fintech and enterprise services.
          </li>
        </ul>
      </section>

      {/* Ecosystem entities section */}
      <section>
        <h2>Hyderabad Startup Ecosystem</h2>
        <p>
          Hyderabad hosts one of India&apos;s most mature startup ecosystems, supported by
          world-class incubators, accelerators, and government-backed innovation hubs.
        </p>
        <ul>
          <li>
            <strong>T-Hub</strong> — India&apos;s largest startup incubator, based in
            Hyderabad, supporting over 2,000 startups across AI, SaaS, cleantech, and
            deep-tech verticals.
          </li>
          <li>
            <strong>TASK (Telangana Academy for Skill and Knowledge)</strong> — Connects
            Hyderabad&apos;s talent pipeline to startup requirements.
          </li>
          <li>
            <strong>RICH (Research and Innovation Circle of Hyderabad)</strong> — A
            government initiative facilitating research-driven startups and deep-tech
            innovation in the region.
          </li>
        </ul>
      </section>

      {/* Sector section */}
      <section>
        <h2>Top Startup Sectors in Hyderabad</h2>
        <p>
          Hyderabad&apos;s startup ecosystem spans a wide range of technology sectors:
        </p>
        <ul>
          <li>
            <a href="/?industry=AI+%2F+ML">
              <strong>AI and Machine Learning</strong>
            </a>{' '}
            — Generative AI platforms, computer vision, NLP, and enterprise AI automation
            startups are rapidly growing in Hyderabad.
          </li>
          <li>
            <a href="/?industry=SaaS">
              <strong>SaaS</strong>
            </a>{' '}
            — A large cluster of B2B SaaS companies building vertical software for
            healthcare, logistics, HR, and finance sectors.
          </li>
          <li>
            <a href="/?industry=Fintech">
              <strong>Fintech</strong>
            </a>{' '}
            — Fintech startups in Hyderabad are disrupting payments, lending, insurance,
            and wealthtech, supported by strong banking infrastructure.
          </li>
          <li>
            <a href="/?industry=Healthtech">
              <strong>Healthtech</strong>
            </a>{' '}
            — Digital health startups leveraging Hyderabad&apos;s established
            pharmaceutical and hospital network to build scalable health platforms.
          </li>
          <li>
            <a href="/?industry=Edtech">
              <strong>Edtech</strong>
            </a>{' '}
            — Education technology companies building online learning, upskilling, and
            corporate training platforms out of Hyderabad.
          </li>
        </ul>
      </section>

      {/* Funding section */}
      <section>
        <h2>Startup Funding in Hyderabad</h2>
        <p>
          Hyderabad startups have attracted significant venture capital and angel
          investment. Explore startups by their funding stage:
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
            <a href="/?fundingStage=Series+C%2B">
              Series C and growth-stage startups in Hyderabad
            </a>
          </li>
          <li>
            <a href="/?fundingStage=Bootstrapped">
              Bootstrapped startups in Hyderabad
            </a>
          </li>
        </ul>
      </section>

      {/* About section */}
      <section>
        <h2>About Hyderabad Startup Map</h2>
        <p>
          Hyderabad Startup Map is a free, community-driven resource for founders,
          investors, job seekers, and ecosystem stakeholders. Our interactive map lets
          you discover Hyderabad startups by area, industry, funding stage, and hiring
          status — all in one place. Are you a founder? Submit your startup to get
          listed on the map.
        </p>
      </section>
    </div>
  );
}
