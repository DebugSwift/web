import { PageHero, Prose } from "@/components/ui";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" description="Last updated: July 2026" />
      <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <Prose>
          <h2>DebugSwift app</h2>
          <p>
            DebugSwift runs locally inside your app. It does not transmit captured network traffic,
            keychain data, or sandbox contents to any server operated by the DebugSwift project.
          </p>
          <h2>Website</h2>
          <p>
            This marketing site is static. We do not use third-party analytics cookies by default.
            If analytics are added later, this policy will be updated.
          </p>
          <h2>Your data</h2>
          <p>
            Anything you export (HAR, screenshots, session files) is under your control. Redact
            sensitive headers and tokens before sharing with teammates.
          </p>
        </Prose>
      </article>
    </>
  );
}
