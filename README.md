# Client server app

## Server

- Import [db.sql](https://github.com/artyom-n/client-server-app/blob/master/server/db.sql) to your phpMyAdmin, you can use [XAMPP Control Panel](https://www.apachefriends.org/index.html)

- Open your favorite IDE (like Visual Studio Code or WebStorm), in terminal go to server folder and type: 
```
npm install
npm run dev
```

- After that you will see in the terminal
```
Server listening on the port 9000
```

- Than you can check server in browser, just type:
```
http://localhost:9000
```
and you will see message in browser:
```
Server running on the port 9000
```

## Client

- In terminal go to client folder and type
```
npm install
npm start
```

- In the browser type:
```
http://localhost:3000
```
and subscribe
- Then type in the browser:
```
http://localhost:3000/customers
```
and you will see all subscriptions
