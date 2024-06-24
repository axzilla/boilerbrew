/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q9klot52d5vj3h8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "slxrxbqp",
    "name": "index",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q9klot52d5vj3h8")

  // remove
  collection.schema.removeField("slxrxbqp")

  return dao.saveCollection(collection)
})
