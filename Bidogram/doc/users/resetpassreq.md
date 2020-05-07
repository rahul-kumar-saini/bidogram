# Reset password request

Used to send a password reset request to the email of the user.

**URL** : `/api/users/sendpasswordreset/`

**Method** : `PUT`

**Auth required** : NO

**Data constraints**

```json
{
    "email": "[valid email address]"
}
```

**Data example**

```json
{
    "email": "example@email.com"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
Password reset email sent
```

## Error Responses

**Condition** : If user not found.

**Code** : `404 NOT FOUND`

**Content** :

```json
{
    "status": 404,
    "message": "Email example@email.com does not exist"
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

**Condition** : If database lookup fails or email fails to send.

**Code** : `500 INTERNAL SERVER ERROR`

**Content** :

```json
(error)
```
