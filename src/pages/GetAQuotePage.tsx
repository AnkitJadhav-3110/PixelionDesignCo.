import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  Building,
  User,
  Send,
  Lock,
  MessageCircle,
  Clock,
  Sparkles,
  Headphones,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { studioInfo, getWhatsAppUrl } from '../data/pixelionData';
import { CursorState } from '../types';
import SEOHead from '../components/SEOHead';
import LazyImage from '../components/LazyImage';
import PreFooterBanner from '../components/PreFooterBanner';
import CustomSelect from '../components/CustomSelect';
import { submitToWeb3Forms, SERVICE_OPTIONS } from '../services/contactService';

interface GetAQuotePageProps {
  setCursorState: (state: CursorState) => void;
}

export default function GetAQuotePage({ setCursorState }: GetAQuotePageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Branding & Visual Identity',
    budget: '₹15,000 - ₹35,000',
    message: '',
    botcheck: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const budgetOptions = [
    'Under ₹15,000',
    '₹15,000 - ₹35,000',
    '₹35,000 - ₹75,000',
    '₹75,000 - ₹1,50,000',
    '₹1,50,000+',
    'Flexible / Undecided',
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
      errs.message = 'Please provide a brief project description.';
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
      const fullMessage = `Service: ${formData.service}\nBudget: ${formData.budget}\nCompany: ${formData.company || 'N/A'}\n\nProject Brief:\n${formData.message}`;

      const result = await submitToWeb3Forms({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.service,
        message: fullMessage,
        botcheck: formData.botcheck,
      });

      if (result.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: 'Branding & Visual Identity',
          budget: '₹15,000 - ₹35,000',
          message: '',
          botcheck: '',
        });
      } else {
        setErrorMessage(result.message || 'Unable to submit your quote request. Please reach out on WhatsApp.');
      }
    } catch (err) {
      setErrorMessage('Something went wrong. Please connect with us directly on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 sm:pt-28 pb-12">
      <SEOHead
        title="Get a Quote | Pixelion Design Co."
        description="Request a project proposal or quote for your brand, graphic design, UI/UX, print, or packaging needs in Bharuch, Gujarat."
        canonicalPath="/get-a-quote"
      />

      {/* 1. HERO SECTION (Matching additional-contact-form-reference.jpeg) */}
      <section className="relative px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Eyebrow, Headline, Paragraph, 3 Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#E31E24] tracking-widest uppercase">
                START YOUR PROJECT
              </span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#2C3D6C] tracking-tight leading-[1.08] break-words">
              Let's Create <br />
              <span className="text-[#E31E24]">Something Amazing</span>
            </h1>

            <p className="font-sans-body text-sm sm:text-base lg:text-lg text-[#46516A] leading-relaxed max-w-xl">
              Have a project in mind? Fill out the form below and tell us about your ideas. Our team will get back to you within 24 hours.
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
                  src="/assets/concepts/concept-uiux-mobile-01.webp"
                  alt="Pixelion Design Co. Project Scoping"
                  priority={true}
                  placeholderTone="light"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FORM & "WHAT HAPPENS NEXT?" TIMELINE (2 COLUMNS) */}
      <section className="py-12 sm:py-20 border-t border-[#E2E6EE]/80 bg-[#FDFEFE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: "Tell Us About Your Project" Form (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-[#E2E6EE] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
              <div>
                <h2 className="font-display font-black text-2xl text-[#2C3D6C]">
                  Tell Us About Your Project
                </h2>
                <p className="font-sans-body text-xs sm:text-sm text-[#46516A] mt-1 leading-relaxed">
                  Fill out the details below so we can understand your requirements better.
                </p>
              </div>

              {submitted && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <p className="font-sans-body text-xs">
                    Your project details have been received! Dhruvrajsinh Rana will review your brief and send a customized proposal within 24 hours.
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

                  {/* Company */}
                  <div className="space-y-1">
                    <label className="font-sans-body text-xs font-bold text-[#2C3D6C]">
                      Company / Brand Name
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        placeholder="Acme Studio"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-[#FDFEFE] border border-[#E2E6EE] focus:border-[#E31E24] rounded-xl pl-10 pr-3.5 py-2.5 text-xs font-sans-body focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Service Dropdown */}
                  <div>
                    <CustomSelect
                      label="Select Service"
                      value={formData.service}
                      options={SERVICE_OPTIONS}
                      onChange={(val) => setFormData({ ...formData, service: val })}
                    />
                  </div>

                  {/* Budget Dropdown */}
                  <div>
                    <CustomSelect
                      label="Project Budget (Optional)"
                      value={formData.budget}
                      options={budgetOptions}
                      onChange={(val) => setFormData({ ...formData, budget: val })}
                    />
                  </div>
                </div>

                {/* Brief */}
                <div className="space-y-1">
                  <label className="font-sans-body text-xs font-bold text-[#2C3D6C]">
                    Project Brief *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project, goals, target audience, and any specific requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#FDFEFE] border border-[#E2E6EE] focus:border-[#E31E24] rounded-xl p-3.5 text-xs font-sans-body focus:outline-hidden resize-none"
                  />
                  {errors.message && <p className="text-[10px] text-red-600">{errors.message}</p>}
                </div>

                {/* Submit & Lock microcopy */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#E31E24] hover:bg-[#C81920] text-white px-8 py-3.5 rounded-full font-cta text-xs font-bold tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit My Project</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1.5 text-[11px] text-[#46516A]/80 font-sans-body">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Your information is secure and will never be shared.</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Right Column: "What Happens Next?" & WhatsApp Direct (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* "What Happens Next?" */}
              <div className="bg-white border border-[#E2E6EE] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                <div className="border-b border-[#E2E6EE] pb-3">
                  <h3 className="font-display font-black text-xl text-[#2C3D6C]">
                    What Happens Next?
                  </h3>
                  <div className="w-8 h-[2px] bg-[#E31E24] mt-2" />
                </div>

                <div className="space-y-6">
                  {[
                    {
                      step: '1',
                      title: 'We Receive Your Project',
                      desc: "We'll review your details and understand your requirements.",
                    },
                    {
                      step: '2',
                      title: 'We Analyze & Plan',
                      desc: 'Our team will analyze your needs and create the best strategy.',
                    },
                    {
                      step: '3',
                      title: 'We Get to Work',
                      desc: 'We start working on your project and keep you updated at every step.',
                    },
                    {
                      step: '4',
                      title: 'Deliver Excellence',
                      desc: 'We deliver high-quality designs that exceed your expectations.',
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <span className="w-6 h-6 rounded-full bg-[#E31E24] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {item.step}
                      </span>
                      <div>
                        <h4 className="font-display font-bold text-xs sm:text-sm text-[#2C3D6C]">
                          {item.title}
                        </h4>
                        <p className="font-sans-body text-xs text-[#46516A] mt-0.5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct WhatsApp Card (From additional-contact-layout-reference.jpeg) */}
              <div className="bg-[#2C3D6C] text-white rounded-3xl p-6 sm:p-7 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 fill-white" />
                    </div>
                    <span className="font-display font-bold text-sm text-white">
                      Chat on WhatsApp
                    </span>
                  </div>
                  <span className="font-mono text-[9px] font-bold text-emerald-400 bg-white/10 px-2 py-0.5 rounded-full">
                    Instant Response
                  </span>
                </div>

                <p className="font-sans-body text-xs text-white/80 leading-relaxed">
                  Have a quick question? Message us directly on WhatsApp for immediate support.
                </p>

                <a
                  href={getWhatsAppUrl("Hello Dhruvrajsinh! I'd like to get a quote for a new design project with Pixelion Design Co.")}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-full font-cta text-xs font-bold tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message on WhatsApp</span>
                </a>

                <div className="pt-2 border-t border-white/10 text-[11px] font-sans-body text-white/70 text-center">
                  Talk to our experts: <strong className="text-white">+91-70161 31424</strong> (Mon-Sat 10am-7pm)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "TRUSTED BY 120+ BUSINESSES" LOGO STRIP */}
      <section className="py-10 border-t border-[#E2E6EE]/80 bg-[#FDFEFE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E31E24]/10 text-[#E31E24] flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs sm:text-sm text-[#2C3D6C]">
                  Trusted by 120+ Businesses
                </h4>
                <p className="font-sans-body text-[11px] text-[#46516A]">
                  Startups, brands, and enterprises that trust Pixelion Design Co.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 sm:gap-10 opacity-70">
              <span className="font-display font-black text-xs sm:text-sm text-[#2C3D6C]">AB NATURALS</span>
              <span className="font-display font-black text-xs sm:text-sm text-[#2C3D6C]">FITFUEL</span>
              <span className="font-display font-black text-xs sm:text-sm text-[#2C3D6C]">URBAN SPACE</span>
              <span className="font-display font-black text-xs sm:text-sm text-[#2C3D6C]">SHINE BEAUTY</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRE-FOOTER BANNER */}
      <PreFooterBanner
        title="Ready to Bring Your"
        highlightWord="Ideas to Life?"
        titleEnd=""
        subtitle="Let's work together and create something truly amazing."
        buttonText="Start My Project"
        onButtonClick={() => {
          window.scrollTo({ top: 300, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
