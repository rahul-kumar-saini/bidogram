# Get User streamkey

Used to retrieve streamkey for a livestreamer to join their livestream.

**URL** : `/api/users/streamkey/?username=[email]`

**Method** : `GET`

**Auth required** : YES

**Data constraints** : Valid email of livestreamer passed as a query.

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
   "streamKey": "5595dab1fe9f28cc612416f89a804a3f"
}
```

## Error Responses

**Condition** : If livestreamer email is invalid.

**Code** : `404 NOT FOUND`

**Content** :

```json
{
    "status": 404,
    "message": "No such user."
}
```

**Condition** : If user not logged in.

**Code** : `401 UNAUTHORIZED`

**Content** :

```json
{
    "status": 401,
    "message": "Access Denied"
}
```

**Condition** : If database lookup fails.

**Code** : `500 INTERNAL SERVER ERROR`

**Content** :

```json
(error)
```
