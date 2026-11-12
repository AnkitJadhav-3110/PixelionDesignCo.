import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Copy, Check, Sparkles, AlertCircle, Loader2, MessageCircle, Mail } from 'lucide-react';
import { UserSettings, CursorState } from '../types';
import { submitToWeb3Forms, SERVICE_OPTIONS } from '../services/contactService';
import { studioInfo, getWhatsAppUrl } from '../data/pixelionData';
import CustomSelect from './CustomSelect';

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userSettings: UserSettings;
  setCursorState: (state: CursorState) => void;
}

export default function ContactDrawer({
  isOpen,
  onClose,
  userSettings,
  setCursorState,
}: ContactDrawerProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Branding & Visual Identity',
    message: '',
    botcheck: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const getDynamicWhatsAppUrl = () => {
    const trimmedName = formData.name.trim();
    const trimmedService = formData.service.trim();
    const trimmedMsg = formData.message.trim();
    if (trimmedName || trimmedMsg) {
      let custom = `Hello Dhruvrajsinh! I visited the Pixelion Design Co. website.`;
      if (trimmedName) custom += ` My name is ${trimmedName}.`;
      if (trimmedService) custom += ` I'm inquiring about ${trimmedService}.`;
      if (trimmedMsg) custom += ` Message: "${trimmedMsg}"`;
      return getWhatsAppUrl(custom);
    }
    return studioInfo.whatsapp;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const trimmedName = formData.name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      newErrors.name = 'Full name is required (minimum 2 characters).';
    }

    const trimmedEmail = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    const trimmedPhone = formData.phone.trim();
    if (trimmedPhone) {
      const cleanPhone = trimmedPhone.replace(/[^0-9+]/g, '');
      if (cleanPhone.length < 7) {
        newErrors.phone = 'Please provide a sensible phone format.';
      }
    }

    const trimmedMessage = formData.message.trim();
    if (!trimmedMessage) {
      newErrors.message = 'Message is required.';
    } else if (trimmedMessage.length < 10) {
      newErrors.message = 'Please provide a brief message (minimum 10 characters).';
    }

    return newErrors;
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
        company: formData.company,
        service: formData.service,
        message: formData.message,
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
          message: '',
          botcheck: '',
        });
      } else {
        setErrorMessage(
          result.message || 'Something went wrong. Please try again or contact us directly.'
        );
      }
    } catch (err) {
      setErrorMessage('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(userSettings.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Slide-In Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-[#FDFEFE] text-[#2C3D6C] shadow-2xl overflow-y-auto flex flex-col justify-between p-6 sm:p-10 border-l border-[#E2E6EE]"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E2E6EE] mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#E31E24]" />
                    <span className="font-mono text-xs font-bold tracking-widest text-[#E31E24] uppercase">
                      PIXELION DESIGN CO. • QUICK INQUIRY
                    </span>
                  </div>
                  <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#2C3D6C]">
                    Start a Conversation
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close contact drawer"
                  className="p-3 rounded-full hover:bg-[#2C3D6C]/10 text-[#2C3D6C] transition-colors"
                  onMouseEnter={() => setCursorState({ variant: 'hover', text: 'CLOSE' })}
                  onMouseLeave={() => setCursorState({ variant: 'default' })}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Form or Success State */}
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-emerald-200 p-8 rounded-3xl text-center my-8 shadow-sm space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-[#2C3D6C]">
                    Thank You!
                  </h3>
                  <p className="font-sans-body text-xs sm:text-sm text-[#46516A] leading-relaxed max-w-md mx-auto">
                    Your enquiry has been received successfully. We'll get back to you soon.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="flex-1 bg-[#E31E24] text-white hover:bg-[#C81920] py-3 rounded-xl font-cta text-xs font-bold tracking-widest transition-colors shadow-xs"
                    >
                      Send Another Inquiry
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 border border-[#E2E6EE] text-[#2C3D6C] hover:bg-[#2C3D6C]/5 py-3 rounded-xl font-cta text-xs font-bold tracking-widest transition-colors"
                    >
                      Close Window
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {errorMessage && (
                    <div className="p-4 bg-red-50 border border-[#E31E24]/30 rounded-2xl flex items-start gap-2.5 text-xs text-red-900 font-sans-body">
                      <AlertCircle className="w-4 h-4 text-[#E31E24] shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <div>
                          <strong>Submission Error: </strong>
                          {errorMessage}
                        </div>
                        <div className="pt-1 text-[#46516A]">
                          Or reach us directly on{' '}
                          <a
                            href={getDynamicWhatsAppUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline font-bold text-emerald-700"
                          >
                            WhatsApp ({studioInfo.phone})
                          </a>{' '}
                          or via{' '}
                          <a
                            href={`mailto:${studioInfo.email}`}
                            className="underline font-bold text-[#E31E24]"
                          >
                            email
                          </a>
                          .
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Honeypot field for spam prevention */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="botcheck"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.botcheck}
                      onChange={(e) => setFormData({ ...formData, botcheck: e.target.value })}
                    />
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block font-sans-body text-xs font-bold tracking-wider text-[#2C3D6C] uppercase mb-1.5">
                      Your Full Name <span className="text-[#E31E24]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      className={`w-full bg-white border rounded-xl px-4 py-3 font-sans-body text-xs text-[#2C3D6C] focus:outline-hidden transition-colors ${
                        errors.name ? 'border-[#E31E24] ring-1 ring-[#E31E24]' : 'border-[#E2E6EE] focus:border-[#E31E24]'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-[11px] text-[#E31E24] font-mono flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block font-sans-body text-xs font-bold tracking-wider text-[#2C3D6C] uppercase mb-1.5">
                      Email Address <span className="text-[#E31E24]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`w-full bg-white border rounded-xl px-4 py-3 font-sans-body text-xs text-[#2C3D6C] focus:outline-hidden transition-colors ${
                        errors.email ? 'border-[#E31E24] ring-1 ring-[#E31E24]' : 'border-[#E2E6EE] focus:border-[#E31E24]'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[11px] text-[#E31E24] font-mono flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone & Company row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans-body text-xs font-bold tracking-wider text-[#2C3D6C] uppercase mb-1.5">
                        Phone <span className="text-[#46516A] text-[10px] lowercase font-normal">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                        className={`w-full bg-white border rounded-xl px-4 py-3 font-sans-body text-xs text-[#2C3D6C] focus:outline-hidden transition-colors ${
                          errors.phone ? 'border-[#E31E24] ring-1 ring-[#E31E24]' : 'border-[#E2E6EE] focus:border-[#E31E24]'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-[11px] text-[#E31E24] font-mono flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" /> {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block font-sans-body text-xs font-bold tracking-wider text-[#2C3D6C] uppercase mb-1.5">
                        Company <span className="text-[#46516A] text-[10px] lowercase font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-white border border-[#E2E6EE] rounded-xl px-4 py-3 font-sans-body text-xs text-[#2C3D6C] focus:outline-hidden focus:border-[#E31E24] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <CustomSelect
                      label="SERVICE INTERESTED IN"
                      value={formData.service}
                      options={SERVICE_OPTIONS}
                      onChange={(val) => setFormData({ ...formData, service: val })}
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block font-sans-body text-xs font-bold tracking-wider text-[#2C3D6C] uppercase mb-1.5">
                      Project Details & Timeline <span className="text-[#E31E24]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your brand vision, requirements, and desired launch date..."
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      className={`w-full bg-white border rounded-xl p-4 font-sans-body text-xs text-[#2C3D6C] focus:outline-hidden transition-colors ${
                        errors.message ? 'border-[#E31E24] ring-1 ring-[#E31E24]' : 'border-[#E2E6EE] focus:border-[#E31E24]'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-[11px] text-[#E31E24] font-mono flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#E31E24] hover:bg-[#C81920] text-white font-cta text-xs font-bold tracking-widest py-4 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    onMouseEnter={() => setCursorState({ variant: 'hover', text: 'SEND' })}
                    onMouseLeave={() => setCursorState({ variant: 'default' })}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>SEND INQUIRY</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Quick Email & WhatsApp Alternative Footer */}
            <div className="pt-6 border-t border-[#E2E6EE] mt-6 space-y-3">
              <p className="font-sans-body text-[11px] text-[#46516A] font-semibold uppercase tracking-wider">
                OR CONNECT DIRECTLY
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center justify-between bg-white border border-[#E2E6EE] p-3 rounded-xl hover:border-[#E31E24] transition-colors text-left"
                >
                  <span className="font-display font-bold text-xs text-[#2C3D6C] truncate max-w-[140px]">
                    {userSettings.email}
                  </span>
                  <span className="text-[10px] font-sans-body text-[#E31E24] font-bold flex items-center gap-1 shrink-0">
                    {copied ? 'COPIED!' : 'COPY'}
                    {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  </span>
                </button>

                <a
                  href={getDynamicWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl hover:bg-emerald-100 transition-colors"
                >
                  <span className="font-sans-body font-bold text-xs flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" /> WhatsApp
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold">
                    {studioInfo.phone}
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
