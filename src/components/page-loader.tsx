export default function PageLoader() {
  return (
    <div className="h-full w-full max-w-full animate-pulse">
      <div className="flex gap-4 mb-6">
        <div className="h-32 w-64 rounded-xl bg-slate-200"></div>
        <div className="h-32 w-64 rounded-xl bg-slate-200"></div>
        <div className="h-32 w-64 rounded-xl bg-slate-200"></div>
      </div>
      <div className="flex gap-4">
        <div className="h-64 w-full rounded-xl bg-slate-200"></div>
        <div className="h-64 w-full rounded-xl bg-slate-200"></div>
      </div>
    </div>
  );
}
