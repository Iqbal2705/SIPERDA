import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiAlertCircle,
  FiFolder,
  FiShield,
  FiCheckCircle,
  FiLink,
  FiArrowRight,
} from "react-icons/fi";

/* ── Floating Particle ── */
function Particle({ style }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: style.size,
        height: style.size,
        left: style.left,
        top: style.top,
        background: style.color,
        opacity: style.opacity,
        animation: `floatParticle ${style.duration}s ease-in-out ${style.delay}s infinite`,
      }}
    />
  );
}

/* ── Animated Counter ── */
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1800;
          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString("id-ID")}
      {suffix}
    </span>
  );
}

/* ── Scroll Reveal Hook ── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

/* ── RevealWrapper ── */
function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Particles Config ── */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  size: `${Math.random() * 6 + 3}px`,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  color:
    i % 3 === 0
      ? "rgba(56,189,248,0.7)"
      : i % 3 === 1
        ? "rgba(255,255,255,0.5)"
        : "rgba(99,102,241,0.5)",
  opacity: Math.random() * 0.5 + 0.2,
  duration: Math.random() * 6 + 6,
  delay: Math.random() * 4,
}));

/* ── STATS ── */
const STATS = [
  { value: 1247, suffix: "+", label: "Laporan Masuk" },
  { value: 98, suffix: "%", label: "Tingkat Penyelesaian" },
  { value: 24, suffix: "h", label: "Respons Rata-rata" },
];

/* ── INFO ITEMS ── */
const INFO = [
  {
    icon: FiShield,
    color: "sky",
    label: "Aman & Rahasia",
    desc: "Identitas pelapor dijaga dan dilindungi sepenuhnya oleh sistem.",
  },
  {
    icon: FiCheckCircle,
    color: "emerald",
    label: "Transparan",
    desc: "Seluruh proses pelaporan dapat dipantau dengan jelas.",
  },
  {
    icon: FiLink,
    color: "violet",
    label: "Terintegrasi",
    desc: "Sistem terhubung secara digital untuk pengelolaan laporan.",
  },
];

const COLOR_MAP = {
  sky: { bg: "bg-sky-500/20", text: "text-sky-400" },
  emerald: { bg: "bg-emerald-500/20", text: "text-emerald-400" },
  violet: { bg: "bg-violet-500/20", text: "text-violet-400" },
};

