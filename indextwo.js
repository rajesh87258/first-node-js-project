console.log("hy this is my first Code in Nodejs");
function Sum (a, b){
    return a+b;

}
console.log(Sum(4,5));

console.log(process.argv);

var args = process.argv.slice(2);
console.log("Adding the numbers:", Sum(parseInt(args[0]),parseInt(args[1])) );