# API documentation

All API requests are prepended with `/api`.

## Open Endpoints

Open endpoints require no Authentication.

* [Login](users/login.md) : `POST /users/signin/`
* [Sign up](users/signup.md) : `POST /users/signup/`
* [Reset password request](users/resetpassreq.md) : `PUT /users/sendpasswordreset/`
* [Reset password](users/resetpass.md) : `PUT /users/resetpassword/:token/`

* [Get all Games](games/getall.md) : `GET /getGames/`
* [Get single Game](games/getsingle.md) : `GET /getGame/:id`

## Endpoints that require special Authentication

Closed endpoints which require a unique type of authentication, a streamkey. Streamkeys are assigned
to users and are required for starting/ending livestreams. Used within the backend and not
directly by frontend.

### Livestreams

Endpoints to start/end livestreams. These endpoints are prepended with `/livestreams`.

* [Show info](livestreams/info.md) : `GET /info/`
* [Get Thumbnail](livestreams/thumbnail.md) : `GET /thumbnail/`
* [Start Livestream](livestreams/start.md) : `POST /start/`
* [End Livestream](livestreams/end.md) : `POST /end/`

## Endpoints that require Authentication

Closed endpoints require authentication through cookie. Cookie will be automatically assigned
on signup/login.

### Users

Basic user info and management. These endpoints are prepended with `/users`.

* [Show info](users/info.md) : `GET /`
* [Sign out](users/signout.md) : `GET /signout/`
* [Stream key](users/streamkey.md) : `GET /streamkey/?username=[id]`
* [See users](users/users.md) : `GET /getUsers/`
* [Change password](users/password.md) : `PUT /setpassword/`

### Collections

Information and collection manipulation for users. These endpoints are prepended with `/collections`.

* [Get single Collection](collections/getsingle.md) : `GET /getCollection/`
* [Get all Collections](collections/getall.md) : `GET /getCollections/`
* [Add a Collection](collections/add.md) : `POST /addCollection/`
* [Delete a Collection](collections/del.md) : `POST /deleteCollection/`

### Games

Games specific endpoint for updating the overall game library. Accessible by admins.

* [Add a Game to the library](games/add.md) : `POST /addGame/`
