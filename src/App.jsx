import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail, Github, Linkedin, Facebook, FileText, Phone, MapPin, ChevronDown, CheckCircle2, GraduationCap, School } from 'lucide-react';

const LoopTypewriter = ({
  items,
  typeSpeed = 55,
  deleteSpeed = 35,
  pauseMs = 900,
  startDelay = 0,
  className = '',
  itemClassNames = []
}) => {
  const safeItems = useMemo(() => {
    if (!Array.isArray(items)) return [];
    return items.filter(Boolean);
  }, [items]);

  const [itemIndex, setItemIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStarted, setIsStarted] = useState(startDelay === 0);

  useEffect(() => {
    if (isStarted) return;
    const timeoutId = setTimeout(() => setIsStarted(true), startDelay);
    return () => clearTimeout(timeoutId);
  }, [isStarted, startDelay]);

  useEffect(() => {
    if (!isStarted) return;
    if (safeItems.length === 0) return;

    const fullText = safeItems[itemIndex % safeItems.length];

    if (!isDeleting && charIndex === fullText.length) {
      const timeoutId = setTimeout(() => setIsDeleting(true), pauseMs);
      return () => clearTimeout(timeoutId);
    }

    if (isDeleting && charIndex === 0) {
      const timeoutId = setTimeout(() => {
        setIsDeleting(false);
        setItemIndex((v) => (v + 1) % safeItems.length);
      }, 200);
      return () => clearTimeout(timeoutId);
    }

    const timeoutId = setTimeout(() => {
      setCharIndex((v) => v + (isDeleting ? -1 : 1));
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeoutId);
  }, [
    isStarted,
    safeItems,
    itemIndex,
    charIndex,
    isDeleting,
    typeSpeed,
    deleteSpeed,
    pauseMs
  ]);

  if (safeItems.length === 0) return null;

  const current = itemIndex % safeItems.length;
  const fullText = safeItems[current];
  const displayText = fullText.slice(0, charIndex);
  const itemClassName = itemClassNames[current] ?? '';

  return <span className={`${className} ${itemClassName}`}>{displayText}</span>;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = useMemo(
    () => [
      { label: 'Home', id: 'home' },
      { label: 'About', id: 'about' },
      { label: 'Education', id: 'education' },
      { label: 'Skills', id: 'skills' },
      { label: 'Experience', id: 'experience' },
      { label: 'Projects', id: 'projects' },
      { label: 'Contact', id: 'contact' }
    ],
    []
  );

  useEffect(() => {
    const sectionElements = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        const top = visible[0]?.target?.id;
        if (top) setActiveSection(top);
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.5, 0.7],
        rootMargin: '-35% 0px -55% 0px'
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [navItems]);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-6xl px-3">
      <nav className="bg-black  shadow-2xl rounded-2xl border border-gray-800/50">
        <div className="px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* <a
              href="#home"
              className="text-2xl font-bold text-white hover:scale-105 transform transition-all duration-300 cursor-pointer"
            >
              Sanjiv
            </a>*/}

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setActiveSection(item.id)}
                  className={`relative font-medium transition-all duration-300 hover:scale-110 transform ${
                    activeSection === item.id ? 'text-gray-400' : 'text-gray-300 hover:text-amber-800'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id ? (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-amber-800" />
                  ) : null}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-amber-800 transition-colors duration-300"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden pb-4 border-t border-gray-800/50 mt-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block py-3 transition-colors duration-300 font-medium ${
                    activeSection === item.id ? 'text-amber-800' : 'text-gray-300 hover:text-amber-800'
                  }`}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsOpen(false);
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

