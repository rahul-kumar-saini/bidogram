# Reset password

Used to reset the password of a user given the token sent to their email upon request to reset password.

**URL** : `/api/users/resetpassword/:token`

**Method** : `PUT`

**Auth required** : NO

**Data constraints**

```json
{
    "newPass": "[valid password]"
}
```

**Data example**

```json
{
    "newPass": "defg5678"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
Password reset successful.
```

## Error Responses

**Condition** : Invalid token.

**Code** : `401 UNAUTHORIZED`

**Content** :

```json
{
    "status": 401,
    "message": "Invalid/expired token."
}
```

**Condition** : If database lookup fails or email fails to send.

**Code** : `500 INTERNAL SERVER ERROR`

**Content** :

```json
(error)
```
