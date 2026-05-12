import { Terminal, Brain, ShieldCheck, Cloud, Zap, Scale, type LucideIcon } from "lucide-react";

export interface CFPTopic {
  icon: LucideIcon;
  text: string;
}

export const CFP_TOPICS: CFPTopic[] = [
  {
    icon: Terminal,
    text: "Technical talks grounded in real implementation experience",
  },
  {
    icon: Brain,
    text: "Stories of building AI/ML systems in African market conditions",
  },
  {
    icon: ShieldCheck,
    text: "DevSecOps and platform engineering case studies",
  },
  {
    icon: Cloud,
    text: "Infrastructure and cloud architecture at scale on the continent",
  },
  {
    icon: Zap,
    text: "Lessons from failure — not just successes",
  },
  {
    icon: Scale,
    text: "Policy, governance, and the technical-regulatory intersection",
  },
];
