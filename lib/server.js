import express from "express"
import { engine } from "express-handlebars"
import { database } from "./in-memory-database.js"
// import {database} from './persistent-database.js';

const app = express()
app.engine("hbs", engine({ extname: ".hbs" }))

app.set("view engine", "hbs")
app.set("views", "views")

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.get("/", async (request, response) => {
  response.render("home", {
    animals: await database.getAnimals(),
  })
})

app.post("/animals/create", async (request, response) => {
  await database.addAnimal(request.body)
  response.redirect("/")
})

app.post("/animals/delete/:name", async (request, response) => {
  await database.removeAnimal(request.params.name)
  response.redirect("/")
})

app.post("/animals/favorite/:name", async (request, response) => {
  await database.favoriteAnimal(request.params.name)
  response.redirect("/")
})

app.listen(3000)
