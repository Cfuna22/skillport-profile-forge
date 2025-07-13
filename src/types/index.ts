
import { Principal } from '@dfinity/principal';

export interface Profile {
  id: Principal;
  name: string;
  bio: string;
  skills: string[];
  projects: Project[];
  endorsements: Endorsement[];
  createdAt: bigint;
  lastUpdated: bigint;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  mediaLink: string | null;
  createdAt: bigint;
}

export interface Endorsement {
  id: string;
  fromPrincipal: Principal;
  fromName: string;
  skill: string;
  message: string;
  timestamp: bigint;
}
