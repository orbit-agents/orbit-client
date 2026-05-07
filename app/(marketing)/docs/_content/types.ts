export type DocBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "kv"; rows: { key: string; value: string }[] }
  | { type: "code"; lang?: string; body: string; caption?: string }
  | { type: "callout"; tone: "info" | "warn" | "tip"; title?: string; body: string }
  | { type: "divider" };

export type Doc = {
  slug: string;
  group: string;
  title: string;
  lede: string;
  tag?: string;
  blocks: DocBlock[];
};
