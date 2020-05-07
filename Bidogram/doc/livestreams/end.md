# End Livestream

Ends livestream for a user given the streamkey.

**URL** : `/api/livestreams/end/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "streamKey": "[valid stream key given by the server]"
}
```

**Data example**

```json
{
    "streamKey": "164D1852988ADA08"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "valid": "true"
}
```

## Error Responses

**Condition** : If user not found.

**Code** : `404 NOT FOUND`

**Content** :

```json
{
    "status": 404,
    "message": "No such user."
}
```

**Condition** : If database lookup fails.

**Code** : `500 INTERNAL SERVER ERROR`

**Content** :

```json
(error)
```
