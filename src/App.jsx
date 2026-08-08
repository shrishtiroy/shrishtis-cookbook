import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './styles.css';
import recipesData from './generated/recipes.json';

const {
  SHOWSTOPPERS,
  COLLEGE_MEALS,
  HEALTHY_RECIPES,
  FOOD_AROUND_WORLD,
  DESSERTS,
} = recipesData;

function SaltShaker() {
  return (
    <svg viewBox="0 0 200 380" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
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
          <div className="cover-vol">Vol. I<br />MMXXIII</div>
        </div>
      </div>
      <div className="cover-hint" />
    </div>
  );
}

function InsideFrontPage() {
  return (
    <div className="page-inner inside-front">
      <div className="stamp">Property of Shrishti Roy — kitchen no. 1</div>
      <div className="meta" style={{ marginTop: 'auto' }}>
        <div style={{ fontSize: 13, lineHeight: 1.6 }}>
          A "hand-written" notebook of dishes that I've cooked and experimented with. Yes, the font is my handwriting. Thank you, I know it's nice.
        </div>
        <div style={{ height: 14 }} />
        <div style={{ fontSize: 12 }}>
          <strong>Entries from</strong> November 2023
        </div>
        <div style={{ fontSize: 12 }}>
          <strong>To</strong> May 2026
        </div>
        <div style={{ height: 24 }} />
        <div style={{ fontStyle: 'italic', fontSize: 12, opacity: .75, color: 'var(--ink-soft)' }}>
          "You are what you eat. That's why I cook the most beautiful, intelligent, creative, versatile, and funny meals ;P"
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
      <div className="foreword-text" style={{ marginTop: 8, fontSize: 13, lineHeight: 1.65, color: 'var(--ink)' }}>
        <p style={{ margin: '0 0 10px' }}>I'd like to dedicate this book to my mom who is hands down the best cook I know and who feeds people with so much joy and passion it is as if she makes money for each second serving they take. She taught me how to eat and cook healthy and always pushes me to break the bounds of whatever I am doing.</p>
        <p style={{ margin: 0 }}>I would also like to acknowledge my sister for all our midnight cooking adventures and for her endless hunger. Half of these dishes would not have been made if it wasn't to satiate her midnight cravings &lt;3.</p>
      </div>
      <div className="sign-off" style={{ marginTop: 18 }}>
        — shrishti
      </div>
    </div>
  );
}

function AboutMePage() {
  return (
    <div className="page-inner foreword about-me-page">
      <div className="eyebrow">About Me</div>
      <h1>Hi there.</h1>
      <div style={{ marginTop: 8, fontSize: 12, lineHeight: 1.6, color: 'var(--ink)' }}>
        <p style={{ margin: 0 }}>I'm Shrishti. I am a Computer Science student at the University of Pennsylvania with a passion for cooking. Cooking is how I spend time with my family and friends. I even started a prepackaged chia pudding company, ChiaWala, for a bit to explore new fields. Some of my hobbies include running, playing soccer, and photography.</p>
      </div>
      <div className="about-me-polaroid">
        <div className="polaroid mini-pol" style={{ transform: 'rotate(-2deg)' }}>
          <div className="tape tl" />
          <img src="/about-me.JPG" alt="Shrishti in hotdog costume" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', objectPosition: '60% 30%', display: 'block', borderRadius: '1px' }} />
          <div className="pol-cap">my 2 fav foods</div>
        </div>
      </div>
    </div>
  );
}

