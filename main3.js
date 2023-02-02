const fileSystem = require("fs");
const util = require("util");

const users = fileSystem.readFileSync("./users.csv", "utf-8");
const posts = fileSystem.readFileSync("./posts.csv", "utf-8");

const csvToObject = (csv) => {
  csv = csv.replace(/\r/g, ""); // users에 있는 \r을 제거
  csv = csv.replace(/, /g, ","); // posts에 있는 ", "을 ","로 변경
  const rows = csv
    .trim() // 양옆의 공백, 개행문자 삭제
    .split("\n")
    .map((el) => el.split(","));
  const result = [];
  for (let i = 1; i < rows.length; i++) {
    const obj = {};
    for (let j = 0; j < rows[0].length; j++) {
      obj[rows[0][j]] = rows[i][j];
    }
    result.push(obj);
  }
  return result;
};

const postsByUsers = (postsArr, usersArr) => {
  for (let elU of usersArr) {
    elU.posts = [];
    for (let elP of postsArr) {
      if (elU.id === elP.user_id) elU.posts.push(elP);
    }
  }
  return util.inspect(usersArr, {
    showHidden: false,
    depth: null,
    colors: true,
  });
};

const usersArr = csvToObject(users);
const postsArr = csvToObject(posts);

console.log(postsByUsers(postsArr, usersArr));
