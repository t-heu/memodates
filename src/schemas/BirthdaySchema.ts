export default {
  name: 'Birthday',
  primaryKey: 'id',
  properties: {
    id: {
      type: 'string',
      indexed: true,
    },
    summary: 'string',
    date: 'date',
    color: 'string',
    start: 'date',
    end: 'date',
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
