# Get Users

Used to retrieve all users.

**URL** : `/api/users/getUsers/`

**Method** : `GET`

**Auth required** : YES

**Data constraints** : NO DATA

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
      "friendList": ["..."],
      "_id": "...",
      "dateOfBirth": "...",
      "firstName": "...",
      "lastName": "...",
      "godmode": "...",
      "isStreaming": "...",
      "streamKey": "..."
    },
    {
      "friendList": ["..."],
      "_id": "...",
      "dateOfBirth": "...",
      "firstName": "...",
      "lastName": "...",
      "godmode": "...",
      "isStreaming": "...",
      "streamKey": "..."
    },
    {
      "friendList": ["..."],
      "_id": "...",
      "dateOfBirth": "...",
      "firstName": "...",
      "lastName": "...",
      "godmode": "...",
      "isStreaming": "...",
      "streamKey": "..."
    }
]
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

**Condition** : If database lookup fails.

**Code** : `500 INTERNAL SERVER ERROR`

**Content** :

```json
(error)
```
