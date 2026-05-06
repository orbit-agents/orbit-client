export type Status = "run" | "think" | "wait" | "fail" | "idle";

export type AgentNode = {
  id: string;
  name: string;
  role: string;
  av: string;
  avBg: string;
  avFg: string;
  status: Status;
  task: string;
  meta: string;
  bar?: number;
  x: number;
  y: number;
};

export type EdgeKind = "live" | "idle";
export type Edge = [from: string, to: string, kind: EdgeKind];

export type Workspace = {
  nodes: AgentNode[];
  edges: Edge[];
};

export type WorkspaceId = "platform-core" | "billing" | "marketing-site";

export type ChatMessage = {
  who: string;
  t: string;
  body: string;
  tools?: { name: string; sub: string }[];
};

export type FileEntry = [name: string, kind: "" | "dir" | "changed" | "added"];

export type AgentId =
  | "keeper"
  | "forge"
  | "scribe"
  | "compass"
  | "ranger"
  | "mason"
  | "atlas"
  | "scout";

export type PanelTab = "chat" | "terminal" | "files" | "notes";
