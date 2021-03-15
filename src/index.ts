import { TodoItem } from './todoItem';
import { TodoCollection } from './todoCollection';
import * as inquirer from 'inquirer';

let todos: TodoItem[] = [
  new TodoItem(1, 'Orać pole'),
  new TodoItem(2, 'Get rich or die'),
  new TodoItem(3, 'Eat or be eaten'),
  new TodoItem(4, 'masło margaryna', true),
];

let collection: TodoCollection = new TodoCollection("jaro", todos);
let showCompleted = true;


function displayTodoList(): void {
  console.log(`List of ${collection.userName} (to do: ${collection.getItemCounts().incomplete})`);
  collection.getTodoItems(showCompleted).forEach(item => item.printDetails());
}

enum Commands {
  Quit = "Koniec",
  Toggle = "Pokaż/ukryj wykonane",
  Add = "Dodaj nowe zadanie",
  Complete = "Oznacz jako wykonane",
  Purge = "Usuń wykonane zadania"
}

function promptUser(): void {
  console.clear();
  displayTodoList();
  inquirer.prompt({
    type: "list", 
    name: "command", 
    message: "Choose option",
    choices: Object.values(Commands)
  }).then(answers => {
    switch (answers["command"]) {

      case Commands.Toggle: 
        showCompleted = !showCompleted;
        promptUser();
        break;

      case Commands.Add:
        promptAdd();
        break;

      case Commands.Complete:
        if (collection.getItemCounts().incomplete > 0) {
          promptComplete();
        } else {
          promptUser();
        }
        break;

      case Commands.Purge:
        collection.removeComplete();
        promptUser();
        break;
    }
  })

}

function promptAdd(): void {
  console.clear();
  inquirer.prompt({ type:"input", name:"add", message:"Jakie zadanie"})
    .then(answers => {
      if (answers["add"] !== "") {
        collection.addTodo(answers["add"])
      }
      promptUser();
    })
}

function promptComplete(): void {
  console.clear();
  inquirer.prompt({
    type:"checkbox",
    name:"complete",
    message:"Oznaczenie zadań",
    choices: collection.getTodoItems(showCompleted).map(item => ({
      name: item.task,
      value: item.id,
      checked: item.complete
    }))
  }).then(answers => {
    let completedTasks = answers["complete"] as number[];

    collection.getTodoItems(true).forEach(item => {
      collection.markComplete(item.id, completedTasks.find(id => id === item.id) != undefined)
    });
    
    promptUser();
  })
}

promptUser();


// let newId: number = collection.addTodo("Go run");
// let todoItem: TodoItem = collection.getTodoById(newId);

// console.log(JSON.stringify(todoItem));

// todoItem.printDetails();

// collection.removeComplete();








