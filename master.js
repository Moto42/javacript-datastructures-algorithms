const sections = {};

//Chapter 3: Javascript Numbers

sections.modExp1 = {
  inputs : document.querySelectorAll('#modExp1 input'),
  outputs : document.querySelectorAll('#modExp1 .output'),
  handleChange : function (e) {
    const [x,y,p] = Array.from(this.inputs).map(i => Number(i.value));
    this.outputs[0].innerHTML = `(${x}^${y})%${p}=`+this.modExp(x,y,p);
    this.outputs[1].innerHTML = `(${x}^${y})%${p}=`+this.modExpBetter(x,y,p);
  },
  modExp : function (x, y, p) {
    return (x**y)%p;
  },
  modExpBetter: function (x, y, p) {
    if(p===1) return 0;
    let val = 1;
    for( e = 0; e<y;e++){
      val = (val * x)%p;
    }
    return val;
  },
};
sections.ch3_PrimesLessThan = {
  inputs : document.querySelectorAll('#ch3_PrimesLessThan input'),
  outputs : document.querySelectorAll('#ch3_PrimesLessThan .output'),
  handleChange : function (e) {
    const primes = this.primesUnder(Number(this.inputs[0].value));
    this.outputs[0].innerHTML = primes.join(',');
  },
  primesUnder : function (max) {
    if(max===1) return [];
    if(max===2) return [2];
    let out = [2];
    for (let i = 3; i <= max; i++){
      if(this.isPrime(i)) out.push(i);
    }
    return out;
  },
  isPrime : function (num){
    if(num <= 1) return false;
    if(num <= 3) return true;

    if(num%2 == 0 || num%3 == 0) return false;

    for(let i = 5; i <=  Math.sqrt(num); i+=6){
      console.log(`${num}%${i}===${num%i}`);
      if(num % i == 0 || num % (i+2) == 0) return false;
    }
    return true;
  }
};
sections.ch3_uglyNumbers = {
  inputs : document.querySelectorAll('#ch3_uglyNumbers input'),
  outputs : document.querySelectorAll('#ch3_uglyNumbers .output'),
  handleChange : function (e) {
    const input = Number(this.inputs[0].value);
    const ugly = this.listUgly(input);
    this.outputs[0].innerHTML = ugly.join(',');
  },
  maxDivide: function (num, div){
    while(num%div === 0){
      num/=div;
    }
    return num;
  },
  isUgly (num) {
    num = this.maxDivide(num,2);
    num = this.maxDivide(num,3);
    num = this.maxDivide(num,5);
    return num===1;
  },
  listUgly : function (max) {
    if(max<1) return [];
    if(max===1) return [1];
    out = [1];
    for(let num = 2; num <= max; num++){
      if(this.isUgly(num)) out.push(num);
    }
    return out;
  },
};

//Chapter 5: Javascript Arrays

