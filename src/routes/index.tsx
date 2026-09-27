import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUp, Atom, Download, Menu, Plus, RotateCcw, Shield, Sparkles, Swords, Volume2, VolumeX, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/assemble-hero.jpg";
import archetypesImage from "@/assets/assemble-archetypes.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "ASSEMBLE — The Infinity Protocol | GFG Student Chapter, Bennett University" },
    { name: "description", content: "Great ideas need a team. Explore ASSEMBLE, a Marvel-inspired student event concept from GeeksForGeeks Student Chapter at Bennett University." },
    { property: "og:title", content: "ASSEMBLE — The Infinity Protocol" },
    { property: "og:description", content: "Great ideas need a team. Yours starts here. A student event concept at Bennett University." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

type Hero = { name: string; role: string; trait: string; quote: string; color: string };
const heroes: Hero[] = [
  { name: "Iron Man", role: "THE INNOVATOR", trait: "Invent the impossible", quote: "Turn your wildest idea into something real.", color: "var(--primary)" },
  { name: "Captain America", role: "THE LEADER", trait: "Lead with purpose", quote: "Bring the team together when it matters most.", color: "var(--cyan)" },
  { name: "Thor", role: "THE VISIONARY", trait: "Think beyond limits", quote: "Bring the thunder to every challenge.", color: "var(--gold)" },
  { name: "Black Widow", role: "THE STRATEGIST", trait: "Move with precision", quote: "Find the clever way through the impossible.", color: "var(--primary)" },
];
const phases = [
  { name: "Briefing", text: "Get the mission context, meet the challenge, and discover what the day could hold. Final format and details will be announced by the chapter." },
  { name: "Team Assembly", text: "Connect with fellow builders and form your alliance. Team format and size are still to be confirmed." },
  { name: "Build", text: "Explore ideas, experiment, and work together on a technical solution. The final activity program is to be announced." },
  { name: "Showcase", text: "Share what your team imagined and built. Presentation format and schedule will follow the official announcement." },
];
const faqs = [
  { q: "Who is ASSEMBLE for?", a: "This concept is for curious student builders, designers, thinkers, and problem-solvers. Official eligibility will be confirmed by GeeksForGeeks Student Chapter, Bennett University." },
  { q: "Do I need coding experience?", a: "The planned concept welcomes a mix of skills and perspectives. Specific experience requirements, if any, will be announced with the official event details." },
  { q: "Can I bring a team?", a: "Team format and size are to be announced. For now, you can add an optional team name to your preview pass." },
  { q: "Does creating a pass register me?", a: "No. The pass is a local preview you can download for fun. Official registration opens only when the chapter announces details." },
  { q: "When and where is it happening?", a: "The event date is to be announced. The concept is set at Bennett University in Greater Noida; the specific campus venue is forthcoming." },
];

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[character] ?? character);
}
function downloadPass(name: string, team: string, hero: Hero) {
  const safeName = escapeXml(name.slice(0, 60));
  const safeTeam = escapeXml((team || "UNASSIGNED").slice(0, 60));
  const safeHero = escapeXml(hero.name);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="620" viewBox="0 0 1000 620"><rect width="1000" height="620" fill="#08090d"/><rect x="20" y="20" width="960" height="580" fill="none" stroke="#555861"/><circle cx="810" cy="260" r="165" fill="none" stroke="#247f8f" opacity=".3"/><circle cx="810" cy="260" r="112" fill="none" stroke="#247f8f" opacity=".25"/><path d="M50 472h900" stroke="#555861"/><text x="55" y="100" fill="#ed1d24" font-family="Arial,sans-serif" font-size="72" font-weight="900">ASSEMBLE</text><text x="55" y="139" fill="#9da4aa" font-family="Arial,sans-serif" font-size="18" letter-spacing="4">THE INFINITY PROTOCOL · PREVIEW PASS</text><text x="55" y="285" fill="#7eced8" font-family="Arial,sans-serif" font-size="17" letter-spacing="3">INITIATIVE MEMBER</text><text x="55" y="350" fill="#f6f4ee" font-family="Arial,sans-serif" font-size="48" font-weight="900" textLength="${Math.min(760, Math.max(220, name.length * 27))}" lengthAdjust="spacingAndGlyphs">${safeName}</text><text x="55" y="402" fill="#9da4aa" font-family="Arial,sans-serif" font-size="20">TEAM: ${safeTeam}</text><text x="55" y="512" fill="#9da4aa" font-family="Arial,sans-serif" font-size="17" letter-spacing="3">CHOSEN HERO</text><text x="55" y="552" fill="#f6f4ee" font-family="Arial,sans-serif" font-size="30" font-weight="800">${safeHero}</text><text x="520" y="538" fill="#ed1d24" opacity=".9" font-family="Arial,sans-serif" font-size="35" font-weight="900" transform="rotate(-12 520 538)">PREVIEW ONLY · NOT REGISTRATION</text><text x="55" y="583" fill="#9da4aa" font-family="Arial,sans-serif" font-size="13">GFG STUDENT CHAPTER · BENNETT UNIVERSITY · EVENT DETAILS TBA</text></svg>`;
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "assemble-preview-pass.svg";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function Index() {
  const [selected, setSelected] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [motionOff, setMotionOff] = useState(false);
  const [phaseOpen, setPhaseOpen] = useState<number | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [error, setError] = useState("");
  const [created, setCreated] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMotionOff(media.matches);
    const onChange = (event: MediaQueryListEvent) => setMotionOff(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);
  useEffect(() => {
    if (motionOff) return;
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: .1 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [motionOff]);
  const chosen = heroes[selected];
  const closeMenu = () => setMenuOpen(false);
  const makePass = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) { setError("Enter your name to create a preview pass."); nameRef.current?.focus(); return; }
    setName(name.trim()); setTeam(team.trim()); setError(""); setCreated(true);
  };
  const resetPass = () => { setCreated(false); setName(""); setTeam(""); setError(""); nameRef.current?.focus(); };
  return <div className={`site-shell${motionOff ? " motion-off" : ""}`}>
    <a href="#main" className="skip-link">Skip to content</a><div className="noise-overlay" aria-hidden="true" />
    <header className="site-header">
      <a href="#top" className="brand" onClick={closeMenu} aria-label="GeeksForGeeks Student Chapter, Bennett University — back to top"><span className="brand-mark" aria-hidden="true">G</span><span className="brand-name">GeeksForGeeks<small>STUDENT CHAPTER · BENNETT</small></span><span className="marvel-badge" aria-label="Marvel inspired">MARVEL</span></a>
      <nav id="site-nav" aria-label="Main navigation" className={`header-links${menuOpen ? " is-open" : ""}`}>
        <a href="#mission" onClick={closeMenu}>Mission</a><a href="#heroes" onClick={closeMenu}>Heroes</a><a href="#timeline" onClick={closeMenu}>Timeline</a><a href="#faq" onClick={closeMenu}>FAQ</a><a className="menu-join md:hidden" href="#join" onClick={closeMenu}>Join the initiative →</a>
      </nav>
      <div className="header-actions"><Button type="button" variant="ghost" className="icon-control" onClick={() => setMotionOff((previous) => !previous)} aria-label={motionOff ? "Enable motion" : "Pause motion"} title={motionOff ? "Enable motion" : "Pause motion"}>{motionOff ? <VolumeX size={17} /> : <Volume2 size={17} />}</Button><Button asChild variant="cinematic" className="header-cta"><a href="#join">Join the initiative <ArrowRight size={14} /></a></Button><Button type="button" variant="ghost" className="icon-control mobile-toggle" onClick={() => setMenuOpen((previous) => !previous)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="site-nav">{menuOpen ? <X size={19} /> : <Menu size={19} />}</Button></div>
    </header>
    <main id="main">
      <section className="hero" id="top" aria-labelledby="hero-heading"><img src={heroImage} alt="Original concept art of an armored guardian overlooking a futuristic city at night" className="hero-image" width={1920} height={1080} fetchPriority="high" /><div className="hero-shade" aria-hidden="true" /><div className="reactor" aria-hidden="true" />
        <div className="hero-content"><div className="kicker">GEEKSFORGEEKS STUDENT CHAPTER / BENNETT UNIVERSITY</div><p className="hero-pretitle">The Infinity Protocol</p><h1 id="hero-heading" className="hero-title">ASSEMBLE</h1><div className="hero-rule" aria-hidden="true" /><p className="hero-tagline">Great ideas need a team.<br />Yours starts here.</p><p className="hero-copy">A new kind of mission for the minds that build, question, and imagine what comes next.</p><div className="hero-buttons"><Button asChild variant="cinematic"><a href="#join">Join the initiative <ArrowRight size={15} /></a></Button><Button asChild variant="cinematicOutline"><a href="#mission">Explore the mission <ArrowDown size={15} /></a></Button></div><div className="hero-status"><span className="status-dot" />Event date to be announced <span aria-hidden="true">•</span> Bennett University, Greater Noida</div></div>
        <div className="hero-bottom"><span>EARTH'S MIGHTIEST IDEAS START HERE</span><a href="#mission">SCROLL TO EXPLORE <ArrowDown size={13} /></a><span>01 / 05</span></div>
      </section>
      <section className="mission" id="mission" aria-labelledby="mission-heading"><div className="section-wrap"><div className="section-head reveal"><div><div className="section-kicker">01 / THE MISSION</div><h2 className="section-title" id="mission-heading">NOT ALL HEROES<br />WEAR CAPES.</h2></div><p className="section-lead">Some write code. Some sketch possibilities. Some bring the right people together. Every great mission needs all of them.</p></div><div className="mission-grid reveal"><div className="mission-cell"><span className="mission-number">01 / CREATE</span><Zap className="mission-icon" strokeWidth={1.4} /><h3>Code the<br />Impossible</h3><p>Transform ambitious ideas into working solutions through hands-on technical problem-solving.</p></div><div className="mission-cell"><span className="mission-number">02 / CONNECT</span><Shield className="mission-icon" strokeWidth={1.4} /><h3>Build Your<br />Alliance</h3><p>Bring different minds and skills together. The best breakthroughs are never a solo act.</p></div><div className="mission-cell"><span className="mission-number">03 / EXPLORE</span><Atom className="mission-icon" strokeWidth={1.4} /><h3>Enter the<br />Multiverse</h3><p>Explore unexpected approaches through collaborative design and creative experimentation.</p></div></div><p className="program-note">Planned program concept. Final activities and event details to be announced by the chapter.</p></div></section>
      <section className="heroes" id="heroes" aria-labelledby="heroes-heading"><div className="section-wrap"><div className="section-head reveal"><div><div className="section-kicker">02 / YOUR ALLIANCE</div><h2 className="section-title" id="heroes-heading">CHOOSE YOUR<br />HERO.</h2></div><p className="section-lead">Every team needs a different kind of strength. Which one speaks to yours?</p></div><div className="reveal"><div className="hero-art"><img src={archetypesImage} alt="Four original sci-fi adventurer archetypes: an inventor, leader, visionary, and strategist" loading="lazy" width={1600} height={900} /></div><div className="hero-options" role="group" aria-label="Choose your hero">{heroes.map((hero, index) => <Button key={hero.name} type="button" variant="ghost" className="hero-option" style={{ "--hero-accent": hero.color } as React.CSSProperties} aria-pressed={selected === index} onClick={() => setSelected(index)}><span>0{index + 1} / {hero.role}</span><strong>{hero.name}</strong><small>{hero.trait}</small></Button>)}</div><div className="hero-detail" aria-live="polite"><div><span className="hero-detail-label">YOUR SELECTED ARCHETYPE / {chosen.role}</span><p>“{chosen.quote}”</p></div><a href="#join">Carry this into your pass <ArrowRight size={16} /></a></div></div></div></section>
      <div className="breaker" aria-hidden="true"><div className="breaker-inner"><p>THE PROTOCOL IS LIVE</p><h2>THE NEXT CHAPTER<br />STARTS WITH YOU.</h2></div></div>
      <section className="timeline" id="timeline" aria-labelledby="timeline-heading"><div className="section-wrap"><div className="section-head reveal"><div><div className="section-kicker">03 / THE JOURNEY</div><h2 className="section-title" id="timeline-heading">MISSION<br />TIMELINE.</h2></div><p className="section-lead">A look at the proposed journey. Times and final program are to be announced.</p></div><div className="timeline-list reveal">{phases.map((phase, index) => <div className="timeline-item" key={phase.name}><Button type="button" variant="ghost" className="timeline-trigger" aria-expanded={phaseOpen === index} aria-controls={`phase-${index}`} onClick={() => setPhaseOpen(phaseOpen === index ? null : index)}><span className="timeline-num">0{index + 1}</span><span className="timeline-name">{phase.name}</span><span className="timeline-time">TIME TBA</span><span className="timeline-plus"><Plus size={17} /></span></Button>{phaseOpen === index && <p id={`phase-${index}`} className="timeline-body">{phase.text}</p>}</div>)}</div></div></section>
      <section className="join" id="join" aria-labelledby="join-heading"><div className="section-wrap join-grid"><div className="reveal"><div className="section-kicker">04 / JOIN THE INITIATIVE</div><h2 className="section-title" id="join-heading">YOUR STORY<br />STARTS HERE.</h2><p className="join-copy">Put your name on the roster and see yourself in the story. Your selected hero follows you into your personal pass.</p><form className="join-form" onSubmit={makePass} noValidate><div className="field"><label htmlFor="pass-name">YOUR NAME <span aria-hidden="true">*</span></label><input id="pass-name" ref={nameRef} type="text" autoComplete="name" maxLength={60} value={name} disabled={created} onChange={(event) => { setName(event.target.value); if (error) setError(""); }} placeholder="Enter your name" required aria-invalid={Boolean(error)} aria-describedby={error ? "pass-error" : undefined} />{error && <span id="pass-error" className="field-error" role="alert">{error}</span>}</div><div className="field"><label htmlFor="pass-team">TEAM NAME <span className="text-muted-foreground">(OPTIONAL)</span></label><input id="pass-team" type="text" maxLength={60} value={team} disabled={created} onChange={(event) => setTeam(event.target.value)} placeholder="Name your alliance" /></div><p className="form-note">Create a preview pass. Official registration opens when the chapter announces details.</p><div className="form-actions">{created ? <><Button type="button" variant="cinematic" onClick={() => downloadPass(name, team, chosen)}><Download size={16} /> Download pass</Button><Button type="button" variant="subtle" onClick={() => { setCreated(false); nameRef.current?.focus(); }}>Edit pass</Button><Button type="button" variant="ghost" onClick={resetPass} aria-label="Reset pass" title="Reset pass"><RotateCcw size={17} /></Button></> : <Button type="submit" variant="cinematic">Create preview pass <ArrowRight size={16} /></Button>}</div></form></div><div className="pass-stage reveal"><div className="pass-heading"><span>YOUR INITIATIVE PASS</span><span>CONCEPT / 001</span></div><div className="pass" aria-label="Preview-only initiative pass"><div className="pass-top"><strong>ASSEMBLE</strong><span>PREVIEW ONLY</span></div><div className="pass-center"><span className="pass-overline">INITIATIVE MEMBER</span><div className="pass-name">{name.trim() || "YOUR NAME"}</div><p className="pass-team">TEAM / {team.trim() || "UNASSIGNED"}</p></div><div className="pass-bottom"><div><small>CHOSEN HERO</small><strong>{chosen.name}</strong></div><div><small>LOCATION</small><strong>BENNETT UNIVERSITY</strong></div></div><span className="pass-watermark">NOT REGISTRATION</span></div><p className="pass-caption">A personal concept pass, not a ticket or confirmation of entry. No information is sent or saved.</p></div></div></section>
      <section className="faq" id="faq" aria-labelledby="faq-heading"><div className="section-wrap faq-grid"><div className="reveal"><div className="section-kicker">05 / THE DETAILS</div><h2 className="section-title" id="faq-heading">NEED<br />INTEL?</h2><p className="section-lead" style={{ marginTop: 26 }}>What we know so far, and what’s still waiting for the official signal.</p></div><div className="faq-list reveal">{faqs.map((faq, index) => <div className="faq-item" key={faq.q}><Button type="button" variant="ghost" className="faq-trigger" aria-expanded={faqOpen === index} aria-controls={`faq-${index}`} onClick={() => setFaqOpen(faqOpen === index ? null : index)}><span>{faq.q}</span><Plus size={18} /></Button>{faqOpen === index && <p className="faq-answer" id={`faq-${index}`}>{faq.a}</p>}</div>)}</div></div></section>
    </main>
    <footer className="footer"><div className="section-wrap"><div className="footer-top"><div><div className="footer-logo">ASSEMBLE<span className="text-primary">.</span></div><p className="footer-desc">THE INFINITY PROTOCOL<br />GeeksForGeeks Student Chapter, Bennett University</p></div><a href="#top">Back to top <ArrowUp size={17} /></a></div><div className="footer-bottom"><span>Unofficial student fan event concept. Not affiliated with Marvel.</span><strong>Developed by Akshat Shankar Bidwai</strong></div></div></footer>
  </div>;
}
