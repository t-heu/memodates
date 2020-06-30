import Realm from 'realm';
import isBefore from 'date-fns/isBefore';
import {format} from 'date-fns-tz';

import BirthdaySchema from '../schemas/BirthdaySchema';

export function getRealm() {
  //Realm.clearTestState()
  return Realm.open({
    schema: [BirthdaySchema],
    schemaVersion: 2,
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

export async function show() {
  try {
    const realm = await getRealm();
    const res = realm.objects('Birthday').sorted('id', true);
    const response = Object.keys(res)
      .map((r) => res[Number(r)])
      .sort((a, b) => {
        if (Number(a.id) > Number(b.id)) {
          return 1;
        }

        if (Number(a.id) < Number(b.id)) {
          return -1;
        }

        return 0;
      });
    //console.log(response, '---------------');

    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function sorteds() {
  try {
    const realm = await getRealm();
    const res = realm.objects('Birthday').sorted('date', true);
    const x = res
      .filter((r) => {
        if (
          format(new Date(), 'yyyy-MM-dd') ===
          format(new Date(r.date), 'yyyy-MM-dd')
        ) {
          return r;
        } else {
          if (isBefore(new Date(), new Date(r.date))) {
            return r;
          }
        }
      })
      .reverse();

    return x;
  } catch (e) {
    console.log(e);
  }
}
