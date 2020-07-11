## Memodates

![GitHub](https://img.shields.io/github/license/t-heu/memodates)
<a href="https://www.linkedin.com/in/matheusgbatista" >
  <img src="https://img.shields.io/badge/siga-LinkedIn-blue.svg" />
</a>

<p align="center">
  <img alt="Logo do projeto" src="./_docs/web_hi_res_512.png" width="150" /><br/>
  <h2>📸 Preview</h2>
  <img alt="exemplo" src="./_docs/Peek 08-07-2020 10-57.gif" width="1080" />
</p>

###  Tecnologias usadas
Este maravilhoso projeto foi desenvolvido com as seguintes tecnologias:
- ~~[Node.js](https://nodejs.org/en/)~~
- ~~[Express](https://expressjs.com/pt-br/)~~
- [React Native](https://pt-br.reactjs.org/)
- ~~jsonwebtoken~~
- ~~Graphql~~
- ~~Typeorm~~
- ~~Realm~~
- @react-native-community/google-signin
- redux
- redux-persist
- redux-saga
- date-fns
- moment
- code-push/Appcenter
- service
- admob
- ~~react-native-fbsdk (oauth Facebook)~~
- ~~Apollo~~
- react-native-push-notification (notification local)
- ~~react-native-background-fetch~~
- TypeScript

###  Projeto

<b>Memodates</b> é um projeto que visa ajudar, de maneira <b>a memorização</b> uma forma de lembrete das datas mais importantes da sua vida.

### Qual o propósito desse aplicativo?<br>

Quem nunca teve um leve esquecimento de uma data de aniversário de um amigo(a) ou de um membro da família? Sabemos que isso acontecer com frequência pode prejudicar a vida da pessoa, então pensando nisso resolvermos fazer esse aplicativo, você pode usa-lo online ou offline.

###  Como instalar

- Faça um git clone desse repositório
- Instale as dependências com: ```yarn```

### configuração e execução

<ul>
  <li>gere seu google-services do firebase e coloque em <code>android/app</code></li>
  <li>configure seu code-push e coloque sua key em<code>android/app/src/main/res/values/strings.xml</code></li>
  <code> string name="CodePushDeploymentKey" moduleConfig="true">KEY</string></code>
  <li>configure seu admob e coloque suas credencias
<code>android/app/src/main/AndroidManifest.xml</code><br />
<code> meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="KEY"/></code>
  </li>
</ul>

- Em seguida inicialize:
```
mobile: yarn android && yarn start
```

## Versioning/Versionamento

Esse projeto não possui um sistema de versionamento.

## History/Histórico
Da uma olhada na aba [Releases](https://github.com/t-heu/memodates/releases) pra acompanhar as alterações feitas no projeto.

## License/Licença do Projeto
[Apache License](./LICENSE) © [Math](https://github.com/t-heu/)