sections.ch5_sumToWeight = {
  inputs : document.querySelectorAll('#ch5_sumToWeight input'),
  outputs : document.querySelectorAll('#ch5_sumToWeight .output'),
  handleChange : function (e) {
    const arr = this.inputs[0].value.split(',').map(i => Number(i));
    const weight = Number(this.inputs[1].value);
    const indices = this.sumToWeight(arr,weight);
    this.outputs[0].innerHTML = `[${indices.join(',')}]`;
  },
  sumToWeight : function (arr, weight) {
    for(let x in arr){
      x = Number(x);
      for(let y  in arr){
        y = Number(y);
        if(arr[x]+arr[x+y+1] === weight) return [x,(x+y+1)];
      }
    }
    return [-1];
  },
  sumToWeightReturnElements : function (arr, weight) {
    while(arr.length > 1){
      const x = arr.shift();
      for (let index in arr){
        if(arr[index] + x === weight) return [x,arr[index]];
      }
    }
    return [-1];
  },
};
sections.ch5_sumToWeightBetter = {
  inputs : document.querySelectorAll('#ch5_sumToWeightBetter input'),
  outputs : document.querySelectorAll('#ch5_sumToWeightBetter .output'),
  handleChange : function (e) {
    const arr = this.inputs[0].value.split(',').map(i => Number(i));
    const weight = Number(this.inputs[1].value);
    const indices = this.sumToWeight(arr,weight);
    this.outputs[0].innerHTML = `[${indices.join(',')}]`;
  },
  sumToWeight : function (arr,weight) {
    let hashTable = {};
    for (let n in arr){
      n = Number(n);
      const curHash = weight - arr[n];
      if(hashTable[curHash]) return [hashTable[curHash], n];
      else hashTable[arr[n]] = n;
    }
    console.log(hashTable);
    return [-1];
  },
};
sections.ch5_arr_slice = {
  inputs : document.querySelectorAll('#ch5_arr_slice input'),
  outputs : document.querySelectorAll('#ch5_arr_slice .output'),
  handleChange : function (e) {
    if(!e.target.validity.valid) return;

    const arr = this.inputs[0].value.split(',');
    const n   = Number(this.inputs[1].value);
    const s   = Number(this.inputs[2].value);

    this.outputs[0].innerHTML = '['+ this.slice(arr,n,s).join(',') +']';
    this.outputs[1].innerHTML = '['+ this.slice(arr,n).join(',') +']';
  },
  slice : function (arrIn,n,s) {
    let arrOut = [];
    if(n>=s) return arrOut;
    if(s === undefined || s > arrIn.length) s = arrIn.length;

    for(let i = n; i < s; i++){
      arrOut.push(arrIn[i]);
    }

    return arrOut;
  },
};
sections.ch5_findMedian = {
  inputs : document.querySelectorAll('#ch5_findMedian input'),
  outputs : document.querySelectorAll('#ch5_findMedian .output'),
  handleChange : function (e) {
    //DO THINGS HERE
    if(!e.target.validity.valid) return;
    //Rand Buttons
    if(e.target === this.inputs[1]) this.inputs[0].value=this.ransort(3).join(',');
    if(e.target === this.inputs[3]) this.inputs[2].value=this.ransort(3).join(',');

    const arr1 = this.inputs[0].value.split(',').map(n=>Number(n));
    const arr2 = this.inputs[2].value.split(',').map(n=>Number(n));

    if(arr1.length != arr2.length) return;

    this.outputs[0].innerHTML = this.dualMedian(arr1,arr2);
    this.outputs[1].innerHTML = this.dualMedianBetter(arr1,arr2);
  },
  dualMedian : function (arr1, arr2) {
    return this.findMedian([...arr1, ...arr2].sort((a,b)=>a-b));
  },
  dualMedianBetter : function (arr1, arr2){
    if(arr1.length != arr2.length) return -1;
    const bLength = arr1.length;
    if(bLength === 0) return -1;
    if(bLength === 1) return (arr1[0]+arr2[0])/2;
    if(bLength === 2) {
      const min = Math.min(arr1[1],arr2[1]);
      const max = Math.max(arr1[0],arr2[0]);
      return (min + max)/2;
    }

    const med1 = this.findMedian(arr1);
    const med2 = this.findMedian(arr2);
    if(med1 >= med2){
      return this.dualMedianBetter(
        arr1.slice(0,Math.ceil(arr1.length/2)),
        arr2.slice(Math.floor(arr1.length/2))
      );
    }
    else {
      return this.dualMedianBetter(
        arr2.slice(0,Math.ceil(arr1.length/2)),
        arr1.slice(Math.floor(arr1.length/2))
      );
    }

  },
  ransort : function (n) {
    let out = [];
    for(let i = 0; i<n; i++){
      out.push(Math.floor(Math.random()*9));
    }
    return out.sort((a,b)=>a-b);
  },
  findMedian : function (arr) {
    const len = arr.length;
    if(len % 2 === 1){
      return arr[Math.floor(len/2)];
    }
    else {
      const right = len/2;
      const left  = right-1;
      const a = arr[left];
      const b = arr[right];
      return (a+b)/2;
    }
  },
};
sections.ch5_findCommonElements = {
  inputs : document.querySelectorAll('#ch5_findCommonElements input'),
  outputs : document.querySelectorAll('#ch5_findCommonElements .output'),
  handleChange : function (e) {
    if(!e.target.validity.valid) return;
    if(e.target == this.inputs[1]) this.inputs[0].value = this.ransort().join(',');
    if(e.target == this.inputs[3]) this.inputs[2].value = this.ransort().join(',');
    if(e.target == this.inputs[5]) this.inputs[4].value = this.ransort().join(',');

    const arr1 = this.inputs[0].value.split(',').map(n => Number(n));
    const arr2 = this.inputs[2].value.split(',').map(n => Number(n));
    const arr3 = this.inputs[4].value.split(',').map(n => Number(n));

    this.outputs[0].innerHTML = this.commonElements(arr1, arr2, arr3).join(',');
  },
  commonElements : function (...args) {
    let collector = {};
    for(let arr of args){
      let last;
      for (let e of arr){
        if (e != last) {
          last = e;
          collector[e] = collector[e] === undefined ? 1 : collector[e]+1;
        }
      }
    }
    const commoners = Object.entries(collector)
      .filter(e => e[1] >= args.length)
      .map(e => e[0]);

    return commoners;
  },
  ransort : function () {
    let out = [];
    const end = Math.floor(Math.random()*7)+8;
    for(let i = 0; i<end; i++){
      out.push(Math.floor(Math.random()*20));
    }
    return out.sort((a,b)=>a-b);
  },
};
sections.ch5_spiralPrint = {
  inputs : document.querySelectorAll('#ch5_spiralPrint input'),
  outputs : document.querySelectorAll('#ch5_spiralPrint .output'),
  handleChange : function (e) {
    if(!e.target.validity.valid) return;
    const arr1 = this.randArray(5,20);
    const arr2 = this.randArray(5,20);
    const arr3 = this.randArray(5,20);
    const arr4 = this.randArray(5,20);

    this.inputs[1].value = arr1.map(n => n<10 ? "0"+n : n).join(',');
    this.inputs[2].value = arr2.map(n => n<10 ? "0"+n : n).join(',');
    this.inputs[3].value = arr3.map(n => n<10 ? "0"+n : n).join(',');
    this.inputs[4].value = arr4.map(n => n<10 ? "0"+n : n).join(',');

    this.outputs[0].innerHTML = this.spiralPrint(arr1,arr2,arr3,arr4);
  },
  spiralPrint : function (...arrays) {
    const arr = [];
    for(let a of arrays){
      arr.push([...a]);
    }
    let output = '';
    while(arr.length != 0) {
      //first array to output. L→R
      const topLine = arr.shift();
      if(topLine != undefined && topLine.length) output += topLine.join(' ') + ' ';
      //last element of each remaing array T↓B, to output
      for(let i in arr){
        const lastItem = arr[i].pop();
        if(lastItem != undefined) output += lastItem+' ';
      }
      //Last array to output R→L
      const bottomLine = arr.pop();
      if(bottomLine != undefined && bottomLine.length) output += bottomLine.reverse().join(' ') + ' ';
      //First element of each remaining array B↑T, to output;
      for(let i in arr){
        const firstItem = arr[arr.length-1-Number(i)].shift();
        if(firstItem != undefined) output += firstItem+' ';
      }
    }

    return output;
  },
  randArray : function (end,limit) {
    let out = [];
    for(let i = 0; i<end; i++){
      out.push(Math.floor(Math.random()*limit));
    }
    return out;
  },
};
sections.ch5_tictactoe = {
  inputs : document.querySelectorAll('#ch5_tictactoe input'),
  outputs : document.querySelectorAll('#ch5_tictactoe .output'),
  handleChange : function (e) {
    if(!Object.values(this.inputs).every(n=>n.validity.valid)) return;

    const row0 = this.inputs[0].value.split('');
    const row1 = this.inputs[1].value.split('');
    const row2 = this.inputs[2].value.split('');

    this.outputs[0].innerHTML = this.tttBChecker(row0, row1, row2);
  },
  checkRow : function (row){
    console.log(row);
    let rowCheck = row.reduce((acc,cur) =>{
      if(cur === "X") acc.X++;
      if(cur === "O") acc.O++;
      if(cur === "-") acc["-"]++;
      return acc;
    },{"X":0,"O":0,"-":0});
    if(rowCheck["-"]>0) return "-";
    if(rowCheck.X==3) return "X";
    if(rowCheck.O==3) return "O";
    return false;
  },
  tttBChecker : function (row0, row1, row2) {
    const col0   = [row0[0],row1[0],row2[0]];
    const col1   = [row0[1],row1[1],row2[1]];
    const col2   = [row0[2],row1[2],row2[2]];
    const diagLR = [row0[0],row1[1],row2[2]];
    const diagRL = [row0[2],row1[1],row2[0]];
    for(let row of [row0, row1, row2, col0, col1, col2, diagLR, diagRL]){
      const result = this.checkRow(row);
      if(result===false) continue;
      if(result=== "-" ) return "Game Ongoing";
      if(result=== "X" ) return "X wins";
      if(result=== "O" ) return "O wins";
    }
    return "Draw";
  },
};
sections.ch5_pathFinding = {
  inputs : document.querySelectorAll('#ch5_pathFinding input'),
  outputs : document.querySelectorAll('#ch5_pathFinding .output'),
  handleChange : function (e) {
    //DO THINGS HERE
    if(!e.target.validity.valid) return;
    console.clear();
    const mazeMin =
         ['█x█',
          '█ █',
          '█ █',
          '█e█',];
    const mazeMax =
         ['███x██████',
          '██       █',
          '███████ ██',
          '█ █      █',
          '█ ███ ████',
          '█      ███',
          '█████e████',];
    const maze = mazeMax.map(r => r.split(''));
    const moves = this.solve(maze).split('');
    this.animateMoves(maze,moves,this.outputs[0]);
  },
  nextMove : function (maze, posX, posY, lastMove, entrance='e', exit='x', wall='█', space=' ') {
    posX = Number(posX);
    posY = Number(posY);
    const thisTile = maze[posY][posX];
    //if I am in a wall, or off the map, return false.
    if(thisTile != ' ' && thisTile != entrance && thisTile != exit ) return false;

    //if I am on the exit, Say so
    if(thisTile === exit) return lastMove+exit;
    //try to move Left
    if(lastMove != 'R'){
      const nextMove = this.nextMove(maze, posX-1, posY, 'L', entrance, exit, wall, space);
      if(nextMove != false) return lastMove+nextMove;
    }

    //try to move Up
    if(lastMove != 'D'){
      const nextMove = this.nextMove(maze, posX, posY-1, 'U', entrance, exit, wall, space);
      if(nextMove != false) return lastMove+nextMove;
    }

    //try to move Right
    if(lastMove != 'L'){
      const nextMove = this.nextMove(maze, posX+1, posY, 'R', entrance, exit, wall, space);
      if(nextMove != false) return lastMove+nextMove;
    }

    //try to move Down
    if(lastMove != 'U'){
      const nextMove = this.nextMove(maze, posX, posY+1, 'D', entrance, exit, wall, space);
      if(nextMove != false) return lastMove+nextMove;
    }
    //All possible moves exausted...
    return false;
  },
  findEntrance : function (maze, entrance='e') {
    // find the X and Y positions of the entrance character and return them in an array
    let entX, entY;
    for(entY in maze){
      for(entX in maze[entY]){
        if(maze[entY][entX] === entrance) return [entX,entY];
      }
    }
    return [-1,-1];
  },
  solve : function (maze, entrance='e', exit='x', wall='█', space=' '){
    //find entrance
    let [entX, entY] = this.findEntrance(maze,entrance);
    //feed the starting position to the recursive function.
    return this.nextMove(maze,entX, entY, entrance, entrance, exit, wall, space);
  },
  animateMoves : async function (mazeMaster, moves, element, man="☺"){
    console.log('mazeMaster: ',mazeMaster);
    let [posX, posY] = this.findEntrance(mazeMaster);
    [posX, posY]  = [Number(posX),Number(posY)];
    moves.pop(); moves.unshift();
    let maze = [...mazeMaster];
    for(let move of moves){
      switch(move){
        case "U":
          posY -= 1;
          break;
        case "D":
          posY +=1;
          break;
        case "L":
          posX -= 1;
          break;
        case "R":
          posX += 1;
          break;
        default :
          break;
      }
      maze = [...mazeMaster];
      maze[posY][posX] = man;
      element.innerHTML = this.mazeText(maze);
      await sleep(500);
    }
  },
  mazeText : function (maze) {
    maze = maze.map(r => r.join(''));
    const text = maze.join('<br>\n');
    return text;
  },
};
sections.ch5_matrixRotation = {
  inputs : document.querySelectorAll('#ch5_matrixRotation input'),
  outputs : document.querySelectorAll('#ch5_matrixRotation .outputClean'),
  handleChange : function (e) {
    //DO THINGS HERE
    if(!e.target.validity.valid) return;
    console.clear();
    const arr1 = this.randArray(4,20);
    const arr2 = this.randArray(4,20);
    const arr3 = this.randArray(4,20);
    const arr4 = this.randArray(4,20);

    this.inputs[1].value = arr1.map(n => n<10 ? "0"+n : n).join(',');
    this.inputs[2].value = arr2.map(n => n<10 ? "0"+n : n).join(',');
    this.inputs[3].value = arr3.map(n => n<10 ? "0"+n : n).join(',');
    this.inputs[4].value = arr4.map(n => n<10 ? "0"+n : n).join(',');
    const matrix = [arr1, arr2, arr3, arr4];
    const newMatrix = this.rotateCCW(matrix);
    this.outputs[0].value = newMatrix[0].map(n => n<10 ? "0"+n : n).join(',');
    this.outputs[1].value = newMatrix[1].map(n => n<10 ? "0"+n : n).join(',');
    this.outputs[2].value = newMatrix[2].map(n => n<10 ? "0"+n : n).join(',');
    this.outputs[3].value = newMatrix[3].map(n => n<10 ? "0"+n : n).join(',');
  },
  rotateCCW : function (matrixIn) {
    let matrixWrk = [...matrixIn];
    let matrixOut = this.emptyMatrix(matrixIn[0].length);

    console.log(matrixOut);
    while(matrixWrk[0].length > 0){
      for(let out of matrixOut){
        for(let index in matrixIn){
          out.push(matrixIn[index].pop());
        }
      }
    }
    console.log(matrixOut);
    return matrixOut;
  },
  emptyMatrix : function (num){
    let out = [];
    for (let x = 0; x < num; x++){
      out.push([]);
    }
    return out;
  },
  randArray : function (end,limit) {
    let out = [];
    for(let i = 0; i<end; i++){
      out.push(Math.floor(Math.random()*limit));
    }
    return out;
  },
};

