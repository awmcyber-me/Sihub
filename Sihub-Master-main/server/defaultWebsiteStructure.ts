/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem - Master Website Structure & Subsection Definitions
 * Defines the 8 official pillars, 32 subsections, default content, and auto-seeder.
 */

import { Prisma, PublicationStatus } from '@prisma/client';
import type { prisma } from './db';

export interface WebsiteSubsectionDef {
  slug: string;
  categoryKey: string;
  categoryTitle: string;
  title: string;
  heading: string;
  subheading: string;
  summary: string;
  description: string;
  heroBadge: string;
  publicPath: string;
  cta: {
    label: string;
    url: string;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  stats?: Array<{ value: string; label: string; description?: string }>;
  features?: Array<{ title: string; description: string }>;
  team?: Array<{ name: string; role: string; bio?: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  documents?: Array<{ title: string; description: string; fileUrl: string; fileSize: string; format: string }>;
}

export const OFFICIAL_WEBSITE_SUBSECTIONS: WebsiteSubsectionDef[] = [
  // --- A. Home ---
  {
    slug: 'home',
    categoryKey: 'home',
    categoryTitle: 'Home',
    title: 'Somali Innovation Hub (SiHub)',
    heading: 'Pioneering Grassroots Innovation, Tech Ventures & Social Transformation',
    subheading: 'Somalia\'s premier hub bridging youth potential, digital skills, startup incubation, and community impact.',
    summary: 'SiHub empowers Somali youth, innovators, and entrepreneurs through digital skills academies, incubator cohorts, and sustainable innovation initiatives.',
    description: 'Somali Innovation Hub (SiHub) is the flagship national ecosystem catalyst based in Mogadishu with regional outreach stations across Somalia. We provide world-class technical education, startup incubation, diaspora mentorship, and cross-sector partnerships to unlock inclusive economic development.',
    heroBadge: 'Somalia\'s National Innovation Ecosystem',
    publicPath: '/',
    cta: { label: 'Explore Our Programmes', url: '/programs', variant: 'primary' },
    stats: [
      { value: '14,000+', label: 'Somali Youth Trained', description: 'Across digital tracks and bootcamps' },
      { value: '180+', label: 'Startups Accelerated', description: 'Tech, AgriTech, FinTech & Social' },
      { value: '45%', label: 'Women in Tech Participation', description: 'Dedicated inclusive pathways' },
      { value: '$2.8M+', label: 'Seed & Follow-on Capital', description: 'Mobilized with ecosystem partners' }
    ],
    features: [
      { title: 'Digital Skills Academy', description: 'Modern software engineering, cloud architecture, and data science pipelines.' },
      { title: 'Venture Acceleration', description: 'Structured seed incubation, legal prototyping, and investor readiness desk.' },
      { title: 'Grassroots Social Labs', description: 'Civic tech, climate resilience, and community-driven peace initiatives.' }
    ]
  },

  // --- B. About SiHub ---
  {
    slug: 'who-we-are',
    categoryKey: 'about',
    categoryTitle: 'About SiHub',
    title: 'Who We Are',
    heading: 'Somalia\'s Premier Center for Grassroots Innovation',
    subheading: 'Institutional mandate, ecosystem stewardship, and strategic vision for Horn of Africa development.',
    summary: 'SiHub was established to unlock the transformative potential of Somali youth through technology, enterprise, and civic innovation.',
    description: 'Learn about SiHub’s purpose, work, and organizational history through information published by the organization.',
    heroBadge: 'About SiHub Ecosystem',
    publicPath: '/about/who-we-are',
    cta: { label: 'Meet Our Leadership', url: '/about/our-team', variant: 'secondary' },
  },
  {
    slug: 'vision',
    categoryKey: 'about',
    categoryTitle: 'About SiHub',
    title: 'Our Vision',
    heading: 'A Digitally Empowered, Prosperous & Self-Reliant Somalia',
    subheading: 'Envisioning a dynamic knowledge economy driven by homegrown technology and ethical enterprise.',
    summary: 'We envision Somalia as a regional powerhouse of innovation, where every young person has access to high-impact digital skills and entrepreneurial capital.',
    description: 'Our 2030 strategic horizon charts a path where homegrown Somali enterprises solve critical civic challenges—from climate adaptation and digital identity to inclusive banking and healthcare logistics—creating sustainable livelihoods across every community.',
    heroBadge: 'Strategic 2030 Horizon',
    publicPath: '/about/vision',
    cta: { label: 'Explore Our Mission', url: '/about/mission', variant: 'primary' },
    features: [
      { title: 'Knowledge Economy', description: 'Transitioning from vulnerability to tech-enabled regional trade and talent export.' },
      { title: 'Inclusive Prosperity', description: 'Ensuring women, rural youth, and vulnerable groups lead the digital transition.' },
      { title: 'Homegrown Solutions', description: 'Developing intellectual property and open digital public goods tailored to Somalia.' }
    ]
  },
  {
    slug: 'mission',
    categoryKey: 'about',
    categoryTitle: 'About SiHub',
    title: 'Our Mission',
    heading: 'Catalyzing Opportunity Through Skills, Startups & Social Innovation',
    subheading: 'Our day-to-day commitment to delivering scalable, measurable grassroots transformation.',
    summary: 'To build sustainable, inclusive innovation infrastructure that equips youth with market-aligned digital skills, nurtures high-growth ventures, and fosters peace and resilience.',
    description: 'We fulfill our mission through three core pillars: (1) World-class market-driven digital education at SiHub Institute; (2) High-impact venture incubation and investment matching at SiHub Incubator; (3) Inclusive community and peacebuilding labs that address systemic social challenges.',
    heroBadge: 'Our Strategic Mandate',
    publicPath: '/about/mission',
    cta: { label: 'View Our Programmes', url: '/programs', variant: 'primary' },
    stats: [
      { value: '3 Pillars', label: 'Education, Ventures & Civic Labs', description: 'Comprehensive holistic development model' },
      { value: '100%', label: 'Grassroots Grounded', description: 'Designed with and for Somali communities' }
    ]
  },
  {
    slug: 'our-team',
    categoryKey: 'about',
    categoryTitle: 'About SiHub',
    title: 'Our Team',
    heading: 'Visionary Leaders, Engineers & Community Builders',
    subheading: 'Meet the executive leadership and ecosystem stewards guiding SiHub\'s institutional operations.',
    summary: 'A multidisciplinary team of experienced technologists, educators, venture builders, and community organizers committed to Somalia\'s future.',
    description: 'SiHub\'s team brings together deep diaspora executive experience and rooted local community leadership. We are united by a common passion: creating authentic opportunities for Somali youth to thrive.',
    heroBadge: 'Executive Leadership',
    publicPath: '/about/our-team',
    cta: { label: 'Join Our Team', url: '/opportunities', variant: 'secondary' },
  },

  // --- C. Our Programmes ---
  {
    slug: 'digital-skills',
    categoryKey: 'programmes',
    categoryTitle: 'Our Programmes',
    title: 'Digital Skills Development',
    heading: 'High-Impact Technology & Workforce Pathways',
    subheading: 'Equipping Somali youth with practical software development, cloud, and digital design expertise.',
    summary: 'Comprehensive, project-based workforce bootcamps tailored to modern remote work and local tech hiring demand.',
    description: 'The Digital Skills Development track bridges the gap between traditional secondary/tertiary schooling and the fast-moving tech economy. Students master full-stack web development, Python, mobile development (Flutter), and cloud fundamentals through hands-on mentorship.',
    heroBadge: 'Workforce Acceleration',
    publicPath: '/programs/digital-skills',
    cta: { label: 'Apply for Next Cohort', url: '/programs/digital-skills', variant: 'primary' },
    features: [
      { title: 'Full-Stack Web & Mobile', description: 'React, Node.js, TypeScript, Flutter, and PostgreSQL.' },
      { title: 'Cloud & DevOps Fundamentals', description: 'Containerization, Linux administration, and secure deployments.' },
      { title: 'Global Remote Readiness', description: 'Portfolio development, Git workflows, and English technical communications.' }
    ]
  },
  {
    slug: 'youth-empowerment',
    categoryKey: 'programmes',
    categoryTitle: 'Our Programmes',
    title: 'Youth Empowerment',
    heading: 'Unlocking Leadership, Voice & Sustainable Livelihoods',
    subheading: 'Holistic capacity-building programs integrating leadership development, civic tech, and youth mentorship.',
    summary: 'Empowering Somali youth to become active agents of community development, civic innovation, and social enterprise.',
    description: 'Young people in Somalia face unique structural barriers to formal employment. Our Youth Empowerment program provides structured leadership academies, public speaking coaching, digital storytelling tools, and community micro-grant funding to turn youth energy into community leadership.',
    heroBadge: 'Youth Leadership',
    publicPath: '/programs/youth-empowerment',
    cta: { label: 'Join Youth Network', url: '/programs/youth-empowerment', variant: 'primary' },
  },
  {
    slug: 'social-innovation',
    categoryKey: 'programmes',
    categoryTitle: 'Our Programmes',
    title: 'Social Innovation',
    heading: 'Grassroots Problem Solving for Somali Communities',
    subheading: 'Co-designing human-centered solutions to clean water access, solar power, and health logistics.',
    summary: 'Supporting grassroots problem-solvers to test, prototype, and scale innovations that tackle societal challenges.',
    description: 'Our Social Innovation Labs apply human-centered design principles to urgent local challenges. We bring together community elders, youth technologists, and humanitarian partners to prototype low-cost, durable solutions adapted to local environments.',
    heroBadge: 'Social Innovation Lab',
    publicPath: '/programs/social-innovation',
    cta: { label: 'Submit a Challenge', url: '/programs/social-innovation', variant: 'secondary' },
  },
  {
    slug: 'women-innovation',
    categoryKey: 'programmes',
    categoryTitle: 'Our Programmes',
    title: 'Women in Innovation',
    heading: 'Championing Somali Women in Tech & Entrepreneurship',
    subheading: 'Dedicated safe spaces, female-led cohorts, and mentorship to close the gender digital divide.',
    summary: 'Specialized STEM bootcamps, executive mentorship, and seed grants dedicated exclusively to Somali women innovators.',
    description: 'Women are the economic backbone of Somali commerce, yet are underrepresented in digital engineering and venture founding. SiHub\'s Women in Innovation initiative provides safe learning spaces, childcare-supported schedules, female role models, and specialized seed capital.',
    heroBadge: 'Women in STEM',
    publicPath: '/programs/women-innovation',
    cta: { label: 'Apply for Women\'s Cohort', url: '/programs/women-innovation', variant: 'primary' },
  },
  {
    slug: 'inclusive-digital',
    categoryKey: 'programmes',
    categoryTitle: 'Our Programmes',
    title: 'Inclusive Digital Inclusion',
    heading: 'Leaving No One Behind in the Digital Age',
    subheading: 'Equitable access for rural youth, internally displaced persons (IDPs), and persons with disabilities.',
    summary: 'Bridging geographic and socioeconomic divides through solar-powered mobile learning labs and accessible curricula.',
    description: 'Technology must serve all Somalis, not just urban centers. Through our Inclusive Digital Inclusion track, we deploy mobile classroom vans, provide accessible screen-reader-compatible software training, and partner with IDP camps to deliver foundational computer literacy.',
    heroBadge: 'Equitable Access',
    publicPath: '/programs/inclusive-digital',
    cta: { label: 'Support Inclusion Labs', url: '/partnerships/become-partner', variant: 'secondary' },
    stats: [
      { value: '3,400+', label: 'Rural & IDP Learners' },
      { value: '12', label: 'Mobile Lab Deployments' }
    ]
  },
  {
    slug: 'green-sustainability',
    categoryKey: 'programmes',
    categoryTitle: 'Our Programmes',
    title: 'Green Innovation & Sustainability',
    heading: 'Climate Resilience, Clean Energy & AgriTech',
    subheading: 'Harnessing technology to mitigate drought, restore degraded ecosystems, and boost agricultural yield.',
    summary: 'Accelerating climate-smart farming, solar microgrids, water desalinization, and circular waste startups.',
    description: 'Somalia is on the frontlines of global climate change. SiHub\'s Green Innovation track supports AgriTech innovators using IoT soil sensors, solar irrigation, and drone mapping to build food security and climate-resilient livelihoods.',
    heroBadge: 'Climate & Clean Tech',
    publicPath: '/programs/green-sustainability',
    cta: { label: 'Discover AgriTech Projects', url: '/programs/green-sustainability', variant: 'primary' },
    stats: [
      { value: '25+', label: 'Climate Startups Supported' },
      { value: '450k Liters', label: 'Water Conserved Daily' }
    ]
  },
  {
    slug: 'youth-peace',
    categoryKey: 'programmes',
    categoryTitle: 'Our Programmes',
    title: 'Youth Peace Innovation',
    heading: 'Technology & Creativity for Civic Cohesion',
    subheading: 'Transforming conflict dynamics through digital dialogue, civic hackathons, and creative media.',
    summary: 'Equipping youth with peacebuilding tools, media literacy, and collaborative platforms to foster national unity.',
    description: 'Conflict resolution in the modern era requires creative, inclusive channels. We run PeaceTech hackathons where youth from different regions collaborate on digital verification tools against misinformation, community reporting dashboards, and cultural exchange podcasts.',
    heroBadge: 'PeaceTech Initiative',
    publicPath: '/programs/youth-peace',
    cta: { label: 'Explore PeaceTech Work', url: '/programs/youth-peace', variant: 'secondary' },
    stats: [
      { value: '8', label: 'Peace Hackathons Held' },
      { value: '2,100+', label: 'Dialogue Participants' }
    ]
  },
  {
    slug: 'community-dev',
    categoryKey: 'programmes',
    categoryTitle: 'Our Programmes',
    title: 'Community Development',
    heading: 'Grassroots Transformation & Regional Hubs',
    subheading: 'Local innovation clusters building responsive public infrastructure and community civic hubs.',
    summary: 'Empowering municipal districts and grassroots community organizations with digital tools for governance and health.',
    description: 'Community Development at SiHub connects municipal leaders, neighborhood committees, and youth innovators to co-create digital solutions for waste management, public clinic registration, and youth community centers.',
    heroBadge: 'Civic Transformation',
    publicPath: '/programs/community-dev',
    cta: { label: 'Engage Your Community', url: '/programs/community-dev', variant: 'primary' },
    stats: [
      { value: '28', label: 'Partner Neighborhoods' },
      { value: '150k+', label: 'Residents Reached' }
    ]
  },

  // --- D. Entrepreneurship & Startups ---
  {
    slug: 'incubation',
    categoryKey: 'startups',
    categoryTitle: 'Entrepreneurship & Startups',
    title: 'Startup Incubation',
    heading: 'From Seed Idea to Scalable Enterprise',
    subheading: 'A rigorous 6-month accelerator providing co-working space, legal structuring, technical prototyping, and seed funding.',
    summary: 'Somalia\'s most comprehensive venture incubator, supporting pre-seed and seed-stage founders to build sustainable businesses.',
    description: 'The SiHub Incubation program selects high-potential startups twice a year. Founders receive dedicated desk space at SiHub HQ, 1-on-1 mentorship from seasoned diaspora entrepreneurs, accounting and legal incorporation support, and access to the SiHub Investor Demo Day.',
    heroBadge: 'Flagship Accelerator',
    publicPath: '/startups/incubation',
    cta: { label: 'Pitch Your Startup', url: '/startups/incubation', variant: 'primary' },
    stats: [
      { value: '6 Months', label: 'Immersive Duration' },
      { value: '$25,000', label: 'Seed Grant & Credit Facility' },
      { value: '88%', label: 'Cohort Survival Rate' }
    ],
    features: [
      { title: 'Dedicated Workspace', description: '24/7 high-speed fiber internet, private meeting rooms, and prototyping labs.' },
      { title: 'Investor Network', description: 'Direct introductions to angel syndicates in Mogadishu, Nairobi, Dubai, and London.' },
      { title: 'Legal & Tax Sandbox', description: 'Guidance through corporate registration, IP protection, and compliance.' }
    ]
  },
  {
    slug: 'entrepreneurs',
    categoryKey: 'startups',
    categoryTitle: 'Entrepreneurship & Startups',
    title: 'Featured Somali Entrepreneurs',
    heading: 'Spotlighting the Trailblazers Transforming Somalia',
    subheading: 'Discover the founders building innovative solutions in logistics, finance, health, and clean energy.',
    summary: 'A curated showcase of SiHub alumni startups and bold founders leading Horn of Africa economic growth.',
    description: 'Every successful venture begins with a bold founder. Browse profiles, growth milestones, and customer impact metrics of companies founded by SiHub alumni across Mogadishu, Hargeisa, Garowe, and beyond.',
    heroBadge: 'Portfolio Showcase',
    publicPath: '/startups/entrepreneurs',
    cta: { label: 'Browse Portfolio', url: '/startups/entrepreneurs', variant: 'secondary' },
    stats: [
      { value: '180+', label: 'Active Portfolio Ventures' },
      { value: '1,200+', label: 'Direct Jobs Created' }
    ]
  },
  {
    slug: 'youth-mentorship',
    categoryKey: 'startups',
    categoryTitle: 'Entrepreneurship & Startups',
    title: 'Youth Mentorship Network',
    heading: '1-on-1 Strategic Guidance from Global Leaders',
    subheading: 'Pairing emerging Somali founders with seasoned diaspora executives and industry specialists.',
    summary: 'Structured mentorship matching founders with experts in fundraising, software architecture, marketing, and scaling.',
    description: 'Navigating startup growth is challenging. Our Youth Mentorship program matches founders with verified mentors from leading international tech firms, universities, and investment funds for bi-weekly coaching sessions.',
    heroBadge: 'Diaspora & Executive Mentorship',
    publicPath: '/startups/youth-mentorship',
    cta: { label: 'Request a Mentor', url: '/startups/youth-mentorship', variant: 'primary' },
    stats: [
      { value: '250+', label: 'Vetted Mentors' },
      { value: '4,000+', label: 'Coaching Hours Completed' }
    ]
  },
  {
    slug: 'startup-support',
    categoryKey: 'startups',
    categoryTitle: 'Entrepreneurship & Startups',
    title: 'Startup Support Services',
    heading: 'Infrastructure, Tooling & Regulatory Sandboxes',
    subheading: 'Essential support services to eliminate friction for early-stage Somali tech ventures.',
    summary: 'Cloud credits, legal templates, market research reports, and technical advisory available to registered founders.',
    description: 'Through partnerships with major cloud providers, software vendors, and institutional banks, SiHub provides over $100k in perks and discounts to incubated companies, alongside access to testing sandboxes with telecoms.',
    heroBadge: 'Venture Infrastructure',
    publicPath: '/startups/startup-support',
    cta: { label: 'Access Founder Desk', url: '/startups/startup-support', variant: 'secondary' },
    stats: [
      { value: '$100k+', label: 'Perks per Startup' },
      { value: '30+', label: 'Partner Software Discounts' }
    ]
  },

  // --- E. SiHub Institute ---
  {
    slug: 'digital-skills-academy',
    categoryKey: 'institute',
    categoryTitle: 'SiHub Institute',
    title: 'Digital Skills Academy',
    heading: 'Industry-Accredited Technical Education',
    subheading: 'Full-stack software engineering, mobile development, and modern cloud infrastructure.',
    summary: 'Practical, hands-on computer science curricula designed for employment in the global digital economy.',
    description: 'SiHub Institute is Somalia\'s leading professional technology academy. Our curriculum is developed in consultation with international tech employers, ensuring that students graduate with production-ready portfolios.',
    heroBadge: 'Flagship Academy',
    publicPath: '/institute/digital-skills-academy',
    cta: { label: 'Enroll in Academy', url: '/institute/digital-skills-academy', variant: 'primary' },
    stats: [
      { value: '92%', label: 'Graduation Rate' },
      { value: '4 Cohorts', label: 'Annual Enrollments' }
    ]
  },
  {
    slug: 'professional-training',
    categoryKey: 'institute',
    categoryTitle: 'SiHub Institute',
    title: 'Professional & Executive Training',
    heading: 'Executive Masterclasses for Public & Private Sectors',
    subheading: 'Upskilling corporate leaders, civil servants, and university faculty in cybersecurity and data analytics.',
    summary: 'Short executive programs covering digital transformation, agile project management, and information security.',
    description: 'Designed for working professionals, these intensive evening and weekend masterclasses equip organizational leaders to guide digital change in government ministries, financial institutions, and telecommunication companies.',
    heroBadge: 'Executive Upskilling',
    publicPath: '/institute/professional-training',
    cta: { label: 'View Course Schedule', url: '/institute/professional-training', variant: 'secondary' },
    stats: [
      { value: '850+', label: 'Executives Certified' },
      { value: '35+', label: 'Enterprise Clients' }
    ]
  },
  {
    slug: 'ai-emerging',
    categoryKey: 'institute',
    categoryTitle: 'SiHub Institute',
    title: 'AI & Emerging Technologies',
    heading: 'Machine Learning, Data Science & Generative AI',
    subheading: 'Preparing Somali engineers to build culturally grounded, localized artificial intelligence models.',
    summary: 'Advanced labs in natural language processing (NLP) for the Somali language, computer vision, and IoT data pipelines.',
    description: 'The Somali language and local contexts remain underserved in global AI training datasets. SiHub\'s AI & Emerging Technologies track conducts research and trains local engineers on speech-to-text models, Somali LLMs, and automated crop disease detection.',
    heroBadge: 'Frontier AI Research',
    publicPath: '/institute/ai-emerging',
    cta: { label: 'Join AI Research Lab', url: '/institute/ai-emerging', variant: 'primary' },
    stats: [
      { value: '1.2M+', label: 'Somali Audio Tokens Open-Sourced' },
      { value: '140+', label: 'AI Researchers Trained' }
    ]
  },
  {
    slug: 'research-innovation',
    categoryKey: 'institute',
    categoryTitle: 'SiHub Institute',
    title: 'Research & Applied Innovation',
    heading: 'Empirical Studies & Digital Policy Publications',
    subheading: 'Evidence-based research on the Somali digital economy, fintech adoption, and youth employment trends.',
    summary: 'Publishing independent data, whitepapers, and market reports to guide national technology strategy.',
    description: 'In collaboration with Somali and international universities, SiHub produces authoritative reports on mobile money penetration, broadband connectivity, and startup survival factors in post-conflict environments.',
    heroBadge: 'Policy & Market Research',
    publicPath: '/institute/research-innovation',
    cta: { label: 'Download Whitepapers', url: '/institute/research-innovation', variant: 'secondary' },
    stats: [
      { value: '18', label: 'Published Research Papers' },
      { value: '5', label: 'Annual Ecosystem Audits' }
    ]
  },
  {
    slug: 'certification',
    categoryKey: 'institute',
    categoryTitle: 'SiHub Institute',
    title: 'Certificates & Public Credential Verification',
    heading: 'Cryptographically Verified Digital Credentials',
    subheading: 'Transparent, tamper-proof certificates verifying course completion, skills mastery, and exam scores.',
    summary: 'Instantly verify SiHub Institute student certificates, diplomas, and bootcamp graduation badges.',
    description: 'Every credential issued by SiHub Institute is tied to an immutable verification code. Employers and international universities can verify a graduate\'s identity, enrolled coursework, and project grades in real time.',
    heroBadge: 'Credential Verification',
    publicPath: '/institute/certification',
    cta: { label: 'Verify a Certificate', url: '/institute/certification', variant: 'primary' },
    stats: [
      { value: '100%', label: 'Online Tamper-Proof Verification' },
      { value: '5,000+', label: 'Active Credentials Issued' }
    ]
  },

  // --- F. Events & Media ---
  {
    slug: 'sitalks',
    categoryKey: 'events-media',
    categoryTitle: 'Events & Media',
    title: 'SiHub Talks (SiTalks)',
    heading: 'Inspiring Keynotes, Panels & Thought Leadership',
    subheading: 'Conversations and presentations published by SiHub.',
    summary: 'Explore SiTalks sessions and topics published by the organization.',
    description: 'This page presents recorded sessions and event information made available by SiHub.',
    heroBadge: 'Monthly Keynote Series',
    publicPath: '/events/sitalks',
    cta: { label: 'View SiTalks Sessions', url: '/events', variant: 'primary' }
  },
  {
    slug: 'summit',
    categoryKey: 'events-media',
    categoryTitle: 'Events & Media',
    title: 'Somali Innovation Summit',
    heading: 'The Flagship Gathering for Horn of Africa Innovation',
    subheading: 'Summit information and agenda published by SiHub.',
    summary: 'Review summit details and agenda updates published by the organization.',
    description: 'This page presents summit information, sessions, and registration details made available by SiHub.',
    heroBadge: 'Annual Flagship Summit',
    publicPath: '/events/summit',
    cta: { label: 'View Summit Information', url: '/events', variant: 'primary' }
  },
  {
    slug: 'expo',
    categoryKey: 'events-media',
    categoryTitle: 'Events & Media',
    title: 'SiHub Innovation Expo',
    heading: 'Hands-on Prototypes, Robotics & Tech Demonstrations',
    subheading: 'A public exhibition floor showcasing hardware prototypes, software solutions, and community projects.',
    summary: 'An interactive showcase where youth inventors demonstrate working models to industry leaders and the public.',
    description: 'The SiHub Expo brings digital ideas into physical reality. Featuring robotics demonstrations, solar microgrid models, mobile apps, and 3D printing, the Expo inspires the next generation of Somali inventors.',
    heroBadge: 'Interactive Tech Showcase',
    publicPath: '/events/expo',
    cta: { label: 'View Expo Information', url: '/events', variant: 'secondary' }
  },
  {
    slug: 'news-stories',
    categoryKey: 'events-media',
    categoryTitle: 'Events & Media',
    title: 'News & Ecosystem Stories',
    heading: 'Official Press Releases, Milestones & Articles',
    subheading: 'Stay informed on SiHub initiatives, startup milestones, policy updates, and cohort graduations.',
    summary: 'The official newsroom of the Somali Innovation Hub, documenting grassroots stories and institutional updates.',
    description: 'Read news, announcements, and stories published by SiHub.',
    heroBadge: 'SiHub Newsroom',
    publicPath: '/events/news-stories',
    cta: { label: 'Read Published Stories', url: '/events', variant: 'secondary' }
  },
  {
    slug: 'media-gallery',
    categoryKey: 'events-media',
    categoryTitle: 'Events & Media',
    title: 'Media Gallery & Video Archives',
    heading: 'Photography, Video Archives & Press Kits',
    subheading: 'Browse media and documents published by SiHub.',
    summary: 'Published image, video, and document resources are listed here.',
    description: 'This page presents media and downloadable resources made available by SiHub.',
    heroBadge: 'Visual Documentation',
    publicPath: '/media',
    cta: { label: 'Explore Media Gallery', url: '/media', variant: 'primary' }
  },

  // --- G. Our Impact ---
  {
    slug: 'success-stories',
    categoryKey: 'impact',
    categoryTitle: 'Our Impact',
    title: 'Success Stories',
    heading: 'Real Journeys of Transformation & Resilience',
    subheading: 'How young Somali coders, female founders, and civic leaders transformed their communities with SiHub.',
    summary: 'First-person case studies of graduates who launched startups, secured global remote employment, and built civic solutions.',
    description: 'Behind every metric is a human story. Read about how rural high school graduates mastered full-stack development, how young women launched delivery apps in Mogadishu, and how AgriTech founders secured international funding.',
    heroBadge: 'Human-Centered Impact',
    publicPath: '/impact/success-stories',
    cta: { label: 'Read All Stories', url: '/impact/success-stories', variant: 'primary' },
    stats: [
      { value: '95+', label: 'Documented Case Studies' },
      { value: '4.8/5', label: 'Alumni Satisfaction Score' }
    ]
  },
  {
    slug: 'projects-achievements',
    categoryKey: 'impact',
    categoryTitle: 'Our Impact',
    title: 'Projects & Achievements',
    heading: 'Tangible Milestones Across Somali Regions',
    subheading: 'A directory for documenting projects and milestones published by SiHub.',
    summary: 'Review project details and achievements published by the organization.',
    description: 'Project descriptions and achievements will appear here after they have been reviewed and published by an administrator.',
    heroBadge: 'Portfolio of Achievements',
    publicPath: '/impact/projects-achievements',
    cta: { label: 'View Project Details', url: '/impact/projects-achievements', variant: 'secondary' }
  },
  {
    slug: 'annual-reports',
    categoryKey: 'impact',
    categoryTitle: 'Our Impact',
    title: 'Annual Reports & Audits',
    heading: 'Transparency, Governance & Measured Outcomes',
    subheading: 'Browse annual reports and financial documents published by SiHub.',
    summary: 'Published reports and audited documents will be listed here when available.',
    description: 'Use this page to access reports and documents that SiHub has reviewed and published.',
    heroBadge: 'Institutional Governance',
    publicPath: '/impact/annual-reports',
    cta: { label: 'Browse Published Reports', url: '/impact/annual-reports', variant: 'secondary' }
  },
  {
    slug: 'community-impact',
    categoryKey: 'impact',
    categoryTitle: 'Our Impact',
    title: 'Community Impact Metrics',
    heading: 'Community Impact',
    subheading: 'Community initiatives and outcomes published by SiHub.',
    summary: 'Explore information about community initiatives and outcomes as they are published.',
    description: 'This page presents community impact information reviewed and published by SiHub.',
    heroBadge: 'Evidence-Based Metrics',
    publicPath: '/impact/community-impact',
    cta: { label: 'Explore Community Initiatives', url: '/impact/community-impact', variant: 'primary' }
  },

  // --- H. Partnerships ---
  {
    slug: 'become-partner',
    categoryKey: 'partnerships',
    categoryTitle: 'Partnerships',
    title: 'Become a Partner',
    heading: 'Join Forces to Accelerate Somalia\'s Innovation Future',
    subheading: 'Collaborate as a corporate ally, academic co-sponsor, technology provider, or funding institution.',
    summary: 'Partner with Somalia\'s most dynamic ecosystem to co-design bootcamps, pilot technology, and support entrepreneurs.',
    description: 'SiHub partners with leading multinational tech companies, bilateral development agencies, international universities, and local enterprises. Together, we co-sponsor specialized training cohorts, provide venture challenge grants, and deploy pilot technologies.',
    heroBadge: 'Strategic Alliance',
    publicPath: '/partnerships/become-partner',
    cta: { label: 'Submit Partnership Inquiry', url: '/partnerships/become-partner', variant: 'primary' },
    stats: [
      { value: '50+', label: 'Active Institutional Allies' },
      { value: '14', label: 'Co-Sponsored Bootcamps' }
    ],
    features: [
      { title: 'Corporate Sponsorship', description: 'Brand alignment, recruitment pipeline access, and corporate social responsibility.' },
      { title: 'Academic Exchange', description: 'Joint curriculum development, student exchange, and collaborative research.' },
      { title: 'Technology Grants', description: 'Providing software tooling, cloud access, and hardware kits to young innovators.' }
    ]
  },
  {
    slug: 'donors-supporters',
    categoryKey: 'partnerships',
    categoryTitle: 'Partnerships',
    title: 'Donors & Supporters',
    heading: 'Honoring the Partners Making Grassroots Innovation Possible',
    subheading: 'Recognizing multilateral agencies, philanthropic foundations, diaspora syndicates, and government partners.',
    summary: 'We express our deepest gratitude to the visionary donors who fund our facilities, scholarships, and grants.',
    description: 'SiHub operates with the generous support of multilateral development partners, bilateral aid agencies, Somali diaspora business councils, and philanthropic funds committed to peacebuilding, youth employment, and digital democracy.',
    heroBadge: 'Donor Stewardship',
    publicPath: '/partnerships/donors-supporters',
    cta: { label: 'View Donor Recognition', url: '/partnerships/donors-supporters', variant: 'secondary' },
    stats: [
      { value: '100%', label: 'Audited Donor Compliance' },
      { value: '$10M+', label: 'Cumulative Development Value Mobilized' }
    ]
  },
  {
    slug: 'collaboration-opportunities',
    categoryKey: 'partnerships',
    categoryTitle: 'Partnerships',
    title: 'Collaboration Opportunities',
    heading: 'Active RFPs, Joint Grants & Innovation Calls',
    subheading: 'Open calls for research consortia, challenge prize submissions, and municipal pilot projects.',
    summary: 'Explore active funding calls, consortium opportunities, and joint innovation initiatives currently accepting partners.',
    description: 'Browse current opportunities to co-apply for international grants, submit proposals for civic hackathons, or participate in consortium research studies advancing digital inclusion in the Horn of Africa.',
    heroBadge: 'Active Funding & Calls',
    publicPath: '/partnerships/collaboration-opportunities',
    cta: { label: 'View Open Calls', url: '/partnerships/collaboration-opportunities', variant: 'primary' },
    stats: [
      { value: '5', label: 'Active Calls for Proposals' },
      { value: '$350k', label: 'Open Challenge Prize Pool' }
    ]
  }
];

/**
 * Ensures the 34 official website pages are seeded and persisted in database.cmsEntry
 */
export async function ensureWebsiteStructureSeeded(database: Pick<typeof prisma, 'cmsEntry'>, authorId?: string) {
  try {
    for (const def of OFFICIAL_WEBSITE_SUBSECTIONS) {
      const existing = await database.cmsEntry.findFirst({
        where: { type: 'page', slug: def.slug }
      });

      if (!existing) {
        const initialSections: unknown[] = [];

        const contentPayload: Record<string, unknown> = {
          categoryKey: def.categoryKey,
          categoryTitle: def.categoryTitle,
          title: def.title,
          heading: def.heading,
          subheading: def.subheading,
          summary: def.summary,
          description: def.description,
          heroBadge: def.heroBadge,
          publicPath: def.publicPath,
          cta: def.cta,
          stats: def.stats ?? [],
          features: def.features ?? [],
          team: def.team ?? [],
          faqs: def.faqs ?? [],
          documents: def.documents ?? [],
          sections: initialSections
        };

        await database.cmsEntry.create({
          data: {
            type: 'page',
            slug: def.slug,
            title: def.title,
            summary: def.summary,
            content: contentPayload as Prisma.InputJsonValue,
            status: PublicationStatus.PUBLISHED,
            publishedAt: new Date(),
            authorId: authorId ?? null
          }
        });
      }
    }
  } catch (err) {
    console.warn('ensureWebsiteStructureSeeded notice:', err);
  }
}
