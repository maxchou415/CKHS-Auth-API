# NOTICE
Please change secret (config/default.js) before you do anything.

# Security
```Password``` and ```Token``` will be hash, when save to Database.

# Usage
## Get Token
```POST /users/auth/```
<br />
#### Body:
```
Content-Type: application/x-www-form-urlencoded
Header: username, password
```
#### Response:
```
Content-Type: application/json
Status Code: 200
```
#### Body:
```
{
  "token": "sclJ9YsK2BfwuIwkbevka5Fswg1CuvjU"
}
```

## Verifly Token
```GET /users/auth/token/?token="<token_here>"```

#### Response:
```
Content-Type: application/json
Status Code: 200
```

#### Body:
```
{
  "message": "Auth Success",
  "token": "sclJ9YsK2BfwuIwkbevka5Fswg1CuvjU"
}
```

## Create User

```POST /users/auth/create"```

#### Body:
```
Content-Type: application/json
Status Code: 200
```
#### Body:
```
Content-Type: application/x-www-form-urlencoded
Header: username, password, email, name
```
#### Response:
```
Content-Type: application/json
Status Code: 200
```
#### Body:
```
{
  "message": "Create User Success",
  "token": "lHxK3xSfbBybzOxbAFjs7kvzLLttGt0F"
}
```