function CookingPhilosophyPage() {
  return (
    <div className="page-inner foreword">
      <div className="eyebrow">Cooking Philosophy</div>
      <h1 style={{ fontSize: 24 }}>My inspiration.</h1>
      <div style={{ marginTop: 8, fontSize: 11.5, lineHeight: 1.6, color: 'var(--ink)' }}>
        <p style={{ margin: '0 0 8px' }}>Cooking has always been a passion of mine. I adopted it from my mom who has been cooking almost every meal for me since I was born. We are Bengali which if you don't know means we eat a lot of fish and seafood. Her cooking philosophy is simplify the number of ingredients used but maximize flavor.</p>
        <p style={{ margin: '0 0 8px' }}>She has an autoimmune disease which makes her allergic to dairy, gluten, soy, refined sugar, cruciferous vegetables, and most processed foods in general. Our family also doesn't eat beef or pork and growing up I used to eat lamb and goat (my mom makes the BEST mutton curry) but after my best friend and I saved a goat from the expressway I gave up red meat completely….unless it's In-N-Out or a baseball stadium hotdog.</p>
        <p style={{ margin: 0 }}>Anyways, most of my cooking is inspired from my mom and I hope to be a tenth of how talented she is. If you're wondering what my favorite food is, peer through my kitchen notebook and take a guess!</p>
      </div>
    </div>
  );
}

function ShowstoppersTitle() {
  return (
    <div className="page-inner foreword">
      <div className="eyebrow">Chapter One</div>
      <h1 style={{ fontSize: 28 }}>Showstoppers</h1>
      <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.65, color: 'var(--ink-soft)' }}>
        <p style={{ margin: 0 }}>These are the most gobsmacking finger licking dream worthy meals that I have made. This section also features times that I prepared foods for large gatherings or events. This is also peer reviewed so most of these are fan favorites as well.</p>
      </div>
    </div>
  );
}

function CollegeMealsTitle() {
  return (
    <div className="page-inner foreword">
      <div className="eyebrow">Chapter Two</div>
      <h1 style={{ fontSize: 28 }}>College Meals</h1>
      <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.65, color: 'var(--ink-soft)' }}>
        <p style={{ margin: 0 }}>At Penn, we are forced to be on the dining plan for the first two years and it is — surprise — not good. I did everything in my willpower to not eat there since all the food either had a sodium warning or was cooked in kilograms of grease. A lot of the time I stole ingredients from the dining hall to prep my own meals as you will soon see. I wanted to make this section to show you that it isn't that hard to cook in college. For all my meals, I prioritize healthy eating specifically protein and fiber to support my recovery from my workouts and most importantly whole foods. Most of my meals are some sort of protein, vegetable, paired with a carb.</p>
      </div>
    </div>
  );
}

