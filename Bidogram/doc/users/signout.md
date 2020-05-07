# Signout

Used to sign out a user.

**URL** : `/api/users/signout/`

**Method** : `GET`

**Auth required** : YES

**Data constraints** : NO DATA

## Success Response

**Code** : `200 OK`

**Content example**

```json
"Signout successful"
```

## Error Responses

**Condition** : If user not logged in.

**Code** : `401 UNAUTHORIZED`

**Content** :

```json
{
    "status": 401,
    "message": "Access Denied"
}
```
