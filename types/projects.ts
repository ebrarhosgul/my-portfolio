import { IconType } from 'react-icons';

export interface Project {
  id: string;
  title: string;
  category: string;
  desc: string;
  source: string;
  hasVideo: boolean;
  color: string;
  liveUrl?: string;
  repoUrl?: string;
  infoText?: string;
  linkedinUrl?: string;
  stack: {
    icon: IconType;
    name: string;
  }[];
}

export interface ProjectShowcaseProps {
  projects: Project[];
  activeIndex: number;
}
