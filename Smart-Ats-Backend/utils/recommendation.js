export const getRecommendation = (score, candidateSkills = [], jobSkills = []) => {
  let label = "Weak Match";

  if (score >= 85) {
    label = "Strong Match";
  } else if (score >= 60) {
    label = "Good Match";
  } else if (score >= 40) {
    label = "Average Match";
  }
  // below 40 stays "Weak Match"

  // normalize both arrays to lowercase before comparing
  const normalizedCandidate = candidateSkills.map(s => s.toLowerCase().trim());
  const normalizedJob = jobSkills.map(s => s.toLowerCase().trim());

  const matched = normalizedJob.filter(s => normalizedCandidate.includes(s));
  const missing = normalizedJob.filter(s => !normalizedCandidate.includes(s));

  const reason = [];

  if (matched.length) {
    reason.push(`Matched: ${matched.join(", ")}`);
  }

  if (missing.length) {
    reason.push(`Missing: ${missing.join(", ")}`);
  }

  return {
    label,
    reason: reason.join(" | "),
  };
};