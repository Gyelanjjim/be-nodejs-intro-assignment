const fileSystem = require("fs"); 
// require함수를 사용해 (fs)로부터 객체형태로 반환되어 여러 모듈을 fileSystem에 할당

//Read File (Before)
const rposts = fileSystem.readFileSync("./posts.csv", "utf-8");
const rusers = fileSystem.readFileSync("./users.csv", "utf-8");
console.log(rusers);
// 1차적 분리: 개행문자 '\n'
const rpostsDiv = rposts.split("\n");
const rusersDiv = rusers.split("\n");

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
console.log(substractArr(rusersDiv, 'mail'));
/* 
for(let i in rusersDiv){ 
    rusersDiv[i].pop(); // users에서 이메일 제거
}
*/