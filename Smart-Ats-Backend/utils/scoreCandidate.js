
const ALIASES = [
  ["react", "reactjs", "react.js"],
  ["node", "nodejs", "node.js"],
  ["express", "express.js"],
  ["mongodb", "mongo"],
  ["postgresql", "postgres"],
  ["javascript", "js"],
  ["typescript", "ts"],
  ["next.js", "nextjs", "next"],
  ["vue", "vue.js", "vuejs"],
  ["kubernetes", "k8s"],
  ["python", "py"],
  ["golang", "go"],
  ["tailwind", "tailwindcss"],
  ["aws", "amazon web services"],
  ["gcp", "google cloud"],
  ["machine learning", "ml"],
  ["deep learning", "dl"],
];

const resolveAlias = (skill) => {
  const s = skill.toLowerCase().trim();
  for (const group of ALIASES) {
    if (group.includes(s)) return group[0]; // normalize to first in group
  }
  return s;
};

export const scoreCandidate = (candidateSkills, jobSkills) => {
  if (!jobSkills || !jobSkills.length) return 0;

  const normalizedCandidate = candidateSkills.map(resolveAlias);
  const normalizedJob = jobSkills.map(resolveAlias);

  let matchCount = 0;

  normalizedJob.forEach((skill) => {
    if (normalizedCandidate.includes(skill)) {
      matchCount++;
    }
  });

  const score = (matchCount / normalizedJob.length) * 100;
  return Math.round(score);
};