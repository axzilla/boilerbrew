/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q9klot52d5vj3h8")

  collection.viewRule = ""
  collection.createRule = "@request.auth.id != \"\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q9klot52d5vj3h8")

  collection.viewRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
})
