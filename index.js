const simpleGit = require("simple-git");
const git = simpleGit();

const logs = git.log();

console.log(logs);
