/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hs4mu8y3geq2mag")

  collection.listRule = "@request.auth.id = user_id"
  collection.viewRule = ""
  collection.updateRule = "@request.auth.id = user_id"
  collection.deleteRule = "@request.auth.id = user_id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hs4mu8y3geq2mag")

  collection.listRule = null
  collection.viewRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
