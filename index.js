import express,{request,response} from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv"
import cors from "cors";


const app=express();
dotenv.config();

app.use(express.json());
app.use(cors())


const MONGO_URL=process.env.MONGO_URL
const PORT=process.env.PORT

app.listen(PORT,()=>console.log("Server started"));
app.get("/",(request,response)=>{response.send("helo from expreees data gg boi")})


//creating client
async function createConnection(){
    const client=new MongoClient(MONGO_URL);
    await client.connect();
    return client
}

//get method for students
app.get("/students",async(request,response)=>{
    const client=await createConnection()
    const result=await client
       .db("student-mentor")
       .collection("students")
       .find({})
       .toArray();
    response.send(result)
   })

//post  method for students
app.post("/students",async(request,response)=>{
    const userData=request.body;
    const client=await createConnection()
    const result=await client
      .db("student-mentor")
      .collection("students")
      .insertMany(userData)
    response.send(result)
  })

//get method for mentors
app.get("/mentors",async(request,response)=>{
    const client=await createConnection()
    const result=await client
       .db("student-mentor")
       .collection("mentors")
       .find({})
       .toArray();
    response.send(result)
   })

//post method for mentors
app.post("/mentors",async(request,response)=>{
    const userData=request.body;
    const client=await createConnection()
    const result=await client
      .db("student-mentor")
      .collection("mentors")
      .insertMany(userData)
    response.send(result)
  })