// Home Component
const Home = () => {
  const loopItems = useMemo(() => ['Sanjiv Kumar\nMahato', 'FULL STACK DEVELOPER'], []);
  const loopItemClassNames = useMemo(
    () => [
      'text-[rgb(227,141,87)]',
      'text-[rgb(205,193,178)] tracking-wide'
    ],
    []
  );

  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-black pt-28 pb-20"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">
                <span className="text-gray-200">Hello, I&apos;m</span>
              </h1>

              <div className="relative min-h-[7.5rem] sm:min-h-[9rem]">
                <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight whitespace-pre-line leading-[1.05]">
                  <LoopTypewriter
                    items={loopItems}
                    typeSpeed={55}
                    deleteSpeed={35}
                    pauseMs={900}
                    className="whitespace-pre-line"
                    itemClassNames={loopItemClassNames}
                  />
                  <motion.span
                    aria-hidden="true"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                    className="inline-block w-[3px] h-[0.9em] bg-blue-400 align-[-0.08em] ml-2"
                  />
                </h2>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-gray-300 text-lg leading-relaxed max-w-xl"
            >
              A dark screen, a curious mind, and a passion for modern web application.
              Turning real-world problems into clean, working software — that’s what I do.
            </motion.p>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px]">
              <div className="absolute inset-0 rounded-full bg-slate-900 blur-2xl" />
              <div className="absolute inset-0 rounded-full border border-gray-700/60 bg-gray-900/10" />
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.25 }}
                className="relative rounded-full overflow-hidden w-full h-full shadow-2xl"
              >
                <img
                  src="/Home1.jpeg"
                  alt="Sanjiv Kumar Mahato"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// About Component
