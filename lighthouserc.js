// lighthouserc.js
export default {
  ci: {
    collect: {
      staticDistDir: "./dist",
      url: [
        "https://localhost/",
        "https://localhost/about",
        "https://localhost/schedule",
        "https://localhost/past-summits",
      ],
      numberOfRuns: 5,
      // ── Reading from process.env allows for CI flexibility ─────────────────
      chromePath:
        process.env.CHROME_PATH ||
        String.raw`C:\Program Files\Google\Chrome\Application\chrome.exe`,
      settings: {
        preset: "desktop",
        throttling: {
          rttMs: 150,
          throughputKbps: 1600,
          cpuSlowdownMultiplier: 4,
        },
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.8 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["warn", { minScore: 0.9 }],
        "categories:seo": ["warn", { minScore: 0.9 }],
        "largest-contentful-paint": ["warn", { maxNumericValue: 2500 }],
        "total-blocking-time": ["warn", { maxNumericValue: 200 }],
        "cumulative-layout-shift": ["warn", { maxNumericValue: 0.1 }],
        "first-contentful-paint": ["warn", { maxNumericValue: 1800 }],
        "is-on-https": ["error", {}],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
