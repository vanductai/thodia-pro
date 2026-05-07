import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  schemaId?: string;
  /**
   * schemaEmit=true (default): component tự emit FAQPage JSON-LD — dùng cho
   * các trang không có @graph riêng (e.g. standalone pages).
   * schemaEmit=false: không emit — dùng khi page đã gộp FAQPage vào @graph
   * của chính nó để tránh duplicate schema trên cùng 1 trang.
   */
  schemaEmit?: boolean;
}

export function FAQAccordion({ items, schemaId, schemaEmit = true }: FAQAccordionProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      {schemaEmit && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Accordion className="w-full" id={schemaId}>
        {items.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left text-sm font-medium">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
