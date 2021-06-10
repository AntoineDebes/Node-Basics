
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if(text.match(/hello\w*/)){
    hello(text);
  }
  else if(text === 'help\n'){
    help();
  }
  else if(text === 'list\n'){
    list(text);
  }
  else if(text.match(/add\s\w+/)){
    add(text);
  }
  else if(text.match(/remove/)){
    remove(text);
  }
  else if(text.match(/edit/)){
    edit(text);
  }
  else if(text.match(/check/)){
    check(text);
  }
  else if(text.match(/save/)){
    save();
  }
  else if(text.match(/load/)){
    load();
  }
  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}

/**
 * prints "All the available commands"
 * 
 * @returns 
 */
function help() {
  return console.log('1- quit or exit: \tto quit the app.\n'+'2- hello or hello "username": \tto greet the app.\n'+'3- add: \tto add a task.\n'+'4- list: \tto list all the tasks.\n'+'5- remove: \tto remove the last task.\n'+'remove "x": \tto remove a specific task which x replaces a specific number.\n'+'6- check or uncheck: \tcheck "x" which x represent the number of the task.\n'.trim());
}

let tasks = [{check: false,value:"asdabsda1"},{check: false,value: "asdansda2"}];
/**
 * prints the list of tasks
 * 
 * @returns {void}
 */

/**
 * adds tasks to the list array
 * 
 * @returns {void}
 */
function add(text) {
  let filteredText = text.replace('add ','');
  let output = {check: "done" , value :(tasks.length+1)+"- " + filteredText.trim()};
  tasks.push(output);
}

/**
 * edit allows you to edit the tasks
 * 
 * @return {void}
 */
function edit(text) {
  let number = text.match(/^\d+/)-1;
  let editedText = text.trim().replace(/edit\s\d+|edit\s/,"");

  if(text.match(/edit\s\D\w+/)){
    tasks.splice(tasks[number],1,);
    tasks.push(editedText);
  }
  else if(text.match(/edit\s\d+\w+/) && number < tasks.length){
    tasks.splice(tasks[number],1,editedText);
  }
  else{
    console.log('Please select the right tasks');
  }
  console.log(tasks);
}

/**
 * check it checkes the tasks that are undone
 * uncheck it uncheckes the tasks that are done
 * 
 * @return {void} 
 */
function check(text){
  let number = text.match(/\d+/)-1;
  if(text === "check\n" || text === "uncheck\n"){
    console.log("Please insert the task that you want to select")
  }
  else if(text.match(/^check\s\d+/)){
    tasks[number].check = true;

  }
  else if(text.match(/^uncheck\s\d+/)){
    tasks[number].check = false;
  }
}

/**
 * removes a task
 * 
 * @return {void}
 */  

function remove(text){
  var number = text.match(/\d+/)-1;

  if(text === "remove\n"){
    tasks.pop();
  }
  else if(text.match(/^remove/gi) && number < tasks.length){
    console.log('Task "'+tasks[number]+'" has been removed');
    tasks.splice(number,1);
  }
  else{
    console.log("Please insert the correct number");
  }
  console.log(tasks);
}
/**
 * list it lists the tasks done or undone
 * 
 * @returns {void}
 */
function list() {
  let listing = tasks.map(task =>((task.check+task.value+'\n')));
  let output = listing.toString().split(",").join("").trim();
  return console.log(output);
}


/**
 * save it saves the data Object into a local file
 * 
 * @returns {void} 
 */
function save() {
  const fs = require('fs');
  let json = JSON.stringify(tasks,null,2);

  fs.writeFile('./database.json', json, (err) => {
    if(err) throw err;
  })
}

/**
 * load it loads data from a specific file
 * 
 * @returns {void}
 */
function load() {
  const fs = require('fs');

  fs.readFile('./database.json', (err, data) => {
      if (err) throw err;
      tasks = JSON.parse(data);
  });
}


/**
 * Says hello with a name sometimes
 *
 * @returns {void}
 */
function hello(text){
  return console.log(text.trim() + " !");
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Antoine Debes")