const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center bg-black py-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Container box with background image and overlay */}
        <motion.div
          className="relative rounded-2xl shadow-2xl p-12 md:p-16 min-h-[85vh] flex items-center overflow-hidden"
          style={{
            backgroundImage: 'url("/photo-1607706009771-de8808640bcf.avif")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Transparent overlay */}
          <div className="absolute inset-0 bg-black/5 backdrop-blur-sm"></div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-16 items-center w-full relative z-10">
            {/* Left - Animated Photo with Enhanced Border */}
            <div className="flex justify-center">
              <motion.div
                className="relative w-92 h-92 lg:w-[450px] lg:h-[450px] rounded-2xl overflow-hidden"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  borderColor: [
                    'rgb(59, 130, 246)',   // blue-500
                    'rgb(147, 51, 234)',   // purple-500  
                    'rgb(236, 72, 153)',   // pink-500
                    'rgb(34, 197, 94)',    // green-500
                    'rgb(251, 191, 36)',   // yellow-500
                    'rgb(59, 130, 246)'    // back to blue-500
                  ]
                }}
                transition={{
                  scale: { duration: 0.8, delay: 0.2 },
                  opacity: { duration: 0.8, delay: 0.2 },
                  borderColor: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
                style={{
                  borderColor: 'rgb(59, 130, 246)',
                  border: '4px solid'
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                }}
              >
                {/* Animated gradient border overlay */}
                <motion.div
                  className="absolute -inset-1 rounded-2xl opacity-75"
                  style={{
                    background: 'linear-gradient(45deg, #3b82f6, #9333ea, #ec4899, #22c55e, #fbbf24)',
                    backgroundSize: '400% 400%'
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                {/* Inner content */}
                <div className="relative bg-black rounded-2.4xl overflow-hidden h-full">
                  {/* Transparent background overlay */}
                  <div className="absolute inset-0 bg-black/20 "></div>
                  <motion.img
                    src="/profile-photo (1).png"
                    alt="Sanjiv Kumar Mahato"
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    onError={(e) => {
                      console.log('Image failed to load:', e.target.src);
                      e.target.style.display = 'none';
                    }}
                    onLoad={() => console.log('Image loaded successfully')}
                  />
                </div>
              </motion.div>
            </div>

            {/* Right - Animated Details */}
            <div className="space-y-8">
              <motion.h3
                className="text-3xl lg:text-4xl font-bold text-white"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.span
                  className="text-[rgb(231,134,74)]"
                >
                  SANJIV KUMAR MAHATO
                </motion.span>
              </motion.h3>

              <motion.h4
                className="text-2xl lg:text-3xl font-semibold text-[rgb(205,193,178)]"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Full-Stack Developer
              </motion.h4>

              <motion.p
                className="text-white leading-relaxed text-lg lg:text-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Passionate Full-stack Developer with 2+ years of experience in building modern web applications.
                I love creating efficient, scalable solutions and staying up-to-date with the latest technologies.
                Always eager to learn and take on new challenges.
              </motion.p>

              <motion.div
                className="flex flex-col space-y-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <div className="flex items-center text-gray-300 text-lg">
                  <MapPin size={20} className="mr-3 text-blue-400" />
                  <span>Bhubaneswar Odisha, INDIA</span>
                </div>

                <div className="flex items-center text-gray-300 text-lg">
                  <Phone size={20} className="mr-3 text-blue-400" />
                  <span>+91 7735107105</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Education Component
const Education = () => {
  const educationData = [
    {
      degree: "Bachelor of Technology",
      institution: "Kalinga Institute of Industrial Technology",
      year: "2022-2026",
      score: "7.69",
      scoreType: "CGPA",
      Icon: GraduationCap
    },
    {
      degree: "Higher Secondary Education",
      institution: "National Infotech Higher Secondary School",
      year: "2019-2021",
      score: "3.83",
      scoreType: "GPA",
      Icon: School
    },
    {
      degree: "Secondary Education",
      institution: "Manakamana Secondary School",
      year: "2019",
      score: "2.95",
      scoreType: "GPA",
      Icon: School
    },
  ];

  return (
    <section id="education" className="relative py-20 bg-black overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-2xl sm:text-3xl font-extrabold text-gray-200"
        >
          Education
        </motion.h2>

        <div className="relative mt-14">
          {/* Desktop center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-700/80 to-transparent" />

          {/* Mobile left line */}
          <div className="md:hidden absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-700/80 to-transparent" />

          <div className="space-y-10">
            {educationData.map((edu, index) => {
              const Icon = edu.Icon ?? GraduationCap;
              const isRight = index % 2 === 0;

              return (
                <motion.div
                  key={`${edu.degree}-${edu.year}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="relative"
                >
                  {/* Center icon + year (desktop) */}
                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                    <div className="w-12 h-12 rounded-2xl bg-black/80 border border-gray-700/70 shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex items-center justify-center">
                      <Icon className="text-blue-400" size={22} />
                    </div>
                  </div>
                  <div
                    className={`hidden md:block absolute top-1/2 -translate-y-1/2 text-gray-400/90 font-medium tracking-wide ${isRight ? 'left-1/2 -translate-x-[165px]' : 'left-1/2 translate-x-[88px]'
                      }`}
                  >
                    {edu.year}
                  </div>

                  {/* Mobile icon */}
                  <div className="md:hidden absolute left-5 -translate-x-1/2 top-7">
                    <div className="w-10 h-10 rounded-2xl bg-black/80 border border-gray-700/70 shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex items-center justify-center">
                      <Icon className="text-blue-400" size={18} />
                    </div>
                  </div>

                  <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                    {/* Spacer (desktop) */}
                    <div className={`${isRight ? 'md:order-1' : 'md:order-2'}`} />

                    {/* Card */}
                    <div className={`${isRight ? 'md:order-2' : 'md:order-1'} md:pb-0 pb-2`}>
                      <div className={`${isRight ? 'md:pl-10' : 'md:pr-10'} pl-12`}>
                        <motion.div
                          whileHover={{ y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="relative rounded-2xl border border-gray-800/70 bg-black/30 backdrop-blur-md shadow-[0_25px_80px_rgba(0,0,0,0.6)] p-7"
                        >
                          <div className="absolute inset-0 rounded-2xl bg-white/[0.02] pointer-events-none" />

                          <div className="flex items-start gap-4 relative">
                            <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center shrink-0">
                              <Icon className="text-blue-400" size={22} />
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-2xl font-bold text-gray-100 leading-tight">
                                {edu.degree}
                              </h3>
                              <p className="text-gray-400 mt-1">{edu.institution}</p>
                              <p className="md:hidden text-gray-500 mt-2 text-sm">{edu.year}</p>
                            </div>
                          </div>

                          <div className="mt-6 space-y-3 relative">
                            <div className="flex items-start gap-3 text-gray-200">
                              <CheckCircle2 className="text-gray-500 mt-0.5" size={18} />
                              <span className="leading-relaxed">
                                {edu.scoreType}: <span className="text-blue-300 font-semibold">{edu.score}</span>
                              </span>
                            </div>
                            <div className="flex items-start gap-3 text-gray-200">
                              <CheckCircle2 className="text-gray-500 mt-0.5" size={18} />
                              <span className="leading-relaxed">Institution: {edu.institution}</span>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// Skills Component
const Skills = () => {
  const skillsData = {
    Languages: [
      { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      //{ name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' }
    ],
    Frameworks: [
      { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', logo: 'https://devicon-website.vercel.app/api/express/original.svg?color=%23FFFFFF' },
      { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'Django', logo: 'https://devicon-website.vercel.app/api/django/plain.svg' }
    ],
    Tools: [
      { name: 'VisualStudio', logo: 'https://devicon-website.vercel.app/api/visualstudio/plain.svg?color=%231081B1' },
      { name: 'AWS', logo: 'https://devicon-website.vercel.app/api/amazonwebservices/original.svg' },
      { name: 'Figma', logo: 'https://devicon-website.vercel.app/api/figma/original.svg' },
      { name: 'Canva', logo: 'https://devicon-website.vercel.app/api/canva/original.svg' }
    ],
    Database: [
      { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      //  { name: 'Redis', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
      { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' }
    ]
  };

  const skillSections = [
    { title: 'Languages', skills: skillsData.Languages },
    { title: 'Frameworks', skills: skillsData.Frameworks },
    { title: 'Tools', skills: skillsData.Tools },
    { title: 'Database', skills: skillsData.Database }
  ];

  const chipVariants = [
    'bg-blue-500/20 border-blue-500/30 text-blue-100',
    'bg-sky-500/20 border-sky-500/30 text-sky-100',
    'bg-indigo-500/20 border-indigo-500/30 text-indigo-100',
    'bg-purple-500/20 border-purple-500/30 text-purple-100',
    'bg-fuchsia-500/20 border-fuchsia-500/30 text-fuchsia-100',
    'bg-emerald-500/20 border-emerald-500/30 text-emerald-100',
    'bg-amber-500/20 border-amber-500/30 text-amber-100',
    'bg-orange-500/20 border-orange-500/30 text-orange-100',
    'bg-gray-900/60 border-gray-700/60 text-gray-100'
  ];

  const SkillPill = ({ skill, variantIndex }) => (
    <div
      className={`group flex items-center gap-3 px-4 py-2 rounded-xl border shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${chipVariants[variantIndex % chipVariants.length]}`}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-black/25 border border-white/10">
        <img
          src={skill.logo}
          alt={skill.name}
          className="w-5 h-5 object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="hidden w-full h-full items-center justify-center text-sm font-bold text-gray-200">
          {skill.name.charAt(0)}
        </div>
      </div>
      <span className="text-base font-medium whitespace-nowrap">{skill.name}</span>
    </div>
  );

  return (
    <section id="skills" className="relative py-20 bg-black overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-2xl sm:text-3xl font-extrabold text-gray-200"
        >
          My Skills
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mt-14 rounded-3xl border border-gray-800/70 bg-black/40 backdrop-blur-md shadow-[0_25px_80px_rgba(0,0,0,0.65)] p-6 sm:p-8 lg:p-10"
        >
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
            {skillSections.map((section, sectionIndex) => (
              <div
                key={section.title}
                className="rounded-2xl border border-gray-800/70 bg-black/40 shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-6"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-200 mb-5">
                  {section.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {section.skills.map((skill, index) => (
                    <SkillPill
                      key={skill.name}
                      skill={skill}
                      variantIndex={sectionIndex * 10 + index}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
    </section>
  );
};

// Certifications Component
const Experience = () => {
  const [activeCert, setActiveCert] = useState(null);
  const [activeAssetIndex, setActiveAssetIndex] = useState(0);

  const experiences = [
    {
      title: "AWS Cloud Architecting",
      company: "AWS Academy",
      description: "Completion Certificate in AWS Cloud Architecting.",
      assets: [{ label: "Certificate (Image)", type: "image", src: "/AWS_Academy_Cloud.png" }]
    },
    {
      title: "Linux System Administration",
      company: "Red Hat",
      description: "Completion Certificate in Linux System Administration.",
      assets: [{ label: "Certificate (Image)", type: "image", src: "/red hat.jpg" }]
    },
    {
      title: "Cyber Security(Cloud Security,Network Security, Security Operations)",
      company: "Palo Alto Networks",
      description: "Course completion in four foundational courses from Palo Alto Networks, diving deep into key areas of the cyber security domain",
      assets: [
         { label: "Course 1 (Image)", type: "image", src: "/Palo Alto Networks.png" },
        { label: "Course 1 (Image)", type: "image", src: "/Palo Alto Networks1.png" },
        { label: "Course 2 (Image)", type: "image", src: "/Palo Alto Networks2..png" },
        { label: "Course 3 (Image)", type: "image", src: "/Palo Alto Networks3..png" },
        { label: "Course 4 (Image)", type: "image", src: "/Palo Alto Networks4..png" }
      ]
    },

  ];

  const selectedAsset = activeCert?.assets?.[activeAssetIndex] ?? null;
  const selectedAssetSrc = selectedAsset?.src ? encodeURI(selectedAsset.src) : '';

  return (
    <section id="experience" className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-center mb-10 text-white"
        >
          Certifications
        </motion.h2>

        <div className="max-w-4xl mx-auto rounded-3xl border border-gray-800/70 bg-gradient-to-brown from-gray-900/60 to-gray-950/30 backdrop-blur-md shadow-[0_25px_80px_rgba(0,0,0,0.65)] p-6 sm:p-8">
          <div className="relative">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="relative mb-6 flex items-center last:mb-0"
              >
                <div className="ml-0 w-full">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.01 }}
                    className="w-full text-left bg-black/40 p-5 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-gray-800/70 cursor-pointer transition-all duration-300 hover:border-gray-700/80"
                    onClick={() => {
                      setActiveCert(exp);
                      setActiveAssetIndex(0);
                    }}
                  >
                    <h3 className="text-base sm:text-lg font-bold text-white mb-1">{exp.title}</h3>
                    <p className="text-blue-400 font-semibold text-sm mb-2">{exp.company}</p>
                    <p className="text-gray-300 text-sm">{exp.description}</p>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
            onClick={() => setActiveCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full max-w-5xl bg-black border border-gray-800 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`${activeCert.title} certificate`}
            >
              <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-gray-800">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-white truncate">{activeCert.title}</h3>
                  <p className="text-sm text-gray-400 truncate">{activeCert.company}</p>
                </div>

                <div className="flex items-center gap-3">
                  {selectedAssetSrc ? (
                    <a
                      href={selectedAssetSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Open in new tab
                    </a>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => setActiveCert(null)}
                    className="text-gray-200 hover:text-white transition-colors"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {activeCert.assets?.length > 1 ? (
                <div className="px-5 py-3 border-b border-gray-800 flex flex-wrap gap-2">
                  {activeCert.assets.map((asset, idx) => (
                    <button
                      key={`${asset.label}-${idx}`}
                      type="button"
                      onClick={() => setActiveAssetIndex(idx)}
                      className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                        idx === activeAssetIndex
                          ? 'border-blue-500/60 bg-blue-500/10 text-blue-200'
                          : 'border-gray-700/70 bg-black/40 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {asset.label}
                    </button>
                  ))}
                </div>
              ) : null}

              <div className="p-5">
                {selectedAsset?.type === 'image' ? (
                  <div className="w-full bg-black rounded-xl border border-gray-800 overflow-hidden">
                    <img
                      src={selectedAssetSrc}
                      alt={selectedAsset?.label ?? 'Certificate'}
                      className="w-full max-h-[72vh] object-contain"
                    />
                  </div>
                ) : selectedAsset?.type === 'pdf' ? (
                  <div className="w-full bg-black rounded-xl border border-gray-800 overflow-hidden">
                    <iframe
                      title={selectedAsset?.label ?? 'Certificate PDF'}
                      src={selectedAssetSrc}
                      className="w-full h-[72vh]"
                    />
                  </div>
                ) : (
                  <p className="text-gray-300">No certificate file found for this item.</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// EmailJS Configuration - REPLACE THESE WITH YOUR ACTUAL VALUES
const EMAILJS_CONFIG = {
  publicKey: 'v9bqZ__AxfinWx0SL',      // From EmailJS Dashboard
  serviceId: 'service_94ht7h2',       // From EmailJS Dashboard
  templateId: 'template_peold2g'      // From EmailJS Dashboard
};

// Projects Component
const Projects = () => {
  const [clickedProject, setClickedProject] = useState(null);

  const techIconMap = useMemo(
    () => ({
      React: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      MongoDB: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      Express: 'https://devicon-website.vercel.app/api/express/original.svg?color=%23FFFFFF',
      Firebase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
      'Material-UI': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg',
      AWS: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
      MySQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      PostgreSQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      JavaScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      TypeScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      NextJS: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'
    }),
    []
  );

  const projects = [
    {
      title: "News Portal(Birgunj Khabar)",
      description: "Developed a full-stack news portal featuring separate admin and user modules for real-time news publishing and management.Designed a dynamic and responsive interface with category-based content display and live updates.",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      image: "/News-portal.png",
      category: "News Potal"
    },
    {
      title: "Patient Management System",
      description: "Healthcare management system, it manages patient appointments, medical records, and secure communication with role-based dashboards for patients, doctors, and admins.",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      image: "https://birhospital.gov.np/frontend/website/images/gov_logo.png",
      category: "Healthcare System"
    },
    
  ];

  const handleProjectClick = (index) => {
    setClickedProject(index);
    // Reset the click animation after animation completes
    setTimeout(() => {
      setClickedProject(null);
    }, 300);
  };

  return (
    <section id="projects" className="relative py-18 bg-black overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
      <div className="max-w-5xl mx-auto px-3 sm:px-5 lg:px-7 relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-center mb-10 text-white"
        >
          Projects
        </motion.h2>

        <div className="mt-10 rounded-3xl border border-gray-800/70 bg-black/30 backdrop-blur-md shadow-[0_25px_80px_rgba(0,0,0,0.65)] p-6 sm:p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => handleProjectClick(index)}
              className={`group rounded-3xl overflow-hidden transform-gpu cursor-pointer transition-transform duration-300 ease-out border border-gray-800/70 bg-gradient-to-b from-gray-900/70 to-gray-900/30 backdrop-blur-md shadow-[0_25px_80px_rgba(0,0,0,0.6)] ${clickedProject === index ? '-translate-y-6' : ''
                }`}
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-100">
                  {project.title}
                </h3>

                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex items-center justify-between gap-6">
                  <div className="flex items-center gap-3 flex-wrap">
                    {project.tech.map((tech) => {
                      const iconUrl = techIconMap[tech];
                      return (
                        <div
                          key={tech}
                          title={tech}
                          className="w-10 h-10 rounded-full bg-black/40 border border-gray-700/70 flex items-center justify-center shadow-sm"
                        >
                          {iconUrl ? (
                            <img
                              src={iconUrl}
                              alt={tech}
                              className="w-5 h-5 object-contain"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div className="hidden w-full h-full items-center justify-center text-sm font-bold text-gray-200">
                            {tech?.charAt(0)?.toUpperCase?.() ?? '•'}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                 {/* <div className="flex items-center gap-4 text-gray-200 shrink-0">
                    <span className="text-base font-semibold">Check Live Site</span>
                    <div className="w-10 h-10 rounded-full bg-black/40 border border-gray-700/70 flex items-center justify-center">
                      <ArrowUpRight className="text-purple-300" size={20} />
                    </div>
                  </div>*/}
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Learn More Component
const LearnMore = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section id="learn-more" className="py-16 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Learn More Button */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.button
            onClick={toggleExpanded}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-white-600 to-gray-400 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:from-gray-700 hover:to-white-700 transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            Learn More
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={20} />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 50, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -50, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-black-900 rounded-2xl shadow-2xl p-8 border border-gray-800 overflow-hidden"
            >
              <div className="text-center mb-8">
                <motion.img
                  //  initial={{ scale: 0 }}
                  //  animate={{ scale: 1 }}
                  // transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  src="/profile-photo1.png"
                  alt="Sanjiv Kumar Mahato"
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-200 object-cover"
                />
                <motion.h3
                  // initial={{ opacity: 0, y: 20 }}
                  // animate={{ opacity: 1, y: 0 }}
                  // transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-white mb-2"
                >
                  SANJIV KUMAR MAHATO
                </motion.h3>
                <motion.p
                  // initial={{ opacity: 0, y: 20 }}
                  // animate={{ opacity: 1, y: 0 }}
                  //transition={{ delay: 0.4 }}
                  className="text-gray-300 mb-6"
                >
                  Turning ideas into scalable digital experiences.
                  Building fast, clean, and user-focused web applications.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {[
                  { icon: Facebook, label: "Facebook", link: "https://www.facebook.com/share/14QW967A86w/?mibextid=wwXIfr", color: "blue" },
                  { icon: Linkedin, label: "LinkedIn", link: "http://linkedin.com/in/sanjiv-mahato", color: "blue" },
                  { icon: Github, label: "GitHub", link: "https://github.com/sanjiv-65", color: "gray" },
                  { icon: FileText, label: "Resume", link: "https://drive.google.com/file/d/1TDDIKQpHlCg51PKzBe6nCcIlus32vH1X/view?usp=sharing", color: "green" }
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-center p-4 rounded-lg border-2 border-black-700 hover:border-blue-300 transition-all duration-300 bg-black-900"
                  >
                    <social.icon className="text-blue-400 mr-2" size={20} />
                    <span className="text-gray-300 font-medium">{social.label}</span>
                  </motion.a>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="mt-8 text-center"
              >
                <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6 text-gray-300">
                  <div className="flex items-center">
                    <Mail size={16} className="mr-2 text-blue-400" />
                    <span>mrsanjiv105@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone size={16} className="mr-2 text-blue-400" />
                    <span>+91 7335107105</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};



const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [emailJSLoaded, setEmailJSLoaded] = useState(false);

  // Load EmailJS dynamically
  useEffect(() => {
    const loadEmailJS = () => {
      if (window.emailjs) {
        setEmailJSLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';

      script.onload = () => {
        window.emailjs.init(EMAILJS_CONFIG.publicKey);
        setEmailJSLoaded(true);
      };
      script.onerror = () => {
        console.error('Failed to load EmailJS');
        setEmailJSLoaded(false);
      };
      document.head.appendChild(script);
    };

    loadEmailJS();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus('validation');
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      if (emailJSLoaded && window.emailjs) {
        const result = await window.emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_name: 'Sanjiv'
          }
        );

        console.log('Email sent successfully:', result);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });

        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        throw new Error('EmailJS not loaded');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');

      const mailtoLink = `mailto:mrsanjiv105@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      window.location.href = mailtoLink;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-black min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Get In Touch
        </h2>

        <div className="bg-black-900 p-8 rounded-2xl border border-gray-700 shadow-2xl">
          {/* EmailJS Status */}
          {/*<div className="mb-4 text-center">
            {emailJSLoaded ? (
              <span className="text-green-400 text-sm">● EmailJS Ready</span>
            ) : (
              <span className="text-yellow-400 text-sm">⏳ Loading EmailJS...</span>
            )}
          </div>*/}

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-600 bg-opacity-20 border border-green-500 rounded-lg">
              <p className="text-green-400 text-center font-semibold">
                ✅ Message sent successfully! I'll get back to you soon.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-600 bg-opacity-20 border border-red-500 rounded-lg">
              <p className="text-red-400 text-center">
                ❌ Failed to send. Opening email client as backup...
              </p>
            </div>
          )}

          {submitStatus === 'validation' && (
            <div className="mb-6 p-4 bg-yellow-600 bg-opacity-20 border border-yellow-500 rounded-lg">
              <p className="text-yellow-400 text-center">
                ⚠️ Please fill in all fields
              </p>
            </div>
          )}

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 text-white placeholder-gray-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 text-white placeholder-gray-400"
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 text-white placeholder-gray-400"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 text-white placeholder-gray-400 resize-vertical"
            />

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !emailJSLoaded}
              className="w-full bg-gradient-to-r from-white to-gray text-white py-3 px-6 rounded-lg font-semibold hover:from-wite-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </div>
        </div>

        {/* Direct Email Link */}

      </div>
    </section>
  );
};



// Footer Component
const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-400 mb-4 md:mb-0"
          >
           Copyright © Sanjiv Kumar Mahato  2026
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex space-x-6"
          >
            {[
              { icon: Linkedin, link: "http://linkedin.com/in/sanjiv-mahato" },
              { icon: Github, link: "https://github.com/sanjiv-65" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="App bg-black min-h-screen">
      <Navbar />
      <Home />
      <About />
      <LearnMore />
      <Education />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
