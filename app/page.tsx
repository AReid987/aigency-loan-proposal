"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { Reveal, Stagger, StaggerItem, EASE } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";

const SECTIONS = [
  { id: "top", label: "The offer" },
  { id: "purpose", label: "What it's for" },
  { id: "use", label: "How it's used" },
  { id: "return", label: "What you get back" },
  { id: "who", label: "Who we are" },
  { id: "next", label: "What happens next" },
];

function ProgressRail() {
  const [active, setActive] = useState("top");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section progress"
      style={{
        position: "fixed",
        right: 22,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
      className="rail"
    >
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          aria-label={s.label}
          style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end" }}
        >
          <span
            className="rail-label"
            style={{
              fontSize: 11,
              letterSpacing: "0.04em",
              color: active === s.id ? "var(--ink)" : "transparent",
              transition: "color 0.3s",
              whiteSpace: "nowrap",
            }}
          >
            {s.label}
          </span>
          <span
            style={{
              width: active === s.id ? 22 : 8,
              height: 8,
              borderRadius: 99,
              background: active === s.id ? "var(--accent)" : "var(--line-strong)",
              transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
              display: "inline-block",
            }}
          />
        </a>
      ))}
    </nav>
  );
}

function TopProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        transformOrigin: "0% 50%",
        scaleX,
        background: "var(--accent)",
        zIndex: 50,
      }}
    />
  );
}

