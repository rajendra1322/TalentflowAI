const SKILL_DB = [
  "react",
  "reactjs",
  "react.js",
  "node",
  "nodejs",
  "node.js",
  "express",
  "express.js",
  "mongodb",
  "mongo",
  "javascript",
  "typescript",
  "html",
  "css",
  "tailwind",
  "tailwindcss",
  "python",
  "java",
  "sql",
  "postgres",
  "mysql",
  "aws",
  "amazon web services",
  "docker",
  "kubernetes",
  "k8s",
  "graphql",
  "react native",
];

export const extractSkills = (text) => {
  if (!text) return [];

  const lowerText = text.toLowerCase();

  const foundSkills = SKILL_DB.filter((skill) => {
    const pattern = new RegExp(`\\b${skill.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}\\b`, "i");
    return pattern.test(lowerText);
  });

  return [...new Set(foundSkills)];
};