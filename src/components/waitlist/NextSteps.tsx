// Mirrors the applicant stages in the recruitment team view
// (docs/OMNI_Recruitment_Waitlist.pdf): New, Contacted, Interview scheduled.
const steps = [
  {
    title: "We read it",
    body: "Your application joins the list as new, and someone on the recruitment team reads every one.",
  },
  {
    title: "We get in touch",
    body: "We contact you the way you asked: a phone call, WhatsApp or email, when a role near you opens.",
  },
  {
    title: "We meet",
    body: "If it is a good fit, we schedule an interview to talk through the role, the rates and your availability.",
  },
];

export default function NextSteps() {
  return (
    <div className="rounded-[32px] bg-navy-ink p-7 sm:p-8 text-white">
      <h2 className="t-title">After you apply</h2>
      <ol className="mt-6">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="relative grid grid-cols-[2.25rem_1fr] gap-x-3 pb-6 last:pb-0"
          >
            {i < steps.length - 1 && (
              <span aria-hidden className="absolute bottom-0 left-[1.0625rem] top-10 w-px bg-white/20" />
            )}
            <span className="grid h-9 w-9 place-items-center rounded-full bg-dusk font-semibold text-navy-ink">
              {i + 1}
            </span>
            <div>
              <h3 className="pt-1 font-display text-lg font-bold">{step.title}</h3>
              <p className="t-small mt-1 text-white/75">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="t-small mt-8 border-t border-white/15 pt-5 text-white/60">
        Joining the waitlist does not guarantee employment. All roles are
        non-clinical birth and postpartum support.
      </p>
    </div>
  );
}
