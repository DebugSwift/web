import { PageHero, Prose } from "@/components/ui";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of Service" />
      <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <Prose>
          <p>
            DebugSwift is provided as open-source software under the MIT License. By using the
            software you agree to the terms in the LICENSE file.
          </p>
          <h2>Permitted use</h2>
          <p>Use DebugSwift in DEBUG builds for development, testing, and debugging iOS applications.</p>
          <h2>Prohibited use</h2>
          <p>
            Do not ship DebugSwift in production App Store builds. Do not use it to intercept
            third-party app traffic without authorization.
          </p>
          <h2>Disclaimer</h2>
          <p>THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND.</p>
        </Prose>
      </article>
    </>
  );
}
