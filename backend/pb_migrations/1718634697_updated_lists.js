/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hs4mu8y3geq2mag")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "muw207o7",
    "name": "index",
    "type": "number",
    "required": true,
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
  const collection = dao.findCollectionByNameOrId("hs4mu8y3geq2mag")

  // remove
  collection.schema.removeField("muw207o7")

  return dao.saveCollection(collection)
})
