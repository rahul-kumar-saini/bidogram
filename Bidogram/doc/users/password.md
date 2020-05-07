# Set password

Used to force set the password of a user by an admin or through email reset.

**URL** : `/api/users/setpassword/`

**Method** : `PUT`

**Auth required** : YES

**Data constraints**

```json
{
    "email" : "[valid email]",
    "password": "[valid password]"
}
```

**Data example**

```json
{
    "email": "example@email.com",
    "password": "defg5678"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
Password reset successful.
```

## Error Responses

**Condition** : If password is invalid.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "status": 400,
    "message": "Bad input: Password."
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

**Condition** : Targetting invalid user.

**Code** : `404 NOT FOUND`

**Content** : 
```json
{
    "status": 404,
    "message": "Request originated fraudulenty."
}
```

**Condition** : Not an admin or not setting own password.

**Code** : `401 UNAUTHORIZED`

**Content** :

```json
{
    "status": 401,
    "message": "Access Denied"
}
```

**Condition** : If database lookup fails or email fails to send.

**Code** : `500 INTERNAL SERVER ERROR`

**Content** :

```json
(error)
```
