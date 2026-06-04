export const getRecommendation = (score, candidateSkills = [], jobSkills = []) => {
  let label = "Weak Match";
  let reason = [];

  if (score >= 85) {
    label = "Strong Match";
  } else if (score >= 60) {
    label = "Good Match";
  } else if (score >= 40) {
    label = "Average Match";
  }

  // Explainability logic
  const matched = candidateSkills.filter((s) =>
    jobSkills.includes(s)
  );

  const missing = jobSkills.filter(
    (s) => !candidateSkills.includes(s)
  );

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