//Chapter 6: Javascript Objects

sections.ch6_addProp = {
  inputs : document.querySelectorAll('#ch6_addProp input'),
  outputs : document.querySelectorAll('#ch6_addProp .output'),
  handleChange : function (e) {
    //DO THINGS HERE
    console.log('Function unavailable');
    if(!e.target.validity.valid) return;
  },
  calcAnswer : function () {
    let theObject = {};
    theObject.exampleKey1 = this.inputs[1].value;
    theObject.exampleKey2 = this.inputs[2].value;
    this.outputs[0].innerHTML = JSON.stringify(theObject,null,'<br>');

  },
};
sections.ch6_addProp.calcAnswer();
function ch6_defineClasses_Animal(name, animalType){
  this.name = name;
  this.animalType = animalType;
  this.sayName = () => this.name;
  this.sayAnimalType = () => this.animalType;
}
function ch6_defineClasses_Dog(name){
  ch6_defineClasses_Animal.call(this,name, 'Dog');
  this.bark = () => "Woof";
}
sections.ch6_defineClasses = {
  rover : new ch6_defineClasses_Dog('rover', 'dog'),
  inputs : document.querySelectorAll('#ch6_defineClasses input'),
  outputs : document.querySelectorAll('#ch6_defineClasses .output'),
  handleChange : function (e) {
    if(!e.target.validity.valid) return;
    console.log(this.rover);
    if(e.target.value === "sayName") this.outputs[0].innerHTML = this.rover.sayName();
    if(e.target.value === "sayAnimalType") this.outputs[0].innerHTML = this.rover.sayAnimalType();
    if(e.target.value === "bark") this.outputs[0].innerHTML = this.rover.bark();
  },
};

