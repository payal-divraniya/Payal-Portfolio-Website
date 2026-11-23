import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  MapPin,
  GraduationCap,
  BriefcaseBusiness,
  Code2,
  Sparkles,
  ExternalLink,
  Download,
  CheckCircle2,
  Database,
  Monitor,
  Server,
  Wrench,
  Send,
  Clock3,
} from "lucide-react";
import "./styles.css";

const nav = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Education",
  "Contact",
];
const skillGroups = [
  {
    title: "Frontend",
    icon: Monitor,
    tone: "lavender",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React.js",
      "Bootstrap",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend",
    icon: Server,
    tone: "blue",
    skills: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Database",
    icon: Database,
    tone: "sage",
    skills: ["MongoDB", "MySQL"],
  },
  {
    title: "Tools & Workflow",
    icon: Wrench,
    tone: "neutral",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "MongoDB Compass",
      "Antigravity IDE",
      "Postman",
    ],
  },
];

function BrowserPreview({ image, domain, alt, tone }) {
  return (
    <div className={`browser-shell ${tone}`}>
      <div className="browser-toolbar">
        <div className="browser-dots">
          <i />
          <i />
          <i />
        </div>
        <div className="browser-address">
          <span className="lock">⌑</span>
          {domain}
        </div>
        <span className="toolbar-menu">•••</span>
      </div>
      <div className="browser-screen">
        <img src={image} alt={alt} />
      </div>
    </div>
  );
}

