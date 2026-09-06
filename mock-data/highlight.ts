import type { FileKind } from "./files";

const C = {
  key: "#2c5a7f",
  str: "#1e7350",
  fn: "#9c4221",
  com: "#8695a5",
  num: "#8a5a08",
  attr: "#a8710c"
};

const KEYWORDS =
  "const|let|var|function|return|if|else|for|while|new|class|extends|typeof|instanceof|await|async|true|false|null|undefined|this";

interface Rule {
  re: string;
  color?: string;
  split?: boolean;
}

const PATTERNS: Record<string, Rule[]> = {
  html: [
    { re: "<!--[\\s\\S]*?-->", color: C.com },
    { re: "<\\/?[a-zA-Z][a-zA-Z0-9!-]*", color: C.key },
    { re: '[a-zA-Z-]+="[^"]*"', split: true },
    { re: "<!DOCTYPE[^>]*>", color: C.com }
  ],
  css: [
    { re: "\\/\\*[^*]*\\*\\/", color: C.com },
    { re: "@[a-z-]+", color: C.fn },
    { re: "(?:--[a-z0-9-]+|[a-z-]+)(?=\\s*:)", color: C.key },
    { re: "#[0-9a-fA-F]{3,8}", color: C.num },
    { re: "\\b\\d+(?:\\.\\d+)?(?:px|em|rem|ms|s|%|fr)?\\b", color: C.num }
  ],
  md: [
    { re: "^#{1,6} .*$", color: C.key },
    { re: "`[^`]*`", color: C.str },
    { re: "^\\s*(?:[-*]|\\d+\\.) ", color: C.fn }
  ],
  js: [
    { re: "\\/\\/[^\\n]*", color: C.com },
    { re: "\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'", color: C.str },
    { re: "\\b(?:" + KEYWORDS + ")\\b", color: C.key },
    { re: "\\b[A-Za-z_$][\\w$]*(?=\\s*\\()", color: C.fn },
    { re: "\\b\\d+(?:\\.\\d+)?\\b", color: C.num }
  ]
};

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function wrap(color: string, text: string) {
  return '<span style="color:' + color + '">' + text + "</span>";
}

/** Single combined-regex pass per language, so inserted markup is never re-matched. */
export function highlight(line: string, kind: FileKind): string {
  const rules = PATTERNS[kind] || PATTERNS.js;
  const pattern = new RegExp(rules.map((r) => "(" + r.re + ")").join("|"), "g");
  let out = "";
  let idx = 0;
  let m: RegExpExecArray | null;

  while ((m = pattern.exec(line)) !== null) {
    if (m[0] === "") {
      pattern.lastIndex++;
      continue;
    }
    out += esc(line.slice(idx, m.index));
    let rule = rules[0];
    for (let i = 0; i < rules.length; i++) {
      if (m[i + 1] !== undefined) {
        rule = rules[i];
        break;
      }
    }
    if (rule.split) {
      const eq = m[0].indexOf("=");
      out += wrap(C.attr, esc(m[0].slice(0, eq))) + "=" + wrap(C.str, esc(m[0].slice(eq + 1)));
    } else {
      out += wrap(rule.color || C.key, esc(m[0]));
    }
    idx = m.index + m[0].length;
  }

  out += esc(line.slice(idx));
  return out || "&nbsp;";
}
