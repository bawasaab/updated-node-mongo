const mongodbUrl = 'mongodb+srv://d190129k_chikitsa:z@UKqEpMU@cluster0.3xkqp.mongodb.net/chikitsa';
// const mongodbUrlBck = 'mongodb+srv://d190129k_chikitsa:z%40UKqEpMU@cluster0.3xkqp.mongodb.net/test?authSource=admin&replicaSet=atlas-17zrkx-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true&replicaSet=Main-shard-0&authSource=admin&retryWrites=true';
let basePath = 'https://mongodb-app-2.herokuapp.com';
module.exports = {
    mongodbUrl: mongodbUrl,
    basePath: basePath,
    patientsImagePath: basePath +'/images/uploads/patients/',
    doctorsImagePath: basePath +'/images/uploads/doctors/',
}