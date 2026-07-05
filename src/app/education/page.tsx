import { CTABand, PageHero, Prose } from "@/components/ui";

export const metadata = { title: "Education" };

export default function EducationPage() {
  return (
    <>
      <PageHero
        title="Free for students and educators"
        description="DebugSwift is MIT open source with no license key and no academic application. Use it in courses, labs, and thesis projects."
      />
      <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <Prose>
          <p>
            Unlike commercial debuggers, there is no separate education SKU. The same package
            students use in class is what production teams use: full network, performance, and UI tools.
          </p>
          <h2>Permitted use</h2>
          <ul>
            <li>University courses and bootcamps</li>
            <li>Research projects and theses</li>
            <li>Student personal projects</li>
          </ul>
        </Prose>
      </article>
      <CTABand />
    </>
  );
}
