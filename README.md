# NOTICE
Please change secret (config/default.js) before you do anything.
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
  "message": "User Details (including token)"
}
```

## Verifly Token
```GET /users/auth/token="<token_here>"```

#### Response:
```
Content-Type: application/json
Status Code: 200
```

#### Body:
```
{
  "message": "Auth Success", userAuthToken
}
```
