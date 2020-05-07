# Signup

Used to create a new user and set appropriate cookie.

**URL** : `/api/users/signup/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "email": "[valid email address]",
    "firstName": "[string]",
    "lastName": "[string]",
    "password": "[password in plain text]",
    "dateOfBirth": "[valid Date]",
    "godmode": "[boolean to create admin account]"
}
```

**Data example**

```json
{
    "email": "example@email.com",
    "firstName": "John",
    "lastName": "Appleseed",
    "password": "abcd1234",
    "dateOfBirth": "1990-05-25",
    "godmode": "false"
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

**Condition** : If user already exists.

**Code** : `409 CONFLICT`

**Content** :

```json
{
    "status": 409,
    "message": "Email example@email.com already exists"
}
```

**Condition** : If email or password is invalid.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "status": 400,
    "message": "Email is not valid."
}
```

**Condition** : If password is invalid.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "status": 400,
    "message": "Bad input: Password."
}
```

**Condition** : If database lookup fails.

**Code** : `500 INTERNAL SERVER ERROR`

**Content** :

```json
(error)
```
