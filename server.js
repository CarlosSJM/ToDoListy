var express = require('express');
var bodyParser = require('body-parser');
var app     = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));


/*npm install moongoose --save*/
//asi metemos mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
//para acceder a mongoose hay acceder a mongod x consola -->  sudo mongod
var db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error:'));//no ha conectado

db.once('open', function(){
    //estamos conectado!!!! esta funcion nos conecta con la base de datos
    console.log("MOOOOOONGO CONECSION!!");
});

//definimos un schema de mongoose fuera del server modularizado en models/BookModel.js 
//llamamos al modulo book
const Book = require('./models/BookModel')
//const book = new Book({title:' el señor de los anillos'});//creamos un obejeto de la clase book y le ponemos un titulo



let toDoList = [
    {
        id: "0",
        title: "Hacer portfolio",
        description: "Landjaeger tail sausage jerky beef ribs ham bresaola ball tip. Pig turkey meatloaf, bresaola ground round tenderloin jerky short ribs bacon. Leberkas ribeye drumstick ground round capicola pork chop. Kevin shankle pork loin, doner short loin pork chop salami shoulder turducken beef andouille leberkas prosciutto pork boudin."
    },
    {
        id: "1",
        title: "Hacer HubFlix",
        description: "Porchetta brisket ribeye, cow pork loin andouille rump capicola pig prosciutto burgdoggen boudin. T-bone jowl ham, shank short loin filet mignon leberkas shoulder. Pastrami ball tip shankle prosciutto bacon flank swine rump andouille biltong salami cupim pork loin brisket. Salami meatball burgdoggen sausage ribeye corned beef brisket."
    },
    {
        id: "2",
        title: "Hacer la compra",
        description: "Drumstick boudin ham hock jerky buffalo spare ribs beef. Ham hock porchetta ham leberkas short ribs buffalo salami. Flank pork loin chicken burgdoggen cupim picanha meatloaf boudin. Burgdoggen jerky short loin cupim. Bacon chuck filet mignon tongue, bresaola kielbasa cow t-bone corned beef."
    },
    {
        id: "3",
        title: "Ir al banco",
        description: "Jowl sausage capicola venison frankfurter, boudin kevin rump swine porchetta turkey turducken bresaola sirloin. Andouille ribeye meatball pork belly pork loin tenderloin leberkas corned beef beef. Cow ball tip filet mignon short loin. "
    },
    {
        id: "4",
        title: "Llevar moto al taller",
        description: "Pork belly fatback filet mignon frankfurter. Shoulder bresaola tail sirloin venison jerky burgdoggen short loin tenderloin kevin pancetta. Venison hamburger pork loin t-bone kevin ball tip turkey. "
    },
    {
        id: "5",
        title: "Hacer listas",
        description: "Andouille ribeye meatball pork belly pork loin tenderloin leberkas corned beef beef. Cow ball tip filet mignon short loin. "
    },
    ,
    {
        id: "6",
        title: "Pensar Cosas",
        description: "Shoulder bresaola tail sirloin venison jerky burgdoggen short loin tenderloin kevin pancetta. Venison hamburger pork loin t-bone kevin ball tip turkey. "
    },
    ,
    {
        id: "7",
        title: "Hacer Proyectos",
        description: "Boudin kevin rump swine porchetta turkey turducken bresaola sirloin. Andouille ribeye meatball pork belly pork loin tenderloin leberkas corned beef beef. Cow ball tip filet mignon short loin. "
    },

];

/////entry point para book schema con mongo////////////////
///nuevo libro
app.get('/newBook', (req, res) => {
    //res.send(toDoList);
    const book = new Book({title:' el señor de los anillos'});
    book.save((err, storedBook) =>{
        if(err){
            return res.status(500).send({"error" : "fallo"})
        }
        return res.json(storedBook)
    });
});
/////mostrar todos los libros
app.get('/showBooks', (req, res) => {
    //res.send(toDoList);
    Book.find(function(err,books){
        if(err){
            return res.status(500).send({"error" : "fallo"})
        }
        console.log(books)
        return res.json(books)
    });
});
//////Put books modificar registro y guardarlo

app.put('/findBookByID', (req, res) => {
    Book.findById("5cd407d918bce8039b067059" ,function(err,books){
        if(err){
            return res.status(500).send({"error" : "fallo"})
        }
        //const book = new Book({title:' SharkNado 21'});
        book.title= "SharkNado 21";
       book.save((err, storedBook) =>{
        if(err){
            return res.status(500).send({"error" : "fallo"})
        }
        return res.json(storedBook)
    });
       
});
    //sharknado 21
    /*const idElement = req.params.id;
    var element = toDoList.find(function(element) {
        if (element != undefined) {
            return element.id == idElement;
        }
    });
    var elementIndex = toDoList.indexOf(element);

    var updatedElement = req.body;

    toDoList[elementIndex] = updatedElement;
    res.send(toDoList);
    https://mongoosejs.com/docs/api.html#model_Model.findById
    */
});


///fin book
app.get('/toDoElement', (req, res) => {
    res.send(toDoList);
});


app.post('/toDoElement', (req, res) => {
    toDoList.push(req.body);
    res.send(toDoList);
});


app.delete('/toDoElement/:id', (req, res) => {
    const idElement = req.params.id;
    var element = toDoList.find(function(element) {
        if (element != undefined) {
            return element.id == idElement;
        }
    });
    var elementIndex = toDoList.indexOf(element);
    console.log(elementIndex);
    delete toDoList[elementIndex];
    var filteredToDoList = toDoList.filter(function (el) {
        return el != null;
    });
    res.send(filteredToDoList);
    });

app.put('/todoElement/:id', (req, res) => {
    const idElement = req.params.id;
    var element = toDoList.find(function(element) {
        if (element != undefined) {
            return element.id == idElement;
        }
    });
    var elementIndex = toDoList.indexOf(element);

    var updatedElement = req.body;

    toDoList[elementIndex] = updatedElement;
    res.send(toDoList);
});

///////DELEte BOOKS
//falta

app.listen(3000);
