// Object Destructuring

// const person = {
//     // name: 'Andrew',
//     age: 26,
//     location: {
//         city: 'Philadelphia',
//         temp: 92
//     }
// };

// const {name: firstName = 'Anonymous', age} = person;
// // equivalent to const name = person.name;
// // const age = person.age

// console.log(`${firstName} is ${age}.`);

// const {city, temp: temperature} = person.location;
// rename temp to teomperature


// console.log(`It's ${temperature} in ${city}.`);


// Practice
// const book = {
//     title: 'Ego is the enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// };

// const {name: publisherName = 'Self-Published'} = book.publisher;

// console.log(publisherName);



// Array Destructuring

const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];

const [, , state = 'Illinois'] = address;

console.log(`You are in ${state}.`);



const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [itemName, , mediumPrice] = item;

console.log(`A ${itemName} costs ${mediumPrice}.`);

