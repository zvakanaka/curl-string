export default {
  testPathIgnorePatterns: ["/node_modules/"],
  collectCoverage: true,
  coverageReporters: ["lcov", "text"],
  coverageDirectory: "coverage"
};
