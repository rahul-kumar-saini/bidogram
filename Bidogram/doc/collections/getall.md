# Get all Collections

Used to get all Collection objects from the site.

**URL** : `/api/collections/getCollections/`

**Method** : `GET`

**Auth required** : YES

**Data constraints** : NO DATA

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "_id": "...",
        "title": "...",
        "creator": "...",
        "description": "...",
        "tags": ["..."],
        "games": ["..."]
    },
    {
        "_id": "...",
        "title": "...",
        "creator": "...",
        "description": "...",
        "tags": ["..."],
        "games": ["..."]
    },
    {
        "_id": "...",
        "title": "...",
        "creator": "...",
        "description": "...",
        "tags": ["..."],
        "games": ["..."]
    }
]
```

## Error Responses

**Condition** : User not logged in.

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