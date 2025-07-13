
import { Profile } from "@/lib/canisters";
import { Principal } from "@dfinity/principal";

export const dummyProfiles: Profile[] = [
  {
    id: Principal.fromText("rdmx6-jaaaa-aaaaa-aaadq-cai"),
    name: "Alex Chen",
    bio: "Full-stack developer passionate about Web3 and decentralized applications. Building the future of the internet.",
    skills: ["React", "TypeScript", "Solidity", "Node.js", "GraphQL", "Rust"],
    projects: [
      {
        id: "1",
        title: "DeFi Portfolio Tracker",
        description: "A comprehensive dashboard for tracking DeFi investments across multiple chains.",
        mediaLink: "https://github.com/alexchen/defi-tracker",
        createdAt: BigInt(Date.now() - 86400000) // 1 day ago
      },
      {
        id: "2",
        title: "NFT Marketplace",
        description: "A decentralized marketplace for trading NFTs with low gas fees.",
        mediaLink: "https://github.com/alexchen/nft-marketplace",
        createdAt: BigInt(Date.now() - 172800000) // 2 days ago
      }
    ],
    endorsements: [
      {
        id: "e1",
        fromPrincipal: Principal.fromText("rrkah-fqaaa-aaaaa-aaaaq-cai"),
        fromName: "Sarah Johnson",
        skill: "React",
        message: "Alex is an exceptional React developer. Their component architecture is clean and scalable.",
        timestamp: BigInt(Date.now() - 86400000)
      },
      {
        id: "e2",
        fromPrincipal: Principal.fromText("renrk-eyaaa-aaaaa-aaada-cai"),
        fromName: "Mike Davis",
        skill: "Solidity",
        message: "Outstanding smart contract development skills. Alex helped us build secure and efficient contracts.",
        timestamp: BigInt(Date.now() - 172800000)
      }
    ],
    createdAt: BigInt(Date.now() - 604800000), // 1 week ago
    lastUpdated: BigInt(Date.now() - 86400000)
  },
  {
    id: Principal.fromText("rrkah-fqaaa-aaaaa-aaaaq-cai"),
    name: "Sarah Johnson",
    bio: "UX/UI Designer specializing in Web3 interfaces. Creating intuitive experiences for complex blockchain interactions.",
    skills: ["Figma", "UI/UX Design", "Prototyping", "User Research", "Design Systems"],
    projects: [
      {
        id: "3",
        title: "Wallet Interface Redesign",
        description: "Complete UX overhaul for a popular crypto wallet, improving user onboarding by 40%.",
        mediaLink: null,
        createdAt: BigInt(Date.now() - 259200000) // 3 days ago
      }
    ],
    endorsements: [
      {
        id: "e3",
        fromPrincipal: Principal.fromText("rdmx6-jaaaa-aaaaa-aaadq-cai"),
        fromName: "Alex Chen",
        skill: "UI/UX Design",
        message: "Sarah's design work is exceptional. She has a great eye for user experience.",
        timestamp: BigInt(Date.now() - 172800000)
      }
    ],
    createdAt: BigInt(Date.now() - 518400000), // 6 days ago
    lastUpdated: BigInt(Date.now() - 172800000)
  },
  {
    id: Principal.fromText("renrk-eyaaa-aaaaa-aaada-cai"),
    name: "Mike Davis",
    bio: "Blockchain architect with 5+ years in crypto. Led development of several successful DeFi protocols.",
    skills: ["Solidity", "Smart Contracts", "DeFi", "Security Auditing", "Ethereum"],
    projects: [],
    endorsements: [
      {
        id: "e4",
        fromPrincipal: Principal.fromText("rdmx6-jaaaa-aaaaa-aaadq-cai"),
        fromName: "Alex Chen",
        skill: "Smart Contracts",
        message: "Mike is one of the best smart contract developers I've worked with.",
        timestamp: BigInt(Date.now() - 345600000)
      }
    ],
    createdAt: BigInt(Date.now() - 432000000), // 5 days ago
    lastUpdated: BigInt(Date.now() - 345600000)
  },
  {
    id: Principal.fromText("r7inp-6aaaa-aaaaa-aaabq-cai"),
    name: "Emma Wilson",
    bio: "Product Manager bridging the gap between Web2 and Web3. Focused on user adoption and product-market fit.",
    skills: ["Product Management", "Strategy", "Analytics", "User Research"],
    projects: [],
    endorsements: [],
    createdAt: BigInt(Date.now() - 345600000), // 4 days ago
    lastUpdated: BigInt(Date.now() - 345600000)
  },
  {
    id: Principal.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai"),
    name: "David Kim",
    bio: "Full-stack engineer building scalable blockchain infrastructure. Passionate about developer tools.",
    skills: ["Go", "Kubernetes", "Docker", "GraphQL", "PostgreSQL"],
    projects: [],
    endorsements: [],
    createdAt: BigInt(Date.now() - 259200000), // 3 days ago
    lastUpdated: BigInt(Date.now() - 259200000)
  },
  {
    id: Principal.fromText("rkp4c-7iaaa-aaaaa-aaaca-cai"),
    name: "Lisa Zhang",
    bio: "Marketing specialist helping Web3 startups grow. Expert in community building and content strategy.",
    skills: ["Marketing", "Community Building", "Content Strategy", "Social Media"],
    projects: [],
    endorsements: [],
    createdAt: BigInt(Date.now() - 172800000), // 2 days ago
    lastUpdated: BigInt(Date.now() - 172800000)
  }
];
