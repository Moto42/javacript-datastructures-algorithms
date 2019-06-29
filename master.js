
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
