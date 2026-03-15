import React from "react";
import {
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SafeLink } from "@/components/SafeLink";

const EVENT_VENUE = {
  name: "Africa DevOps Summit 2026",
  venue: "Sarit Expo Centre",
  address: "Nairobi, Kenya",
  date: "October 16–17, 2026",
  time: "8:00 AM – 5:00 PM EAT",
  // Google Maps embed query — update this when venue changes
  mapQuery: "Sarit+Expo+Centre,+Nairobi,+Kenya",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sarit+Expo+Centre+Nairobi+Kenya",
};

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Schedule", href: "/schedule" },
  { label: "Past Summits", href: "/past-summits" },
  { label: "Partners", href: "/sponsorship" },
  { label: "FAQs", href: "/faqs" },
  { label: "Code of Conduct", href: "/code-of-conduct" },
];

const socials = [
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Youtube, href: "#", label: "YouTube" },
];

const Footer: React.FC = () => (
  <footer className="bg-dark-bg text-primary-foreground">
    <div className="max-w-7xl mx-auto section-padding py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Column 1 — Brand & Contact */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-xs">ADS</span>
              </div>
              <span className="font-heading font-bold text-sm">Africa DevOps Summit</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Africa's premier DevOps, Cloud &amp; SRE conference driving innovation and
              collaboration.
            </p>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary flex-shrink-0" />
              <span>info@africadevops.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary flex-shrink-0" />
              <span>+254 798 669 125</span>
            </div>
          </div>

          <div className="flex gap-3">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="w-9 h-9 rounded-full bg-card-dark flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 — Quick Links */}
        <div>
          <h4 className="font-heading font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Event Location */}
        <div>
          <h4 className="font-heading font-bold mb-4">Summit Venue</h4>

          {/* Google Maps Embed */}
          <div className="rounded-lg overflow-hidden border border-border mb-4">
            <iframe
              title="Summit Venue Map"
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.819074698082!2d36.7812!3d-1.2635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${EVENT_VENUE.mapQuery}!5e0!3m2!1sen!2ske!4v1700000000000`}
              width="100%"
              height="180"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>

          {/* Venue Details */}
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span>
                {EVENT_VENUE.venue}, {EVENT_VENUE.address}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
              <span>{EVENT_VENUE.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary flex-shrink-0" />
              <span>{EVENT_VENUE.time}</span>
            </div>
          </div>

          <SafeLink
            href={EVENT_VENUE.mapsUrl}
            className="inline-flex items-center gap-1.5 mt-3 text-sm text-primary hover:underline"
          >
            Open in Google Maps
            <ExternalLink className="w-3.5 h-3.5" />
          </SafeLink>
        </div>
      </div>
    </div>

    <div className="border-t border-muted-foreground/20">
      <div className="max-w-7xl mx-auto section-padding py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
        <p>© 2026 Africa DevOps Summit. All rights reserved.</p>
        <div className="flex gap-4">
          <Link to="/privacy-policy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link to="/code-of-conduct" className="hover:text-primary transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default React.memo(Footer);
