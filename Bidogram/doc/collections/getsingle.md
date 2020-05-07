# Get a Collection

Used to get a Collection object given the id.

**URL** : `/api/collections/getCollection/:id`

**Method** : `GET`

**Auth required** : YES

**Data constraints** : NO DATA

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "_id": "5e939ca1b0d72afcb90dd76f",
    "title": "collection title",
    "creator": "example@email.com",
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

## Error Responses

**Condition** : If Collection doesn't exist.

**Code** : `404 NOT FOUND`

**Content** :

```json
{
    "status": 404,
    "message": "Collection 5e939ca1b0d72afcb90dd76f does not exist"
}
```

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
