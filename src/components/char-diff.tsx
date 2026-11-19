import { cn } from "@/lib/utils";
import type { CharDiff } from "@/lib/text";

export function CharDiffView({
  ops,
  className,
}: {
  ops: CharDiff[];
  className?: string;
}) {
  const expected = ops.filter((op) => op.type !== "extra");
  const extra = ops.filter((op) => op.type === "extra");

  return (
    <div className={cn("space-y-2", className)}>
      <div className="hanzi flex flex-wrap gap-1 text-2xl leading-relaxed tracking-wide">
        {expected.map((op, index) => (
          <span
            key={`${op.char}-${index}`}
            className={cn(
              "rounded px-0.5",
              op.type === "equal"
                ? "text-emerald-700 bg-emerald-50"
                : "text-red-600 bg-red-50 line-through decoration-red-400",
            )}
          >
            {op.char}
          </span>
        ))}
      </div>
      {extra.length > 0 && (
        <p className="text-sm text-amber-700">
          Thừa:{" "}
          <span className="hanzi font-medium">
            {extra.map((op) => op.char).join(" ")}
          </span>
        </p>
      )}
    </div>
  );
}
