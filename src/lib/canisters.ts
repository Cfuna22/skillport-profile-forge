
import { Actor, HttpAgent } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { Principal } from '@dfinity/principal';

// Type definitions matching the Motoko backend
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

export type Result<T, E> = { ok: T } | { err: E };

// Actor interface
export interface SkillPortActor {
  registerUser: (name: string, bio: string) => Promise<Result<boolean, string>>;
  updateProfile: (name: string, bio: string) => Promise<Result<boolean, string>>;
  addSkill: (skill: string) => Promise<Result<boolean, string>>;
  removeSkill: (skill: string) => Promise<Result<boolean, string>>;
  addProject: (title: string, description: string, mediaLink: string | null) => Promise<Result<boolean, string>>;
  endorseUser: (targetPrincipal: Principal, skill: string, message: string) => Promise<Result<boolean, string>>;
  getProfile: (userPrincipal: Principal) => Promise<Profile | null>;
  getMyProfile: (caller: Principal) => Promise<Profile | null>;
  getAllProfiles: () => Promise<Profile[]>;
  listTopProfiles: () => Promise<Profile[]>;
  searchProfilesBySkill: (skill: string) => Promise<Profile[]>;
  getLastUpdateTime: () => Promise<bigint>;
  getTotalUsers: () => Promise<bigint>;
}

// Helper functions
export const isOk = <T, E>(result: Result<T, E>): result is { ok: T } => {
  return 'ok' in result;
};

export const handleResult = <T, E>(result: Result<T, E>): T => {
  if (isOk(result)) {
    return result.ok;
  }
  throw new Error(result.err as string);
};

// Create actor function
export const createActor = async (): Promise<SkillPortActor> => {
  const authClient = await AuthClient.create();
  const identity = authClient.getIdentity();
  
  const agent = new HttpAgent({
    identity,
    host: process.env.DFX_NETWORK === "local" ? "http://localhost:4943" : "https://ic0.app",
  });

  // Only fetch root key in local development
  if (process.env.DFX_NETWORK === "local") {
    await agent.fetchRootKey();
  }

  const canisterId = process.env.VITE_SKILLPORT_BACKEND_CANISTER_ID || 'rrkah-fqaaa-aaaaa-aaaaq-cai';

  return Actor.createActor<SkillPortActor>(
    ({ IDL }) => {
      const Profile = IDL.Record({
        id: IDL.Principal,
        name: IDL.Text,
        bio: IDL.Text,
        skills: IDL.Vec(IDL.Text),
        projects: IDL.Vec(IDL.Record({
          id: IDL.Text,
          title: IDL.Text,
          description: IDL.Text,
          mediaLink: IDL.Opt(IDL.Text),
          createdAt: IDL.Int,
        })),
        endorsements: IDL.Vec(IDL.Record({
          id: IDL.Text,
          fromPrincipal: IDL.Principal,
          fromName: IDL.Text,
          skill: IDL.Text,
          message: IDL.Text,
          timestamp: IDL.Int,
        })),
        createdAt: IDL.Int,
        lastUpdated: IDL.Int,
      });

      const Result = (T: any, E: any) => IDL.Variant({ ok: T, err: E });

      return IDL.Service({
        registerUser: IDL.Func([IDL.Text, IDL.Text], [Result(IDL.Bool, IDL.Text)], []),
        updateProfile: IDL.Func([IDL.Text, IDL.Text], [Result(IDL.Bool, IDL.Text)], []),
        addSkill: IDL.Func([IDL.Text], [Result(IDL.Bool, IDL.Text)], []),
        removeSkill: IDL.Func([IDL.Text], [Result(IDL.Bool, IDL.Text)], []),
        addProject: IDL.Func([IDL.Text, IDL.Text, IDL.Opt(IDL.Text)], [Result(IDL.Bool, IDL.Text)], []),
        endorseUser: IDL.Func([IDL.Principal, IDL.Text, IDL.Text], [Result(IDL.Bool, IDL.Text)], []),
        getProfile: IDL.Func([IDL.Principal], [IDL.Opt(Profile)], ['query']),
        getMyProfile: IDL.Func([IDL.Principal], [IDL.Opt(Profile)], ['query']),
        getAllProfiles: IDL.Func([], [IDL.Vec(Profile)], ['query']),
        listTopProfiles: IDL.Func([], [IDL.Vec(Profile)], ['query']),
        searchProfilesBySkill: IDL.Func([IDL.Text], [IDL.Vec(Profile)], ['query']),
        getLastUpdateTime: IDL.Func([], [IDL.Int], ['query']),
        getTotalUsers: IDL.Func([], [IDL.Nat], ['query']),
      });
    },
    { agent, canisterId }
  );
};

// Legacy function for backward compatibility
export const getActor = createActor;