/* ════════════════════════════════════════
   HOME
════════════════════════════════════════ */
function Home() {
  const [card1Hovered, setCard1Hovered] = useState(false);
  const [card2Hovered, setCard2Hovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const heroRef = useRef(null);

  /* Parallax subtle mouse tracking for hero glow */
  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg-pekanbaru.jpg')" }}
    >
      {/* OVERLAY */}
      <div
        className="min-h-screen flex flex-col justify-between"
        style={{
          background:
            "linear-gradient(135deg, rgba(5,15,30,0.82) 0%, rgba(10,30,60,0.75) 50%, rgba(15,40,80,0.70) 100%)",
        }}
      >
        {/* Floating Particles */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {PARTICLES.map((p, i) => (
            <Particle key={i} style={p} />
          ))}
        </div>

        {/* Dynamic glow that follows mouse */}
        <div
          className="fixed pointer-events-none z-0"
          style={{
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 70%)",
            left: `calc(50% + ${mousePos.x * 80}px - 300px)`,
            top: `calc(50% + ${mousePos.y * 80}px - 300px)`,
            transition: "left 0.5s ease, top 0.5s ease",
          }}
        />

        {/* CONTENT */}
        <div className="relative z-10 px-20 pt-28 pb-10 w-full flex flex-col">
          {/* HERO */}
          <Reveal delay={0}>
            <div className="text-white max-w-4xl mb-10" ref={heroRef}>
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-sm font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-8 backdrop-blur-md cursor-default select-none"
                style={{ animation: "badgePulse 4s ease-in-out infinite" }}
              >
                <span
                  className="w-2 h-2 rounded-full bg-sky-400"
                  style={{ animation: "pulse 2s infinite" }}
                />
                Inspektorat Kota Pekanbaru
              </div>

              {/* Title */}
              <h1
                className="text-8xl font-extrabold leading-tight mb-6 tracking-tight"
                style={{ textShadow: "0 2px 24px rgba(0,0,0,0.4)" }}
              >
                <span
                  style={{
                    display: "inline-block",
                    animation: "slideInLeft 0.8s ease both",
                  }}
                >
                  SIPERDA
                </span>
                <span
                  className="text-sky-400"
                  style={{
                    display: "inline-block",
                    animation: "slideInLeft 0.8s ease 0.1s both",
                  }}
                >
                  -
                </span>
                <span
                  style={{
                    display: "inline-block",
                    animation: "slideInLeft 0.8s ease 0.2s both",
                  }}
                >
                  INTERNAL
                </span>
              </h1>

              {/* Subtitle */}
              <h2
                className="text-3xl font-medium leading-relaxed mb-6 text-white/80 max-w-5xl"
                style={{ animation: "fadeUp 0.9s ease 0.3s both" }}
              >
                Sistem Informasi Pelaporan Pelanggaran Disiplin Pegawai Internal
                Inspektorat Kota Pekanbaru
              </h2>

              {/* Description */}
              <p
                className="text-xl text-white/60 leading-relaxed max-w-3xl"
                style={{ animation: "fadeUp 0.9s ease 0.4s both" }}
              >
                Sarana resmi untuk melaporkan pelanggaran disiplin pegawai
                secara transparan, aman, dan terintegrasi dalam satu sistem
                digital.
              </p>
            </div>
          </Reveal>

          {/* STATS ROW */}
          <Reveal delay={100}>
            <div className="flex gap-8 mb-14">
              {STATS.map(({ value, suffix, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-start gap-1 cursor-default group"
                >
                  <span className="text-4xl font-extrabold text-white group-hover:text-sky-300 transition-colors duration-300">
                    <Counter target={value} suffix={suffix} />
                  </span>
                  <span className="text-sm text-white/50 tracking-wide uppercase">
                    {label}
                  </span>
                  <span className="w-0 group-hover:w-full h-0.5 bg-sky-400 rounded-full transition-all duration-500" />
                </div>
              ))}
            </div>
          </Reveal>

          {/* CARD SECTION */}
          <Reveal delay={150}>
            <div className="grid grid-cols-2 gap-10 mb-10 w-full max-w-7xl">
              {/* CARD 1 — Laporkan */}
              <div
                className="w-full min-h-[340px] rounded-3xl p-10 shadow-2xl flex flex-col cursor-pointer"
                style={{
                  background: card1Hovered
                    ? "linear-gradient(135deg, #a93226 0%, #c0392b 40%, #e74c3c 100%)"
                    : "linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  transform: card1Hovered
                    ? "scale(1.025) translateY(-4px)"
                    : "scale(1) translateY(0)",
                  boxShadow: card1Hovered
                    ? "0 24px 64px rgba(231,76,60,0.4)"
                    : "0 8px 32px rgba(0,0,0,0.3)",
                  transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                }}
                onMouseEnter={() => setCard1Hovered(true)}
                onMouseLeave={() => setCard1Hovered(false)}
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-4xl mb-8 backdrop-blur-sm"
                  style={{
                    background: card1Hovered
                      ? "rgba(255,255,255,0.3)"
                      : "rgba(255,255,255,0.2)",
                    transition: "background 0.3s",
                    transform: card1Hovered
                      ? "rotate(-6deg) scale(1.1)"
                      : "rotate(0deg) scale(1)",
                  }}
                >
                  <FiAlertCircle />
                </div>

                <h1 className="text-4xl font-bold text-white mb-5">
                  Laporkan Pelanggaran
                </h1>

                <p className="text-white/75 leading-relaxed mb-10 text-lg flex-1">
                  Laporkan dugaan pelanggaran disiplin pegawai secara cepat,
                  aman, dan mudah melalui sistem digital terintegrasi.
                </p>

                <NavLink
                  to="/lapor"
                  className="inline-flex items-center gap-3 bg-white text-red-600 font-semibold text-lg px-8 py-4 rounded-2xl hover:bg-red-50 transition-all duration-300 self-start shadow-lg group/btn"
                >
                  Mulai Lapor
                  <FiArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </NavLink>
              </div>

              {/* CARD 2 — Riwayat */}
              <div
                className="w-full min-h-[340px] rounded-3xl p-10 shadow-2xl flex flex-col cursor-pointer"
                style={{
                  background: card2Hovered
                    ? "rgba(255,255,255,0.12)"
                    : "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  backdropFilter: "blur(18px)",
                  transform: card2Hovered
                    ? "scale(1.025) translateY(-4px)"
                    : "scale(1) translateY(0)",
                  boxShadow: card2Hovered
                    ? "0 24px 64px rgba(14,165,233,0.15)"
                    : "0 8px 32px rgba(0,0,0,0.2)",
                  transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                }}
                onMouseEnter={() => setCard2Hovered(true)}
                onMouseLeave={() => setCard2Hovered(false)}
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-sky-400 text-4xl mb-8"
                  style={{
                    background: card2Hovered
                      ? "rgba(14,165,233,0.25)"
                      : "rgba(14,165,233,0.15)",
                    transform: card2Hovered
                      ? "rotate(6deg) scale(1.1)"
                      : "rotate(0deg) scale(1)",
                    transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                >
                  <FiFolder />
                </div>

                <h1 className="text-4xl font-bold text-white mb-5">
                  Riwayat Laporan
                </h1>

                <p className="text-white/70 leading-relaxed mb-10 text-lg flex-1">
                  Pantau status dan perkembangan seluruh laporan yang telah anda
                  kirimkan secara realtime.
                </p>

                <NavLink
                  to="/riwayat"
                  className="inline-flex items-center gap-3 font-semibold text-lg px-8 py-4 rounded-2xl transition-all duration-300 self-start group/btn"
                  style={{
                    background: "rgba(255,255,255,0.10)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#fff",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.18)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.10)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  }}
                >
                  Lihat Riwayat
                  <FiArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </NavLink>
              </div>
            </div>
          </Reveal>

          {/* BOTTOM INFO */}
          <Reveal delay={200}>
            <div
              className="flex text-white rounded-3xl overflow-hidden mb-10"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(14px)",
                maxWidth: "1400px",
                width: "100%",
              }}
            >
              {INFO.map(({ icon: Icon, color, label, desc }, i) => {
                const c = COLOR_MAP[color];
                return (
                  <>
                    {i > 0 && (
                      <div
                        key={`divider-${i}`}
                        className="w-px bg-white/10 my-6"
                      />
                    )}
                    <div
                      key={label}
                      className="flex gap-4 items-start px-10 py-8 flex-1 group cursor-default transition-all duration-300 hover:bg-white/5 rounded-3xl"
                    >
                      <div
                        className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center ${c.text} text-2xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                      >
                        <Icon />
                      </div>

                      <div>
                        <h1 className="font-bold text-xl text-white mb-2 group-hover:text-sky-200 transition-colors duration-300">
                          {label}
                        </h1>
                        <p className="text-sm text-white/60 leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33%       { transform: translateY(-18px) translateX(8px); }
          66%       { transform: translateY(-8px) translateX(-10px); }
        }
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(56,189,248,0); }
          50%       { box-shadow: 0 0 20px 4px rgba(56,189,248,0.15); }
        }
      `}</style>
    </div>
  );
}

export default Home;
