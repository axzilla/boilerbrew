/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eysw4vicofta2ab")

  // remove
  collection.schema.removeField("qbn5p2ts")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iuswjkmy",
    "name": "index",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eysw4vicofta2ab")

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

  // remove
  collection.schema.removeField("iuswjkmy")

  return dao.saveCollection(collection)
})
