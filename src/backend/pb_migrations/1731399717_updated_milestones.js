/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zbj3w9gquei28z3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2ffx7sje",
    "name": "goal_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "eysw4vicofta2ab",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zbj3w9gquei28z3")

  // remove
  collection.schema.removeField("2ffx7sje")

  return dao.saveCollection(collection)
})
