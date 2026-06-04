export const scoreCandidate = (
  candidateSkills,
  jobSkills
) => {
  if (!jobSkills.length) return 0;

  const normalizedCandidate = candidateSkills.map((s) =>
    s.toLowerCase().trim()
  );

  const normalizedJob = jobSkills.map((s) =>
    s.toLowerCase().trim()
  );

  let matchCount = 0;

  normalizedJob.forEach((skill) => {
    if (normalizedCandidate.includes(skill)) {
      matchCount++;
    }
  });

  const score = (matchCount / normalizedJob.length) * 100;

  return Math.round(score);
};