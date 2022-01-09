import express,{request,response} from "express";
import { MongoClient, ObjectId } from "mongodb";
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

app.get("/students/:id",async(request,response)=>{
        const {id}=request.params
        
        const client=await createConnection()
        const result=await client
          .db("student-mentor")
          .collection("students")
          .find({})
          .toArray();
        
        const k=result.filter((e)=> e._id == id)
        response.send(k.length < 1 ? "not found":k)
   
})

app.delete("/students/:id",async(request,response)=>{
    const {id}=request.params
    const client=await createConnection()
    const result=await client
      .db("student-mentor")
      .collection("students")
      .deleteOne({_id:ObjectId(id)})
    response.sendStatus(200)
})

//post  method for students
app.post("/students",async(request,response)=>{
    const userData=request.body;
    const client=await createConnection()
    const result=await client
      .db("student-mentor")
      .collection("students")
      .insertOne(userData)
    response.send(result)
  })


// app.post("/students",async(request,response)=>{
//     const userData=request.body;
//     const client=await createConnection()
//     const result=await client
//       .db("student-mentor")
//       .collection("students")
//       .insertMany(userData)
//     response.send(result)
//   })

//update students
app.put("/students/:id",async(request,response)=>{
    const {id}=request.params
    const userData=request.body;
    const client=await createConnection()
    const result=await client
      .db("student-mentor")
      .collection("students")
      .updateOne({_id:ObjectId(id)},{$set:userData})
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

app.get("/mentors/:id",async(request,response)=>{
    const {id}=request.params
    const client=await createConnection()
    const result=await client
      .db("student-mentor")
      .collection("mentors")
      .find({})
      .toArray();
    
    const k=result.filter((e)=> e._id == id)
    response.send(k.length < 1 ? "not found":k)

})

//post method for mentors
app.post("/mentors",async(request,response)=>{
    const userData=request.body;
    const client=await createConnection()
    const result=await client
      .db("student-mentor")
      .collection("mentors")
      .insertOne(userData)
    response.send(result)
  })

  app.delete("/mentors/:id",async(request,response)=>{
    const {id}=request.params
    const client=await createConnection()
    const result=await client
      .db("student-mentor")
      .collection("mentors")
      .deleteOne({_id:ObjectId(id)})
    response.sendStatus(200)
})


  app.put("/mentors/:id",async(request,response)=>{
    const {id}=request.params
    const userData=request.body; 
    const client=await createConnection()
    const result=await client
      .db("student-mentor")
      .collection("mentors")
      .updateOne({_id:ObjectId(id)},{$set:userData})
    response.send(result)
})

app.get("/UpdateMultiple",async(request,response)=>{
    const client=await createConnection()
    const result=await client
       .db("student-mentor")
       .collection("students")
       .find({mentor:""})
       .toArray();
    response.send(result)
   })

// app.put("/UpdateMultiple",async(request,response)=>{
//     const client=await createConnection()
//     const userData=request.body; 
//     console.log(userData)
//     const data=userData.data
//     const nmentor=userData.mentor
//     const modata=data.map((e)=>`ObjectId(${e})`)
//     console.log(data)
//     console.log(modata)
//     console.log(nmentor)

//     // const temp=
    
//     const result=await client
//        .db("student-mentor")
//        .collection("students")
//        .updateMany({_id: ObjectId(data[0])},{$set:{mentor:nmentor}})
//     response.send(result)


//     // const result=await client
//     //    .db("student-mentor")
//     //    .collection("students")
//     //    .updateMany({_id: {$in:data} },{$set:{mentor:nmentor}})
//     // response.send(result)



//    })


   app.put("/UpdateMultiple",async(request,response)=>{
    const client=await createConnection()
    const userData=request.body; 
    console.log(userData)
    const data=userData.data
    const nmentor=userData.mentor
    const modata=data.map((id)=>ObjectId(id))
    
    // const temp=
    
    // const result=await client
    //    .db("student-mentor")
    //    .collection("students")
    //    .finf({_id: {$in{[]]}},{$set:{mentor:nmentor}})
    // response.send(result)


    const result=await client
       .db("student-mentor")
       .collection("students")
    //    .find({_id: {$in: modata} })
    //    .toArray()
       .updateMany({_id: {$in: modata}} ,{$set:{mentor:nmentor}})
    response.send(result)



   })

