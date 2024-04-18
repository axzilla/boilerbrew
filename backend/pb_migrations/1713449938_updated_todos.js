/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q9klot52d5vj3h8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "trzfifzq",
    "name": "list",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "1iclctl0wxwnrjp",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q9klot52d5vj3h8")

  // remove
  collection.schema.removeField("trzfifzq")

  return dao.saveCollection(collection)
})
