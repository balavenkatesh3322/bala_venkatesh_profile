import {
  StatItem,
  ServiceItem,
  ExperienceItem,
  ProjectItem,
  OSSRepo,
  SkillItem,
  EduItem,
  CertificationItem,
  TestimonialItem
} from './types';

export const statsData: StatItem[] = [
  { id: 'clients', value: 42, suffix: '+', label: 'Happy Clients' },
  { id: 'projects', value: 52, suffix: '+', label: 'Projects Shipped' },
  { id: 'experience', value: 10, suffix: ' yrs', label: 'Experience' }
];

export const servicesData: ServiceItem[] = [
  {
    id: 's-1',
    num: '01',
    title: 'AI Strategy & Consulting',
    desc: 'Identify high-impact AI opportunities, build implementation roadmaps, and align custom technology investments with your business goals.',
    iconName: 'Lightbulb'
  },
  {
    id: 's-2',
    num: '02',
    title: 'Generative AI & RAG',
    desc: 'Design and deploy state-of-the-art LLM-powered applications, robust RAG pipelines, and multi-agent systems using LangChain, LangGraph, and crewAI.',
    iconName: 'Brain'
  },
  {
    id: 's-3',
    num: '03',
    title: 'Custom Model Development',
    desc: 'Build bespoke Natural Language Processing (NLP), Computer Vision (CV), and Deep Learning (DL) models fine-tuned to your specific domain datasets.',
    iconName: 'Code'
  },
  {
    id: 's-4',
    num: '04',
    title: 'AI Team Leadership',
    desc: 'Guide technical engineering teams, lead agile model delivery, and bridge complex technical insights with high-level business stakeholder outcomes.',
    iconName: 'Users'
  }
];

