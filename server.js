import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//
const app = express();
app.use(express.json());
app.use(cors());

// Creating a user
app.post("/users", async (req, res) => {
  // Criando um novo usuario
  await prisma.user.create({
    // Passando os dados do usuario
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  // Retornando o status 201 e os dados do usuario
  res.status(201).json(req.body);
});

// Editing a user
app.put("/users/:id", async (req, res) => {
  // Atualizando um usuario existente
  await prisma.user.update({
    // Passando o ID do usuario a ser atualizado
    where: {
      id: req.params.id,
    },
    // Passando os dados do usuario a ser atualizado
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  // Retornando o status 201 e os dados do usuario
  res.status(201).json(req.body);
});

// Deleting a user
app.delete("/users/:id", async (req, res) => {
  // Deletando um usuario com base no ID
  await prisma.user.delete({
    // Passando o ID do usuario a ser deletado
    where: {
      id: req.params.id,
    },
  });

  // Retornando o status 200 e uma mensagem de confirmacao
  res.status(200).json({ message: "User has just been deleted" });
});

// Listing all users
app.get("/users", async (req, res) => {
  let users = []

  if(req.query){
    users = await prisma.user.findMany({
      // Filtrando os usuarios com base nos parametros de query
      where: {
        name: req.query.name,
        email: req.query.email,
        age: req.query.age
      }       
    })
  } else{
    // Caso contrario, retorna todos os usuarios
    users = await prisma.user.findMany()
  }
 
  // Retornando o status 200 e a lista de usuarios
  res.status(200).json(users);
});
app.listen(3000);

/*
Objective: Create our users API

1. Create a user
2. List all user
3. Delete a user
4. Update a user


 */

// {
//   "email":"gabriellimartins95@hotmail.com",
//   "name":"Gabrielli Martins",
//   "age":"29"
// }
