import { Button, Card, Container, PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata = { title: "Roadmap" };

const planned = [
  "Deeper SwiftUI performance profiling",
  "Enhanced WebSocket protobuf decoding",
  "HTTP/3 and QUIC visibility",
  "Team session export format",
  "Widget extension for quick metrics",
  "visionOS debugger support",
];

export default function RoadmapPage() {
  return (
    <>
      <PageHero
        title="Public roadmap"
        description="Direction is tracked on GitHub Issues. No dates until shipped."
      >
        <Button href={`${site.github}/issues`} external variant="secondary">
          View issues
        </Button>
      </PageHero>
      <section className="pb-20">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2">
            {planned.map((item) => (
              <Card key={item}>
                <span className="text-xs text-cyan-400">In planning</span>
                <p className="mt-2 font-medium text-white">{item}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
