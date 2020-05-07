# Get User info

Used to retrieve info about the user.

**URL** : `/api/users/`

**Method** : `GET`

**Auth required** : YES

**Data constraints** : NO DATA

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
   "friendList": [],
   "_id": "example@email.com",
   "dateOfBirth": "1990-05-25",
   "firstName": "John",
   "lastName": "Appleseed",
   "godmode": "false",
   "isStreaming": "false",
   "streamKey": "5595dab1fe9f28cc612416f89a804a3f"
}
```

## Error Responses

**Condition** : If email is invalid.

**Code** : `404 NOT FOUND`

**Content** :

```json
{
    "status": 404,
    "message": "Email example@email.com does not exist"
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
