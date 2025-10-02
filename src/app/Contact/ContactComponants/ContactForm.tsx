"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";


interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  attachment: File | null;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [userType, setUserType] = useState<"Buyer" | "Vendor">("Buyer");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    attachment: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/))
      newErrors.email = "Please enter a valid Gmail address";
    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be exactly 10 digits";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 10) {
        setFormData((prev) => ({ ...prev, phone: numericValue }));
      }
      setErrors((prev) => ({ ...prev, phone: "" }));
      return;
    }

    if (name === "attachment" && files) {
      setFormData((prev) => ({ ...prev, attachment: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Form submitted:", { userType, ...formData });
    setSuccess(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      attachment: null,
    });
  };

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-2 transition-colors duration-300 " +
    "hover:border-[var(--text-hover-clr)] focus:border-[var(--text-hover-clr)] outline-none";

  return (
    <section className="px-4 md:px-8 lg:px-16 xl:px-24 py-6 md:py-12 lg:py-16 bg-[var(--section-bg-clr)]">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col lg:flex-row md:items-center">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[var(--text-clr)] text-center md:text-left font-cormorant">
            Contact Support
          </h2>
          {success && (
            <div className="bg-green-100 text-[var(--text-clr)] p-4 mb-6 rounded font-nexa">
              Thank you! We’ll get back to you within 24–48 hours.
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4 font-nexa">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={inputClass}
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Gmail Address"
                  className={inputClass}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className={inputClass}
                maxLength={10}
                required
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <select
                  value={userType}
                  onChange={(e) =>
                    setUserType(e.target.value as "Buyer" | "Vendor")
                  }
                  className={inputClass}
                >
                  <option>Buyer</option>
                  <option>Vendor</option>
                </select>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className={inputClass}
                  required
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className={inputClass + " h-32 resize-none"}
                required
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>
            {userType === "Vendor" && (
              <input
                type="file"
                name="attachment"
                onChange={handleChange}
                className={inputClass}
              />
            )}
            <button
              type="submit"
              className="font-nexa w-full bg-[var(--text-hover-clr)] text-white font-semibold py-3 rounded-2xl hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block w-1/2">
         <Image
  src="/images/contact-form.webp" // public path
  alt="Contact Illustration"
  fill={false} // optional, not using layout fill
  width={600}  // adjust as needed
  height={400} // adjust as needed
  className="w-full h-full object-cover"
/>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;
