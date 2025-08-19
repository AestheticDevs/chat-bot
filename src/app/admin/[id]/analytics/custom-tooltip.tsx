import { TooltipProps } from "recharts";

type CustomTooltipProps = TooltipProps<number, string>;

export const CustomTooltip = ({
  active,
  payload,
  label,
  customLabelName,
}: CustomTooltipProps & { customLabelName?: string }) => {
  const isVisible = active && payload && payload.length;
  return (
    <div
      className="rounded-xl border bg-slate-50 p-4"
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      {isVisible && (
        <>
          <span className="text-primary-brand text-sm font-semibold">
            {label}
          </span>
          {payload.map((item, index) => (
            <p className="text-sm" key={index}>
              <span
                className="inline-block size-3 rounded me-1.5"
                style={{ backgroundColor: item.color }}
              ></span>
              {`${customLabelName ? customLabelName : item.name} : ${item.value}`}
            </p>
          ))}
        </>
      )}
    </div>
  );
};
