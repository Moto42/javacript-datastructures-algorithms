const sections = {};

//Chapter 8: Recursion
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

    if(arr.length <= 1) return arr;


    return arr;
  },

};

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
