/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q9klot52d5vj3h8")

  collection.name = "todos"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q9klot52d5vj3h8")

  collection.name = "todo"

  return dao.saveCollection(collection)
})
