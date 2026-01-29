# JS-course

#Video 1
Introduction to the series and get experience from JS and know what core syntax is.

#Video 2
JS is a programming language and most used programming language. You dont need to compile JS, u just run it.

#Video 3
JS on the client side is in the browser and it uses script tags. Server side requires node.js installed and is usually used to build web services

#Video 4
Useful vs code extensions: ESLint, prettier, JavaScript (ES6) code snippets. Download node.js to use or interact it outside the browser (nvm install node) 

#Video 5
Install vscode, extensions, node.js

#Video 6
create node.js file, mkdir. Describe variable by using const place = ”something”, u can use it in console.log with syntax (”%s”, place) or with console.log(`${place }`)  this is better because its easier to read

#Video 7
You can write comments on code, for single line use double // and for multi line use /**/

#Video 8
to run file use command ”node filename.js”. In vscode for quickly to use CTRL + / it comments line out

#Video 9
There is three ways to declare variables var, let and const. Use const by default, let in loops

#Video 10
Variables must be declared before using console.log otherwise there will be errors

#Video 11
You can combine two variables with each other using the + operator but be careful when using the numbers

#Video 12
plus sign also works with addition. if you try to plus number one and str one you’ll get string eleven but using plus with nbr 1 and 1 you’ll get 2 

#Video 13
Template literal uses `` and ${} and respects line breaks so no need for ”\n”

#Video 14
Using not operator inside the template literal will flip the answer. As bool being declared as true it will flip it to false with not operator !

#Video 15
JS has only one value type and its float

#Video 16
Using console.log(typeof variable) it will output what kind variable it is, is it object number string boolean object function and so on. Using console.log(variable instanceof object) will output is it true or false

#Video 17
you can use console.log(var % 1500); for remainder, ++var for increment and –var for decrement

#Video 18
using math object which is built in js, you can output for example pi and sqrt with commands console.log(math.PI) and console.log(math.sqrt(var))

#Video 19
convert string to nbr with console.log(parseInt(var)); or float(nbr) to string with console.log(parseFloat());

#Video 20
with conversion example, if you try to parseint for example flaoting string (console.log(parseINT(’1.5’)) it’ll actually output 1 because it will read period character and that’s not a number and it’ll stop right there

#Video 21
try, catch and finally are used for handle the errors

#Video 22
u put code that might crash in try{} and use catch(ex) {} to catch the error and log it. Finally {} block is for code that needs to run every time even if there was an error.

#Video 23
const now = new Date(); with now.setFullYear(); setMonth(); setDate(); setHours(); setMinutes; setSeconds; you can change date values.

#Video 24
const now = new Date(); <- this will give realtime date. const win95launch = new Date(1995, 7, 24) will give 95.7.24. With win95launch.SetMonth(); you can set new month

#Video 25
== checks equality regardless of data type, === checks for equal values and data types (recommended to use for best practice).

#Video 26
if, else if, else statements use basically same syntax as C# does

#Video 27
statement combining comparisons. And (both sides must be true) (x & y) (x && y). Or (either side can be true) (x | y) (x || y). Double shortcut operators will stop evaluation  if the answer is already known. Basically if it turns out that the first side gave it to answer it will skip the second side.

#Video 28
switch is short version of long else if chains. it can handle any type of variable. its using case as an if and default as an else. and default is at the end and cases from beginning to middle

#Video 29
array is a list or collection of values. Each value has its own index.

#Video 30
length property returns the total number of  the collection or values in array and automatically updates whenever array is modified.

#Video 31
Array can have many data in one statement, also you can add data to an array after it’s been created. To access data in array, use index. It starts from the beginning and the first index number is 0 always.

#Video 32
to create an array use ”let arr = [data, data, data]” and to access each data type write console.log(arr[index]). To add length after array is created use ”let arrayLength = value;”  then let arr = Array(arraylength); 

#Video 33
you can manipulate arrays with push and pop that affects end of array. Shift and unshift affects front of array. Concat joins two arrays to make a new array

#Video 34
let arr1 = [1, ’g’, true]. console.log(arr1.push(’s’)); will add new data in the end and it prints new length value of an array. (arr1.pop()); removes the last data from the array. (arr1.shift(’s’)); will add new data to the beginning of an array and it prints the length value of an array. (arr1.unshift()); does same as .pop but instead it removes it from the beginning. concat just adds multiple  values and makes a new array of the exist arrays.

#Video 35
while loop is waiting something to be happened. For loop runs code specific times. For of reading every item in a list or an array without caring its position.

#Video 36
const names = [’joe’, ’john’, ’glen’]; let whileindex = 0; while(whileindex < names.length){ const name = names[whileindex] console.log(name); whileindex++;. Doing while loop is strict about it what can be inside the brackets. But for loop instead you can do everything inside the for loop statement for example for(let forindex = 0; forindex < names.length; forindex++) { console.log(name)}  and for of is syntax is for(const variable of array) {console.log(variable)}; This will print all the values one by one until it reaches arrays end

#Video 37
function syntax is: function functionname(var1, var2){ code }; 

#Video 38
in functions name you cannot have special characters, otherwise it wont work. In main not giving parameter a value, it will run the function but it will output unidentified

#Video 39
with  the fat arrow (=>) you write function expression. Removing the function keyword and add the fat arrow between parameters and the body.

#Video 40
fat arrow syntax for add and subtract is: const add = (a, b) => a + b; console.log(add(1,2));
const subtract = (a, b) => {const result = a – b; return result} console.log(subtract(1, 1));

#Video 41
JSON stands for javascript object notation. It is ordered list of values.

#Video 42
Use JSON.stringify() to turn object o string and JSON.parse() to turn it back. its good for sending data or stroing it.

#Video 43
Object is a way to group data together using key value pairs. Its like a container for variables and functions

#Video 44
u can access data in object using dot notation like object.property or with brackets[]. U can also add new things to it later.

#Video 45
Promises are for things that take long time so code doesnt stop. It gives u value back later if it works or not.

#Video 46
use .then() to get result if it works and .catch() if there is error. Keeps code running in background 

#Video 47
async and await makes promises easier to read and write. It makes async code look like nomal synchronous code.

#Video 48
Use await to wait for promise to finish. Wrap it in try catch so u can handle errors easily. 

#Video 49
npm stans for node package manager. u can use it to download and use other peoples code so u dont have to code everything from scratch.

#Video 50
use npm init to create package.json file. Then npm install to add packages to node_modules folder.

#Video 51
Keep practicing by building own projects. Check out other frameworks or go deeper into node.js
