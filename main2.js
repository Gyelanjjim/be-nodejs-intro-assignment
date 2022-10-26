const fileSystem = require("fs"); 
// require함수를 사용해 (fs)로부터 객체형태로 반환되어 여러 모듈을 fileSystem에 할당

//Read File (Before)
const rposts = fileSystem.readFileSync("./posts.csv", "utf-8");
const rusers = fileSystem.readFileSync("./users.csv", "utf-8");

// 1차적 분리: 개행문자 '\n'
const rpostsDiv = rposts.split("\n");
const rusersDiv = rusers.split("\n");

function changeChar(str){ // 문자열의 공백을 제거하는 함수를 생성
    const arr = str.split(" ");
    let result="";
    for(let i in arr){
        result += arr[i];
    }
    return result;
}
rpostsDiv[0] = changeChar(rpostsDiv[0]);
rpostsDiv.pop();


for(let i in rpostsDiv){
    rpostsDiv[i] = rpostsDiv[i].split(',');
}
for(let i in rusersDiv){ 
    rusersDiv[i] = rusersDiv[i].split(',');
}

for(let i in rusersDiv){ 
    rusersDiv[i].pop(); // users에서 이메일 제거
}

const addObj = () => { // users로 객체 만들기
    const people = [];
    for(let i = 1; i<rusersDiv.length; i++){
        people.push(makeObj(i));
    }
    return people;
}

function makeObj(j){
    const person = {};
    for(let i=0; i<rusersDiv[0].length; i++){
        person[rusersDiv[0][i]] = rusersDiv[j][i];
    }
    return person;
}

const addObj2 = () => { // posts로 객체 만들기
    const posting = [];
    for(let i = 1; i<rpostsDiv.length; i++){
        posting.push(makeObj2(i));
    }
    return posting;
}

function makeObj2(j){
    const contents = {};
    for(let i=0; i<rpostsDiv[0].length; i++){
        contents[rpostsDiv[0][i]] = rpostsDiv[j][i];
    }
    return contents;
}

const arrUsers = addObj();
const arrPosts = addObj2();
for(let i in arrUsers){
    arrUsers[i].posts = [];
}

for(let key=0; key<arrUsers.length; key++){ // 4
    for(let index=0; index<arrPosts.length; index++){   // 6
        if(arrUsers[key].id ===arrPosts[index]['user_id']){
            arrUsers[key].posts.push(arrPosts[index]);
        }
    }
}

const util = require('util') //[object]라고 보이는 현상 해결!
console.log(util.inspect(arrUsers, {showHidden: false, depth: null, colors: true}))
