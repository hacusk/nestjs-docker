# NestJS StartKit
NestJSをDocker環境下で動かすスタータキットです。  
Node18のイメージ下で動くNestJSとMySQL8.0のイメージで構成されています。

## Requirement
- Docker
- docker-compose 

## Installation
1. `git clone https://github.com/hacusk/nestjs-docker.git`

2. `docker-compose up -d`

## Note
1. NestJSは開発者モードで起動されます。

## Demo
下記ライブラリを利用した認証を含むAPIのサンプルを内包しています。
- TypeORM
- crypto
- passport

サンプルAPIをコールする場合、リクエストヘッダーに下記付加してください。

`x-api-key: xrAKJBr7MUxc7asX`

### GET:/users
ユーザ情報全件返却します。
```
request: {
  headers: {} - 不要
  body: {} - 不要
}
response: Users[] - Usersテーブルの全件を返します。
```

### POST:/users
ユーザ情報を登録します。
```
request: {
  headers: {} - 不要
  body: {
    "name": "Shimada Mayu"
  }
}
response: Users - 登録されたユーザ情報を返却します。
```

### PUT:/users/{:id}
パスで指定されたユーザIDのユーザ情報を更新します。  
x-api-keyとパスで指定されたユーザIDの情報が一致しない場合、403を返却します。  
存在しないユーザIDを指定した場合、404を返却します。
```
request: {
  headers: {} - 不要
  body: {
    "name": "Yoshioka Mayu"
  }
}
response: Users - 更新されたユーザ情報を返却します。
```
