/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("1iclctl0wxwnrjp");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "1iclctl0wxwnrjp",
    "created": "2024-04-18 14:11:24.631Z",
    "updated": "2024-04-18 14:19:32.340Z",
    "name": "lists",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "566j1ycv",
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
        "id": "kez9w28k",
        "name": "user_id",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
