export default {
  name: 'Birthday',
  primaryKey: 'id',
  properties: {
    id: {
      type: 'string',
      indexed: true,
    },
    name: 'string',
    date: 'date',
    color: 'string',
  },
};
//class BirthdaySchema {
//   static schema = {
//     name: 'Birthday',
//     primaryKey: 'id',
//     properties: {
//       id: { type: 'string', indexed: true },
//       name: 'string',
//       date: 'string'
//     }
//   }
// }
