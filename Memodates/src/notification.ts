import PushNotification from "react-native-push-notification";

export default function callNoti(name?: string) {
  PushNotification.localNotification({
    title: "Chegou o dia!!", // (optional)
    message: `Deseje os parábens ao seu amigo(a)/familia/namorado(a) ${name || 'ERROR'}`,
    largeIcon: "icon",
    smallIcon: "icon_noti"
    //repeatType: 'minute',
    //repeatTime: 100
  });
}
