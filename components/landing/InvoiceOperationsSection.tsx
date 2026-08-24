"use client";

import * as React from "react";
import { Search, Filter } from "lucide-react";

export function InvoiceOperationsSection() {
  return (
    <section className="landing-operations-section" id="faq">
      <div className="landing-container">
        <div className="landing-section-header-left">
          <h2 className="landing-section-title-left">
            Everything you need to manage invoices.
          </h2>
          <p className="landing-section-subtitle-left">
            Filter by status, search by customer or invoice number, and open any invoice for the full detail — <br className="hidden-mobile" />
            all in the same interface your team uses every day.
          </p>
        </div>

        <div className="landing-op-mockup-card">
          {/* Mockup Window Top Bar */}
          <div className="landing-mockup-header">
            <div className="landing-window-dots">
              <span className="landing-dot" />
              <span className="landing-dot" />
              <span className="landing-dot" />
            </div>
            <div className="landing-address-bar">
              <span>invox.app/invoices</span>
            </div>
          </div>

          {/* Table Control Toolbar */}
          <div className="landing-op-toolbar">
            <div className="landing-op-search">
              <Search size={15} style={{ color: "#94A3B8" }} />
              <span>Search invoices or customers</span>
            </div>
            <div className="landing-op-filters">
              <button className="landing-filter-btn active">All</button>
              <button className="landing-filter-btn">Paid</button>
              <button className="landing-filter-btn">Pending</button>
              <button className="landing-filter-btn">Overdue</button>
              <button className="landing-filter-btn">Draft</button>
              <button className="landing-filter-btn date">
                <Filter size={13} />
                <span>Date</span>
              </button>
            </div>
          </div>

          {/* Invoices Table */}
          <div className="landing-op-table-wrap">
            <table className="landing-op-table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Due</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="col-inv">INV-2041</td>
                  <td className="col-cust">Northwind Studio</td>
                  <td className="col-amt">$12,400</td>
                  <td className="col-due">Mar 12</td>
                  <td>
                    <span className="landing-status-badge landing-status-paid">
                      <span className="landing-status-dot" /> Paid
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="col-inv">INV-2040</td>
                  <td className="col-cust">Harbor Hospitality</td>
                  <td className="col-amt">$8,150</td>
                  <td className="col-due">Mar 18</td>
                  <td>
                    <span className="landing-status-badge landing-status-pending">
                      <span className="landing-status-dot" /> Pending
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="col-inv">INV-2039</td>
                  <td className="col-cust">Lumen Labs</td>
                  <td className="col-amt">$3,980</td>
                  <td className="col-due">Mar 04</td>
                  <td>
                    <span className="landing-status-badge landing-status-overdue">
                      <span className="landing-status-dot" /> Overdue
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="col-inv">INV-2038</td>
                  <td className="col-cust">Atlas Freight</td>
                  <td className="col-amt">$21,600</td>
                  <td className="col-due">Mar 22</td>
                  <td>
                    <span className="landing-status-badge landing-status-paid">
                      <span className="landing-status-dot" /> Paid
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="col-inv">INV-2037</td>
                  <td className="col-cust">Meridian Co.</td>
                  <td className="col-amt">$5,240</td>
                  <td className="col-due">Mar 26</td>
                  <td>
                    <span className="landing-status-badge landing-status-draft">
                      <span className="landing-status-dot" /> Draft
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

