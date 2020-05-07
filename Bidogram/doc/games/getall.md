# Get all games

Used to get all game objects from the library.

**URL** : `/api/games/getGames/`

**Method** : `GET`

**Auth required** : NO

**Data constraints** : NO DATA

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "id": "...",
        "cover": "...",
        "firstRel": "...",
        "gameModes": ["..."],
        "genres": ["..."],
        "companies": ["..."],
        "keywords": ["..."],
        "name": "...",
        "platforms": ["..."],
        "popularity": "...",
        "releaseDates": ["..."],
        "slug": "...",
        "similarGames": ["..."],
        "summary": "...",
        "themes": ["..."]
    },
    {
        "id": "...",
        "cover": "...",
        "firstRel": "...",
        "gameModes": ["..."],
        "genres": ["..."],
        "companies": ["..."],
        "keywords": ["..."],
        "name": "...",
        "platforms": ["..."],
        "popularity": "...",
        "releaseDates": ["..."],
        "slug": "...",
        "similarGames": ["..."],
        "summary": "...",
        "themes": ["..."]
    },
    {
        "id": "...",
        "cover": "...",
        "firstRel": "...",
        "gameModes": ["..."],
        "genres": ["..."],
        "companies": ["..."],
        "keywords": ["..."],
        "name": "...",
        "platforms": ["..."],
        "popularity": "...",
        "releaseDates": ["..."],
        "slug": "...",
        "similarGames": ["..."],
        "summary": "...",
        "themes": ["..."]
    }
]
```

## Error Responses

**Condition** : If games do not exist.

**Code** : `404 NOT FOUND`

**Content** :

```json
{
    "status": 404,
    "message": "Games do not exist"
}
```

**Condition** : If database lookup fails.

**Code** : `500 INTERNAL SERVER ERROR`

**Content** :

```json
(error)
```
