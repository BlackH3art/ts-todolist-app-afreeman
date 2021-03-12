import { TodoItem } from './todoItem';
import { TodoCollection } from './todoCollection';

let todos: TodoItem[] = [
  new TodoItem(1, 'Orać polę'),
  new TodoItem(2, 'Get rich or die'),
  new TodoItem(3, 'Eat or be eaten'),
  new TodoItem(4, 'masło margaryna', true),
];

let collection: TodoCollection = new TodoCollection("jaro", todos);

console.clear();
console.log(`List of ${collection.userName}`);


// let newId: number = collection.addTodo("Go run");
// let todoItem: TodoItem = collection.getTodoById(newId);

// console.log(JSON.stringify(todoItem));

// todoItem.printDetails();

collection.removeComplete();
collection.getTodoItems(true).forEach(item => item.printDetails())








