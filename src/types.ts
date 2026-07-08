export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export interface ServiceItem {
  id: string;
  num: string;
  title: string;
  desc: string;
  iconName: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  date: string;
  highlights: string[];
  tags: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  desc: string;
  tags: string[];
  icon: string;
  bgGradient: string;
  githubLink?: string;
}

export interface OSSRepo {
  id: string;
  name: string;
  desc: string;
  tech: string;
  iconName: string;
  bgHex: string;
  githubLink: string;
}

export interface SkillItem {
  name: string;
  iconName: string;
}

export interface EduItem {
  id: string;
  year: string;
  degree: string;
  school: string;
  location: string;
  iconType: 'graduation' | 'university';
}

export interface CertificationItem {
  id: string;
  issuer: string;
  title: string;
  iconType: 'microsoft' | 'udemy';
  link: string;
}

export interface TestimonialItem {
  id: string;
  stars: number;
  quote: string;
  name: string;
  role: string;
  avatarUrl: string;
  avatarPlaceholder: string;
}
