import tarabaas from './lib/tarabaas';

const api = tarabaas.init({
  serverURL: 'https://tarabaas.com'
});


// api
//   .project()
//     .create('TodoTarabaas')
//       .commit()
//         .then(project => {
//           return project
//             .database()
//               .create('todos')
//                 .addField({
//                   type: 'string',
//                   name: 'text'
//                 })
//                 .addField({
//                   type: 'boolean',
//                   name: 'completed',
//                   'default': false
//                 })
//                 .commit();
//         })
//         .then(database => {
//           return database
//             .add({text: 'first'})
//             .add({text: 'second'})
//             .add({text: 'thirds'})
//             .commit();
//     })
//     .catch(err => {
//       console.error(err);
//     });
//
//
//
// api
//   .project('TodoTarabaas')
//     .database('todos')
//       .getAll()
//
// api
//   .project('TodoTarabaas')
//     .database('todos')
//       .get(id)
//         .delete()
//           .commit();
//
// api
//   .project('TodoTarabaas')
//     .database('todos')
//       .find({or: [{eq: {name: 'Test'}}, {'eq': {email: 'test@example.com'}})
//         .commit()
//           .then(items => {
//             return items;
//           });
