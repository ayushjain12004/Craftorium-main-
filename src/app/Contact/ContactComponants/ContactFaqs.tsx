"use client";

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How do I become a vendor?",
    answer:
      "To become a vendor, please fill out the Vendor Onboarding Form available on our Quick Links section. Our team will review your application within 2-3 business days.",
  },
  {
    question: "How do I report a product issue?",
    answer:
      "You can report a product issue via the 'Report a Product Issue' link in Quick Links or by filling out the contact form and selecting 'Product Issue' as the subject.",
  },
  {
    question: "How do payments and payouts work?",
    answer:
      "Payments are processed weekly. Vendors receive payouts directly to their registered bank accounts. For detailed instructions, check our Payment & Refund FAQs.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Buyers can track their order using the Order Tracking link in Quick Links or by logging into their account dashboard.",
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-6 md:py-12 lg:py-16 px-4 md:px-8 lg:px-16 xl:px-24 bg-[var(--section-bg-clr)]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold mb-10 text-center font-cormorant text-[var(--text-clr)]">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="border rounded-lg bg-white shadow">
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex justify-between items-center p-4 font-medium text-left font-nexa"
              >
                {faq.question}
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {openIndex === index && (
                <div className="p-4 border-t text-gray-700 font-nexa">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
