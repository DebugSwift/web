import { DocsHeader } from "@/components/docs-header";
import { DocsSidebarPanel } from "@/components/docs-sidebar-nav";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="docs-shell flex min-h-screen flex-col overflow-x-hidden bg-[#08080f]">
      <DocsHeader />
      <div className="flex min-w-0 flex-1">
        <DocsSidebarPanel />
        <div className="min-w-0 flex-1 overflow-x-hidden">{children}</div>
      </div>
    </div>
  );
}
