import { type Testimonial } from "@/types";
import { IS_DEVELOPMENT } from "@/config/env";

/**
 * Summit Experience Data
 *
 * This file contains experiential data (gallery images and testimonials) for Africa DevOps Summits.
 *
 * Used in:
 * - src/pages/PastSummits.tsx: To display year-specific photo galleries and attendee testimonials.
 */

export interface GalleryImage {
  src: string;
  alt: string;
  fallback?: string;
}

/**
 * Photo Gallery images for each summit year.
 * Using objects for metadata and better accessibility/reliability.
 */
export const summitGallery: Record<number, GalleryImage[]> = {
  2025: [
    {
      src: "https://ik.imagekit.io/nairobidevops/ads2025/IMG_6933.JPG?updatedAt=1773116262750",
      alt: "Main stage audience at 2025 Summit",
    },
    {
      src: "https://ik.imagekit.io/nairobidevops/ads2025/IMG_6960.JPG?updatedAt=1773116262739",
      alt: "Panel discussion on cloud native technologies",
    },
    {
      src: "https://ik.imagekit.io/nairobidevops/ads2025/IMG_6793.JPG?updatedAt=1773116156943",
      alt: "Hands-on workshop session",
    },
    {
      src: "https://ik.imagekit.io/nairobidevops/ads2025/IMG_6757.JPG?updatedAt=1773116156967",
      alt: "Networking during coffee break",
    },
    {
      src: "https://ik.imagekit.io/nairobidevops/ads2025/IMG_6790.JPG?updatedAt=1773116156936",
      alt: "Attendee engaging with a technical demo",
    },
    {
      src: "https://ik.imagekit.io/nairobidevops/ads2025/IMG_6752.JPG?updatedAt=1773116107524",
      alt: "Group photo of 2025 summit speakers",
    },
  ],
  2024: [
    {
      src: "https://ik.imagekit.io/nairobidevops/ads2024/PXL_20230923_082446760.MP.jpg?updatedAt=1757829640302",
      alt: "Opening ceremony of the inaugural summit",
    },
    {
      src: "https://ik.imagekit.io/nairobidevops/ads2024/PXL_20230923_053350557.MP.jpg?updatedAt=1757829627181",
      alt: "Kubernetes deep dive session",
    },
    {
      src: "https://ik.imagekit.io/nairobidevops/ads2024/IMG_9877.jpg?updatedAt=1757829571782",
      alt: "Speakers sharing insights on DevOps culture",
    },
    {
      src: "https://ik.imagekit.io/nairobidevops/ads2024/Gw1gwJhWsAAZcBo_format=jpg&name=large.jpeg?updatedAt=1757829339817",
      alt: "Interactive Q&A session",
    },
    {
      src: "https://ik.imagekit.io/nairobidevops/ads2024/IMG_8496.jpg?updatedAt=1757829422618",
      alt: "Networking event in Nairobi",
    },
    {
      src: "https://ik.imagekit.io/nairobidevops/ads2024/IMG_8467.jpg?updatedAt=1757829426777",
      alt: "Team collaboration during hackathon",
    },
  ],
};

/**
 * Lightweight validator to check if gallery entries are valid.
 * Logs warnings for entries missing required fields.
 */
export const validateSummitGallery = () => {
  Object.entries(summitGallery).forEach(([year, images]) => {
    images.forEach((img, index) => {
      if (!img.src || !img.alt) {
        console.warn(`[Gallery Validation] Year ${year}, Index ${index}: Missing src or alt.`);
      }
    });
  });
};

// Run validation on load in dev environment
if (IS_DEVELOPMENT) {
  validateSummitGallery();
}

/**
 * Attendee testimonials for each summit year.
 */
export const summitTestimonials: Record<number, Testimonial[]> = {
  2025: [
    {
      id: "t-2025-1",
      quote:
        "The Africa DevOps Summit 2025 was a game-changer. I connected with engineers solving the same challenges we face and left with actionable strategies.",
      name: "Peter Otieno",
      role: "CTO",
      company: "Kobo360",
    },
    {
      id: "t-2025-2",
      quote:
        "Finally, a conference that addresses DevOps in the African context. The platform engineering track alone was worth the trip.",
      name: "Ngozi Eze",
      role: "Lead SRE",
      company: "Kuda Bank",
    },
    {
      id: "t-2025-3",
      quote:
        "I came as an attendee and left as a speaker for next year. The community is incredibly welcoming and forward-thinking.",
      name: "Youssef Benali",
      role: "DevOps Engineer",
      company: "OCP Group",
    },
  ],
  2024: [
    {
      id: "t-2024-1",
      quote:
        "Being at the first-ever Africa DevOps Summit was historic. The energy and passion for building better software in Africa was palpable.",
      name: "Diana Kimani",
      role: "Engineering Lead",
      company: "Ushahidi",
    },
    {
      id: "t-2024-2",
      quote:
        "The hands-on workshops were exactly what my team needed. We implemented CI/CD pipelines the week after returning.",
      name: "Samuel Osei",
      role: "DevOps Engineer",
      company: "Hubtel",
    },
  ],
};
