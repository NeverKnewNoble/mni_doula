"use client";

import Link from "next/link";
import { useActionState, useState, type ReactNode } from "react";
import { joinWaitlist, type WaitlistState } from "@/app/waitlist/actions";

const initialState: WaitlistState = { status: "idle" };

const inputClass =
  "block h-[52px] w-full rounded-2xl border border-line bg-porcelain px-4 text-[1.0625rem] font-medium text-navy placeholder:font-normal placeholder:text-muted/70 outline-none transition focus:border-navy focus:bg-white focus:ring-2 focus:ring-dusk aria-[invalid=true]:border-error aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-error/30";

const cprOptions = [
  "Yes, current",
  "Previously certified, now expired",
  "No",
  "Unsure",
];

export default function WaitlistForm() {
  const [state, formAction, pending] = useActionState(
    joinWaitlist,
    initialState,
  );
  const [contactMethod, setContactMethod] = useState("");
  const [cpr, setCpr] = useState("");

  if (state.status === "success") {
    return (
      <div className="rounded-[32px] bg-white p-7 ring-1 ring-line sm:p-10">
        <div aria-hidden className="h-1.5 w-12 rounded-full bg-navy" />
        <h3 className="t-head mt-6 text-navy">You&apos;re on the list</h3>
        <p role="status" className="t-lead mt-5 max-w-[38ch] text-muted">
          {state.message}
        </p>
        <Link href="/" className="btn mt-10">
          Back to the home page
        </Link>
      </div>
    );
  }

  const v = state.values ?? {};
  const err = state.errors ?? {};
  const str = (k: string) => (typeof v[k] === "string" ? (v[k] as string) : "");
  const has = (k: string, option: string) =>
    Array.isArray(v[k]) && (v[k] as string[]).includes(option);

  // Re-mount fields with the submitted values after a failed submit,
  // since React resets the form once the action completes.
  const formKey = JSON.stringify(v);
  const emailRequired = (contactMethod || str("preferredContact")) === "Email";
  const cprValue = cpr || str("cprStatus");

  return (
    <form
      key={formKey}
      action={formAction}
      className="rounded-[24px] bg-white p-5 shadow-[0_30px_60px_-40px_rgb(13_23_72/0.35)] ring-1 ring-line sm:rounded-[32px] sm:p-10"
    >
      {state.status === "error" && (
        <p role="alert" className="mb-10 rounded-2xl border border-error/30 bg-error/5 px-4 py-3 text-error">
          {state.message}
        </p>
      )}

      <Section title="Your contact details">
        <Field label="Full name" name="fullName" error={err.fullName}>
          <input
            id="fullName"
            name="fullName"
            autoComplete="name"
            placeholder="First name and surname"
            required
            defaultValue={str("fullName")}
            aria-invalid={!!err.fullName}
            className={inputClass}
          />
        </Field>
        <Field label="Mobile number" name="mobile" error={err.mobile}>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="024 123 4567"
            required
            defaultValue={str("mobile")}
            aria-invalid={!!err.mobile}
            className={inputClass}
          />
        </Field>
        <Field
          label="Preferred contact method"
          name="preferredContact"
          error={err.preferredContact}
        >
          <select
            id="preferredContact"
            name="preferredContact"
            required
            defaultValue={str("preferredContact")}
            onChange={(e) => setContactMethod(e.target.value)}
            aria-invalid={!!err.preferredContact}
            className={inputClass}
          >
            <option value="" disabled>
              Choose one
            </option>
            <option>Phone call</option>
            <option>WhatsApp</option>
            <option>Email</option>
          </select>
        </Field>
        <Field
          label="Email address"
          name="email"
          optional={!emailRequired}
          error={err.email}
        >
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required={emailRequired}
            defaultValue={str("email")}
            aria-invalid={!!err.email}
            className={inputClass}
          />
        </Field>
      </Section>

      <Section title="Training and experience">
        <Field
          label="Field of training"
          name="fieldOfTraining"
          error={err.fieldOfTraining}
        >
          <select
            id="fieldOfTraining"
            name="fieldOfTraining"
            required
            defaultValue={str("fieldOfTraining")}
            aria-invalid={!!err.fieldOfTraining}
            className={inputClass}
          >
            <option value="" disabled>
              Choose one
            </option>
            <option>Midwifery</option>
            <option>General Nursing</option>
            <option>Community Health Nursing</option>
            <option>Other</option>
          </select>
        </Field>
        <Field label="Current area of practice" name="practiceArea" optional>
          <input
            id="practiceArea"
            name="practiceArea"
            placeholder="Labour ward, community health"
            defaultValue={str("practiceArea")}
            className={inputClass}
          />
        </Field>
        <Field
          label="Relevant experience"
          name="experience"
          error={err.experience}
        >
          <select
            id="experience"
            name="experience"
            required
            defaultValue={str("experience")}
            aria-invalid={!!err.experience}
            className={inputClass}
          >
            <option value="" disabled>
              Years of experience
            </option>
            <option>Less than 1 year</option>
            <option>1–2 years</option>
            <option>3–5 years</option>
            <option>6–10 years</option>
            <option>More than 10 years</option>
          </select>
        </Field>
        <Field
          label="Professional registration"
          name="registrationStatus"
          error={err.registrationStatus}
        >
          <select
            id="registrationStatus"
            name="registrationStatus"
            required
            defaultValue={str("registrationStatus")}
            aria-invalid={!!err.registrationStatus}
            className={inputClass}
          >
            <option value="" disabled>
              Choose one
            </option>
            <option>Active</option>
            <option>Awaiting</option>
            <option>Renewal</option>
            <option>Other</option>
          </select>
        </Field>
      </Section>

      <fieldset className="mt-12 rounded-[20px] bg-mist p-5 sm:rounded-[24px] sm:p-7">
        <legend className="float-left w-full font-display text-xl font-bold">
          Do you have CPR certification?
        </legend>
        <div className="clear-both flex flex-wrap gap-x-6 gap-y-3 pt-5">
          {cprOptions.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-2"
            >
              <input
                type="radio"
                name="cprStatus"
                value={option}
                required
                defaultChecked={str("cprStatus") === option}
                onChange={() => setCpr(option)}
                className="h-4 w-4 accent-[var(--navy)]"
              />
              {option}
            </label>
          ))}
        </div>
        {err.cprStatus && <ErrorText>{err.cprStatus}</ErrorText>}

        {cprValue === "Yes, current" && (
          <div className="mt-6">
            <label htmlFor="cprDetails" className="t-small block">
              Provider, expiry date (if stated) and coverage: adult, child
              and/or infant.
            </label>
            <textarea
              id="cprDetails"
              name="cprDetails"
              rows={3}
              defaultValue={str("cprDetails")}
              className="mt-3 block w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none focus:border-navy focus:ring-2 focus:ring-dusk"
            />
          </div>
        )}
      </fieldset>

      <Section title="Location and availability">
        <Field label="Town or neighbourhood" name="town" error={err.town}>
          <input
            id="town"
            name="town"
            placeholder="Teshie"
            required
            defaultValue={str("town")}
            aria-invalid={!!err.town}
            className={inputClass}
          />
        </Field>
        <Field label="Areas you can cover" name="coverage" optional>
          <input
            id="coverage"
            name="coverage"
            placeholder="Nungua, Spintex, Tema"
            defaultValue={str("coverage")}
            className={inputClass}
          />
        </Field>

        <CheckboxGroup
          legend="Support you would like to give"
          name="supportTypes"
          options={["Prenatal", "Birth", "Postpartum", "Virtual"]}
          isChecked={(o) => has("supportTypes", o)}
          error={err.supportTypes}
        />
        <CheckboxGroup
          legend="Availability"
          name="availability"
          options={["Day", "Night", "Weekend", "On-call"]}
          isChecked={(o) => has("availability", o)}
          error={err.availability}
        />

        <Field
          label="Languages spoken with families"
          name="languages"
          error={err.languages}
        >
          <input
            id="languages"
            name="languages"
            placeholder="Ga, Twi, English"
            required
            defaultValue={str("languages")}
            aria-invalid={!!err.languages}
            className={inputClass}
          />
        </Field>
        <Field label="Earliest start date" name="startDate" optional>
          <input
            id="startDate"
            name="startDate"
            type="date"
            defaultValue={str("startDate")}
            className={inputClass}
          />
        </Field>
      </Section>

      <div className="mt-12 border-t border-line pt-8">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="consent"
            value="yes"
            required
            defaultChecked={str("consent") === "yes"}
            className="mt-1.5 h-4 w-4 shrink-0 accent-[var(--navy)]"
          />
          I agree to be contacted by OMNI DOULA LTD about recruitment
          opportunities.
        </label>
        {err.consent && <ErrorText>{err.consent}</ErrorText>}
      </div>

      <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
        <button type="submit" disabled={pending} className="btn min-h-[56px] w-full px-8 sm:w-auto">
          {pending ? "Sending…" : "Join the waitlist"}
        </button>
        <p className="t-small text-muted">
          Joining the waitlist does not guarantee employment.
        </p>
      </div>
    </form>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="mt-12 border-t border-line pt-8 first-of-type:mt-0 first-of-type:border-0 first-of-type:pt-0">
      <legend className="t-title float-left w-full">{title}</legend>
      <div className="clear-both grid gap-x-6 gap-y-6 pt-6 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  name,
  optional,
  error,
  children,
}: {
  label: string;
  name: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block font-semibold">
        {label}
        {optional && <span className="t-small ml-1.5 font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function CheckboxGroup({
  legend,
  name,
  options,
  isChecked,
  error,
}: {
  legend: string;
  name: string;
  options: string[];
  isChecked: (option: string) => boolean;
  error?: string;
}) {
  return (
    <fieldset>
      <legend className="mb-2 block font-semibold">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option} className="cursor-pointer">
            <input
              type="checkbox"
              name={name}
              value={option}
              defaultChecked={isChecked(option)}
              className="peer sr-only"
            />
            <span className="inline-flex h-11 items-center rounded-full border border-line bg-porcelain px-5 font-medium transition hover:border-navy peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-navy peer-focus-visible:ring-offset-2">
              {option}
            </span>
          </label>
        ))}
      </div>
      {error && <ErrorText>{error}</ErrorText>}
    </fieldset>
  );
}

function ErrorText({ children }: { children: ReactNode }) {
  return <p className="t-small mt-2 text-error">{children}</p>;
}