function TocPage({ onGoTo, onSearch }) {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    const all = [...SHOWSTOPPERS, ...COLLEGE_MEALS, ...HEALTHY_RECIPES, ...FOOD_AROUND_WORLD, ...DESSERTS];
    return all.filter(d => {
      const name = d.name.toLowerCase();
      return words.every(w => name.includes(w) || name.split(/\s+/).some(n => n.startsWith(w)));
    }).slice(0, 6);
  }, [query]);

  return (
    <div className="page-inner toc">
      <div className="eyebrow">Index</div>
      <h2>What I made.</h2>
      <ol>
        <li onClick={() => onGoTo?.('showstoppers-title')} style={{ cursor: 'pointer' }}>
          <span className="num" style={{ fontWeight: 600 }}>Ch. 1&ensp;</span>
          <span style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: 14 }}>Showstoppers</span>
          <span className="dots" />
        </li>
        <li onClick={() => onGoTo?.('college-title')} style={{ cursor: 'pointer' }}>
          <span className="num" style={{ fontWeight: 600 }}>Ch. 2&ensp;</span>
          <span style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: 14 }}>College Meals</span>
          <span className="dots" />
        </li>
        <li onClick={() => onGoTo?.('healthy-title')} style={{ cursor: 'pointer' }}>
          <span className="num" style={{ fontWeight: 600 }}>Ch. 3&ensp;</span>
          <span style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: 14 }}>Healthy Recipes</span>
          <span className="dots" />
        </li>
        <li onClick={() => onGoTo?.('world-title')} style={{ cursor: 'pointer' }}>
          <span className="num" style={{ fontWeight: 600 }}>Ch. 4&ensp;</span>
          <span style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: 14 }}>Food Around the World</span>
          <span className="dots" />
        </li>
        <li onClick={() => onGoTo?.('desserts-title')} style={{ cursor: 'pointer' }}>
          <span className="num" style={{ fontWeight: 600 }}>Ch. 5&ensp;</span>
          <span style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: 14 }}>Desserts</span>
          <span className="dots" />
        </li>
      </ol>
      <div className="toc-search">
        <input
          type="text"
          className="toc-search-input"
          placeholder="Search dishes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {results.length > 0 && (
          <ul className="toc-search-results">
            {results.map(d => (
              <li key={d.id} onClick={() => { onSearch?.(d.id); setQuery(''); }}>
                {d.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function HealthyRecipesTitle() {
  return (
    <div className="page-inner foreword">
      <div className="eyebrow">Chapter Three</div>
      <h1 style={{ fontSize: 28 }}>Healthy Recipes</h1>
      <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.65, color: 'var(--ink-soft)' }}>
        <p style={{ margin: 0 }}>I like to eat very healthy prioritizing whole foods. Additionally, since my mom has so many allergies, my sister and I try to make healthy desserts for her as you will see.</p>
      </div>
    </div>
  );
}

function FoodAroundWorldTitle() {
  return (
    <div className="page-inner foreword">
      <div className="eyebrow">Chapter Four</div>
      <h1 style={{ fontSize: 28 }}>Food Around the World</h1>
      <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.65, color: 'var(--ink-soft)' }}>
        <p style={{ margin: 0 }}>My sister and I made it a mission in 2025 summer to cook a dish from every country. I love discovering new food especially from cultures that I've never tried before. We spin a wheel and pick a dish that is either super popular or just sounds interesting and aren't red meat. So prepare for a trip around the world!</p>
      </div>
    </div>
  );
}

function DessertsTitle() {
  return (
    <div className="page-inner foreword">
      <div className="eyebrow">Chapter Five</div>
      <h1 style={{ fontSize: 28 }}>Desserts</h1>
      <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.65, color: 'var(--ink-soft)' }}>
        <p style={{ margin: 0 }}>I never really had a sweet tooth. Even the little sweet tooth that I had, I lost for a year after trying the Cookie Bits Sundae from Ghirardelli Square. Additionally, since my mom is allergic to refined sugar and my dad is on a no sugar diet, my sister and I didn't grow up eating dessert. It's only after she watched a lot of YouTube mukbangs and I started getting TikToks about healthy desserts did we start making it. However, since my parents never made any dessert my sister and I had full independence over what we could make, and we ran with it.</p>
      </div>
    </div>
  );
}

function DishPage({ dish, index }) {
  const polRest = `rotate(${dish.tilt}deg)`;
  if (dish.dual) {
    return (
      <div className="dish layout-polaroid dual" style={{ "--pol-rest": polRest }}>
        <div className="dual-photos">
          {dish.photos.map((src, i) => (
            <div key={i} className="polaroid mini" style={{ transform: `rotate(${i === 0 ? dish.tilt : -dish.tilt}deg)` }}>
              <div className="tape tl" />
              <img className="photo" src={src} alt={dish.captions?.[i] || dish.name} draggable="false" style={dish.focuses?.[i] ? { objectPosition: dish.focuses[i] } : undefined} />
              <div className="pol-cap">{dish.captions?.[i] || ''}</div>
            </div>
          ))}
        </div>
        <div className="dish-foot">
          <div className="date">{dish.region || dish.date}</div>
          <div className="dish-note">— {dish.note}</div>
        </div>
        <div className="page-number">{index + 1}</div>
      </div>
    );
  }
  return (
    <div className="dish layout-polaroid" style={{ "--pol-rest": polRest }}>
      <div className="polaroid-wrap">
        <div className="polaroid" style={{ transform: polRest }}>
          <div className="tape tl" />
          <div className="tape tr" />
          <img className="photo" src={dish.photos[0]} alt={dish.name} draggable="false" style={dish.focus ? { objectPosition: dish.focus } : undefined} />
          <div className="pol-cap">{dish.name}</div>
        </div>
      </div>
      <div className="dish-foot">
        <div className="date">{dish.region || dish.date}</div>
        <div className="dish-note">— {dish.note}</div>
      </div>
      <div className="page-number">{index + 1}</div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="page-inner contact">
      <div className="eyebrow">Stage Inquiries</div>
      <h2>Let's cook.</h2>
      <ul>
        <li><span>Email</span><span>shrishtir06@gmail.com</span></li>
        <li><span>Phone</span><span>408-623-8786</span></li>
        <li><span>Based in</span><span>Philadelphia, PA</span></li>
      </ul>
    </div>
  );
}

