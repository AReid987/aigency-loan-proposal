"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { Reveal, Stagger, StaggerItem, EASE } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { VoxelStack } from "@/components/VoxelStack";

const NAV = [
  { id: "offer", label: "The offer" },
  { id: "purpose", label: "What it's for" },
  { id: "use", label: "How it's used" },
  { id: "return", label: "What you get" },
  { id: "who", label: "Who we are" },
  { id: "next", label: "Next" },
];

function TopProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 2,
        transformOrigin: "0% 50%", scaleX,
        background: "linear-gradient(90deg, var(--violet), var(--magenta), var(--amber))",
        zIndex: 75,
      }}
    />
  );
}

function NavBar() {
  return (
    <header
      style={{
        position: "fixed", top: "var(--frame)", left: "var(--frame)", right: "var(--frame)",
        height: 60, zIndex: 65, display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 22px",
        backdropFilter: "blur(12px)", background: "rgba(8,8,10,0.6)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", gap: 2 }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: "var(--violet)" }} />
          <span style={{ width: 10, height: 10, borderRadius: 3, background: "var(--amber)" }} />
        </div>
        <span style={{ fontWeight: 700, letterSpacing: "0.16em", fontSize: 14 }}>AIGENCY</span>
      </div>
      <nav style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {NAV.slice(0, 4).map((n) => (
          <a key={n.id} href={`#${n.id}`} style={{ fontSize: 13, color: "var(--ink-soft)", padding: "8px 10px" }}>{n.label}</a>
        ))}
        <a href="#offer" className="btn-violet" style={{ padding: "9px 18px", fontSize: 13, marginLeft: 8 }}>The offer</a>
      </nav>
    </header>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section
      id="offer"
      style={{
        minHeight: "100dvh", display: "flex", flexDirection: "column",
        justifyContent: "center", position: "relative",
        paddingTop: 120, paddingBottom: 80, overflow: "hidden",
      }}
    >
      {!reduce && (
        <>
          <motion.div aria-hidden style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(142,108,228,0.20) 0%, rgba(142,108,228,0) 65%)", top: "-15%", right: "-10%", pointerEvents: "none" }} animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div aria-hidden style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,121,199,0.14) 0%, rgba(232,121,199,0) 65%)", bottom: "-20%", left: "-10%", pointerEvents: "none" }} animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
        </>
      )}

      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <motion.div initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
          <span className="pill"><span className="dot" /> Private loan proposal · 2026</span>
        </motion.div>

        <h1 style={{ fontSize: "clamp(56px, 12vw, 150px)", lineHeight: 0.92, letterSpacing: "-0.04em", fontWeight: 700, margin: "22px 0 0" }}>
          <motion.span initial={reduce ? false : { opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.1 }} style={{ display: "block", background: "linear-gradient(180deg, #fff 0%, var(--violet-soft) 130%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            AIGENCY
          </motion.span>
        </h1>

        <motion.p initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.4 }} style={{ marginTop: 24, maxWidth: "30ch", fontSize: "clamp(18px, 2.4vw, 26px)", lineHeight: 1.35, color: "var(--ink)" }}>
          A <span className="serif-i" style={{ color: "var(--amber-hot)" }}>$50,000</span> loan. <span className="serif-i">0%</span> interest. You get{" "}
          <span className="serif-i" style={{ color: "var(--violet-soft)" }}>all of it back.</span>
        </motion.p>

        <motion.div initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.55 }} style={{ marginTop: 36, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="#return" className="btn-violet">What you get back</a>
          <a href="#purpose" className="btn-ghost">Read the proposal</a>
        </motion.div>
      </div>

      <div style={{ position: "absolute", right: "4%", top: "50%", transform: "translateY(-50%)", width: "min(38vw, 460px)", height: "min(38vw, 460px)", zIndex: 1, opacity: 0.95 }}>
        <VoxelStack size={54} cols={3} rows={3} layers={3} />
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <Reveal>
      <div className="eyebrow" style={{ marginBottom: 16 }}>{eyebrow}</div>
      <h2 style={{ fontSize: "clamp(30px, 5vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 600, margin: 0, maxWidth: "18ch" }}>{title}</h2>
      {sub && <p style={{ marginTop: 18, color: "var(--ink-soft)", fontSize: 17, maxWidth: "52ch", lineHeight: 1.55 }}>{sub}</p>}
    </Reveal>
  );
}

function Purpose() {
  return (
    <section id="purpose" style={{ padding: "120px 0" }}>
      <div className="wrap">
        <SectionHead eyebrow="What the money is for" title={<>Two things. Both <span className="serif-i" style={{ color: "var(--violet-soft)" }}>urgent.</span></>} />
        <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18, marginTop: 52 }}>
          <StaggerItem>
            <div className="bento">
              <span className="pill"><span className="dot" /> First</span>
              <div className="mono" style={{ fontSize: "clamp(40px, 6vw, 64px)", letterSpacing: "-0.03em", color: "var(--amber-hot)", marginTop: 20, fontWeight: 500 }}>
                <CountUp to={5000} prefix="$" />
              </div>
              <h3 style={cardTitle}>Catch up on rent</h3>
              <p style={cardBody}>A ballpark figure to bring the home current and keep it. One number, one purpose, behind us quickly.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="bento">
              <span className="pill"><span className="dot" /> Monthly</span>
              <div className="mono" style={{ fontSize: "clamp(40px, 6vw, 64px)", letterSpacing: "-0.03em", color: "var(--violet-soft)", marginTop: 20, fontWeight: 500 }}>
                <CountUp to={3500} prefix="$" suffix="/mo" />
              </div>
              <h3 style={cardTitle}>Live on, every month</h3>
              <p style={cardBody}>Rent, food, bills, and the rest. Also a ballpark number, covering the months it takes to get Aigency to production.</p>
            </div>
          </StaggerItem>
        </Stagger>
        <Reveal delay={0.1}>
          <p style={{ marginTop: 36, maxWidth: "64ch", color: "var(--ink-soft)", fontSize: 17, lineHeight: 1.6 }}>
            The loan is <strong style={{ color: "var(--ink)" }}>$50,000</strong>. About <strong style={{ color: "var(--ink)" }}>$30,000</strong> is Antonio&apos;s runway for six months. The remaining <strong style={{ color: "var(--ink)" }}>$20,000</strong> covers the catch-up and monthly buffer. Jason walks you through the exact numbers directly.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Use() {
  return (
    <section id="use" style={{ padding: "120px 0", background: "var(--bg-2)" }}>
      <div className="wrap">
        <SectionHead eyebrow="How the money will be used" title={<>Spent in order. <span className="serif-i">Out in the open.</span></>} />
        <div style={{ marginTop: 52, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
          <Reveal>
            <div className="bento" style={{ height: "100%" }}>
              <div className="mono" style={stepTag}>First</div>
              <div className="mono" style={{ ...stepAmount, color: "var(--amber-hot)" }}><CountUp to={5000} prefix="$" /></div>
              <h3 style={cardTitle}>Catch up on rent</h3>
              <p style={cardBody}>Keep the home. Handle the most urgent thing first.</p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="bento" style={{ height: "100%" }}>
              <div className="mono" style={stepTag}>Then</div>
              <div className="mono" style={{ ...stepAmount, color: "var(--violet-soft)" }}><CountUp to={25000} prefix="$" /></div>
              <h3 style={cardTitle}>Build Aigency full-time</h3>
              <p style={cardBody}>Six months of runway to live on and move Aigency from development into production, including the systems that make it possible.</p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="mono" style={{ marginTop: 32, padding: "22px 26px", border: "1px solid var(--line-strong)", borderRadius: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, fontSize: 15, background: "var(--surface)" }}>
            <span style={{ color: "var(--ink-soft)" }}>$30,000 runway + $20,000 buffer</span>
            <span style={{ color: "var(--violet-soft)", fontSize: 22 }}>= $50,000 total</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Return() {
  return (
    <section id="return" style={{ padding: "140px 0", position: "relative", overflow: "hidden" }}>
      <div className="wrap">
        <SectionHead eyebrow="What you get back" title={<>All of it. <span className="serif-i" style={{ color: "var(--amber-hot)" }}>0% interest.</span></>} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 40, alignItems: "center", marginTop: 40 }}>
          <Reveal>
            <div className="mono" style={{ fontSize: "clamp(64px, 14vw, 150px)", lineHeight: 0.9, letterSpacing: "-0.04em", fontWeight: 500, background: "linear-gradient(180deg, var(--amber-hot), var(--magenta))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              <CountUp to={50000} prefix="$" duration={2000} />
            </div>
          </Reveal>
          <div style={{ display: "grid", gap: 20 }}>
            <ReturnLine delay={0.05} title="Paid back from earnings" body="We repay you out of the money Aigency earns. Jason pays you directly, and we agree the timing together." />
            <ReturnLine delay={0.15} title="Plus a custom agent, built for you" body="We study your business first and find the work that needs the most help. Then we build you an agent for exactly that work." />
            <ReturnLine delay={0.25} title="Working 24/7, inside your business" body="An agent that runs around the clock, every day, on the task that matters most to you." />
          </div>
        </div>
      </div>
    </section>
  );
}

function ReturnLine({ title, body, delay }: { title: string; body: string; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div style={{ display: "flex", gap: 16 }}>
        <div aria-hidden style={{ flex: "0 0 auto", width: 26, height: 26, borderRadius: "50%", border: "1px solid var(--violet)", display: "grid", placeItems: "center", marginTop: 3, boxShadow: "0 0 12px rgba(142,108,228,0.4)" }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6.5L4.5 9L10 3" stroke="var(--violet-soft)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div>
          <h3 style={{ ...cardTitle, marginTop: 0 }}>{title}</h3>
          <p style={{ ...cardBody, maxWidth: "48ch" }}>{body}</p>
        </div>
      </div>
    </Reveal>
  );
}

function Who() {
  return (
    <section id="who" style={{ padding: "120px 0", background: "var(--bg-2)" }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48, alignItems: "start" }}>
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Who we are</div>
            <h2 style={{ fontSize: "clamp(30px, 5vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 600, margin: 0, maxWidth: "18ch" }}>
              Aigency builds the <span className="serif-i" style={{ color: "var(--violet-soft)" }}>workers.</span>
            </h2>
            <p style={{ marginTop: 22, color: "var(--ink-soft)", fontSize: 17, lineHeight: 1.6, maxWidth: "44ch" }}>
              Antonio Reid is the founder of Aigency. The company makes agent workers for a business, each built for that specific business, and runs them 24 hours a day, 7 days a week.
            </p>
          </Reveal>
          <Stagger style={{ display: "grid", gap: 14 }}>
            {[
              ["Built for one business", "Every worker is made for the business it serves, not a generic template."],
              ["Runs around the clock", "24 hours a day, 7 days a week. It does not clock out."],
              ["Run by the founder", "Antonio builds and operates Aigency himself, full-time."],
            ].map(([t, b]) => (
              <StaggerItem key={t}>
                <div className="bento" style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span aria-hidden style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--violet)", marginTop: 8, flex: "0 0 auto", boxShadow: "0 0 10px var(--violet)" }} />
                  <div>
                    <h3 style={{ ...cardTitle, marginTop: 0 }}>{t}</h3>
                    <p style={{ ...cardBody, maxWidth: "40ch" }}>{b}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function Next() {
  const steps = [
    ["You say yes", "We agree together on when you are paid back."],
    ["Antonio builds Aigency", "Full-time, moving from development to production."],
    ["Your business gets the agent", "The custom worker, running 24/7 on your most important work."],
    ["You get the full $50,000 back", "Paid from earnings, on the schedule we agreed."],
  ];
  return (
    <section id="next" style={{ padding: "130px 0 150px" }}>
      <div className="wrap">
        <SectionHead eyebrow="What happens next" title={<>Four steps. One is <span className="serif-i">yours.</span></>} />
        <Stagger style={{ marginTop: 52, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
          {steps.map(([t, b], i) => (
            <StaggerItem key={t}>
              <div className="bento" style={{ height: "100%" }}>
                <div className="mono" style={{ ...stepTag, color: "var(--violet-soft)" }}>{String(i + 1).padStart(2, "0")}</div>
                <h3 style={cardTitle}>{t}</h3>
                <p style={cardBody}>{b}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal delay={0.15}>
          <div style={{ marginTop: 60, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 18 }}>
            <p style={{ fontSize: 20, color: "var(--ink)", margin: 0, maxWidth: "40ch", lineHeight: 1.5 }}>When you&apos;re ready, the first step is a conversation with Jason.</p>
            <a href="#offer" className="btn-violet">Back to the offer</a>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <footer className="mono" style={{ marginTop: 90, paddingTop: 26, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, fontSize: 12, color: "var(--ink-faint)", letterSpacing: "0.03em" }}>
            <span>© AIGENCY 2026</span>
            <span>0% interest · Full return · No equity</span>
          </footer>
        </Reveal>
      </div>
    </section>
  );
}

const cardTitle: React.CSSProperties = { fontSize: 18, fontWeight: 600, margin: "18px 0 8px", letterSpacing: "-0.01em" };
const cardBody: React.CSSProperties = { fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.55, margin: 0 };
const stepTag: React.CSSProperties = { fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-faint)" };
const stepAmount: React.CSSProperties = { fontSize: "clamp(30px, 4vw, 44px)", letterSpacing: "-0.03em", fontWeight: 500, marginTop: 14 };

export default function Page() {
  return (
    <>
      <TopProgress />
      <NavBar />
      <main>
        <Hero />
        <Purpose />
        <Use />
        <Return />
        <Who />
        <Next />
      </main>
    </>
  );
}