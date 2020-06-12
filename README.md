## Memodates

![GitHub](https://img.shields.io/github/license/t-heu/memodates)
<a href="https://www.linkedin.com/in/matheusgbatista" >
  <img src="https://img.shields.io/badge/siga-LinkedIn-blue.svg" />
</a>

<p align="center">
  <img alt="Logo do projeto" src="./_docs/web_hi_res_512.png" width="150" />
</p>

###  Tecnologias usadas
Este maravilhoso projeto foi desenvolvido com as seguintes tecnologias:
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [React Native](https://pt-br.reactjs.org/)
- jsonwebtoken
- Graphql
- Typeorm
- Realm
- date-fns
- react-native-fbsdk (oauth Facebook)
- Apollo
- react-native-push-notification (notification local)
- react-native-background-fetch
- TypeScript

###  Projeto

<b>Memodates</b> é um projeto que visa ajudar, de maneira <b>a memorização</b> uma forma de lembrete das datas mais importantes da sua vida.

### Qual o propósito desse aplicativo?<br>

Quem nunca teve um leve esquecimento de uma data de aniversário de um amigo(a) ou de um membro da família? Sabemos que isso acontecer com frequência pode prejudicar a vida da pessoa, então pensando nisso resolvermos fazer esse aplicativo, você pode usa-lo online ou offline.

###  Como instalar

- Faça um git clone desse repositório
- Instale suas dependências: 
- backend yarn
- mobile yarn

### configuração e execução

```
<!--strings.xml-->
<resources>
  <string name="app_name">Memodates</string>
  <string name="facebook_app_id">ID_FACE</string>
</resources>
````

<ul>
  <li>em backend</li>
  <ul>
    <li>crie um .env baseado no .env.example e forneça suas credenciais do banco de dados </li>
  </ul>
  <li>em Memodates</li>
  <ul>
    <li>crie strings.xml ecoloque em <code>android/app/src/main/res/values/</code></li>
    <li>e cole aquele código srings.xml mudando śo "ID_FACE" para seu id</li>
  </ul>
</ul>

- Em seguida inicialize:
```
backend: yarn dev 
mobile: yarn android && yarn start
```

## Versioning/Versionamento

Esse projeto não possui um sistema de versionamento.

## History/Histórico
Da uma olhada na aba [Releases](https://github.com/t-heu/memodates/releases) pra acompanhar as alterações feitas no projeto.

## License/Licença do Projeto
[MIT License](./LICENSE) © [Math](https://github.com/t-heu/)
