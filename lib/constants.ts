export const SITE_NAME = "BioEar";
export const SITE_TAGLINE = "Sound, reimagined.";
export const SITE_URL = "https://bioear.example.com";
export const PROTOTYPE_VERSION = "0.3";

export const COLORS = {
  lavender: "#C9C3F5",
  blue: "#BFDDF4",
  mint: "#C8E8DC",
  peach: "#F4D6CA",
  cream: "#FBF9F4",
  ink: "#20232A",
  gray: "#737782",
} as const;

export const NAV_LINKS = [
  { href: "/technology", label: "Technology" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/simulator", label: "Sound Lab" },
  { href: "/prototype", label: "Prototype" },
  { href: "/research", label: "Research" },
  { href: "/story", label: "Our Story" },
] as const;

export const FOOTER_LINKS = [
  { href: "/technology", label: "Technology" },
  { href: "/research", label: "Research" },
  { href: "/sources", label: "Sources" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;
