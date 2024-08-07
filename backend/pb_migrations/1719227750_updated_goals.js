/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xxw0qijp3sbgnj0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "phxuqxuv",
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
  const collection = dao.findCollectionByNameOrId("xxw0qijp3sbgnj0")

  // remove
  collection.schema.removeField("phxuqxuv")

  return dao.saveCollection(collection)
})
