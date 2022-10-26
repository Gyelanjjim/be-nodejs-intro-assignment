const fileSystem = require("fs"); 
// require함수를 사용해 (fs)로부터 객체형태로 반환되어 여러 모듈을 fileSystem에 할당

//Read File (Before)
const rposts = fileSystem.readFileSync("./posts.csv", "utf-8");
const rusers = fileSystem.readFileSync("./users.csv", "utf-8");
console.log(rusers);
// 1차적 분리: 개행문자 '\n'
const rpostsDiv = rposts.split("\n");
let rusersDiv = rusers.split("\n");

/* 문자열의 공백을 제거하는 함수 */
function changeChar(str){ 
    const arr = str.split(" ");
    let result="";
    for(let i in arr){
        result += arr[i];
    }
    return result;
}
rpostsDiv[0] = changeChar(rpostsDiv[0]);
rpostsDiv.pop();

/* 입력받은 배열을 콤마(,)로 쪼개는 함수 */
const DivCom = (arr) =>{
    for(let i in arr){
        arr[i] = arr[i].split(',');
    }
    return arr;
}
DivCom(rpostsDiv);
DivCom(rusersDiv);
/* 원본: 입력받은 배열을 콤마(,)로 쪼개는 반복문
for(let i in rpostsDiv){
    rpostsDiv[i] = rpostsDiv[i].split(',');
}
for(let i in rusersDiv){ 
    rusersDiv[i] = rusersDiv[i].split(',');
}
*/
/* 입력받은 배열에서 'mail'을 포함한 요소를 제외하고 나머지를 반환하는 함수  */
function substract(arr, str){
    arrNew =[];
    for(let i=0; i<arr.length; i++){
        if(arr[i].indexOf(str)===-1){
            arrNew.push(arr[i]);
        }
    }
    return arrNew;
}
function substractArr(arr, str){
    for(let i in arr){
        arr[i] = substract(arr[i], str);    
    }
    return arr;    
}
rusersDiv = substractArr(rusersDiv, 'mail');
/* users에서 마지막 요소인 이메일 제거
for(let i in rusersDiv){ 
    rusersDiv[i].pop(); 
}
*/
/* 객체를 만드는 함수 버전2(시작) */
const addObj = (para) => {
    const arr = [];
    for(let i = 1; i<para.length; i++){
        arr.push(makeObj(i, para));
    }
    return arr;
}

const makeObj = (j, array) => {
    const object = {};
    for(let i=0; i<array[0].length; i++){
        object[array[0][i]] = array[j][i];
    }
    return object;
}
const arrUsers = addObj(rusersDiv);
const arrPosts = addObj(rpostsDiv);
/* 객체를 만드는 함수 버전2(끝)*/

/* 원본: 객체를 만드는 함수들
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
*/
// 빈배열을 넣는 객체 순회 
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

