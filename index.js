import { PrismaClient } from '@prisma/client'
import dotenv from "dotenv"
dotenv.config();
import express from 'express'
const PORT =  3000;
const app = express();
app.use(express.json());

const prisma = new PrismaClient()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Create User
app.post('/users', async (req, res) => {
    try {
      const newUser = await prisma.user.create({
        data: {
          name: req.body.name,
          email: req.body.email,
        },
      })
      res.json(newUser)
    } catch (err) {
      console.error(err)
      res.status(400).json({ message: 'Error creating user' })
    }
  })

  app.get('/users', async (req, res) => {
        try {
            prisma.user.findMany({
                include:{todos:true}
            }).then((data)=>{
                res.json(data)
            })
        } catch (error) {
            
        }
  })

  app.get('/user/:id', async (req, res) => {

    try {
        prisma.user.findMany({
            where:{id:req.params.id},
            include:{todos:true}
        }).then((data)=>{
            res.json(data)
        })
    } catch (error) {
        
    }
  })
  

  app.put('/user/:id', async (req, res) => {
      try {
        const updatedData={
            name:req.body.name,
            email:req.body.email
        }

        prisma.user.update({
            where:{id:req.params.id},
            data:updatedData
        }).then((data)=>{
            res.json(data)
        })

      } catch (error) {
        
      }
  })

  // TODO 
  app.post('/todos', async (req, res) => {
    try {
      const newTodo = await prisma.todo.create({
        data: {
          title: req.body.title,
          description: req.body.description, // Add description field
          userId: req.body.userId, // Associate with a user (optional)
        },
      })
      res.json(newTodo)
    } catch (err) {
      console.error(err)
      res.status(400).json({ message: 'Error creating todo' })
    }
  })


  app.get('/todos', async (req, res) => {

    prisma.todo.findMany({
        include:{user:true}
    }).then((data)=>{
        res.json(data)
    })

  })