function ProjectCard({
  number,
  title,
  description,
  image,
  domain,
  tone,
  tags,
  features,
  live,
  github,
}) {
  return (
    <article className="project-card reveal">
      <div className="project-visual">
        <div className="visual-orb orb-one" />
        <div className="visual-orb orb-two" />
        <BrowserPreview
          image={image}
          domain={domain}
          alt={`${title} website preview`}
          tone={tone}
        />
      </div>
      <div className="project-info">
        <div className="project-kicker">
          <span>0{number}</span>
          <span>FEATURED PROJECT</span>
        </div>
        <h3>{title}</h3>
        <p className="project-description">{description}</p>
        <div className="tag-list">
          {tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <ul className="feature-list">
          {features.map((f) => (
            <li key={f}>
              <CheckCircle2 size={15} />
              {f}
            </li>
          ))}
        </ul>
        <div className="project-links">
          <a href={live} target="_blank" rel="noreferrer">
            Live Demo <ArrowUpRight size={16} />
          </a>
          <a href={github} target="_blank" rel="noreferrer">
            GitHub <Github size={16} />
          </a>
        </div>
      </div>
    </article>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setActive(
              entry.target.id.charAt(0).toUpperCase() +
                entry.target.id.slice(1),
            );
        });
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    nav.forEach((n) => {
      const el = document.getElementById(n.toLowerCase());
      if (el) observer.observe(el);
    });
    const revealObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            revealObserver.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((el) => revealObserver.observe(el));
    return () => {
      observer.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  const goTo = (name) => {
    setMenuOpen(false);
    document
      .getElementById(name.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
  };
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submitContact(e) {
    e.preventDefault();
    setSending(true);
    setFeedback("");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Message could not be sent.");
      setFeedback("Thank you! Your message has been sent.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setFeedback(
        err.message.includes("Failed to fetch")
          ? "The contact service is not connected yet. Please email me directly."
          : err.message,
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <header className="site-header">
        <a
          className="wordmark"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            goTo("Home");
          }}
        >
          Payal<span>.</span>
          <small>DEVELOPER PORTFOLIO</small>
        </a>
        <button
          className="mobile-menu"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav
          className={menuOpen ? "nav-links open" : "nav-links"}
          aria-label="Main navigation"
        >
          {nav.map((n) => (
            <a
              key={n}
              className={active === n ? "active" : ""}
              href={`#${n.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                goTo(n);
              }}
            >
              {n}
            </a>
          ))}
          <a
            className="nav-resume"
            href="/Payal Divraniya - MERN Stack Developer Resume.pdf"
            download
          >
            <Download size={15} /> Resume
          </a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot" /> HELLO, I'M PAYAL
            </div>
            <h1>
              Building thoughtful
              <br />
              digital experiences
              <br />
              <em>with MERN Stack.</em>
            </h1>
            <p className="hero-lead">
              I'm Payal Divraniya, a MERN Stack Developer passionate about
              building responsive, scalable and user-friendly web applications.
            </p>
            <div className="hero-actions">
              <button
                className="button button-dark"
                onClick={() => goTo("Projects")}
              >
                Explore my work <ArrowUpRight size={17} />
              </button>
              <button
                className="button button-light"
                onClick={() => goTo("Contact")}
              >
                Get in touch <ArrowRight size={17} />
              </button>
            </div>
            <div className="hero-meta">
              <span>
                <MapPin size={15} /> Gujarat, India
              </span>
              <span>
                <GraduationCap size={16} /> BCA Graduate
              </span>
              <span className="availability">
                <i /> Open to opportunities
              </span>
            </div>
          </div>
          <div
            className="hero-art"
            aria-label="Decorative initials composition"
          >
            <div className="art-backdrop" />
            <div className="art-grid" />
            <div className="art-initials">
              P<span>D</span>
            </div>
            <div className="art-caption">
              DESIGN MINDED
              <br />
              DEVELOPER
            </div>
            <div className="float-note note-top">
              <Sparkles size={15} /> Always learning
            </div>
            <div className="float-note note-bottom">
              <Code2 size={16} /> Building with MERN
            </div>
            <div className="art-stamp">
              PD
              <br />
              <small>2026</small>
            </div>
            <div className="art-line" />
          </div>
          <a className="scroll-cue" href="#about">
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown size={15} />
          </a>
        </section>

        <section className="about section-wrap section-pad" id="about">
          <div className="section-heading reveal">
            <span className="section-index">01 / ABOUT</span>
            <h2>
              A little <em>about me.</em>
            </h2>
          </div>
          <div className="about-grid">
            <div className="about-copy reveal">
              <p className="large-copy">
                Curious by nature. <em>Developer by choice.</em>
              </p>
              <p>
                I enjoy turning ideas into useful digital products. My work
                brings together thoughtful interfaces, practical problem-solving
                and full-stack development.
              </p>
              <p>
                I'm focused on growing as a MERN Stack Developer and creating
                web experiences that feel clear, reliable and effortless to use.
              </p>
              <div className="signature">
                Payal Divraniya<span>— MERN Stack Developer</span>
              </div>
            </div>
            <div className="about-facts">
              <div className="fact-card fact-lavender reveal">
                <span className="fact-icon">
                  <GraduationCap />
                </span>
                <div>
                  <small>EDUCATION</small>
                  <strong>Bachelor of Computer Applications</strong>
                  <p>PKM College, Junagadh</p>
                </div>
              </div>
              <div className="fact-card fact-sage reveal">
                <span className="fact-icon">
                  <BriefcaseBusiness />
                </span>
                <div>
                  <small>INTERNSHIP</small>
                  <strong>React.js Internship</strong>
                  <p>TechRover Solutions Pvt Ltd · 120 hours</p>
                </div>
              </div>
              <div className="fact-card fact-blue reveal">
                <span className="fact-icon">
                  <Code2 />
                </span>
                <div>
                  <small>TRAINING</small>
                  <strong>Full Stack Development</strong>
                  <p>StackCode Training Institute</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="skills section-wrap section-pad" id="skills">
          <div className="section-heading reveal">
            <span className="section-index">02 / CAPABILITIES</span>
            <h2>
              My technical <em>toolkit.</em>
            </h2>
            <p>
              The technologies I use to bring ideas to life, from interface to
              database.
            </p>
          </div>
          <div className="skills-grid">
            {skillGroups.map((g, i) => {
              const Icon = g.icon;
              return (
                <article
                  className={`skill-card ${g.tone} reveal`}
                  key={g.title}
                >
                  <div className="skill-card-top">
                    <span className="skill-icon">
                      <Icon size={21} />
                    </span>
                    <span>0{i + 1}</span>
                  </div>
                  <h3>{g.title}</h3>
                  <div className="skill-pills">
                    {g.skills.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="projects section-pad" id="projects">
          <div className="section-wrap">
            <div className="section-heading projects-heading reveal">
              <span className="section-index">03 / SELECTED WORK</span>
              <h2>
                Made with purpose.
                <br />
                <em>Built to be useful.</em>
              </h2>
              <p>
                A selection of full-stack projects where thoughtful design meets
                practical functionality.
              </p>
            </div>
            <div className="projects-list">
              <ProjectCard
                number="1"
                title="CareerPilot"
                description="A job application tracker that brings applications, interview stages, follow-ups and job details together in one organized workspace."
                image="/assets/careerpilot-preview.png"
                domain="careerpilot-iidv.onrender.com"
                tone="career"
                tags={["React.js", "Node.js", "Express.js", "MongoDB"]}
                features={[
                  "Application status tracking",
                  "Search, filters & personal dashboard",
                  "Organized job-search workflow",
                ]}
                live="https://careerpilot-client.onrender.com/"
                github="https://github.com/payal-divraniya/CareerPilot"
              />
              <ProjectCard
                number="2"
                title="AI Resume Builder"
                description="A resume-building platform designed to help users create professional, ATS-friendly resumes with templates, AI-powered suggestions and a live preview."
                image="/assets/ai-resume-builder-preview.png"
                domain="AI Resume Builder · Project Preview"
                tone="resume"
                tags={[
                  "React.js",
                  "Vite",
                  "Node.js",
                  "Express.js",
                  "MongoDB",
                  "Groq API",
                ]}
                features={[
                  "AI-powered resume suggestions",
                  "Live resume preview & templates",
                  "Resume scoring and PDF export",
                ]}
                live="https://ai-resume-builder-khaki-three.vercel.app/"
                github="https://github.com/payal-divraniya/ai-resume-builder"
              />
            </div>
            <p className="project-note">
              Project previews show the original application landing pages. The
              screenshot interfaces are preserved as supplied.
            </p>
          </div>
        </section>

        <section className="journey section-wrap section-pad" id="experience">
          <div className="section-heading reveal">
            <span className="section-index">04 / EXPERIENCE</span>
            <h2>
              My <em>journey.</em>
            </h2>
            <p>
              Learning through hands-on work, structured training and building
              projects.
            </p>
          </div>
          <div className="timeline">
            <article className="timeline-item reveal">
              <div className="timeline-marker" />
              <div className="timeline-date">
                <Clock3 size={14} /> 22 JANUARY 2026
              </div>
              <div className="timeline-content">
                <span className="timeline-type">INTERNSHIP · 120 HOURS</span>
                <h3>React.js Intern</h3>
                <p className="timeline-org">TechRover Solutions Pvt Ltd</p>
                <p>Completed a 120-hour React.js internship.</p>
              </div>
            </article>
            <article className="timeline-item reveal">
              <div className="timeline-marker" />
              <div className="timeline-date">
                <Clock3 size={14} /> 01 JUNE 2026
              </div>
              <div className="timeline-content sage-panel">
                <span className="timeline-type">PROFESSIONAL TRAINING</span>
                <h3>Full Stack Developer Training</h3>
                <p className="timeline-org">StackCode Training Institute</p>
                <p>Full Stack Development training.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="education section-wrap section-pad" id="education">
          <div className="section-heading reveal">
            <span className="section-index">05 / EDUCATION</span>
            <h2>
              Built on a strong <em>foundation.</em>
            </h2>
          </div>
          <article className="education-card reveal">
            <div className="education-mark">
              <GraduationCap size={32} />
            </div>
            <div className="education-main">
              <span className="section-index">BACHELOR'S DEGREE</span>
              <h3>
                Bachelor of Computer Applications <span>(BCA)</span>
              </h3>
              <p>PKM College, Junagadh</p>
              <p className="muted">Bhakta Kavi Narsinh Mehta University</p>
            </div>
            <div className="education-year">
              MARCH
              <br />
              <strong>2026</strong>
            </div>
          </article>
        </section>

        <section className="contact section-pad" id="contact">
          <div className="section-wrap">
            <div className="section-heading reveal">
              <span className="section-index">06 / SAY HELLO</span>
              <h2>
                Let's make something <em>meaningful.</em>
              </h2>
              <p>
                Have an opportunity, a project idea or simply want to connect?
                I'd love to hear from you.
              </p>
            </div>
            <div className="contact-grid">
              <div className="contact-aside reveal">
                <p className="contact-statement">
                  Good work starts with a <em>conversation.</em>
                </p>
                <a
                  className="contact-detail"
                  href="mailto:payaldivraniya@gmail.com"
                >
                  <span>
                    <Mail />
                  </span>
                  <div>
                    <small>EMAIL</small>
                    <strong>payaldivraniya@gmail.com</strong>
                  </div>
                  <ArrowUpRight size={17} />
                </a>
                <a
                  className="contact-detail"
                  href="https://github.com/payal-divraniya"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>
                    <Github />
                  </span>
                  <div>
                    <small>GITHUB</small>
                    <strong>github.com/payal-divraniya</strong>
                  </div>
                  <ArrowUpRight size={17} />
                </a>
                <div className="contact-detail">
                  <span>
                    <MapPin />
                  </span>
                  <div>
                    <small>LOCATION</small>
                    <strong>Junagadh, Gujarat, India</strong>
                  </div>
                </div>
                <div className="social-row">
                  <a
                    href="https://github.com/payal-divraniya"
                    aria-label="GitHub"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/payal-divraniya51"
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Linkedin />
                  </a>
                  <a href="mailto:payaldivraniya@gmail.com" aria-label="Email">
                    <Mail />
                  </a>
                </div>
              </div>
              <form className="contact-form reveal" onSubmit={submitContact}>
                <div className="form-row">
                  <label>
                    Full name
                    <input
                      name="name"
                      value={form.name}
                      onChange={update}
                      placeholder="Your name"
                      required
                    />
                  </label>
                  <label>
                    Email address
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={update}
                      placeholder="you@example.com"
                      required
                    />
                  </label>
                </div>
                <label>
                  Subject
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={update}
                    placeholder="What would you like to discuss?"
                    required
                  />
                </label>
                <label>
                  Message
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={update}
                    placeholder="Write your message..."
                    rows="5"
                    required
                  />
                </label>
                <button
                  className="button button-dark submit-button"
                  disabled={sending}
                >
                  {sending ? "Sending..." : "Send message"} <Send size={16} />
                </button>
                {feedback && (
                  <p className="form-feedback" role="status">
                    {feedback}
                  </p>
                )}
                <p className="form-footnote">
                  Your details are used only to respond to your message.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="section-wrap footer-inner">
          <a className="wordmark" href="#home">
            Payal<span>.</span>
            <small>MERN STACK DEVELOPER</small>
          </a>
          <div className="footer-nav">
            {["About", "Skills", "Projects", "Contact"].map((n) => (
              <a key={n} href={`#${n.toLowerCase()}`}>
                {n}
              </a>
            ))}
          </div>
          <p>© {new Date().getFullYear()} Payal Divraniya. Made with care.</p>
          <a className="back-top" href="#home" aria-label="Back to top">
            <ArrowUpRight />
          </a>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