export const experienceData: ExperienceItem[] = [
  {
    id: 'scb',
    company: 'Standard Chartered Bank',
    role: 'AI Engineer',
    date: 'Sep 2023 – Present',
    highlights: [
      'Pioneered an enterprise-grade RAG-based system to automate misconfiguration detection and remediation in Azure DevOps cloud environments, significantly strengthening security posture.',
      'Developed tailored LLM-powered pipelines that replaced tedious manual compliance audits, reducing continuous pipeline security review times by over 80%.',
      'Honored with the highly competitive "Best Performer of the Year 2024" award for exceptional milestones in DevSecOps automation.',
      'Partnered closely with cloud infrastructure and security architects to seamlessly integrate predictive models into production CI/CD workflows.'
    ],
    tags: ['RAG', 'LLMs', 'Azure DevOps', 'Python', 'Security Automation']
  },
  {
    id: 'bighaat',
    company: 'Bighaat PVT LTD',
    role: 'Lead Data Scientist',
    date: 'Mar 2022 – Mar 2023',
    highlights: [
      'Spearheaded the development of a production computer vision mobile application ("Crop Doctor") empowering millions of farmers to run plant pathology checks instantly.',
      'Curated complex datasets and fine-tuned deep learning classifiers on agricultural images, achieving industry-leading model reliability under extreme real-world lighting variations.',
      'Ported model weights to on-device neural runtimes via TensorFlow Lite (TFLite), facilitating fast offline diagnostics in areas with spotty connectivity.',
      'Fostered collaborative workflows across engineers, field agronomists, and product managers to successfully ship a complete commercial-grade app.'
    ],
    tags: ['Computer Vision', 'Deep Learning', 'TensorFlow Lite', 'Mobile AI', 'Python']
  },
  {
    id: 'aibots-medosys',
    company: 'AIBOTS Sdn Bhd — Medosys',
    role: 'Data Scientist',
    date: 'Oct 2020 – Jul 2021',
    highlights: [
      'Pioneered an NLP-driven speech transcription and summarization module producing structured clinical charts directly from patient consultations, decreasing documentation work by ~60%.',
      'Configured streaming acoustic interfaces and connected them with bespoke medical Named Entity Recognition (NER) models to extract medicines and symptoms.',
      'Spearheaded developer sprints, aligned release pipelines, and managed regular deliverables for international medical healthcare clients.'
    ],
    tags: ['NLP', 'Healthcare AI', 'Speech-to-Text', 'Medical NER']
  },
  {
    id: 'aibots-seismic',
    company: 'AIBOTS Sdn Bhd — Seismic AI',
    role: 'Data Scientist',
    date: 'Jan 2020 – Oct 2020',
    highlights: [
      'Parsed multi-dimensional seismic sensor feeds to forecast structural anomalies for enterprise hydrocarbon oil and gas operators.',
      'Devised and automated robust deep-learning anomaly trackers on spatial visual slices to flag geological movements in real-time.',
      'Validated diagnostic heuristics alongside veteran oil and gas domain geologists to ensure model alignment with scientific standards.'
    ],
    tags: ['Computer Vision', 'Anomaly Detection', 'Spatiotemporal AI', 'Oil & Gas']
  },
  {
    id: 'spritle',
    company: 'Spritle Software Pvt Ltd — Phraze',
    role: 'Data Scientist',
    date: 'Dec 2018 – Jan 2020',
    highlights: [
      'Designed a speech-to-text medical scribe using a secure hands-free voice interface to help physicians compile electronic health records effortlessly.',
      'Optimized natural language processing steps to distill complex verbal discussions into clean, categorized medical chapters.',
      'Empowered medical staff to cut down consultation record-drafting overhead from an average of 15 minutes to under 2 minutes.'
    ],
    tags: ['NLP', 'Voice UI', 'Healthcare Systems', 'Python']
  },
  {
    id: 'solverminds',
    company: 'Solverminds Technologies',
    role: 'Software Developer',
    date: 'Oct 2016 – Dec 2017',
    highlights: [
      'Built and maintained highly responsive corporate systems handling extensive maritime data processing and safety check reviews.',
      'Authored modules for "Mack Lite," an enterprise application tracking vessel reports and global safety logs.',
      'Developed core components for "Time Transport," an enterprise vehicle routing platform highlighting real-time live map updates.'
    ],
    tags: ['Web Development', 'Java EE', 'Maritime Logs', 'Live Tracking']
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: 'p1',
    name: 'TIP Automation — Standard Chartered Bank',
    desc: 'Pioneered an advanced DevSecOps RAG-driven verification engine. Reduced cloud infrastructure security pipeline auditing times by 80%. Earned the "Best Performer" accolade in 2024.',
    tags: ['Security', 'Generative AI', 'RAG', 'Azure DevOps'],
    icon: '🔒',
    bgGradient: 'from-blue-600/20 via-indigo-600/10 to-transparent'
  },
  {
    id: 'p2',
    name: 'Crop Doctor — Bighaat',
    desc: 'An AI-powered computer vision mobile application designed for farmers. Fine-tuned deep classifiers and compiled them to on-device TFLite models to allow high-accuracy offline diagnosis.',
    tags: ['Computer Vision', 'On-Device AI', 'TensorFlow Lite', 'Deep Learning'],
    icon: '🌿',
    bgGradient: 'from-emerald-600/20 via-teal-600/10 to-transparent'
  },
  {
    id: 'p3',
    name: 'Medosys — Clinical Scribe',
    desc: 'An NLP speech-to-text platform transforming doctor-patient conversations into structured charts. Eliminated over 60% of EHR administrative workloads for clinical specialists.',
    tags: ['NLP', 'Acoustic AI', 'Named Entity Recognition', 'EHR Systems'],
    icon: '🏥',
    bgGradient: 'from-purple-600/20 via-pink-600/10 to-transparent'
  },
  {
    id: 'p4',
    name: 'Seismic AI Anomaly Detection',
    desc: 'Real-time oil & gas geological slice anomaly checking engine. Deployed complex video-frame object identification models that validated and categorized structural shifts.',
    tags: ['Computer Vision', 'Anomaly Detection', 'Deep Learning', 'Oil & Gas'],
    icon: '🛢️',
    bgGradient: 'from-orange-600/20 via-amber-600/10 to-transparent'
  },
  {
    id: 'p5',
    name: 'Phraze — Clinical Voice Scribe',
    desc: 'Bespoke hand-free clinical voice scribing utility. Slashed electronic file compilation overheads for healthcare practitioners from 15 minutes to under 2 minutes.',
    tags: ['Voice UI', 'Acoustic Processing', 'Natural Language Understanding'],
    icon: '🎙️',
    bgGradient: 'from-cyan-600/20 via-sky-600/10 to-transparent'
  },
  {
    id: 'p6',
    name: 'Document RAG Engine',
    desc: 'An open-source, production-ready Retrieval-Augmented Generation (RAG) platform. Features advanced text chunking, embedding generation, and vector search integration.',
    tags: ['GenAI', 'Open Source', 'Vector Databases', 'RAG'],
    icon: '📄',
    bgGradient: 'from-rose-600/20 via-red-600/10 to-transparent',
    githubLink: 'https://github.com/balavenkatesh3322/Document-RAG'
  }
];

