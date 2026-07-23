const Analytics = ({ data, loading }) => {
  if (loading || !data) return <div className="h-64 animate-pulse rounded-2xl bg-slate-200" />;
  const statuses = data.orders_count || {};
  const total = Object.values(statuses).reduce((sum, value) => sum + value, 0) || 1;
  return <div className="grid gap-6 lg:grid-cols-[1fr_360px]"><section className="surface p-6"><p className="eyebrow">Order pipeline</p><h2 className="mt-2 text-2xl font-bold">Fulfilment health</h2><div className="mt-7 space-y-5">{Object.entries(statuses).map(([status, value]) => <div key={status}><div className="mb-2 flex justify-between text-sm"><span className="font-semibold capitalize">{status}</span><span className="text-slate-500">{value}</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-600" style={{ width: `${(value / total) * 100}%` }} /></div></div>)}</div></section><aside className="surface p-6"><p className="eyebrow">Inventory signal</p><strong className="mt-4 block text-5xl tracking-tight">{data.low_stock_count}</strong><p className="mt-2 text-sm leading-6 text-slate-500">products have five or fewer items left. Replenish popular listings before they sell out.</p><div className="mt-6 rounded-2xl bg-emerald-50 p-4"><p className="text-sm font-bold text-emerald-900">{data.products_sold} items sold</p><p className="mt-1 text-xs leading-5 text-emerald-700">Across all successfully paid orders.</p></div></aside></div>;
};

export default Analytics;
