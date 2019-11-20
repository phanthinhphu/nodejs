const mongoose = require('mongoose');

function getDatabaseUri() {
    if (process.env.NODE_ENV === 'production')
        return 'mongodb+srv://phu:phu147@cluster0-haxly.mongodb.net/test?retryWrites=true&w=majority';
    return 'mongodb://localhost:27017/manageLibrary';
}
mongoose.set('useFindAndModify', false);
mongoose.connect(getDatabaseUri(), {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then(result => console.log('Database connected !!!'))
    .catch(error => {
        console.log(error.message);
        process.exit(1);
    });