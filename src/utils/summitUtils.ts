import { pastSummitsData } from "@/data/summitData";
import { speakers as centralSpeakers } from "@/data/speakers";

/**
 * Single source of truth for the sorted array of past summits.
 */
export const summitsArray = Object.values(pastSummitsData).sort((a, b) => b.year - a.year);

/**
 * Helper to calculate speaker and session counts for a given year.
 */
export const getSummitCounts = (year: number) => {
  const yearSpeakers = centralSpeakers[year] || [];
  return {
    speakersCount: yearSpeakers.length,
    sessionsCount: yearSpeakers.filter((s) => !!s.topic).length,
  };
};
