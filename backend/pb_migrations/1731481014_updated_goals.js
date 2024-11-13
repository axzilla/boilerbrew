/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eysw4vicofta2ab")

  // remove
  collection.schema.removeField("iriwlf4w")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qbn5p2ts",
    "name": "index",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eysw4vicofta2ab")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iriwlf4w",
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

  // remove
  collection.schema.removeField("qbn5p2ts")

  return dao.saveCollection(collection)
})
