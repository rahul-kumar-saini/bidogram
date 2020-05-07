# Add a Collection

Used to add a collection for a user.

**URL** : `/api/collections/addCollection/`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

```json
{
    "title": "[title of collection as string]",
    "description": "[description of collection as string]",
    "tags": ["[list of tags as strings]"],
    "games": ["[list of game id's as strings]"]
}
```

**Data example**

```json
{
    "title": "collection title",
    "description": "this is a cool collection",
    "tags": [
        "cool",
        "epic"
    ],
    "games": [
        "28168",
        "4876",
        "20622",
        "26544"
    ]
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "status": 200,
    "message": "Collection 5e939ca1b0d72afcb90dd76f added successfully."
}
```

## Error Responses

**Condition** : If Collection already exists.

**Code** : `409 CONFLICT`

**Content** :

```json
{
    "status": 409,
    "message": "Collection [collection title] already exists"
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
