const answers = [
  {
    q: "Is a doula a midwife?",
    a: "No. Our doulas give emotional and practical support only. They work alongside your midwife or doctor and never replace them.",
  },
  {
    q: "Will my doula come to the hospital?",
    a: "Yes. Labour support happens at home or in hospital, from early labour through the birth and the time right after.",
  },
  {
    q: "What if labour goes on for a long time?",
    a: "Your doula stays for up to 24 hours. After that a back-up doula from our team takes over, so you are never left without support.",
  },
  {
    q: "Which visits are in person?",
    a: "The hands-on prenatal visit and the two extended postpartum visits happen at your home. The first visit and seven others are by video.",
  },
  {
    q: "How long is each visit?",
    a: "The first visit runs up to an hour and a half, prenatal visits one to two hours, the hands-on visit two hours, and extended home visits up to three.",
  },
  {
    q: "Can I reach my doula between visits?",
    a: "Yes. Calls, texts and video questions are part of the package, before and after the birth.",
  },
  {
    q: "Which areas do you cover?",
    a: "Greater Accra, including Teshie, Nungua, Spintex, Tema, Osu, Labone, Adenta and Madina.",
  },
  {
    q: "Which languages do your doulas speak?",
    a: "Ga, Twi, Ewe and English. Tell us your preference and we will match you.",
  },
  {
    q: "What about public holidays?",
    a: "Babies arrive when they arrive, and your doula will be there. Planned visits are scheduled around holidays.",
  },
  {
    q: "I'm a nurse or midwife. How do I join?",
    a: "Put your name on the recruitment waitlist. It takes about five minutes. Joining does not guarantee employment.",
  },
];

export default function Questions() {
  return (
    <section id="questions" aria-labelledby="questions-title" className="py-16 sm:py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-(--pad) lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 id="questions-title" className="t-head text-navy lg:sticky lg:top-28">
            Questions families ask
          </h2>
        </div>

        <div className="border-t border-line lg:col-span-8">
          {answers.map((item) => (
            <details key={item.q} className="acc">
              <summary>
                <span>{item.q}</span>
                <span aria-hidden className="plus" />
              </summary>
              <p className="max-w-[60ch] pb-6 pr-10 text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
