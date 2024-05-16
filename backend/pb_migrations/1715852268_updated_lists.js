/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hs4mu8y3geq2mag")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mlfcnz6h",
    "name": "board_id",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "fzr7fr3jxi3ku5o",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hs4mu8y3geq2mag")

  // remove
  collection.schema.removeField("mlfcnz6h")

  return dao.saveCollection(collection)
})
