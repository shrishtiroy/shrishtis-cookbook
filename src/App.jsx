import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './styles.css';

const DISHES = [
  { id: "d1", tilt: -2.4 },
  { id: "d2", tilt: 1.8 },
  { id: "d3", tilt: -1.6 },
  { id: "d4", tilt: 2.2 },
  { id: "d5", tilt: -2.8 },
  { id: "d6", tilt: 1.4 },
];

const SAMPLE_PHOTOS = ["/food-pics/sample-01.jpg", "/food-pics/sample-02.jpg", "/food-pics/sample-03.jpg"];

function SaltShaker() {
  return (
    <svg viewBox="0 0 200 380" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <circle cx="62" cy="14" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="148" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="40" cy="40" r="1.2" fill="currentColor" stroke="none" />
      <path d="M 64 70 C 64 38, 78 22, 100 22 C 122 22, 136 38, 136 70 Z" />
      <path d="M 60 70 L 140 70 L 140 82 L 60 82 Z" />
      <line x1="60" y1="74" x2="140" y2="74" />
      <line x1="60" y1="78" x2="140" y2="78" />
      <circle cx="100" cy="34" r="1.5" />
      <circle cx="88" cy="38" r="1.5" />
      <circle cx="112" cy="38" r="1.5" />
      <circle cx="82" cy="48" r="1.5" />
      <circle cx="100" cy="48" r="1.5" />
      <circle cx="118" cy="48" r="1.5" />
      <path d="M 70 82 L 130 82 L 130 96 L 70 96 Z" />
      <path d="M 70 96 L 130 96 L 158 348 L 42 348 Z" />
      <line x1="50" y1="340" x2="150" y2="340" />
      <line x1="86" y1="96" x2="74" y2="348" />
      <line x1="100" y1="96" x2="100" y2="348" />
      <line x1="114" y1="96" x2="126" y2="348" />
    </svg>
  );
}

function Fill({ width = "long", placeholder = "" }) {
  return (
    <span
      className={`fill-line ${width}`}
      contentEditable="true"
      suppressContentEditableWarning
      data-ph={placeholder}
    />
  );
}

function CoverPage({ onOpen }) {
  return (
    <div className="page right cover" onClick={onOpen}>
      <div className="cover-spine" />
      <div className="cover-shaker"><SaltShaker /></div>
      <div className="cover-frame" />
      <div className="cover-inner">
        <div className="cover-top">
          <h1 className="cover-title-stack">
            <span className="row" style={{ fontWeight: "500", fontFamily: '"Playfair Display"' }}>ADD</span>
            <span className="row" style={{ fontWeight: "500", fontFamily: '"Playfair Display"' }}>SALT<span className="dot">.</span></span>
          </h1>
          <div className="cover-rule" style={{ height: "0px" }} />
          <div className="cover-sub">A kitchen<br />notebook</div>
        </div>
        <div className="cover-bottom">
          <div className="cover-byline">
            by
            <span className="name">SHRISHTI ROY</span>
          </div>
          <div className="cover-vol">Vol. I<br />MMXXVI</div>
        </div>
      </div>
      <div className="cover-hint" />
    </div>
  );
}

function InsideFrontPage() {
  return (
    <div className="page-inner inside-front">
      <div className="stamp">Property of <Fill placeholder="your name" width="" /> — kitchen no. 1</div>
      <div className="meta" style={{ marginTop: 'auto' }}>
        <div style={{ fontSize: 13, lineHeight: 1.6 }}>
          A working notebook of dishes I've cooked, kept in chronological order, newest first.
        </div>
        <div style={{ height: 14 }} />
        <div style={{ fontSize: 12 }}>
          <strong>Entries from</strong>{' '}
          <Fill placeholder="month / year" width="" />
        </div>
        <div style={{ fontSize: 12 }}>
          <strong>To</strong>{' '}
          <Fill placeholder="month / year" width="" />
        </div>
        <div style={{ height: 24 }} />
        <div style={{ fontStyle: 'italic', fontSize: 12, opacity: .75, color: 'var(--ink-soft)' }}>
          "Cooking is a series of small, correct decisions made quickly."
        </div>
      </div>
    </div>
  );
}

function ForewordPage() {
  return (
    <div className="page-inner foreword">
      <div className="eyebrow">Foreword</div>
      <h1>Hello, chef.</h1>
      <div
        className="fill-block fill-lines"
        contentEditable="true"
        suppressContentEditableWarning
        style={{ marginTop: 8, minHeight: 220 }}
      />
      <div className="sign-off" style={{ marginTop: 18 }}>
        — <Fill placeholder="S." width="" />
      </div>
    </div>
  );
}

function TocPage() {
  return (
    <div className="page-inner toc">
      <div className="eyebrow">Index</div>
      <h2>What I made.</h2>
      <ol>
        {DISHES.map((d, i) => (
          <li key={d.id}>
            <span className="num">{String(i + 1).padStart(2, "0")}</span>
            <Fill placeholder="dish name" width="long" />
            <span className="dots" />
            <Fill placeholder="mm.dd.yyyy" width="" />
          </li>
        ))}
      </ol>
    </div>
  );
}

