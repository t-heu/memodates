import Realm from 'realm'

import BirthdaySchema from '../schemas/BirthdaySchema'

export function getRealm() {
  //Realm.clearTestState()
  return Realm.open({
    schema: [BirthdaySchema]
  })
}

export function deleteRealms() {
  Realm.clearTestState()
}

export async function create(data: any) {
  const realm = await getRealm()

  if(typeof data === 'string') {
    Object.keys(JSON.parse(data)).map(res => {
      const info = JSON.parse(data)[res]
  
      realm.write(() => {
        realm.create('Birthday', info, 'modified');
      })
    })
    return
  }

  realm.write(() => {
    //realm.deleteAll()
    data.map((info: {id: string, name: string, date: string}) => {
       realm.create('Birthday', info, 'modified');
    })
  })
 }

 export async function deleteObj(data: any) {
  const realm = await getRealm()

  realm.write(() => {
    realm.delete(data);
  })
 } 

 export async function offList() {
   try {
    const realm = await getRealm()
    const res = realm.objects('Birthday').sorted('id', true)
    //res.map(r => console.log(r))
    //const arr = Object.keys(res).map((r) => res[Number(r)])
    return res
   } catch(e) {
    console.log(e)
   }
 }