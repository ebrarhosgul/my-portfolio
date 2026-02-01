export interface SkillItem {
  text: string;
  desc: string;
  textClass: string;
  color: string;
  glow: string;
}

export interface SkillCardProps {
  skill: SkillItem;
  index: number;
}

export interface SkillTextProps {
  skill: SkillItem;
  index: number;
  isRight: boolean;
}
