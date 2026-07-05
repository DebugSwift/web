import { AdvantageList, Card, Container } from "@/components/ui";

type Row = { feature: string; debugswift: string; flipper: string; pulse: string };

export function ComparisonPage({
  title,
  description,
  rows,
  whenToChoose,
}: {
  title: string;
  description: string;
  rows: Row[];
  whenToChoose: { tool: string; reason: string }[];
}) {
  return (
    <>
      <section className="border-b border-white/10 py-16">
        <Container>
          <h1 className="text-4xl font-bold text-white">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-400">{description}</p>
        </Container>
      </section>
      <section className="py-12">
        <Container>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="p-4 font-semibold text-zinc-400">Feature</th>
                  <th className="p-4 font-semibold text-violet-400">DebugSwift</th>
                  <th className="p-4 font-semibold text-zinc-400">Flipper</th>
                  <th className="p-4 font-semibold text-zinc-400">Pulse</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.feature} className="border-b border-white/5">
                    <td className="p-4 text-zinc-300">{row.feature}</td>
                    <td className="p-4 text-white">{row.debugswift}</td>
                    <td className="p-4 text-zinc-400">{row.flipper}</td>
                    <td className="p-4 text-zinc-400">{row.pulse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {whenToChoose.map((w) => (
              <Card key={w.tool}>
                <h3 className="font-semibold text-white">Choose {w.tool}</h3>
                <p className="mt-2 text-sm text-zinc-400">{w.reason}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

export function AlternativePage({
  title,
  competitor,
  description,
  advantages,
  faq,
}: {
  title: string;
  competitor: string;
  description: string;
  advantages: string[];
  faq: { q: string; a: string }[];
}) {
  return (
    <>
      <section className="border-b border-white/10 py-16">
        <Container>
          <p className="text-sm text-violet-400">{competitor} alternative</p>
          <h1 className="mt-2 text-4xl font-bold text-white">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-400">{description}</p>
        </Container>
      </section>
      <section className="py-12">
        <Container className="max-w-3xl space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-white">Why DebugSwift</h2>
            <AdvantageList items={advantages} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">FAQ</h2>
            <dl className="mt-4 space-y-4">
              {faq.map((f) => (
                <div key={f.q}>
                  <dt className="font-medium text-white">{f.q}</dt>
                  <dd className="mt-1 text-sm text-zinc-400">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>
    </>
  );
}
