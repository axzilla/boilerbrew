/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("hs4mu8y3geq2mag");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "hs4mu8y3geq2mag",
    "created": "2024-04-29 08:56:32.640Z",
    "updated": "2024-08-06 09:16:49.242Z",
    "name": "lists",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ih0mkyme",
        "name": "name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "y1hresm1",
        "name": "user_id",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "mlfcnz6h",
        "name": "board_id",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "fzr7fr3jxi3ku5o",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "muw207o7",
        "name": "index",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": null,
          "noDecimal": true
        }
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.id = user_id",
    "viewRule": "",
    "createRule": "@request.auth.id != \"\"",
    "updateRule": "@request.auth.id = user_id",
    "deleteRule": "@request.auth.id = user_id",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
