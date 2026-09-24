import { useState } from 'react';
import type { ChangeEvent, FocusEvent, FormEvent, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { StarGlyph } from './ui';

interface FormFields {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

type Touched = Record<keyof FormFields, boolean>;

const EMPTY: FormFields = { firstName: '', lastName: '', email: '', phone: '', company: '', service: '', message: '' };
const UNTOUCHED: Touched = { firstName: false, lastName: false, email: false, phone: false, company: false, service: false, message: false };
const ALL_TOUCHED: Touched = { firstName: true, lastName: true, email: true, phone: true, company: true, service: true, message: true };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Field = ({ id, label, required, children }: { id: string; label: string; required?: boolean; children: ReactNode }) => (
  <div>
    <label htmlFor={id} className="eyebrow text-[0.66rem] text-ink-soft">
      {label.replace(' *', '')}
      {required && <span className="ml-1 text-oxblood">*</span>}
    </label>
    {children}
  </div>
);

export const ContactForm = () => {
  const { t } = useLanguage();
  const [fields, setFields] = useState<FormFields>(EMPTY);
  const [touched, setTouched] = useState<Touched>(UNTOUCHED);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const invalid: Touched = {
    firstName: !fields.firstName.trim(),
    lastName: !fields.lastName.trim(),
    email: !EMAIL_RE.test(fields.email),
    phone: false,
    company: false,
    service: !fields.service,
    message: !fields.message.trim(),
  };
  const showError = (name: keyof FormFields) => touched[name] && invalid[name];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const reset = () => {
    setStatus('success');
    setFields(EMPTY);
    setTouched(UNTOUCHED);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched(ALL_TOUCHED);

    if (Object.values(invalid).some(Boolean)) {
      setStatus('error');
      return;
    }

    setStatus('sending');

    const formUrl = import.meta.env.VITE_CONTACT_FORM_URL;

    if (!formUrl) {
      // Fallback: If no Google Apps Script Web App URL is configured, simulate success.
      console.warn('Contact form URL (VITE_CONTACT_FORM_URL) not set. Simulating form submission.');
      setTimeout(reset, 1500);
      return;
    }

    try {
      // Using mode: 'no-cors' is necessary for Google Apps Script Web Apps.
      // Google redirects the POST request to script.googleusercontent.com,
      // which causes CORS blocks on standard mode: 'cors' requests in the browser,
      // even if the script returns CORS headers. no-cors allows the submission to succeed.
      const token = import.meta.env.VITE_CONTACT_FORM_TOKEN || '';
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...fields,
          token: token,
        }),
      });
      reset();
    } catch (err) {
      console.error('Error submitting contact form', err);
      setStatus('error');
    }
  };

  const common = (name: keyof FormFields) => ({
    id: name,
    name,
    value: fields[name],
    onChange: handleChange,
    onBlur: handleBlur,
    'aria-invalid': showError(name) || undefined,
    className: 'field mt-1',
  });

  return (
    <div className="relative border border-sand bg-paper-light p-6 shadow-[0_24px_60px_-36px_rgb(35_62_101_/_0.4)] sm:p-10 lg:p-12">
      <h2 className="display text-[clamp(2rem,3.4vw,2.8rem)] text-navy">{t('cnt.form_title')}</h2>
      <p className="mt-3 text-ink-soft">{t('cnt.form_sub')}</p>

      <div aria-live="polite">
        {status === 'success' && (
          <p className="page-enter mt-8 flex items-start gap-3 border-l-2 border-gold bg-sand-light/70 px-4 py-3 text-[0.95rem] text-navy">
            <StarGlyph className="mt-1 h-3.5 w-3.5 shrink-0 text-gold" />
            {t('cnt.success')}
          </p>
        )}
        {status === 'error' && (
          <p className="page-enter mt-8 border-l-2 border-oxblood bg-oxblood/5 px-4 py-3 text-[0.95rem] text-oxblood">
            {t('cnt.error')}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-8" noValidate>
        <div className="grid gap-8 sm:grid-cols-2">
          <Field id="firstName" label={t('cnt.fname_lbl')} required>
            <input type="text" autoComplete="given-name" placeholder={t('cnt.fname_ph')} required {...common('firstName')} />
          </Field>
          <Field id="lastName" label={t('cnt.lname_lbl')} required>
            <input type="text" autoComplete="family-name" placeholder={t('cnt.lname_ph')} required {...common('lastName')} />
          </Field>
          <Field id="email" label={t('cnt.email_lbl')} required>
            <input type="email" autoComplete="email" placeholder="name@company.com" required {...common('email')} />
          </Field>
          <Field id="phone" label={t('cnt.phone_lbl')}>
            <input type="tel" autoComplete="tel" placeholder="+90 555 000 00 00" {...common('phone')} />
          </Field>
          <Field id="company" label={t('cnt.company_lbl')}>
            <input type="text" autoComplete="organization" placeholder={t('cnt.company_ph')} {...common('company')} />
          </Field>
          <Field id="service" label={t('cnt.service_lbl')} required>
            <div className="relative">
              <select required {...common('service')} className={`field mt-1 pr-8 ${fields.service ? '' : 'text-ink-soft/70'}`}>
                <option value="" disabled>
                  {t('cnt.service_def')}
                </option>
                <optgroup label={t('cnt.og_eng')}>
                  <option value="technical-drawing">{t('cnt.opt_draw')}</option>
                  <option value="structural-design">{t('cnt.opt_struct')}</option>
                  <option value="construction-mgmt">{t('cnt.opt_constr')}</option>
                  <option value="engineering-consulting">{t('cnt.opt_consult')}</option>
                </optgroup>
                <optgroup label={t('cnt.og_sw')}>
                  <option value="software-dev">{t('cnt.opt_sw')}</option>
                  <option value="data-science">{t('cnt.opt_data')}</option>
                  <option value="machine-learning">{t('cnt.opt_ml')}</option>
                  <option value="api-integration">{t('cnt.opt_api')}</option>
                </optgroup>
                <optgroup label={t('cnt.og_int')}>
                  <option value="integrated">{t('cnt.opt_int')}</option>
                </optgroup>
                <option value="other">{t('cnt.opt_other')}</option>
              </select>
              <svg aria-hidden viewBox="0 0 12 8" className="pointer-events-none absolute right-1 top-1/2 h-2 w-3 text-navy">
                <path d="M1 1.5 L6 6.5 L11 1.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </div>
          </Field>
        </div>

        <Field id="message" label={t('cnt.msg_lbl')} required>
          <textarea rows={5} placeholder={t('cnt.msg_ph')} required {...common('message')} className="field mt-1 resize-y" />
        </Field>

        <div className="flex flex-col-reverse gap-6 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-sm text-[0.8rem] leading-relaxed text-ink-soft">{t('cnt.req_note')}</p>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="group inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full bg-oxblood py-4 pl-7 pr-6 font-medium text-paper transition-colors duration-300 hover:bg-oxblood-deep disabled:cursor-wait disabled:opacity-60"
          >
            {status === 'sending' ? t('cnt.btn_sending') : t('cnt.btn_submit')}
            <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
          </button>
        </div>
      </form>
    </div>
  );
};
