import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/bioear/FaqList";

export const metadata: Metadata = { title: "FAQ — BioEar" };

export default function FaqPage() {
  return (
    <PageContainer>
      <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
      <div className="mt-12 max-w-2xl">
        <FaqList />
      </div>
    </PageContainer>
  );
}
