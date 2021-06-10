
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
  return console.log('1- quit or exit\n'+'2- hello or hello "username"')
}

let tasks = ["asdabsda1", "asdansda2"];
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
  tasks.push((tasks.length+1)+"- " + text.trim());
}

/**
 * removes a task
 * 
 * @return {void}
 */

function remove(text){
  if(text === "remove\n"){
    tasks.pop();
  }
  else{
    let number = Math.floor(text);
    tasks.splice(number-1 , 1)
  }
  console.log(tasks);
}

function list() {
  let listing = tasks.map(task => task+'\n');
  let output = listing.toString().split(",").join("").trim();
  return console.log(output);
}

/**
 * Says hello
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