function buildPages(goToKey) {
  const allDishes = [...SHOWSTOPPERS, ...COLLEGE_MEALS, ...HEALTHY_RECIPES, ...FOOD_AROUND_WORLD, ...DESSERTS];
  const searchByDishId = (id) => {
    const d = allDishes.find(x => x.id === id);
    if (!d) return;
    const prefix = d.id.startsWith('ss') ? 'showstopper' : d.id.startsWith('cm') ? 'dish' : d.id.startsWith('hr') ? 'healthy' : d.id.startsWith('fw') ? 'world' : 'dessert';
    goToKey(`${prefix}-${id}`);
  };
  const list = [
    { key: "cover", render: (props) => <CoverPage {...props} /> },
    { key: "inside-front", render: () => <InsideFrontPage /> },
    { key: "foreword", render: () => <ForewordPage /> },
    { key: "about-me", render: () => <AboutMePage /> },
    { key: "cooking-philosophy", render: () => <CookingPhilosophyPage /> },
    { key: "toc", render: () => <TocPage onGoTo={goToKey} onSearch={searchByDishId} /> },
    { key: "showstoppers-title", render: () => <ShowstoppersTitle /> },
  ];
  SHOWSTOPPERS.forEach((d, i) => {
    list.push({
      key: `showstopper-${d.id}`,
      render: () => <DishPage dish={d} index={i} />,
      label: d.name,
    });
  });
  list.push({ key: "college-title", render: () => <CollegeMealsTitle /> });
  COLLEGE_MEALS.forEach((d, i) => {
    list.push({
      key: `dish-${d.id}`,
      render: () => <DishPage dish={d} index={i} />,
      label: d.name,
    });
  });
  list.push({ key: "healthy-title", render: () => <HealthyRecipesTitle /> });
  HEALTHY_RECIPES.forEach((d, i) => {
    list.push({
      key: `healthy-${d.id}`,
      render: () => <DishPage dish={d} index={i} />,
      label: d.name,
    });
  });
  list.push({ key: "world-title", render: () => <FoodAroundWorldTitle /> });
  FOOD_AROUND_WORLD.forEach((d, i) => {
    list.push({
      key: `world-${d.id}`,
      render: () => <DishPage dish={d} index={i} />,
      label: d.name,
    });
  });
  list.push({ key: "desserts-title", render: () => <DessertsTitle /> });
  DESSERTS.forEach((d, i) => {
    list.push({
      key: `dessert-${d.id}`,
      render: () => <DishPage dish={d} index={i} />,
      label: d.name,
    });
  });
  list.push({ key: "contact", render: () => <ContactPage /> });
  if (list.length % 2 === 1) {
    list.push({ key: "blank", render: () => <div className="page-inner" /> });
  }
  return list;
}

// Detect a phone-sized viewport. The two-page spread + 3D flip is replaced
// by a single-page reader below this breakpoint.
function useIsMobile(query = '(max-width: 760px)') {
  const getMatch = () => typeof window !== 'undefined' && window.matchMedia(query).matches;
  const [isMobile, setIsMobile] = useState(getMatch);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return isMobile;
}

