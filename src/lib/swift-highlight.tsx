import type { ReactNode } from "react";

const KEYWORDS = new Set([
  "import",
  "func",
  "let",
  "var",
  "class",
  "struct",
  "enum",
  "protocol",
  "extension",
  "return",
  "if",
  "else",
  "guard",
  "for",
  "while",
  "switch",
  "case",
  "default",
  "break",
  "continue",
  "private",
  "public",
  "internal",
  "fileprivate",
  "open",
  "static",
  "override",
  "mutating",
  "init",
  "deinit",
  "self",
  "Self",
  "super",
  "true",
  "false",
  "nil",
  "as",
  "try",
  "catch",
  "throw",
  "throws",
  "async",
  "await",
  "some",
  "any",
  "where",
  "in",
  "is",
  "typealias",
  "associatedtype",
]);

const TOKEN_REGEX =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|#[^\n]*|@[\w.]+|\b\d+(?:\.\d+)?\b|[A-Za-z_][\w.]*|\s+|[^\w\s#@'".]+)/g;

function classify(token: string): string {
  if (/^\s+$/.test(token)) return "plain";
  if (token.startsWith("//") || token.startsWith("/*")) return "comment";
  if (token.startsWith("#")) return "preprocessor";
  if (token.startsWith("@")) return "attribute";
  if (token.startsWith('"') || token.startsWith("'")) return "string";
  if (/^\d/.test(token)) return "number";
  if (KEYWORDS.has(token)) return "keyword";
  if (/^[A-Z]/.test(token)) return "type";
  return "plain";
}

export function highlightSwift(code: string) {
  const nodes: ReactNode[] = [];
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = TOKEN_REGEX.exec(code)) !== null) {
    const token = match[0];
    const kind = classify(token);
    nodes.push(
      <span key={index} className={`swift-${kind}`}>
        {token}
      </span>,
    );
    index += 1;
  }

  return nodes;
}
