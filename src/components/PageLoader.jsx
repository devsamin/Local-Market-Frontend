const PageLoader = () => (
  <div className="grid min-h-[60vh] place-items-center" role="status">
    <div className="flex flex-col items-center gap-3 text-sm font-semibold text-slate-600">
      <span className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />
      Loading Local Mart…
    </div>
  </div>
);

export default PageLoader;
