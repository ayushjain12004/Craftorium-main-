"use client";
import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const ContactDetails: React.FC = () => {
  return (
    <section
      className="py-6 md:py-12 lg:py-16 px-4 md:px-8 lg:px-16 xl:px-24"
      style={{ backgroundColor: "var(--section-bg-clr)" }}
    >
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Left: Contact Info */}
        <div>
          <h2
            className="text-4xl lg:text-5xl font-bold mb-6 font-cormorant text-center md:text-left"
            style={{ color: "var(--text-clr)" }}
          >
            Contact Details
          </h2>
          <p
            className="mb-4 font-nexa"
            style={{ color: "var(--text-clr)" }}
          >
            Have questions? Reach out to us via email, phone, or visit our office.
          </p>
          <ul className="space-y-4 font-nexa divide-y divide-[var(--text-hover-clr)]">
            <li className="flex items-center gap-4 pb-2">
              <FaEnvelope style={{ color: "var(--text-clr)" }} />
              <span>
                General Support:{" "}
                <a
                  href="mailto:support@domain.com"
                  style={{ color: "var(--text-clr)" }}
                  className="hover:underline"
                >
                  support@domain.com
                </a>
              </span>
            </li>
            <li className="flex items-center gap-4 py-2">
              <FaEnvelope style={{ color: "var(--text-clr)" }} />
              <span>
                Vendor Support:{" "}
                <a
                  href="mailto:vendors@domain.com"
                  style={{ color: "var(--text-clr)" }}
                  className="hover:underline"
                >
                  vendors@domain.com
                </a>
              </span>
            </li>
            <li className="flex items-center gap-4 py-2">
              <FaPhoneAlt style={{ color: "var(--text-clr)" }} />
              <span>+91 12345 67890</span>
            </li>
            <li className="flex items-center gap-4 py-2">
              <FaMapMarkerAlt style={{ color: "var(--text-clr)" }} />
              <span>123 Multivendor Street, City, Country</span>
            </li>
          </ul>
        </div>

        {/* Right: Map */}
        <div className="w-full h-80 md:h-86 lg:h-96">
          <iframe
            title="Company Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.123456789!2d-122.41941508468136!3d37.77492927975844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064b1234567%3A0xabcdef1234567890!2sYour%20Company%20Address!5e0!3m2!1sen!2sin!4v1690000000000"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            className="rounded-lg border-0"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactDetails;
