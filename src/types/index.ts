
export interface Profile {
  id: string;
  name: string;
  bio: string;
  skills: string[];
  projects: Project[];
  endorsements: Endorsement[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  mediaLink?: string;
}

export interface Endorsement {
  skill: string;
  endorser: string;
  message: string;
  timestamp: string;
}
