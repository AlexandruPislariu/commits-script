const simpleGit = require("simple-git");
const git = simpleGit();

git.log((response) => {
  console.log(response);
});
