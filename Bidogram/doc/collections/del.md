# Delete a Collection

Used to delete a collection for a user.

**URL** : `/api/collections/deleteCollection/`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

```json
{
    "title": "[title of collection as string]",
}
```

**Data example**

```json
{
    "title": "collection title"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "status": 200,
    "message": "Collection [collection title] successfully deleted."
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