function DishPage({ dish, index, layout }) {
  const polRest = `rotate(${dish.tilt}deg)`;
  const sampleSrc = SAMPLE_PHOTOS[index % SAMPLE_PHOTOS.length];
  return (
    <div
      className={`dish layout-${layout}`}
      style={{ "--pol-rest": polRest }}>

      <div className="polaroid-wrap" style={{ height: layout === "bleed" ? "100%" : undefined }}>
        <div className="polaroid" style={{ transform: polRest }}>
          {layout === "polaroid" && <div className="tape tl" />}
          {layout === "polaroid" && <div className="tape tr" />}
          <img
            className="photo"
            src={sampleSrc}
            alt=""
            draggable="false"
          />
          {layout === "polaroid" && (
            <div className="pol-cap">
              <Fill placeholder="dish name" width="" />
            </div>
          )}
        </div>
      </div>

      {layout === "polaroid" ? (
        <div className="dish-foot">
          <div className="date">
            <Fill placeholder="mm.dd.yyyy" width="" />
          </div>
          <div className="dish-note">
            — <Fill placeholder="what I learned" width="xl" />
          </div>
        </div>
      ) : (
        <>
          <div className="dish-meta">
            <div className="name">
              <Fill placeholder="dish name" width="long" />
            </div>
            <div className="date">
              <Fill placeholder="mm.dd.yyyy" width="" />
            </div>
          </div>
          <div className="dish-note">
            — <Fill placeholder="what I learned" width="xl" />
          </div>
        </>
      )}
      <div className="page-number">{index + 1}</div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="page-inner contact">
      <div className="eyebrow">Stage Inquiries</div>
      <h2>Let's cook.</h2>
      <div
        className="fill-block fill-lines"
        contentEditable="true"
        suppressContentEditableWarning
        style={{ marginTop: 8, minHeight: 130 }}
      />
      <ul>
        <li><span>Email</span><Fill placeholder="you@email.com" width="long" /></li>
        <li><span>Phone</span><Fill placeholder="(   )   -    " width="" /></li>
        <li><span>Instagram</span><Fill placeholder="@handle" width="" /></li>
        <li><span>Based in</span><Fill placeholder="city" width="" /></li>
      </ul>
    </div>
  );
}

function buildPages(layout) {
  const list = [
    { key: "cover", render: (props) => <CoverPage {...props} /> },
    { key: "inside-front", render: () => <InsideFrontPage /> },
    { key: "foreword", render: () => <ForewordPage /> },
    { key: "toc", render: () => <TocPage /> },
  ];
  DISHES.forEach((d, i) => {
    list.push({
      key: `dish-${d.id}`,
      render: () => <DishPage dish={d} index={i} layout={layout} />,
    });
  });
  list.push({ key: "contact", render: () => <ContactPage /> });
  if (list.length % 2 === 1) {
    list.push({ key: "blank", render: () => <div className="page-inner" /> });
  }
  return list;
}

