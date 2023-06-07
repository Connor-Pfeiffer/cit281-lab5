/*
    CIT 281 Lab 5
    Name: Connor Pfeiffer
*/

const fastify = require("fastify")();
// Get route and JSON/object reply

//Array of students
const students = [
    {
      id: 1,
      last: "Last1",
      first: "First1",
    },
    {
      id: 2,
      last: "Last2",
      first: "First2",
    },
    {
      id: 3,
      last: "Last3",
      first: "First3",
    }
  ];


fastify.get("/cit/student:", (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({students});
});


//Return a single student
fastify.get("/cit/student/:id", (request, reply) => {
    const { id } = request.params;
    let student = null;
    for(const item of students){
        if(item.id === parseInt(id)){
            student = item;
            break;
        }
    }
    if(!student) {
      reply
      .code(404)
      .header("Content-Type", "text/html; charset=utf-8")
      .send("Not Found");
    }
    else {
      reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({student});
    }
  });


//Unmatched route handler using astrisk as the wildcard for all other routes than what is written
fastify.get("*", (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send("<h1>Unsupported request or page!</h1>");
});


//add a student using post
fastify.post("/cit/student", (request, reply) => {
  //deconstruturing using last and first as variables
  const {last, first} = request.body;
  if(!last || !first){
    reply
    .code(404)
    .header("Content-Type", "text/html; charset=utf-8")
    .send("Not Found");
  }
  else {
    let id = 0
    //first student object from students array
    for(const student of students){
      if(student.id > id) {
        id = student.id;
      }
    }
    id++;
    //push method will add the objectto the students array
    students.push({ id, last, first });
    reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    //index always starts at 0. Loop/ID will have started at 1 therefore you need to -1 for index
    .send(students[students.length -1]);
  }
  let response = request.body;
  reply
  .code(200)
  .header("Content-Type", "application/json; charset=utf-8")
  .send(response);
});


// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8082;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
