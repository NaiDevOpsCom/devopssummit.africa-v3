// src/components/SafeHtml.tsx
import { sanitizeHtml } from "../utils/sanitize";

type NonVoidIntrinsicElements = Exclude<
  keyof JSX.IntrinsicElements,
  | "area"
  | "base"
  | "br"
  | "col"
  | "embed"
  | "hr"
  | "img"
  | "input"
  | "link"
  | "meta"
  | "param"
  | "source"
  | "track"
  | "wbr"
>;

interface SafeHtmlProps {
  html: string;
  className?: string;
  as?: NonVoidIntrinsicElements; // allows <SafeHtml as="span" />
}

/**
 * The ONLY component in the app allowed to render raw HTML.
 * Always sanitizes input before rendering.
 */
export const SafeHtml = ({ html, className, as: Tag = "div" }: SafeHtmlProps) => {
  const clean = sanitizeHtml(html);

  return <Tag className={className} dangerouslySetInnerHTML={{ __html: clean }} />;
};