function Book({ layout }) {
  const pages = useMemo(() => buildPages(layout), [layout]);
  const lastSpread = Math.floor((pages.length - 1) / 2);
  const [spread, setSpread] = useState(0);
  const [flip, setFlip] = useState(null);
  const lockRef = useRef(false);

  const turn = useCallback((dir) => {
    if (lockRef.current) return;
    const to = spread + dir;
    if (to < 0 || to > lastSpread) return;
    lockRef.current = true;
    setFlip({ dir, fromSpread: spread, toSpread: to, phase: 'mount' });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFlip((f) => f ? { ...f, phase: 'animate' } : null);
      });
    });
    const ms = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--flip-ms')) || 900;
    setTimeout(() => {
      setSpread(to);
      setFlip(null);
      lockRef.current = false;
    }, ms + 30);
  }, [spread, lastSpread]);

  useEffect(() => {
    const onKey = (e) => {
      const sect = document.querySelector('.book-section');
      if (!sect) return;
      const r = sect.getBoundingClientRect();
      const inView = r.top < window.innerHeight * 0.6 && r.bottom > window.innerHeight * 0.4;
      if (!inView) return;
      if (e.key === "ArrowRight") { e.preventDefault(); turn(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); turn(-1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [turn]);

  const pageAt = (idx) => pages[idx]?.render({ onOpen: () => turn(1) }) || null;
  const leftIdxFor = (S) => S === 0 ? -1 : 2 * S - 1;
  const rightIdxFor = (S) => S === 0 ? 0 : 2 * S;

  const curLeftIdx = leftIdxFor(spread);
  const curRightIdx = rightIdxFor(spread);

  let flipFront = null, flipBack = null, flipSide = "right", flipping = false, deg = 0;
  if (flip) {
    flipping = true;
    const targetDeg = flip.dir === 1 ? -180 : 180;
    deg = flip.phase === 'animate' ? targetDeg : 0;
    if (flip.dir === 1) {
      flipSide = "right";
      flipFront = pageAt(curRightIdx);
      flipBack = pageAt(leftIdxFor(flip.toSpread));
    } else {
      flipSide = "left";
      flipFront = pageAt(curLeftIdx);
      flipBack = pageAt(rightIdxFor(flip.toSpread));
    }
  }

  const stableLeft = flipping
    ? (flip.dir === 1 ? pageAt(curLeftIdx) : pageAt(leftIdxFor(flip.toSpread)))
    : pageAt(curLeftIdx);
  const stableRight = flipping
    ? (flip.dir === 1 ? pageAt(rightIdxFor(flip.toSpread)) : pageAt(curRightIdx))
    : pageAt(curRightIdx);

  const wrap = (side, node, key, isCover = false) => {
    if (!node) return null;
    if (isCover) return <div key={key}>{node}</div>;
    return (
      <div className={`page ${side} paper`} key={key}>
        {node}
      </div>
    );
  };

  return (
    <>
      <div
        className="book"
        data-open={spread > 0 || (flip && flip.toSpread > 0) ? "true" : "false"}>

        <div className="book-base" />

        {spread > 0 && wrap("left", stableLeft, `L-${spread}-${flipping ? 'f' : 's'}`)}

        {curRightIdx === 0 && !flipping
          ? wrap("right", stableRight, `R-cover`, true)
          : wrap("right", stableRight, `R-${spread}-${flipping ? 'f' : 's'}`, false)
        }

        {flipping && (
          <div
            className={`flipper ${flipSide} flipping`}
            style={{
              transform: `rotateY(${deg}deg)`,
              transition: `transform var(--flip-ms) var(--flip-ease)`,
            }}>
            <div className="face front">
              {flip.dir === 1 && curRightIdx === 0
                ? flipFront
                : <div className={`page ${flipSide} paper`} style={{ position: 'absolute', inset: 0 }}>{flipFront}</div>
              }
            </div>
            <div className="face back">
              <div className={`page ${flipSide === 'right' ? 'left' : 'right'} paper`} style={{ position: 'absolute', inset: 0 }}>
                {flipBack}
              </div>
            </div>
            <div className="curl" />
          </div>
        )}
      </div>

      <button
        className="nav-arrow prev"
        onClick={() => turn(-1)}
        disabled={spread === 0}
        aria-label="Previous page">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 5 9 12 15 19" /></svg>
      </button>
      <button
        className="nav-arrow next"
        onClick={() => turn(1)}
        disabled={spread >= lastSpread}
        aria-label="Next page">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 5 15 12 9 19" /></svg>
      </button>

      <div className="counter">
        {spread === 0 ? " " : `Page ${2 * spread - 1}–${2 * spread} of ${pages.length - 1}`}
      </div>
    </>
  );
}

function HeroAbout() {
  const scrollToBook = () => {
    document.querySelector('.book-section')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section className="hero">
      <div className="hero-text">
        <div className="hero-eyebrow">ORIGIN</div>
        <h2 className="hero-title">
          <span className="why" style={{ fontSize: "50px", fontFamily: "serif" }}>Why</span>
          <span className="add" style={{ fontSize: "40px" }}>add salt<span className="dot">?</span></span>
        </h2>
        <div className="hero-rule" style={{ margin: "0px 0px 7px", width: "140px" }} />
        <div className="hero-body">
          <p>
            It only takes one question for my little sister and my face to light up. "So what should we make?"
          </p>
          <p>
            This leads to a frenzy of suggestions and an even larger frenzy of whipping up our ideas. I'm always the final taste tester and for every single dish, from our rosemary focaccia to our carrot cake ice cream, my sister will approve of it. I'll give it one taste and tell her, add salt.
            It's these memories of cooking with my sister that I cherish most. Despite our 7 year age gap, the possibilities behind what to make bond us together.
          </p>
          <p style={{ marginTop: 24 }}>
            <button
              type="button"
              className="read-link"
              onClick={scrollToBook}
              aria-label="Read the book">
              <span className="read-label">Read the book</span>
              <span className="read-mark" aria-hidden="true">
                <span className="read-line" />
                <span className="read-arrow">↓</span>
              </span>
            </button>
          </p>
        </div>
      </div>
      <div className="hero-side">
        <div className="hero-shaker"><SaltShaker /></div>
        <div className="caption">a kitchen notebook</div>
      </div>
    </section>
  );
}

export default function App() {
  const layout = "polaroid";
  return (
    <div className="page-shell">
      <header className="wordmark">
        <div className="brand">ADD SALT.</div>
        <div className="meta">est. 2026</div>
      </header>

      <HeroAbout />

      <section className="book-section">
        <Book layout={layout} />
      </section>

      <footer className="closer">
        <h3>Find me</h3>
        <p className="lead">For stages, trails, or a quick chat about a dish.</p>
        <div className="contact-row">
          <div className="item">
            <div className="label">Email</div>
            <div className="val"><Fill placeholder="you@email.com" width="long" /></div>
          </div>
          <div className="item">
            <div className="label">Phone</div>
            <div className="val"><Fill placeholder="(   )   -    " width="" /></div>
          </div>
          <div className="item">
            <div className="label">Instagram</div>
            <div className="val"><Fill placeholder="@handle" width="" /></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