// Mobile: one page at a time, light slide transition, same Index + arrows.
function MobileBook() {
  const goToKeyRef = useRef(null);
  const goToKey = useCallback((key) => { goToKeyRef.current?.(key); }, []);
  const pages = useMemo(() => buildPages(goToKey), [goToKey]);
  const last = pages.length - 1;
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback((d) => {
    setIdx((i) => {
      const to = i + d;
      if (to < 0 || to > last) return i;
      setDir(d);
      return to;
    });
  }, [last]);

  goToKeyRef.current = (key) => {
    const i = pages.findIndex((p) => p.key === key);
    if (i >= 0) { setDir(i < idx ? -1 : 1); setIdx(i); }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  const page = pages[idx];
  const isCover = idx === 0;
  const content = page?.render({ onOpen: () => go(1) }) || null;

  return (
    <>
      <div className="mobile-book" data-cover={isCover ? 'true' : 'false'}>
        {isCover ? content : (
          <div
            className={`page single paper mpage-enter ${dir === 1 ? 'from-right' : 'from-left'}`}
            key={idx}>
            {content}
          </div>
        )}
      </div>

      <button
        className="nav-arrow prev"
        onClick={() => go(-1)}
        disabled={idx === 0}
        aria-label="Previous page">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 5 9 12 15 19" /></svg>
      </button>
      <button
        className="nav-arrow next"
        onClick={() => go(1)}
        disabled={idx >= last}
        aria-label="Next page">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 5 15 12 9 19" /></svg>
      </button>

      {idx > 0 && (
        <button className="back-to-toc" onClick={() => goToKey('toc')}>
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 5 9 12 15 19"/></svg>
          <span>Index</span>
        </button>
      )}
    </>
  );
}

function Book() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileBook /> : <DesktopBook />;
}

function DesktopBook() {
  const goToKeyRef = useRef(null);
  const goToKey = useCallback((key) => { goToKeyRef.current?.(key); }, []);
  const pages = useMemo(() => buildPages(goToKey), [goToKey]);
  const lastSpread = Math.floor((pages.length - 1) / 2);
  const [spread, setSpread] = useState(0);
  const [flip, setFlip] = useState(null);
  const lockRef = useRef(false);

  const spreadForKey = useCallback((key) => {
    const idx = pages.findIndex(p => p.key === key);
    if (idx <= 0) return 0;
    return Math.ceil(idx / 2);
  }, [pages]);

  const goToSpread = useCallback((target) => {
    if (lockRef.current) return;
    if (target < 0 || target > lastSpread || target === spread) return;
    setSpread(target);
  }, [spread, lastSpread]);

  goToKeyRef.current = (key) => goToSpread(spreadForKey(key));

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

      {spread > 0 && (
        <button className="back-to-toc" onClick={() => goToSpread(spreadForKey('toc'))}>
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 5 9 12 15 19"/></svg>
          <span>Index</span>
        </button>
      )}

    </>
  );
}

function SaltParticles({ originX, originY }) {
  const flakes = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 20 - 10,
      drift: (Math.random() - 0.5) * 60,
      width: 2 + Math.random() * 3,
      height: 1.5 + Math.random() * 2,
      borderRadius: Math.random() > 0.5 ? '50%' : '1px',
      delay: i * 70 + Math.random() * 60,
    }));
  }, []);

  return (
    <div className="salt-particles" style={{ left: originX, top: originY }}>
      {flakes.map(f => (
        <div
          key={f.id}
          className="salt-flake"
          style={{
            left: f.left + 'px',
            width: f.width + 'px',
            height: f.height + 'px',
            borderRadius: f.borderRadius,
            animationDelay: f.delay + 'ms',
            '--drift': f.drift + 'px',
          }}
        />
      ))}
    </div>
  );
}