//Chapter 6: Recursion
sections.ch8_convertToBinary = {
  inputs : document.querySelectorAll('#ch8_convertToBinary input'),
  outputs : document.querySelectorAll('#ch8_convertToBinary .output'),
  handleChange : function (e) {
    if(!e.target.validity.valid) return;
    const int = Number(this.inputs[0].value);
    const bin = this.intToBin(int);
    this.outputs[0].innerHTML = bin;
  },
  intToBin : function (int, prefix = '') {
    //base cases...
    if(int === 0) return (prefix + 0).split('').reverse().join('');
    if(int === 1) return (prefix + 1).split('').reverse().join('');
    //recursive case.
    const newPrefix = int % 2 === 0 ? prefix + 0 : prefix + 1;
    const newInt = Math.floor(int / 2);
    return this.intToBin(newInt, newPrefix);
  },
};
sections.ch8_arrayPermutations = {
  inputs : document.querySelectorAll('#ch8_arrayPermutations input'),
  outputs : document.querySelectorAll('#ch8_arrayPermutations .output'),
  handleChange : function (e) {
    //DO THINGS HERE
    if(!e.target.validity.valid) return;
    const arr = this.inputs[1].value.split(',');
    const permutations = this.permute(arr);
    this.outputs[0].innerHTML = permutations;
  },
  permute : function (arr) {
    console.log('called', arr);
    //base case
    if (arr.length <= 1) return [arr];
    //recursion case
    allPermutations = [];
    for(let i in arr){//for each index in arr
      let   tempArr = [...arr];
      const prefix  = tempArr[i];
      tempArr.splice(i,1);
      const postfixArr = this.permute(tempArr);
      console.log('pre',prefix,'p', postfixArr,);
      for( let postfix of postfixArr){
        allPermutations.push(prefix+postfix);
      }
    }
    console.log(allPermutations);
    return allPermutations;
  },

};

async function sleep(miliseconds){
  return new Promise((res,rej) => window.setTimeout(res,miliseconds));
}
function findMySection(element) {
  if(element.tagName==='SECTION') return element.id;
  else return findMySection(element.parentNode);
}
function handleChange(e){
  const section = findMySection(e.target);
  if (
    sections[section] &&
    sections[section].handleChange
  )  sections[section].handleChange(e);
  else console.log('Not Implimented');
}

(function AddTheOnchangeListeners(){
  const change = document.querySelectorAll('.go');
  change.forEach(c => {
    switch (c.type) {
      case "button" :
        c.addEventListener('click',handleChange);
        break;
      default :
        c.addEventListener('input',handleChange);
    }
  } );
})();
//scroll to bottom of page,
window.scrollTo(0,document.body.scrollHeight);

// EMPTY Section
/*
sections.EMPTY = {
  inputs : document.querySelectorAll('#EMPTY input'),
  outputs : document.querySelectorAll('#EMPTY .output'),
  handleChange : function (e) {
    //DO THINGS HERE
    console.log('Function unavailable')
    if(!e.target.validity.valid) return;
  },
  calcAnswer : function () {
    // CHANGE ME TO DO THE THING.
  },
}
*/
