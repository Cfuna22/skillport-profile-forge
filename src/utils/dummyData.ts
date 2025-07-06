
import { Profile } from "@/types";

export const dummyProfiles: Profile[] = [
  {
    id: "demo",
    name: "Alex Chen",
    bio: "Full-stack developer passionate about Web3 and decentralized applications. Building the future of the internet.",
    skills: ["React", "TypeScript", "Solidity", "Node.js", "GraphQL", "Rust"],
    projects: [
      {
        id: "1",
        title: "DeFi Portfolio Tracker",
        description: "A comprehensive dashboard for tracking DeFi investments across multiple chains.",
        mediaLink: "https://github.com/alexchen/defi-tracker"
      },
      {
        id: "2",
        title: "NFT Marketplace",
        description: "A decentralized marketplace for trading NFTs with low gas fees.",
        mediaLink: "https://github.com/alexchen/nft-marketplace"
      }
    ],
    endorsements: [
      {
        skill: "React",
        endorser: "Sarah Johnson",
        message: "Alex is an exceptional React developer. Their component architecture is clean and scalable.",
        timestamp: "2024-01-15"
      },
      {
        skill: "Solidity",
        endorser: "Mike Davis",
        message: "Outstanding smart contract development skills. Alex helped us build secure and efficient contracts.",
        timestamp: "2024-01-10"
      }
    ]
  },
  {
    id: "user-2",
    name: "Sarah Johnson",
    bio: "UX/UI Designer specializing in Web3 interfaces. Creating intuitive experiences for complex blockchain interactions.",
    skills: ["Figma", "UI/UX Design", "Prototyping", "User Research", "Design Systems"],
    projects: [
      {
        id: "3",
        title: "Wallet Interface Redesign",
        description: "Complete UX overhaul for a popular crypto wallet, improving user onboarding by 40%."
      }
    ],
    endorsements: [
      {
        skill: "UI/UX Design",
        endorser: "Alex Chen",
        message: "Sarah's design work is exceptional. She has a great eye for user experience.",
        timestamp: "2024-01-12"
      }
    ]
  },
  {
    id: "user-3",
    name: "Mike Davis",
    bio: "Blockchain architect with 5+ years in crypto. Led development of several successful DeFi protocols.",
    skills: ["Solidity", "Smart Contracts", "DeFi", "Security Auditing", "Ethereum"],
    projects: [],
    endorsements: [
      {
        skill: "Smart Contracts",
        endorser: "Alex Chen",
        message: "Mike is one of the best smart contract developers I've worked with.",
        timestamp: "2024-01-08"
      }
    ]
  },
  {
    id: "user-4",
    name: "Emma Wilson",
    bio: "Product Manager bridging the gap between Web2 and Web3. Focused on user adoption and product-market fit.",
    skills: ["Product Management", "Strategy", "Analytics", "User Research"],
    projects: [],
    endorsements: []
  },
  {
    id: "user-5",
    name: "David Kim",
    bio: "Full-stack engineer building scalable blockchain infrastructure. Passionate about developer tools.",
    skills: ["Go", "Kubernetes", "Docker", "GraphQL", "PostgreSQL"],
    projects: [],
    endorsements: []
  },
  {
    id: "user-6",
    name: "Lisa Zhang",
    bio: "Marketing specialist helping Web3 startups grow. Expert in community building and content strategy.",
    skills: ["Marketing", "Community Building", "Content Strategy", "Social Media"],
    projects: [],
    endorsements: []
  }
];
