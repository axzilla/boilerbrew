/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("fzr7fr3jxi3ku5o");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "fzr7fr3jxi3ku5o",
    "created": "2024-05-16 09:33:16.660Z",
    "updated": "2024-08-03 17:41:00.303Z",
    "name": "boards",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rwsrdlm5",
        "name": "title",
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
        "id": "dgwnkzxx",
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
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.id = user_id",
    "viewRule": "@request.auth.id = user_id",
    "createRule": "@request.auth.id != \"\"",
    "updateRule": "@request.auth.id = user_id",
    "deleteRule": "@request.auth.id = user_id",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
