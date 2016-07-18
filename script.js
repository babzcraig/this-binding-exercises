//Understanding the concepts of call-site and call-stack vis a vis rules for"this" binding


//Default binding. If the function is called plainly at the call site, the "this" binding references the containing object at the call site
function foo() {
  console.log(this.a);
}


function fooContain() {
  var a = "global a";
  foo();
}

fooContain();


//Implicit binding: if the call-site has a context object, then the object "owns " or "contains" the the function reference at the time it is called
function bar() {
  console.log(this.a)
};



var obj2 = {
  a: 42,
  bar: bar
}

var obj = {
  a: 2,
  bar: bar,
  obj2: obj2
}

obj.bar(); // 2
obj.obj2.bar(); //42 : only the top/last level of an object property refeence chain matters at the call site
//however, an implicitly bound function can lose its binding. This especialy occurs when passing callback functions
function baz() {
  console.log(this.a)
}

function doBaz(fn) {
  fn(); //fn is just another reference for baz. This is the call-site of baz
}

var obj = {
  a: 2,
  baz: baz
}


var a = "global a" // creating a property reference on the global object

doBaz(obj.baz); //"global a"
//From the above, it is clear that using a reference to the function causes it to lose it's implicit binding. fn is really just a reference to bar itself and not to obj.baz


//Explicit binding. This is where you do not use a property reference to the function but instead force the function call to use the object for the "this" binding
function bozo() {
  console.log(this.a)
}

var obj = {
  a: 2
}

bozo.call(obj);


//Hard binding. A variation on explicit binding which does not allow binding to be lost. Here we create a function which internally invokes the intended function and binds the intended object to it
function barr() {
  console.log(this.a);
}

var obj = {
  a: "hard binding worked!"
}

var bazz = function() {
  barr.call(obj);
}

bazz();








































