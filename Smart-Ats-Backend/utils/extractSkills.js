const SKILL_DB = [
  // JavaScript ecosystem
  "javascript", "typescript", "js", "ts",
  // Frontend
  "react", "reactjs", "react.js",
  "react native",
  "next.js", "nextjs", "next",
  "vue", "vue.js", "vuejs",
  "angular",
  "redux",
  "html", "css", "sass", "scss",
  "tailwind", "tailwindcss",
  "bootstrap",
  "webpack", "vite",
  // Backend
  "node", "nodejs", "node.js",
  "express", "express.js",
  "nestjs", "nest.js",
  "django", "flask", "fastapi",
  "spring", "spring boot",
  "laravel",
  // Databases
  "mongodb", "mongo",
  "mysql", "postgresql", "postgres", "sql",
  "redis", "firebase", "supabase",
  "sqlite",
  // Languages
  "python", "java", "c++", "c#", "go", "golang",
  "rust", "php", "ruby", "kotlin", "swift",
  // Cloud & DevOps
  "aws", "amazon web services",
  "gcp", "google cloud",
  "azure",
  "docker", "kubernetes", "k8s",
  "ci/cd", "jenkins", "github actions",
  "linux", "bash", "shell",
  // Tools
  "git", "github", "gitlab",
  "graphql", "rest", "restful", "api",
  "jwt", "oauth",
  "jest", "mocha", "cypress",
  "figma", "postman",
  // Data & AI
  "machine learning", "ml",
  "deep learning", "dl",
  "tensorflow", "pytorch",
  "pandas", "numpy",
  "data structures", "algorithms",
];

export const extractSkills = (text) => {
  if (!text) return [];

  const lowerText = text.toLowerCase();

  // Sort by length descending so "react native" matches before "react"
  const sorted = [...SKILL_DB].sort((a, b) => b.length - a.length);

  const foundSkills = sorted.filter((skill) => {
    const escaped = skill.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    const pattern = new RegExp(`(?<![a-z0-9])${escaped}(?![a-z0-9])`, "i");
    return pattern.test(lowerText);
  });

  return [...new Set(foundSkills)];
};