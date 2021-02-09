const { exec } = require("child_process");

const inDateRange = (date, startDate, endDate) => {
  return startDate <= date && endDate >= date;
};

const numberCommitsRepo = (repo, startDate, endDate) => {
  exec(`cd ../${repo} & ` + `git log`, (error, stdout, stderr) => {
    const commits = stdout.split("commit");
    let arrayCommits = commits.map((commit) => {
      commit = commit.replace(/[\n]/g, "");
      const dateString = commit.split("Date:")[1];
      if (dateString != undefined) {
        const date = new Date(dateString.split("+")[0]);
        if (inDateRange(date, startDate, endDate)) {
          return commit;
        }
      }
    });
    let numberValidCommits = 0;
    for (var i = 0; i < arrayCommits.length; i++) {
      if (arrayCommits[i] != undefined) numberValidCommits++;
    }
    console.log(`${repo} ${numberValidCommits}`);
  });
};

const numberCommitsDateRange = (startDate, endDate) => {
  const repositories = ["register.elrond.com", "express-api"];
  repositories.map((repo) => {
    numberCommitsRepo(repo, startDate, endDate);
  });
};

const endDate = new Date();
const startDate = new Date(
  endDate.getFullYear(),
  endDate.getMonth(),
  endDate.getDate() - 7
);

numberCommitsDateRange(startDate, endDate);
