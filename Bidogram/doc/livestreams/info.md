# Livestream info

Get list of emails of users currently streaming.

**URL** : `/api/livestreams/info/`

**Method** : `GET`

**Auth required** : NO

**Data constraints** : NO DATA

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
    "example@email.com",
    "streamer2@gmail.com"
]
```

## Error Responses

**Condition** : If database lookup fails.

**Code** : `500 INTERNAL SERVER ERROR`

**Content** :

```json
(error)
```
