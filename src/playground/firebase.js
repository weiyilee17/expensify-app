// database.ref('expenses').on('child_removed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_changed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_added', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });


// const onValueChange = (snapshot) => {
//   const expenses = [];

//   snapshot.forEach((childSnapshot) => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     });
//   });
//   console.log(expenses);
// };

// database.ref('expenses').on('value', onValueChange);


// database.ref('expenses').once('value')
//   .then((snapshot) => {
//     const expenses = [];

//     snapshot.forEach((childSnapshot) => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });

//     console.log(expenses)
//   });

// database.ref('expenses').push({
//   description: 'test description',
//   note: 'note...',
//   amount: 123,
//   createdAt: 34500
// });


// database.ref('notes/-LiC1pFcWlN2mXOMYXuI').update({
//   body: 'Buy food'
// });

// database.ref('notes').push({
//   title: 'Course Topics',
//   body: 'React Native, Angular, Python'
// });



// const notes = [{
//   id: '12',
//   title: 'First note!',
//   body: 'This is my note'
// }, {
//   id: '761ase',
//   title: 'Another note',
//   body: 'This is my second note'
// }];

// const firebaseNotes = {
//   notes: {
//     apijsasdf: {
//       title: 'first note!',
//       body: 'this is my note'
//     },
//     apijsasdfassdf: {
//       title: 'another note!',
//       body: 'this is my second note'
//     }
//   }
// };





// const onValueChange = (snapshot) => {
//   console.log(`${snapshot.val().name} is a ${snapshot.val().job.title} at ${snapshot.val().job.company}`);
// };

// database.ref().on('value', onValueChange);

// setTimeout(() => {
//   database.ref().update({
//     'job/company': 'LITEON'
//   });
// }, 3000);


// const onValueChange = database.ref().on('value', (snapshot) => {
//   console.log(snapshot.val());
// }, (e) => {
//   console.log('Error with data fetching', e);
// });

// const onValueChange = (snapshot) => {
//   console.log('value changed', snapshot.val());
// };

// database.ref().update({
//   age: 26
// });

// database.ref().on('value', onValueChange);

// setTimeout(() => {
//   database.ref('age').set(29);
// }, 3500);

// setTimeout(() => {
//   database.ref().off('value', onValueChange);
// }, 7000);

// setTimeout(() => {
//   database.ref('age').set(30);
// }, 10500);


// database.ref().once('value')
//   .then((snapshot) => {
//     const val = snapshot.val();
//     console.log(val);
//   }).catch((e) => {
//     console.log('Error fetching data', e);
//   });



// database.ref().set({
//   name: 'Weiyi Lee',
//   age: 27,
//   stressLevel: 6,
//   job: {
//     title: 'Software Engineer',
//     company: 'Google'
//   },
//   location: {
//     city: 'Philadelphia',
//     contry: 'United States'
//   }
// }).then(() => {
//   console.log('date is saved!');
// }).catch((e) => {
//   console.log('This failed.', e);
// });

// the following 2 are the same

// database.ref('isSingle').remove()
//   .then(() => {
//     console.log('Data was removed');
//   }).catch((e) => {
//     console.log('Did not remove data', e);
//   });

// database.ref('isSingle').set(null);

// database.ref().update({
//   name: 'Mike',
//   age: 30,
//   job: 'Software developer',
//   isSingle: null
// });


// if update location and pass in an object with the city property,
// the contry property would we wiped out. So we use the following way
// to update nested objects
// database.ref().update({
//   job: 'Manager',
//   'location/city': 'Boston'
// });

// database.ref().update({
//   stressLevel: 9,
//   'job/company': 'Amazon',
//   'location/city': 'Seattle'
// });

