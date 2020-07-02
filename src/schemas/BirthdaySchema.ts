export default {
  name: 'Birthday',
  primaryKey: 'id',
  properties: {
    id: {
      type: 'string',
      indexed: true,
    },
    title: 'string',
    //date: 'date',
    //color: 'string',
    location: 'string',
    description: 'string',
    startDate: 'date',
    endDate: 'date',
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
