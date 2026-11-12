import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  User,
  FileText,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Instagram,
  Linkedin,
  ExternalLink,
  Plus,
  Minus,
  Sparkles,
  Headphones,
} from 'lucide-react';
import { studioInfo, getWhatsAppUrl } from '../data/pixelionData';
import { CursorState } from '../types';
import SEOHead from '../components/SEOHead';
import LazyImage from '../components/LazyImage';
import PreFooterBanner from '../components/PreFooterBanner';
import { submitToWeb3Forms } from '../services/contactService';

interface ContactPageProps {
  setCursorState: (state: CursorState) => void;
}

export default function ContactPage({ setCursorState }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    botcheck: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // FAQ open/close state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What services do you offer?',
      a: 'We specialize in 6 core disciplines: Branding & Visual Identity, Graphic Design, UI/UX & Web Design, Social Media Creatives, Print & Packaging Design, and Event Invitations.',
    },
    {
      q: 'How long does a project take?',
      a: 'Turnaround time depends on project scope. Logo and identity concepts typically take 5-7 business days, packaging designs take 7-10 days, and full digital UI/UX projects take 2-4 weeks.',
    },
    {
      q: 'Do you offer revisions?',
      a: 'Yes, client satisfaction is our priority. We include revision rounds in all proposals to ensure the final deliverables match your brand requirements perfectly.',
    },
    {
      q: 'How do I get started?',
      a: 'Simply send us a message through the form above or reach out directly on WhatsApp. We will discuss your goals, review your brief, and provide a tailored proposal within 24 hours.',
    },
    {
      q: 'What is your pricing?',
      a: 'We offer competitive and transparent pricing based on the deliverable scope, complexity, and timelines. We have clear package options for startups as well as established brands.',
    },
    {
      q: 'Do you work on long-term projects?',
      a: 'Yes, we provide ongoing monthly design retainers for businesses requiring consistent social media creatives, print marketing collateral, and continuous UI/UX updates.',
    },
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Full name is required.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Valid email is required.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errs.message = 'Please provide a brief message.';
    }
    return errs;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const result = await submitToWeb3Forms({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.subject || 'General Inquiry',
        message: formData.message,
        botcheck: formData.botcheck,
      });

      if (result.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          botcheck: '',
        });
      } else {
        setErrorMessage(result.message || 'Something went wrong. Please try again or reach out on WhatsApp.');
      }
    } catch (err) {
      setErrorMessage('Something went wrong. Please try again or contact us directly on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 sm:pt-28 pb-12">
      <SEOHead
        title="Contact Us | Pixelion Design Co."
        description="Get in touch with Pixelion Design Co. in Bharuch, Gujarat. Send us a message, find our office location, or read our frequently asked questions."
        canonicalPath="/contact"
      />

      {/* 1. HERO SECTION (Matching 08-contact-reference.jpeg) */}
      <section className="relative px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Eyebrow, Headline, Subtitle, 3 Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase">
                CONTACT US
              </span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#2C3D6C] tracking-tight leading-[1.08] break-words">
              Let's Create <br />
              <span className="text-[#E31E24]">Something Amazing</span>
            </h1>

            <p className="font-sans-body text-sm sm:text-base lg:text-lg text-[#46516A] leading-relaxed max-w-xl">
              We're here to listen, discuss and deliver the best design solutions for your business.
            </p>

            {/* 3 Value Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="flex items-start gap-3 bg-white border border-[#E2E6EE] rounded-xl p-3.5 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-[#E31E24]/10 text-[#E31E24] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-[#2C3D6C]">Quick Response</h4>
                  <p className="font-sans-body text-[10px] text-[#46516A]">We reply within 24 hours.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white border border-[#E2E6EE] rounded-xl p-3.5 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-[#2C3D6C]/10 text-[#2C3D6C] flex items-center justify-center shrink-0">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-[#2C3D6C]">Free Consultation</h4>
                  <p className="font-sans-body text-[10px] text-[#46516A]">Talk to our experts for free.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white border border-[#E2E6EE] rounded-xl p-3.5 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-[#E31E24]/10 text-[#E31E24] flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-[#2C3D6C]">100% Satisfaction</h4>
                  <p className="font-sans-body text-[10px] text-[#46516A]">Your satisfaction is our priority.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Presentation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg bg-white border border-[#E2E6EE] rounded-3xl p-3 sm:p-4 shadow-xl overflow-hidden group">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-[#2C3D6C]/5 border border-[#E2E6EE]/80">
                <LazyImage
                  src="/assets/concepts/concept-abstract-hero-01.webp"
                  alt="Pixelion Design Co. Studio Communication"
                  priority={true}
                  placeholderTone="light"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FORM & CONTACT INFORMATION (2 COLUMNS) */}
      <section className="py-12 sm:py-20 border-t border-[#E2E6EE]/80 bg-[#FDFEFE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: "Send Us a Message" Form (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-[#E2E6EE] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
              <div>
                <h2 className="font-display font-black text-2xl text-[#2C3D6C]">
                  Send Us a Message
                </h2>
                <p className="font-sans-body text-xs sm:text-sm text-[#46516A] mt-1 leading-relaxed">
                  Have a project in mind? Fill out the form and we'll get back to you soon.
                </p>
              </div>

              {submitted && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <p className="font-sans-body text-xs">
                    Thank you! Your message has been sent successfully. We will contact you within 24 hours.
                  </p>
                </div>
              )}

              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <p className="font-sans-body text-xs">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="font-sans-body text-xs font-bold text-[#2C3D6C]">
                      Your Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#FDFEFE] border border-[#E2E6EE] focus:border-[#E31E24] rounded-xl pl-10 pr-3.5 py-2.5 text-xs font-sans-body focus:outline-hidden"
                      />
                    </div>
                    {errors.name && <p className="text-[10px] text-red-600">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="font-sans-body text-xs font-bold text-[#2C3D6C]">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#FDFEFE] border border-[#E2E6EE] focus:border-[#E31E24] rounded-xl pl-10 pr-3.5 py-2.5 text-xs font-sans-body focus:outline-hidden"
                      />
                    </div>
                    {errors.email && <p className="text-[10px] text-red-600">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="font-sans-body text-xs font-bold text-[#2C3D6C]">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#FDFEFE] border border-[#E2E6EE] focus:border-[#E31E24] rounded-xl pl-10 pr-3.5 py-2.5 text-xs font-sans-body focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1">
                    <label className="font-sans-body text-xs font-bold text-[#2C3D6C]">
                      Subject
                    </label>
                    <div className="relative">
                      <FileText className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        placeholder="Branding / UI/UX Project"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-[#FDFEFE] border border-[#E2E6EE] focus:border-[#E31E24] rounded-xl pl-10 pr-3.5 py-2.5 text-xs font-sans-body focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="font-sans-body text-xs font-bold text-[#2C3D6C]">
                    Your Message *
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <textarea
                      rows={4}
                      placeholder="Tell us about your brand, requirements, or idea..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#FDFEFE] border border-[#E2E6EE] focus:border-[#E31E24] rounded-xl pl-10 pr-3.5 py-2.5 text-xs font-sans-body focus:outline-hidden resize-none"
                    />
                  </div>
                  {errors.message && <p className="text-[10px] text-red-600">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#E31E24] hover:bg-[#C81920] text-white px-8 py-3.5 rounded-full font-cta text-xs font-bold tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Column: "Contact Information" Card (5 cols) */}
            <div className="lg:col-span-5 bg-white border border-[#E2E6EE] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="font-display font-black text-xl text-[#2C3D6C]">
                Contact Information
              </h2>

              <div className="space-y-5 font-sans-body text-xs">
                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#2C3D6C]/5 text-[#2C3D6C] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#E31E24]" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-[#2C3D6C]">Our Location</h4>
                    <p className="text-[#46516A] mt-0.5 leading-relaxed">
                      Bharuch, Gujarat, India 392001
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#2C3D6C]/5 text-[#2C3D6C] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#E31E24]" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-[#2C3D6C]">Phone Number</h4>
                    <p className="text-[#46516A] mt-0.5">
                      <a href="tel:+917016131424" className="hover:text-[#E31E24]">+91-70161 31424</a>
                    </p>
                    <p className="text-[#46516A]">
                      <a href={studioInfo.whatsapp} target="_blank" rel="noreferrer" className="hover:text-[#E31E24]">+91-70161 31424 (WhatsApp)</a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#2C3D6C]/5 text-[#2C3D6C] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#E31E24]" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-[#2C3D6C]">Email Address</h4>
                    <p className="text-[#46516A] mt-0.5">
                      <a href={`mailto:${studioInfo.email}`} className="hover:text-[#E31E24]">{studioInfo.email}</a>
                    </p>
                    <p className="text-[#46516A]">
                      <a href="mailto:info@pixeliondesignco.com" className="hover:text-[#E31E24]">info@pixeliondesignco.com</a>
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#2C3D6C]/5 text-[#2C3D6C] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#E31E24]" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-[#2C3D6C]">Working Hours</h4>
                    <p className="text-[#46516A] mt-0.5">Mon - Sat: 10:00 AM - 7:00 PM</p>
                    <p className="text-[#46516A]/70">Sunday: Closed</p>
                  </div>
                </div>

                {/* Follow Us */}
                <div className="pt-4 border-t border-[#E2E6EE]">
                  <h4 className="font-display font-bold text-xs text-[#2C3D6C] mb-3">
                    Follow Us
                  </h4>
                  <div className="flex items-center gap-2.5">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#2C3D6C]/5 text-[#2C3D6C] hover:bg-[#E31E24] hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                    >
                      f
                    </a>
                    <a
                      href={studioInfo.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#2C3D6C]/5 text-[#2C3D6C] hover:bg-[#E31E24] hover:text-white flex items-center justify-center transition-colors text-xs"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a
                      href={studioInfo.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#2C3D6C]/5 text-[#2C3D6C] hover:bg-[#E31E24] hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                    >
                      in
                    </a>
                    <a
                      href={studioInfo.behance}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#2C3D6C]/5 text-[#2C3D6C] hover:bg-[#E31E24] hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                    >
                      Bē
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "FIND US HERE" BHARUCH MAP SECTION (From 08-contact-reference.jpeg) */}
      <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="relative rounded-3xl overflow-hidden border border-[#E2E6EE] shadow-sm bg-[#E9ECF2] h-80 sm:h-96 flex items-center">
          {/* Stylized Map Background Representation */}
          <div className="absolute inset-0 bg-[#E8EEF5]">
            <svg className="w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="mapgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D1D9E6" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#mapgrid)" />
              {/* Narmada River stylized blue curve */}
              <path
                d="M -50 240 Q 300 200 600 260 T 1300 220"
                fill="none"
                stroke="#B8D0E8"
                strokeWidth="45"
              />
            </svg>
            {/* Map Pin Marker */}
            <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <div className="w-10 h-10 rounded-full bg-[#E31E24] text-white flex items-center justify-center shadow-lg animate-bounce mx-auto">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="bg-white/95 text-[#2C3D6C] px-2.5 py-1 rounded-md text-[10px] font-bold shadow-md inline-block mt-1">
                Pixelion Design Co.
              </span>
            </div>
          </div>

          {/* Overlay Info Card on Left */}
          <div className="relative z-10 m-6 sm:m-10 max-w-sm bg-white/95 backdrop-blur-md border border-[#E2E6EE] rounded-2xl p-6 shadow-xl space-y-3">
            <h3 className="font-display font-black text-xl text-[#2C3D6C]">
              Find Us Here
            </h3>
            <p className="font-sans-body text-xs text-[#46516A] leading-relaxed">
              We are located in Bharuch, Gujarat. Feel free to visit our studio or connect online.
            </p>
            <a
              href="https://maps.google.com/?q=Bharuch+Gujarat"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#2C3D6C] hover:bg-[#1E2B4D] text-white px-5 py-2.5 rounded-full font-cta text-xs font-bold tracking-wider transition-colors shadow-sm"
            >
              <span>Get Directions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS (SINGLE-COLUMN ACCORDION) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 border-t border-[#E2E6EE]/80">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#2C3D6C] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-4 w-full">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={faq.q}
                className="bg-white border border-[#E2E6EE] rounded-2xl p-5 sm:p-6 transition-all hover:border-[#E31E24] shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left gap-4 focus:outline-hidden"
                >
                  <span className="font-display font-bold text-sm sm:text-base text-[#2C3D6C]">
                    {faq.q}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-[#2C3D6C]/5 text-[#2C3D6C] flex items-center justify-center shrink-0">
                    {isOpen ? <Minus className="w-4 h-4 text-[#E31E24]" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <p className="font-sans-body text-xs sm:text-sm text-[#46516A] leading-relaxed mt-3 pt-3 border-t border-[#E2E6EE]/80">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. PRE-FOOTER BANNER */}
      <PreFooterBanner
        title="Ready to Start Your"
        highlightWord="Project?"
        titleEnd=""
        subtitle="Let's discuss your ideas and bring them to life."
        buttonText="Get a Free Quote"
        buttonLink="/get-a-quote"
      />
    </div>
  );
}
