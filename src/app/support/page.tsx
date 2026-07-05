import { Button, Card, Container, PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata = { title: "Support" };

const githubChannels = [
  {
    title: "Documentation",
    description: "Setup, configuration, and feature guides in the README.",
    href: site.docs,
    external: true,
    cta: "Read docs",
    icon: BookIcon,
    iconClass: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  },
  {
    title: "Bug reports",
    description: "File issues with steps to reproduce, iOS version, and Xcode version.",
    href: `${site.github}/issues`,
    external: true,
    cta: "GitHub Issues",
    icon: BugIcon,
    iconClass: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  },
  {
    title: "Contributions",
    description: "PRs welcome. Check good first issues on the tracker.",
    href: `${site.github}/pulls`,
    external: true,
    cta: "Pull requests",
    icon: PullRequestIcon,
    iconClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
] as const;

export default function SupportPage() {
  return (
    <>
      <PageHero
        title="Get help"
        description="Bugs, questions, and contributions go through public GitHub channels."
      />
      <section className="pb-20 pt-4 sm:pb-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {githubChannels.map((channel) => (
              <Card
                key={channel.title}
                className="group flex h-full flex-col transition hover:border-white/20"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border ${channel.iconClass}`}
                >
                  <channel.icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 text-lg font-semibold text-white">{channel.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                  {channel.description}
                </p>
                <Button
                  href={channel.href}
                  external={channel.external}
                  variant="secondary"
                  className="mt-6 w-full sm:w-auto"
                >
                  {channel.cta}
                </Button>
              </Card>
            ))}
          </div>

          <Card className="mt-6 flex flex-col gap-6 border-violet-500/20 bg-gradient-to-br from-violet-500/[0.07] via-transparent to-cyan-500/[0.05] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400">
                  <MailIcon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-white">Contact</h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                Questions or partnerships? Reach out by email or LinkedIn.
              </p>
              <p className="mt-3 text-sm text-zinc-500">
                For security-sensitive reports, use{" "}
                <a
                  href={`${site.github}/security/advisories/new`}
                  className="text-violet-400 transition hover:text-violet-300 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub private vulnerability reporting
                </a>
                .
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button href={`mailto:${site.email}`} variant="secondary" className="justify-center">
                <MailIcon className="h-4 w-4 opacity-70" />
                Email us
              </Button>
              <Button href={site.linkedin} external variant="secondary" className="justify-center">
                <LinkedInIcon className="h-4 w-4 opacity-70" />
                LinkedIn
              </Button>
            </div>
          </Card>
        </Container>
      </section>
    </>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );
}

function BugIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
      />
    </svg>
  );
}

function PullRequestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
      />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
