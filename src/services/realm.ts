import Realm from 'realm';

import BirthdaySchema from '../schemas/BirthdaySchema';

export function getRealm() {
  //Realm.clearTestState()
  return Realm.open({
    schema: [BirthdaySchema],
    schemaVersion: 1,
  });
}

export function deleteRealms() {
  Realm.clearTestState();
}

export async function create(data: any, restored?: boolean) {
  const realm = await getRealm();

  if (restored) {
    Object.keys(data).map((res) => {
      const info = data[res];

      realm.write(() => {
        // @ts-ignore
        realm.create('Birthday', info, 'modified');
      });
    });
    return;
  }

  realm.write(() => {
    //realm.deleteAll()
    data.map(
      (info: {id: string; summary: string; date: string; color: string}) => {
        // @ts-ignore
        realm.create('Birthday', info, 'modified');
      },
    );
  });
}

export async function deleteObj(data: any) {
  const realm = await getRealm();

  realm.write(() => {
    realm.delete(data);
  });
}

export async function offList() {
  try {
    const realm = await getRealm();
    const res = realm.objects('Birthday').sorted('id', true);
    //res.map(r => console.log(r))
    //const arr = Object.keys(res).map((r) => res[Number(r)])
    return res;
  } catch (e) {
    console.log(e);
  }
}
