import { Fragment } from "react";

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}

export function LessonContent({ content }: { content: string }) {
  const lines = content.split(/\r?\n/);

  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {lines.map((raw, index) => {
        const line = raw.trim();
        if (!line) return null;

        if (line.startsWith("### ")) {
          return (
            <h4 key={index} className="pt-1 text-sm font-semibold text-primary">
              {line.slice(4)}
            </h4>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h3 key={index} className="pt-2 text-base font-semibold text-foreground">
              {line.slice(3)}
            </h3>
          );
        }
        if (line.startsWith("# ")) {
          return (
            <h2 key={index} className="text-lg font-semibold text-primary">
              {line.slice(2)}
            </h2>
          );
        }
        if (line.startsWith("- ")) {
          return (
            <p key={index} className="flex gap-2">
              <span className="text-primary">•</span>
              <span>{renderInline(line.slice(2))}</span>
            </p>
          );
        }
        return (
          <p key={index} className="text-muted-foreground">
            {renderInline(line)}
          </p>
        );
      })}
    </div>
  );
}
