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
//             .collection()
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
//         .then(collection => {
//           return collection
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
//     .collection('todos')
//       .getAll()
//
// api
//   .project('TodoTarabaas')
//     .collection('todos')
//       .get(id)
//         .delete()
//           .commit();
//
// api
//   .project('TodoTarabaas')
//     .collection('todos')
//       .find({or: [{eq: {name: 'Test'}}, {'eq': {email: 'test@example.com'}})
//         .commit()
//           .then(items => {
//             return items;
//           });
