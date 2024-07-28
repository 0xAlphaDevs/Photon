import { Course } from "./types";

export const courses: Course[] = [
  {
    id: "THETA101",
    name: "React Basics",
    description: "Learn the basics of React.",
    price: 50,
    streamId: "stream123",
    creator: "John Doe",
    thumbnailUrl: "/logo.png",
    videos: [
      {
        id: "1",
        name: "Intro to React",
        description: "Introduction to React basics.",
      },
      {
        id: "2",
        name: "React Components",
        description: "Understanding React components.",
      },
    ],
  },
  {
    id: "2",
    name: "Advanced React",
    description: "Dive deeper into React with advanced concepts.",
    price: 75,
    streamId: "stream456",
    creator: "Jane Smith",
    thumbnailUrl: "/images/advanced-react.jpg",
    videos: [
      {
        id: "3",
        name: "Advanced React Patterns",
        description: "Explore advanced React patterns.",
      },
      {
        id: "4",
        name: "State Management",
        description: "Advanced state management techniques.",
      },
    ],
  },
  {
    id: "3",
    name: "TypeScript for Beginners",
    description: "A beginner's guide to TypeScript.",
    price: 45,
    streamId: "stream789",
    creator: "Alice Johnson",
    thumbnailUrl: "/images/typescript-beginners.jpg",
    videos: [
      {
        id: "5",
        name: "Intro to TypeScript",
        description: "Introduction to TypeScript.",
      },
      {
        id: "6",
        name: "TypeScript Basics",
        description: "Learn the basics of TypeScript.",
      },
    ],
  },
  {
    id: "4",
    name: "Node.js Fundamentals",
    description: "Learn the fundamentals of Node.js.",
    price: 60,
    streamId: "stream101",
    creator: "Bob Brown",
    thumbnailUrl: "/images/nodejs-fundamentals.jpg",
    videos: [
      {
        id: "7",
        name: "Intro to Node.js",
        description: "Introduction to Node.js.",
      },
      {
        id: "8",
        name: "Node.js Modules",
        description: "Understanding Node.js modules.",
      },
    ],
  },
  {
    id: "5",
    name: "Full-Stack Development",
    description: "Become a full-stack developer.",
    price: 100,
    streamId: "stream102",
    creator: "Charlie Davis",
    thumbnailUrl: "/images/full-stack-development.jpg",
    videos: [
      {
        id: "9",
        name: "Full-Stack Basics",
        description: "Introduction to full-stack development.",
      },
      {
        id: "10",
        name: "Building a Full-Stack App",
        description: "Step-by-step guide to building a full-stack app.",
      },
    ],
  },
  {
    id: "6",
    name: "CSS Mastery",
    description: "Master the art of CSS.",
    price: 40,
    streamId: "stream103",
    creator: "Eve Clark",
    thumbnailUrl: "/images/css-mastery.jpg",
    videos: [
      { id: "11", name: "Intro to CSS", description: "Introduction to CSS." },
      {
        id: "12",
        name: "Advanced CSS Techniques",
        description: "Advanced techniques in CSS.",
      },
    ],
  },
];