export const ossReposData: OSSRepo[] = [
  {
    id: 'oss-1',
    name: 'Technical Knowledge Assistant',
    desc: 'AI assistant for technical knowledge retrieval and QA powered by NLP and custom vector models.',
    tech: 'Python · AI · NLP',
    iconName: 'Bot',
    bgHex: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    githubLink: 'https://github.com/balavenkatesh3322/Technical-Knowledge-Assistant'
  },
  {
    id: 'oss-2',
    name: 'E-commerce Analytics',
    desc: 'In-depth cohort analysis, predictive customer valuation, and visualization pipelines for e-commerce transactional trends.',
    tech: 'Python · Data Viz · Analytics',
    iconName: 'LineChart',
    bgHex: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    githubLink: 'https://github.com/balavenkatesh3322/ecommerce-analytics'
  },
  {
    id: 'oss-3',
    name: 'Free AI Certification Guide',
    desc: 'A meticulously curated study guide and resource repository to achieve major fully accredited AI certifications.',
    tech: 'Education · AI · MLOps',
    iconName: 'Award',
    bgHex: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    githubLink: 'https://github.com/balavenkatesh3322/free-ai-certification'
  },
  {
    id: 'oss-4',
    name: 'Face Unlock System',
    desc: 'Lightweight on-device face verification authentication system using state-of-the-art computer vision facial embeddings.',
    tech: 'Python · CV · PyTorch',
    iconName: 'ScanFace',
    bgHex: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
    githubLink: 'https://github.com/balavenkatesh3322/face_unlock'
  },
  {
    id: 'oss-5',
    name: 'AI Experiment Hub',
    desc: 'A developer-centric local registry designed to seamlessly benchmark, log, and register machine learning models.',
    tech: 'MLOps · Python · FastAPI',
    iconName: 'FlaskConical',
    bgHex: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
    githubLink: 'https://github.com/balavenkatesh3322/AIExperimentHub'
  },
  {
    id: 'oss-6',
    name: 'Document RAG',
    desc: 'Complete production pipeline utilizing state-of-the-art vector embedding stores for highly accurate document Q&A.',
    tech: 'GenAI · RAG · LangChain',
    iconName: 'FileText',
    bgHex: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    githubLink: 'https://github.com/balavenkatesh3322/Document-RAG'
  }
];

export const skillsData: string[] = [
  'Python',
  'Java',
  'Generative AI',
  'LangChain',
  'LangGraph',
  'crewAI',
  'Prompt Engineering',
  'NLP',
  'Computer Vision',
  'PyTorch',
  'Azure Cloud',
  'Docker',
  'FastAPI',
  'Vector DBs',
  'RAG Systems',
  'Ollama'
];

export const eduData: EduItem[] = [
  {
    id: 'edu-1',
    year: '2021 – 2022',
    degree: 'M.Sc. Applied Data Science',
    school: 'Teesside University',
    location: 'London, United Kingdom',
    iconType: 'graduation'
  },
  {
    id: 'edu-2',
    year: '2011 – 2015',
    degree: 'B.E. Computer Science & Engineering',
    school: 'Sri Ram Engineering College',
    location: 'Tamil Nadu, India',
    iconType: 'university'
  }
];

export const certificationsData: CertificationItem[] = [
  {
    id: 'cert-1',
    issuer: 'Microsoft',
    title: 'Implement Security with Azure DevOps (AZ-400)',
    iconType: 'microsoft',
    link: 'https://learn.microsoft.com/api/credentials/share/en-us/BalavenkateshS-8188/32DB6E6F5634F83E?sharingId=32DB6E6F5634F83E'
  },
  {
    id: 'cert-2',
    issuer: 'Udemy',
    title: 'Impact of Generative AI on Cyber Security',
    iconType: 'udemy',
    link: 'https://www.udemy.com/certificate/UC-45125c54-5f88-400c-9516-72eb3723f4c4/'
  }
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: 't1',
    stars: 5,
    quote: 'Bala is extremely passionate about applying AI and Machine Learning to solve real business challenges. He is a life-long learner who continuously pushes himself to master cutting-edge paradigms.',
    name: 'Mahathir Muhammad Rafie',
    role: 'CEO, AIBOTS Sdn Bhd',
    avatarUrl: 'https://balavenkatesh3322.github.io/bala_venkatesh_profile/images/reference-image-1.jpg',
    avatarPlaceholder: 'MR'
  },
  {
    id: 't2',
    stars: 5,
    quote: 'Bala is an excellent communicator and a remarkably fast learner. He rapidly conceptualizes client requirements and takes incredible initiative to solve technical blocks. His deep learning skills are stellar.',
    name: 'Brandon McCutcheon',
    role: 'Co-Founder, Phraze',
    avatarUrl: 'https://balavenkatesh3322.github.io/bala_venkatesh_profile/images/reference-image-3.jpg',
    avatarPlaceholder: 'BM'
  },
  {
    id: 't3',
    stars: 5,
    quote: 'Bala exhibits an outstanding ability to break down highly complex mathematical and structural AI blocks and deploy them securely at scale. His expertise was an exceptional asset to our DevOps security pipeline efforts.',
    name: 'ArunVivek',
    role: 'Head of Cloud Security, Standard Chartered Bank',
    avatarUrl: 'https://balavenkatesh3322.github.io/bala_venkatesh_profile/images/reference-image-2.jpg',
    avatarPlaceholder: 'AV'
  }
];
