function substract(arr, str){
    arrNew =[];
    for(let i=0; i<arr.length; i++){
        if(arr[i].indexOf(str)===-1){
            arrNew.push(arr[i]);
        }
    }
    return arrNew;
}
//const arr = ['a', 'av', 'd', 'cd', 'aae'];
//console.log(substract(arr, 'a')) //['d', 'cd']

function substractArr(arr, str){
    for(let i in arr){
        arr[i] = substract(arr[i], str)    
    }
    return arr;    
}
/* 원본: substract함수를 모아서 복합배열로 만드는
arr2[0] = substract(arr2[0], 'a');
arr2[1] = substract(arr2[1], 'a');
arr2[2] = substract(arr2[2], 'a');
*/
const arr2 = [
    ['a','jjk'], 
    ['av', 'd', 'cd'], 
    ['aae', 'cdd']
];
console.log(substractArr(arr2, 'a'));
/* 
[
    ['jjk'], 
    ['d', 'cd'], 
    ['cdd']
]
*/