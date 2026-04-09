// lighthouserc.ci.js — used in GitHub Actions only
export default {
  ci: {
    collect: {
      staticDistDir: "./dist",
      url: [
        "http://localhost/",
        "http://localhost/about",
        "http://localhost/schedule",
        "http://localhost/past-summits",
      ],
      numberOfRuns: 2,
      settings: {
        preset: "desktop",
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
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
        "installable-manifest": ["warn", {}],
        "service-worker": ["warn", {}],
        "is-on-https": "off",
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
