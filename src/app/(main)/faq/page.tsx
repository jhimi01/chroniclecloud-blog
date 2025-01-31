import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "What is this blog about?",
      answer: "This blog covers various topics including technology, lifestyle, and personal development.",
    },
    {
      question: "How often are new articles published?",
      answer: "We publish new articles weekly to keep our readers updated and engaged.",
    },
    {
      question: "Can I contribute as a writer?",
      answer: "Yes, we welcome guest writers! Please contact us via our 'Contribute' page for more details.",
    },
    {
      question: "How can I subscribe to the newsletter?",
      answer: "You can subscribe by entering your email in the subscription box at the bottom of the homepage.",
    },
    {
      question: "Is there a way to share feedback or suggestions?",
      answer: "Absolutely! Use the 'Contact Us' page to share your feedback or suggestions.",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12 space-y-12">
      {/* Page Header */}
      <section className="text-center">
        <h1 className="text-3xl font-extrabold text-primary mb-4">Frequently Asked Questions</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Find answers to the most common questions about our blog. If you have additional questions, feel free to contact us!
        </p>
      </section>

      {/* FAQ Accordion */}
      <Accordion type="multiple" className="space-y-6">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className=" rounded-lg "
          >
            <AccordionTrigger className="flex justify-between items-center text-lg font-medium bg-gray-100 hover:bg-gray-200 px-6 py-4 rounded-t-lg">
              {faq.question}
              <span className="ml-4 transform group-hover:rotate-180 transition-transform">
                ▼
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4 text-muted-foreground bg-white ">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
