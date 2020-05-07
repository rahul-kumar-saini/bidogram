# Add a game

Used to add a game to the site wide library. Only an admin can add a game to the site wide library.

**URL** : `/api/games/addGame/`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

```json
{
    "id": "[id generated for db]",
    "cover": "[link to image of game cover]",
    "first_release_date": "[valid date]",
    "game_modes": [
        "[list of gamemodes, as strings]"
    ],
    "genres": [
        "[list of genres, as strings]"
    ],
    "involved_companies": [
        "[list of company names, as strings]"
    ],
    "keywords": [
        "[list of keywords, as strings]"
    ],
    "name": "[game name]",
    "platforms": [
        "[list of supported platforms, as strings]"
    ],
    "popularity": "[float representing game popularity]",
    "release_dates": [
        "[list of valid dates, if multiple releases]"
    ],
    "slug": "[no whitespace string]",
    "similar_games": [
        "[list of similar games, as strings]"
    ],
    "summary": "Summary of the game",
    "themes": [
        "[list of themes, as strings]"
    ]
}
```

**Data example**

```json
{
    "id": "1942",
    "cover": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg",
    "first_release_date": "2015-05-19",
    "game_modes": [
        "single-player"
    ],
    "genres": [
        "role-playing-rpg",
        "adventure"
    ],
    "involved_companies": [
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
    "popularity": 134.9575392270916,
    "release_dates": [
        "2015-05-19"
    ],
    "slug": "the-witcher-3-wild-hunt",
    "similar_games": [
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

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "status": 200,
    "message": "Game 1942 added successfully."
}
```

## Error Responses

**Condition** : If game already exists.

**Code** : `409 CONFLICT`

**Content** :

```json
{
    "status": 409,
    "message": "Game 1942 already exists"
}
```

**Condition** : If user not found or incorrect password or not an admin.

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