function HeroAbout() {
  const shakerRef = useRef(null);
  const heroSideRef = useRef(null);
  const [sprinkling, setSprinkling] = useState(false);
  const [spoutPos, setSpoutPos] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const smoothScrollToBook = useCallback(() => {
    const bookEl = document.querySelector('.book-section');
    if (!bookEl) return;
    const bookTop = bookEl.getBoundingClientRect().top + window.scrollY;
    const start = window.scrollY;
    const distance = bookTop - start - 40;
    const duration = 2000;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      window.scrollTo(0, start + distance * ease);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  const handleShakerClick = () => {
    if (sprinkling) return;
    setSprinkling(true);

    setTimeout(() => {
      const shakerEl = shakerRef.current;
      const parentEl = heroSideRef.current;
      if (shakerEl && parentEl) {
        const parentRect = parentEl.getBoundingClientRect();
        // Get the SVG element inside the shaker div
        const svg = shakerEl.querySelector('svg');
        if (svg) {
          // The spout holes are around (100, 34) in the SVG viewBox (0 0 200 380)
          // Use SVG's built-in coordinate transform to get screen position
          const pt = svg.createSVGPoint();
          pt.x = 100;
          pt.y = 34;
          const ctm = svg.getScreenCTM();
          const screenPt = pt.matrixTransform(ctm);
          setSpoutPos({
            x: screenPt.x - parentRect.left,
            y: screenPt.y - parentRect.top,
          });
        }
      }
      smoothScrollToBook();
    }, 700);

    setTimeout(() => {
      setSprinkling(false);
      setSpoutPos(null);
    }, 3500);
  };

  return (
    <section className={`hero ${heroVisible ? 'hero-visible' : ''}`}>
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
              onClick={smoothScrollToBook}
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
      <div className="hero-side" ref={heroSideRef}>
        <div className="shaker-group">
          <div className="shaker-container" onClick={handleShakerClick}>
            <div
              ref={shakerRef}
              className={`hero-shaker ${sprinkling ? 'sprinkling' : ''}`}
            >
              <SaltShaker />
            </div>
          </div>
          {!sprinkling && <div className="shaker-hint">click to <span className="hint-bold">ADD SALT</span></div>}
        </div>
        <div className="sister-polaroid pinned-polaroid">
          <div className="pin" />
          <img src="/me-and-sister.JPG" alt="Shrishti and her sister cooking" />
          <div className="sister-cap">me and my sister</div>
        </div>
        {spoutPos && <SaltParticles originX={spoutPos.x + 'px'} originY={spoutPos.y + 'px'} />}
      </div>
    </section>
  );
}

function AboutSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`about ${visible ? 'about-visible' : ''}`} ref={sectionRef}>
      <div className="about-intro">
        <div className="about-greeting">Welcome to my kitchen</div>
        <h2 className="about-headline">
          I'm <span className="about-name">Shrishti</span>
        </h2>
        <p className="about-body">
          This is my kitchen notebook — a collection of dishes I've dreamed up,
          experimented with, and cooked with love. I'm currently a Garde Manger
          at the Michelin Guide restaurant, The Morris! Feel free to take a
          look and get to know me a little better through my palate.
        </p>
      </div>
      <div className="about-photo-wrap">
        <div className="pinned-polaroid">
          <div className="pin" />
          <img
            className="about-photo"
            src="/header-pic.JPG"
            alt="Shrishti Roy"
          />
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="page-shell">
      <header className="wordmark">
        <div className="brand">ADD SALT.</div>
        <div className="meta">est. 2026</div>
      </header>

      <AboutSection />
      <HeroAbout />

      <section className="book-section">
        <Book />
      </section>

      <footer className="closer">
        <h3>Find me</h3>
        <p className="lead">For stages, trails, or a quick chat about a dish.</p>
        <div className="contact-row">
          <div className="item">
            <div className="label">Email</div>
            <div className="val">shrishtir06@gmail.com</div>
          </div>
          <div className="item">
            <div className="label">Phone</div>
            <div className="val">408-623-8786</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
