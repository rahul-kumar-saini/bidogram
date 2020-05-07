# Login

Used to authenticate user and set appropriate cookie.

**URL** : `/api/users/signin/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "email": "[valid email address]",
    "password": "[password in plain text]"
}
```

**Data example**

```json
{
    "email": "example@email.com",
    "password": "abcd1234"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "email": "example@email.com",
    "firstName": "John",
    "lastName": "Appleseed",
    "godmode": "false"
}
```

## Error Responses

**Condition** : If user not found by email or incorrect password.

**Code** : `401 UNAUTHORIZED`

**Content** :

```json
{
    "status": 401,
    "message": "Access Denied"
}
```

**Condition** : If email is invalid.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "status": 400,
    "message": "Email is not valid."
}
```

**Condition** : If database lookup fails.

**Code** : `500 INTERNAL SERVER ERROR`

**Content** :

```json
(error)
```
