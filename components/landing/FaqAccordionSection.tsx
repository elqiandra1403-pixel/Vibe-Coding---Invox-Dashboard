"use client";

import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    question: "What is Invox?",
    answer:
      "Invox is a workspace for managing the invoice-to-cash workflow: creating and sending invoices, tracking their status, recording payments, managing customers, and reviewing analytics."
  },
  {
    question: "Can I manage invoices from Invox?",
    answer:
      "Yes! You can create, send, track status, and manage all your customer invoices in one centralized workspace."
  },
  {
    question: "Can clients access their invoices?",
    answer:
      "Yes, clients receive a secure client portal link to view their invoice status, inspect line items, and download official PDF invoices."
  },
  {
    question: "Can I record payments manually?",
    answer:
      "Yes, you can manually mark invoices as paid, record partial or full payments, and track remaining balances in real time."
  },
  {
    question: "Can I export invoices?",
    answer:
      "Yes, you can download high-quality PDF invoices anytime or export your invoice data for reporting and accounting."
  },
  {
    question: "Does Invox support payment gateways?",
    answer:
      "Yes, Invox integrates with payment gateways so your clients can pay directly from their web portal."
  },
  {
    question: "Can I control team permissions?",
    answer:
      "Yes, Invox provides role-based access control (RBAC) to ensure admins, finance managers, and staff members have appropriate permissions."
  }
];

export function FaqAccordionSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="landing-faq-accordion-section" id="faq-questions">
      <div className="landing-container">
        <div className="landing-section-header">
          <h2 className="landing-faq-accordion-title">
            Frequently asked questions
          </h2>
        </div>

        <div className="landing-faq-accordion-card">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`landing-faq-accordion-item ${isOpen ? "landing-faq-accordion-item-open" : ""}`}
              >
                <button
                  type="button"
                  className="landing-faq-accordion-trigger"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="landing-faq-accordion-question">
                    {item.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp size={16} className="landing-faq-accordion-icon" />
                  ) : (
                    <ChevronDown size={16} className="landing-faq-accordion-icon" />
                  )}
                </button>

                {isOpen && (
                  <div className="landing-faq-accordion-content">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
