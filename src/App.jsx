import React, { useState } from 'react';
import { motion, AnimatePresence} from 'framer-motion';
import { ExternalLink} from 'lucide-react';
import { Menu, X, Award, Mail, Github, Linkedin, Facebook, FileText, Phone, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ['About', 'Education', 'Skills', 'Experience', 'Projects', 'Contact'];

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4">
      <nav className="bg-black/90 backdrop-blur-md shadow-2xl rounded-2xl border border-gray-800/50">
        <div className="px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-white hover:scale-105 transform transition-all duration-300 cursor-pointer">
              Sanjiv
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-blue-400 transition-all duration-300 hover:scale-110 transform font-medium"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="text-white hover:text-blue-400 transition-colors duration-300"
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
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-3 text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>
    </div>
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
                <div className="relative bg-black rounded-2xl overflow-hidden h-full">
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
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    background: 'linear-gradient(45deg, #fff, #3b82f6, #9333ea, #fff)',
                    backgroundSize: '300% 300%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  SANJIV KUMAR MAHATO
                </motion.span>
              </motion.h3>
              
              <motion.h4 
                className="text-2xl lg:text-3xl text-blue-400 font-semibold"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.span
                  animate={{
                    color: ['#60a5fa', '#a855f7', '#ec4899', '#22c55e', '#60a5fa']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Frontend Developer
                </motion.span>
              </motion.h4>
              
              <motion.p 
                className="text-gray-300 leading-relaxed text-lg lg:text-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Passionate frontend developer with 2+ years of experience in building modern web applications. 
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
      score: "7.45",
      scoreType: "CGPA"
    },
    {
      degree: "Higher Secondary Education",
      institution: "National Infotech Higher Secondary School",
      year: "2019-2021",
      score: "3.83",
      scoreType: "GPA"
    },
    {
      degree: "Secondary Education",
      institution: "Manakamana Secondary School",
      year: "2019",
      score: "2.95",
      scoreType: "GPA"
    },
  ];

  return (
    <section id="education" className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-center mb-10 text-white"
        >
          Education
        </motion.h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-800"></div>
            
            {educationData.map((edu, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3 }}
                className="relative mb-8 flex items-center"
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 w-4 h-4 bg-blue-800 rounded-full border-4 border-black shadow-lg z-10"></div>
                
                {/* Education Card */}
                <div className="ml-20 w-full">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-black-900 p-4 rounded-xl shadow-lg border-l-4 border-blue-600 hover:shadow-xl transition-all duration-300 border border-gray-800"
                  >
                    <h3 className="text-base font-bold text-white mb-1">{edu.degree}</h3>
                    <p className="text-blue-700 font-semibold text-sm mb-1">{edu.institution}</p>
                    <div className="flex justify-between items-center text-gray-400">
                      <p className="text-gray-500 font-medium text-xs">{edu.year}</p>
                      <p className="text-gray-300 font-semibold text-xs">
                        {edu.scoreType}: <span className="text-blue-700">{edu.score}</span>
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


// Skills Component
const Skills = () => {
  const [activeTab, setActiveTab] = useState('Languages');

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

  return (
    <section id="skills" className="py-16 bg-black">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Skills
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8 gap-8">
          {Object.keys(skillsData).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`
                relative px-4 py-2 text-lg font-semibold transition-all duration-300 hover:text-blue-400
                ${activeTab === category
                  ? 'text-blue-400'
                  : 'text-gray-300'
                }
              `}
            >
              <span>{category}</span>
              {/* Underline effect */}
              <div 
                className={`
                  absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300
                  ${activeTab === category ? 'w-full' : 'w-0 group-hover:w-full'}
                `}
              ></div>
              {/* Hover underline */}
              <div 
                className={`
                  absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 w-0 hover:w-full
                  ${activeTab === category ? 'hidden' : ''}
                `}
              ></div>
            </button>
          ))}
        </div>

        {/* Skills Content */}
        <div className="flex justify-center">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div
              key={category}
              className={`
                transition-all duration-500 ease-in-out
                ${activeTab === category
                  ? 'opacity-100 translate-y-0 visible'
                  : 'opacity-0 translate-y-4 invisible absolute'
                }
              `}
            >
              <div className="bg-black-900 rounded-2xl shadow-xl border border-gray-700 box-shadow-2px p-8 w-fit">
                {/*<h3 className="text-2xl font-bold text-white mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {category}
                </h3>*/}
                <div className="grid grid-cols-2 gap-3 justify-items-center">
                  {skills.map((skill, index) => (
                    <div
                      key={skill.name}
                      className="group relative bg-black-800 rounded-lg border border-gray-700 p-4 hover:border-gray-400 hover:shadow-lg hover:shadow-gray-500/20 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 w-24 h-24"
                      style={{
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      {/* Skill Logo */}
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="relative w-10 h-10 mb-1">
                          <img
                            src={skill.logo}
                            alt={skill.name}
                            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => {
                              // Fallback to text if image fails to load
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          {/* Fallback text */}
                          <div className="hidden w-full h-full items-center justify-center text-lg font-bold text-gray-300">
                            {skill.name.charAt(0)}
                          </div>
                        </div>

                        {/* Skill Name */}
                        <h4 className="text-xs font-medium text-gray-300 text-center group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                          {skill.name}
                        </h4>
                      </div>

                      {/* Hover Effect Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-white-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Experience Component
const Experience = () => {
  const experiences = [
    {
      title: "AWS Cloud Architecting",
      company: "AWS Academy",
      description: " Completion Certificate in AWS Cloud Architecting."
    },
    {
      title: "Linux System Administration",
      company: "Red Hat",
      description: "Completion Certificate in Linux System Administration."
    },
    {
      title: "Cyber Security(Cloud Security,Network Security, Security Operations)",
      company: "Palo Alto Networks",
      description: "Course completion in four foundational courses from Palo Alto Networks, diving deep into key areas of the cyber security domain"
    }
  ];

  return (
    <section id="experience" className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Certifications
        </h2>
        
        <div className="space-y-7">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="bg-black-400 p-6 rounded-md border border-gray-700 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
              <p className="text-blue-400 font-semibold">{exp.company}</p>
              <p className="text-gray-500 mb-3">{exp.period}</p>
              <p className="text-gray-300">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Component
const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [clickedProject, setClickedProject] = useState(null);

  const projects = [
     {
      title: "Patient Management System",
      description: "Healthcare management system, it manages patient appointments, medical records, and secure communication with role-based dashboards for patients, doctors, and admins. It also sends automated SMS reminders and offers a mobile-responsive, accessible UI.",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      image: "https://birhospital.gov.np/frontend/website/images/gov_logo.png",
      category: "Healthcare System"
    },
    {
      title: "Capstone Project",
      description: "Design and deploy a scalable, secure cloud infrastructure on AWS, focusing on high availability, cost efficiency, and best practices.",
      tech: ["AWS Cloud Architecting", "MySQL"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop",
      category: "Cloud Infrastructure"
    },
   
    {
      title: "Task Management App",
      description: "Real-time task management application with drag-and-drop functionality, team collaboration, and progress tracking.",
      tech: ["React", "Firebase", "Material-UI"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
      category: "Productivity Tool"
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
    <section id="projects" className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Projects
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => handleProjectClick(index)}
              className={`group bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-800 transform-gpu cursor-pointer transition-transform duration-300 ease-out ${
                clickedProject === index ? '-translate-y-6' : ''
              }`}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-black/70 text-blue-400 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/30">
                  {project.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-blue-800/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


// Achievements Component
{/*
  const Achievements = () => {
  const achievements = [
    "Winner of Hackathon 2023",
    "Certified AWS Solutions Architect",
    "Published 5+ technical articles",
    "Speaker at React Conference 2023",
    "Open source contributor with 500+ GitHub stars"
  ];

  return (
    <section id="achievements" className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-16 text-white"
        >
          Achievements
        </motion.h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 p-6 rounded-lg shadow-lg border-l-4 border-yellow-400 border border-gray-800"
            >
              <div className="flex items-center">
                <Award className="text-yellow-500 mr-3" size={24} />
                <p className="text-gray-300 font-medium">{achievement}</p>
              </div>
            </motion.div>
          ))}
        </div>
  */}
        
        {/* Learn More Button */}
      //  <motion.div 
       //   initial={{ opacity: 0, y: 30 }}
        //  whileInView={{ opacity: 1, y: 0 }}
         // className="text-center mt-12" >
          {/*<motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('learn-more').scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            Learn More
          </motion.button>*/}
    //    </motion.div>
   //   </div>
  //  </section>
//  );
// };

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
                  src="/profile-photo.jpg" 
                  alt="Sanjiv Kumar Mahato" 
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-400 object-cover"
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
                  I'm a passionate developer who loves creating innovative solutions and sharing knowledge with the community.
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
                  { icon: FileText, label: "Resume", link: "https://drive.google.com/file/d/1m657fJt9lPOsG_srwu6RgE2_m8jVRG5i/view?usp=drive_link ", color: "green" }
                ].map((social, index) => (
                  <motion.a 
                    key={social.label}
                    href={social.link}
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

// Contact Component
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-16 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-16 text-white"
        >
          Get In Touch
        </motion.h2>
        
        <motion.form 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          
          <div className="grid md:grid-cols-2 gap-6">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-gray-300 focus:outline-none transition-colors duration-300 text-white"
            />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-gray-300 focus:outline-none transition-colors duration-300 text-white"
            />
          </div>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:gray-blue-300 focus:outline-none transition-colors duration-300 text-white"
          />
          <motion.textarea
            whileFocus={{ scale: 1.02 }}
            name="message"
            placeholder="Your Message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-gray-300 focus:outline-none transition-colors duration-300 text-white"
          ></motion.textarea>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-300 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-gray-700 hover:to-gray-200 transition-all duration-300"
          >
            Send Message
          </motion.button>
        </motion.form>
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
            © 2024 Sanjiv Kumar Mahato. All rights reserved.
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