/* ---------- Section: Hero ---------- */
function Hero() {
  const reduce = useReducedMotion();
  return (
    <section
      id="top"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        paddingTop: 80,
        paddingBottom: 60,
      }}
    >
      <div className="wrap">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="eyebrow"
          style={{ marginBottom: 26 }}
        >
          Aigency · Private loan proposal
        </motion.div>

        <h1
          style={{
            fontSize: "clamp(40px, 8vw, 92px)",
            lineHeight: 0.98,
            letterSpacing: "-0.035em",
            fontWeight: 600,
            margin: 0,
            maxWidth: "15ch",
          }}
        >
          {["0% interest.", "You get all", "$50,000 back."].map((line, i) => (
            <motion.span
              key={line}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.12 }}
              style={{ display: "block" }}
            >
              {i === 2 ? (
                <span style={{ color: "var(--accent)" }}>{line}</span>
              ) : (
                line
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
          style={{
            marginTop: 30,
            maxWidth: "46ch",
            fontSize: "clamp(16px, 2.2vw, 20px)",
            color: "var(--ink-soft)",
            lineHeight: 1.55,
          }}
        >
          No ownership. No equity. This is a loan, not an investment. We pay it
          back in full from what Aigency earns, on a schedule we agree with you.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
          style={{ marginTop: 44, display: "flex", gap: 14, flexWrap: "wrap" }}
        >
          <a
            href="#purpose"
            className="btn-primary"
            style={{
              background: "var(--accent)",
              color: "var(--accent-ink)",
              padding: "14px 24px",
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 15,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
            }}
          >
            Read the proposal
          </a>
          <a
            href="#return"
            style={{
              padding: "14px 24px",
              borderRadius: 12,
              fontSize: 15,
              border: "1px solid var(--line-strong)",
              color: "var(--ink)",
            }}
          >
            What you get back
          </a>
        </motion.div>
      </div>

      {!reduce && (
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            width: 900,
            height: 900,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(232,176,75,0.08) 0%, rgba(232,176,75,0) 65%)",
            top: "-20%",
            right: "-25%",
            pointerEvents: "none",
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </section>
  );
}

/* ---------- Section: What it's for ---------- */
function Purpose() {
  return (
    <section id="purpose" style={{ padding: "110px 0" }}>
      <div className="wrap">
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            What the money is for
          </div>
          <h2 style={H2}>Two things. Both urgent. Both temporary.</h2>
        </Reveal>

        <Stagger
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
            marginTop: 52,
          }}
        >
          <StaggerItem>
            <div className="panel" style={panelStyle}>
              <div className="mono" style={statNum}>
                <CountUp to={5000} prefix="$" />
              </div>
              <h3 style={cardTitle}>Catch up on rent</h3>
              <p style={cardBody}>
                A ballpark figure to bring the home current and keep it. One
                number, one purpose, behind us quickly.
              </p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="panel" style={panelStyle}>
              <div className="mono" style={statNum}>
                <CountUp to={3500} prefix="$" suffix="/mo" />
              </div>
              <h3 style={cardTitle}>Live on, every month</h3>
              <p style={cardBody}>
                Rent, food, bills, and the rest of it. Also a ballpark number,
                covering the months it takes to get Aigency to production.
              </p>
            </div>
          </StaggerItem>
        </Stagger>

        <Reveal delay={0.1}>
          <p
            style={{
              marginTop: 38,
              maxWidth: "62ch",
              color: "var(--ink-soft)",
              fontSize: 17,
              lineHeight: 1.6,
            }}
          >
            The loan is <strong style={{ color: "var(--ink)" }}>$50,000</strong>.
            About <strong style={{ color: "var(--ink)" }}>$30,000</strong> is
            Antonio&apos;s runway for six months. The remaining{" "}
            <strong style={{ color: "var(--ink)" }}>$20,000</strong> covers the
            catch-up and the monthly buffer. Jason will walk you through the
            exact numbers directly.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Section: How it's used ---------- */
function Use() {
  return (
    <section id="use" style={{ padding: "110px 0", background: "var(--bg-2)" }}>
      <div className="wrap">
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            How the money will be used
          </div>
          <h2 style={H2}>Spent in order, out in the open.</h2>
        </Reveal>

        <div
          style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          <Reveal>
            <div style={stepCard}>
              <div className="mono" style={stepTag}>First</div>
              <div className="mono" style={stepAmount}>
                <CountUp to={5000} prefix="$" />
              </div>
              <h3 style={cardTitle}>Catch up on rent</h3>
              <p style={cardBody}>Keep the home. Handle the most urgent thing first.</p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div style={stepCard}>
              <div className="mono" style={stepTag}>Then</div>
              <div className="mono" style={stepAmount}>
                <CountUp to={25000} prefix="$" />
              </div>
              <h3 style={cardTitle}>Build Aigency full-time</h3>
              <p style={cardBody}>
                Six months of runway to live on and to move Aigency from
                development into production, including the systems that make
                that possible.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            className="mono"
            style={{
              marginTop: 40,
              padding: "22px 26px",
              border: "1px solid var(--line-strong)",
              borderRadius: 14,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
              fontSize: 15,
            }}
          >
            <span style={{ color: "var(--ink-soft)" }}>$30,000 runway + $20,000 buffer</span>
            <span style={{ color: "var(--accent)", fontSize: 20 }}>
              = $50,000 total
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Section: What you get back (signature) ---------- */
function Return() {
  const reduce = useReducedMotion();
  return (
    <section id="return" style={{ padding: "130px 0", position: "relative", overflow: "hidden" }}>
      <div className="wrap">
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            What you get back
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 48,
            alignItems: "center",
            marginTop: 24,
          }}
        >
          <div>
            <div
              className="mono"
              style={{
                fontSize: "clamp(56px, 12vw, 128px)",
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                color: "var(--accent)",
                fontWeight: 500,
              }}
            >
              <CountUp to={50000} prefix="$" duration={2000} />
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 20,
                color: "var(--ink)",
                fontWeight: 500,
              }}
            >
              All of it. 0% interest.
            </div>
          </div>

          <div style={{ display: "grid", gap: 22 }}>
            <ReturnLine
              delay={0.05}
              title="Paid back from earnings"
              body="We repay you out of the money Aigency earns. Jason pays you directly, and we agree the timing together."
            />
            <ReturnLine
              delay={0.15}
              title="Plus a custom agent, built for you"
              body="We study your business first and find the work that needs the most help. Then we build you an agent for exactly that work."
            />
            <ReturnLine
              delay={0.25}
              title="Working 24/7, inside your business"
              body="An agent that runs around the clock, every day, on the task that matters most to you."
            />
          </div>
        </div>

        {!reduce && (
          <motion.div
            aria-hidden
            style={{
              position: "absolute",
              width: 700,
              height: 700,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(232,176,75,0.09) 0%, rgba(232,176,75,0) 70%)",
              left: "-15%",
              bottom: "-30%",
              pointerEvents: "none",
            }}
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>
    </section>
  );
}

function ReturnLine({
  title,
  body,
  delay,
}: {
  title: string;
  body: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div style={{ display: "flex", gap: 16 }}>
        <div
          aria-hidden
          style={{
            flex: "0 0 auto",
            width: 26,
            height: 26,
            borderRadius: "50%",
            border: "1px solid var(--accent)",
            display: "grid",
            placeItems: "center",
            marginTop: 3,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6.5L4.5 9L10 3"
              stroke="var(--accent)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <h3 style={{ ...cardTitle, marginTop: 0 }}>{title}</h3>
          <p style={{ ...cardBody, maxWidth: "48ch" }}>{body}</p>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------- Section: Who we are ---------- */
function Who() {
  return (
    <section id="who" style={{ padding: "110px 0", background: "var(--bg-2)" }}>
      <div className="wrap">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 48,
            alignItems: "start",
          }}
        >
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              Who we are
            </div>
            <h2 style={H2}>Aigency builds the workers. Antonio runs it.</h2>
            <p
              style={{
                marginTop: 22,
                color: "var(--ink-soft)",
                fontSize: 17,
                lineHeight: 1.6,
                maxWidth: "44ch",
              }}
            >
              Antonio Reid is the founder of Aigency. The company makes agent
              workers for a business, each one built for that specific business,
              and runs them 24 hours a day, 7 days a week.
            </p>
          </Reveal>

          <Stagger style={{ display: "grid", gap: 16 }}>
            {[
              ["Built for one business", "Every worker is made for the business it serves, not a generic template."],
              ["Runs around the clock", "24 hours a day, 7 days a week. It does not clock out."],
              ["Run by the founder", "Antonio builds and operates Aigency himself, full-time."],
            ].map(([t, b]) => (
              <StaggerItem key={t}>
                <div style={miniRow}>
                  <span
                    aria-hidden
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--accent)",
                      marginTop: 8,
                      flex: "0 0 auto",
                    }}
                  />
                  <div>
                    <h3 style={{ ...cardTitle, marginTop: 0, textTransform: "none" }}>{t.trim()}</h3>
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

/* ---------- Section: What happens next ---------- */
function Next() {
  const steps = [
    ["You say yes", "We agree together on when you are paid back."],
    ["Antonio builds Aigency", "Full-time, moving from development to production."],
    ["Your business gets the agent", "The custom worker, running 24/7 on your most important work."],
    ["You get the full $50,000 back", "Paid from earnings, on the schedule we agreed."],
  ];
  return (
    <section id="next" style={{ padding: "120px 0 140px" }}>
      <div className="wrap">
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            What happens next
          </div>
          <h2 style={H2}>Four steps. One of them is yours.</h2>
        </Reveal>

        <Stagger
          style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 18,
            counterReset: "step",
          }}
        >
          {steps.map(([t, b], i) => (
            <StaggerItem key={t}>
              <div style={nextCard}>
                <div className="mono" style={{ ...stepTag, color: "var(--accent)" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 style={cardTitle}>{t}</h3>
                <p style={cardBody}>{b}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.15}>
          <div
            style={{
              marginTop: 64,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 18,
            }}
          >
            <p style={{ fontSize: 20, color: "var(--ink)", margin: 0, maxWidth: "40ch", lineHeight: 1.5 }}>
              When you&apos;re ready, the first step is a conversation with Jason.
            </p>
            <a
              href="#top"
              className="btn-primary"
              style={{
                background: "var(--accent)",
                color: "var(--accent-ink)",
                padding: "14px 26px",
                borderRadius: 12,
                fontWeight: 600,
                fontSize: 15,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
              }}
            >
              Back to the offer
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <footer
            className="mono"
            style={{
              marginTop: 90,
              paddingTop: 26,
              borderTop: "1px solid var(--line)",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 10,
              fontSize: 12,
              color: "var(--ink-faint)",
              letterSpacing: "0.03em",
            }}
          >
            <span>Aigency · Loan proposal</span>
            <span>0% interest · Full return · No equity</span>
          </footer>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- shared styles ---------- */
const H2: React.CSSProperties = {
  fontSize: "clamp(28px, 4.5vw, 48px)",
  lineHeight: 1.08,
  letterSpacing: "-0.025em",
  fontWeight: 600,
  margin: 0,
  maxWidth: "20ch",
};
const statNum: React.CSSProperties = {
  fontSize: "clamp(34px, 5vw, 52px)",
  letterSpacing: "-0.03em",
  color: "var(--accent)",
  fontWeight: 500,
};
const cardTitle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 600,
  margin: "18px 0 8px",
  letterSpacing: "-0.01em",
};
const cardBody: React.CSSProperties = {
  fontSize: 15,
  color: "var(--ink-soft)",
  lineHeight: 1.55,
  margin: 0,
};
const panelStyle: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--line)",
  borderRadius: 18,
  padding: 28,
  height: "100%",
};
const stepCard: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--line)",
  borderRadius: 18,
  padding: 30,
  height: "100%",
};
const stepTag: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--ink-faint)",
};
const stepAmount: React.CSSProperties = {
  fontSize: "clamp(30px, 4vw, 44px)",
  letterSpacing: "-0.03em",
  color: "var(--ink)",
  fontWeight: 500,
  marginTop: 14,
};
const nextCard: React.CSSProperties = {
  borderTop: "1px solid var(--line-strong)",
  paddingTop: 22,
  height: "100%",
};
const miniRow: React.CSSProperties = {
  display: "flex",
  gap: 14,
  padding: "18px 20px",
  background: "var(--surface)",
  border: "1px solid var(--line)",
  borderRadius: 14,
};

export default function Page() {
  return (
    <>
      <TopProgress />
      <ProgressRail />
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