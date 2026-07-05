import { AlternativePage } from "@/components/comparison-page";

export const metadata = { title: "Pulse Alternative for iOS" };

export default function Page() {
  return (
    <AlternativePage
      title="DebugSwift as a Pulse Alternative"
      competitor="Pulse"
      description="Pulse is a polished commercial network logger. DebugSwift matches core network inspection and adds performance, UI, and resource tools, all MIT open source."
      advantages={[
        "Free and open source under MIT",
        "Network inspector plus memory leaks, thread checker, view hierarchy",
        "Response modifier and API mocking without a backend",
        "SwiftData, Realm, and Keychain browsers",
      ]}
      faq={[
        { q: "Is DebugSwift only for network?", a: "No. It covers network, performance, interface, and sandbox resources." },
        { q: "How does setup compare?", a: "Both use SPM. DebugSwift needs setup() + show() in AppDelegate." },
      ]}
    />
  );
}
