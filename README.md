# React + API Boilerplate

### Instalation

```sh
git clone https://github.com/vincent-chapron/boilerplate-api-react.git myapp
cd myapp
npm install
```

### Usage

```sh
npm start
```

http://localhost:8080

### SSL

If you have your domain name and a SSL certificate, you can define some environment variable before start your server.

```
export APP_PRIVATEKEY=/path/to/privatekey.pem
export APP_CERTIFICATE=/path/to/cert.pem
```

### ENVIRONMENT VARIBLES

```
export APP_API_PREFIX=/api
export APP_ENCODING=utf-8
export APP_PRIVATEKEY=privatekey.pem
export APP_CERTIFICATE=cert.pem
export APP_PORT=8080
export APP_SSL_PORT=8443
export NODE_ENV=development
```
