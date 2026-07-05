import { AlternativePage } from "@/components/comparison-page";

export const metadata = { title: "Wireshark Alternative for HTTP" };

export default function Page() {
  return (
    <AlternativePage
      title="Wireshark vs DebugSwift for iOS HTTP"
      competitor="Wireshark"
      description="Wireshark captures packets. DebugSwift shows decoded HTTP requests, JSON bodies, and app-level context: the layer most iOS developers actually debug."
      advantages={[
        "Human-readable request/response inspector",
        "JSON syntax highlighting and WebSocket frames",
        "Tied to your app's URLSession, not raw packets",
        "No packet capture permissions",
      ]}
      faq={[
        { q: "When use Wireshark?", a: "Low-level TCP/TLS debugging, custom protocols, or network infrastructure issues." },
      ]}
    />
  );
}
