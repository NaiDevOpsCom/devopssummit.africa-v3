/**
 * Summit Data
 *
 * This file contains historical data and growth metrics for previous Africa DevOps Summits.
 *
 * Used in:
 * - src/pages/PastSummits.tsx: To display detailed year-by-year highlights and growth charts.
 * - src/components/landing/About.tsx: To display overarching summit stats.
 */

import { type Stat } from "@/types";

/**
 * Upcoming Summit Details
 * Used across the application for the next event date, location, and countdown.
 */
export const summitDetails = {
  date: "November 20–21, 2026",
  location: "Nairobi, Kenya",
  mapLink: "https://www.google.com/maps/place/Nairobi,+Kenya",
  // Includes UTC+03:00 (EAT) offset so Date.parse() yields a deterministic instant
  // regardless of the browser's local timezone.
  datetime: "2026-11-20T09:00:00+03:00",
  /**
   * @property {string} sponsorshipDeckUrl
   * The public URL or relative path to the conference sponsorship PDF used for download/display.
   * Expected format: e.g., "/deck.pdf" or full "https://..." URL.
   * This field can be empty/optional.
   */
  sponsorshipDeckUrl: "/deck.pdf",
};

export interface SummitHighlight {
  title: string;
  description: string;
  icon: string;
}

export interface PastSummit {
  year: number;
  theme: string;
  themeDescription: string;
  date: string;
  venue: string;
  location: string;
  attendees: string;
  countries: string;
  reportUrl: string;
  videoUrl: string;
  highlights: SummitHighlight[];
}

export interface GrowthMetric {
  label: string;
  values: { year: string; value: number }[];
}

/**
 * Overarching statistics for the summit over the years.
 * Displayed in the About section on the landing page.
 *
 * NOTE: These are marketing-rounded projection figures intended for at-a-glance
 * impact and are NOT summed totals derived from growthMetrics. For precise
 * year-by-year breakdowns, refer to growthMetrics below.
 */
export const stats: Stat[] = [
  { value: "700+", label: "Attendees since 2024" },
  { value: "23+", label: "Speakers" },
  { value: "10+", label: "African countries represented" },
  { value: "10+", label: "Partners & Sponsors" },
];

/**
 * Metrics tracking the summit's evolution across years.
 * Displayed in the "Summit Evolution & Growth" section.
 */
export const growthMetrics: GrowthMetric[] = [
  {
    label: "Attendees",
    values: [
      { year: "2024", value: 200 },
      { year: "2025", value: 500 },
    ],
  },
  {
    label: "Speakers",
    values: [
      { year: "2024", value: 8 },
      { year: "2025", value: 15 },
    ],
  },
  {
    label: "Countries",
    values: [
      { year: "2024", value: 5 },
      { year: "2025", value: 9 },
    ],
  },
  {
    label: "Sessions",
    values: [
      { year: "2024", value: 12 },
      { year: "2025", value: 25 },
    ],
  },
];

/**
 * Detailed information for each past summit edition, grouped by year.
 * Displayed in the main interactive Tabs section of the Past Summits page.
 */
export const pastSummitsData: Record<number, PastSummit> = {
  2025: {
    year: 2025,
    theme: "DevOps for a Changing Continent: Taking DevOps beyond the pipeline",
    themeDescription:
      "The 2025 summit focused on DevOps for a Changing Continent: Taking DevOps beyond the pipeline, bringing together practitioners from 9 countries to share real-world strategies for enterprise-grade CI/CD, cloud-native architectures, and platform engineering.",
    date: "November 7–8, 2025",
    venue: "Zetech University",
    location: "Nairobi, Kenya",
    attendees: "500+",
    countries: "9+",
    reportUrl: "#", // TODO: Provide real report URL
    videoUrl: "#", // TODO: Provide real video URL
    highlights: [
      {
        title: "Platform Engineering Track",
        description:
          "A dedicated track on internal developer platforms drew the largest audience, with hands-on workshops on Backstage and Crossplane.",
        icon: "server",
      },
      {
        title: "Women in DevOps Panel",
        description:
          "A landmark panel discussion featuring women leaders in DevOps across Africa, sparking the launch of a mentorship program.",
        icon: "users",
      },
      {
        title: "Open Source Showcase",
        description:
          "African-built open source DevOps tools were showcased for the first time, with three projects gaining international contributors.",
        icon: "code",
      },
      {
        title: "Multi-Cloud Strategy Workshop",
        description:
          "Hands-on workshop covering hybrid and multi-cloud deployment strategies with real-world case studies from African enterprises.",
        icon: "cloud",
      },
    ],
  },
  2024: {
    year: 2024,
    theme: "DevOps in Africa: Past, Present & Future of a Tech Revolution",
    themeDescription:
      "The 2024 summit focused on advanced DevOps strategies, cloud-native technologies, and building resilient infrastructure to support Africa's growing tech ecosystem",
    date: "October 26, 2024",
    venue: "Moringa School",
    location: "Nairobi, Kenya",
    attendees: "200+",
    countries: "5+",
    reportUrl: "#", // TODO: Provide real report URL
    videoUrl: "#", // TODO: Provide real video URL
    highlights: [
      {
        title: "Community Launch",
        description:
          "The Africa DevOps Community was officially launched, bringing together over 200 practitioners committed to advancing DevOps practices across the continent.",
        icon: "rocket",
      },
      {
        title: "Kubernetes Workshop",
        description:
          "A sold-out hands-on workshop on Kubernetes fundamentals helped attendees deploy their first containerized applications.",
        icon: "box",
      },
      {
        title: "Infrastructure as Code Deep Dive",
        description:
          "Expert-led sessions on Terraform and Ansible demonstrated real-world infrastructure automation for African cloud environments.",
        icon: "layers",
      },
      {
        title: "DevOps Culture Panel",
        description:
          "Industry leaders discussed overcoming organizational barriers to DevOps adoption in African enterprises.",
        icon: "message-circle",
      },
    ],
  },
};
