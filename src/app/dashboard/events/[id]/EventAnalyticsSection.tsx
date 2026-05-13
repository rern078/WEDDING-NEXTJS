export function EventAnalyticsSection({
  totalViews,
  viewsLast7Days,
  recentViews,
}: {
  totalViews: number;
  viewsLast7Days: number;
  recentViews: { id: string; at: string }[];
}) {
  return (
    <section className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">
      <h2 className="font-serif text-lg font-semibold text-rose-950">Analytics</h2>
      <p className="mt-1 text-sm text-stone-600">Page opens on your public invite (one ping per guest load).</p>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-center">
        <div className="rounded-xl bg-stone-50 px-3 py-3">
          <dt className="text-xs font-medium uppercase tracking-wide text-stone-500">All time</dt>
          <dd className="mt-1 text-2xl font-semibold text-stone-900">{totalViews}</dd>
          <dd className="text-xs text-stone-500">views</dd>
        </div>
        <div className="rounded-xl bg-rose-50/80 px-3 py-3">
          <dt className="text-xs font-medium uppercase tracking-wide text-rose-800/80">Last 7 days</dt>
          <dd className="mt-1 text-2xl font-semibold text-rose-950">{viewsLast7Days}</dd>
          <dd className="text-xs text-stone-500">views</dd>
        </div>
      </dl>
      {recentViews.length > 0 ? (
        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-wide text-stone-500">Recent opens</p>
          <ul className="mt-2 max-h-32 space-y-1 overflow-y-auto text-xs text-stone-600">
            {recentViews.map((row) => (
              <li key={row.id}>
                {new Date(row.at).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
