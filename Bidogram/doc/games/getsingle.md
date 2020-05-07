# Get a game

Used to get a game object given the id.

**URL** : `/api/games/getGame/:id`

**Method** : `GET`

**Auth required** : NO

**Data constraints** : NO DATA

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "id": "1942",
    "cover": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg",
    "firstRel": "2015-05-19T04:00:00.000Z",
    "gameModes": [
        "single-player"
    ],
    "genres": [
        "role-playing-rpg",
        "adventure"
    ],
    "companies": [
        "WB Games",
        "Bandai Namco Entertainment",
        "cdp.pl",
        "1C Company",
        "Spike ChunSoft",
        "CD Projekt RED",
        "D3T Limited"
    ],
    "keywords": [
        "Witcher",
        "Wild",
        "Hunt",
        "Geralt",
        "Ciri"
    ],
    "name": "The Witcher 3: Wild Hunt",
    "platforms": [
        "PC (Microsoft Windows)",
        "PlayStation 4",
        "Xbox One"
    ],
    "popularity": 134,
    "releaseDates": [
        "2015-05-19T04:00:00.000Z"
    ],
    "slug": "the-witcher-3-wild-hunt",
    "similarGames": [
        "Minecraft",
        "The Elder Scrolls V: Skyrim",
        "Dishonored",
        "Brothers: A Tale of Two Sons",
        "Pillars of Eternity",
        "Dragon Age: Inquisition",
        "Middle-earth: Shadow of Mordor",
        "Jade Empire",
        "Aarklash: Legacy",
        "Folk Tale"
    ],
    "summary": "The Witcher: Wild Hunt is a story-driven, next-generation open world role-playing game set in a visually stunning fantasy universe full of meaningful choices and impactful consequences. In The Witcher you play as the professional monster hunter, Geralt of Rivia, tasked with finding a child of prophecy in a vast open world rich with merchant cities, viking pirate islands, dangerous mountain passes, and forgotten caverns to explore.",
    "themes": [
        "Action",
        "Fantasy",
        "Historical",
        "Open world"
    ]
}
```

## Error Responses

**Condition** : If game doesn't exist.

**Code** : `404 NOT FOUND`

**Content** :

```json
{
    "status": 404,
    "message": "Game 1942 does not exist"
}
```

**Condition** : If database lookup fails.

**Code** : `500 INTERNAL SERVER ERROR`

**Content** :

```json
(error)
```
