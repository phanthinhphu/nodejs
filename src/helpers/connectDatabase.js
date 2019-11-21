const mongoose = require('mongoose');

function getDatabaseUri() {
    if (process.env.NODE_ENV === 'production')
        return 'mongodb://phanthinhphu:phanthinhphu147@ds219055.mlab.com:19055/library';
    return 'mongodb://localhost:27017/manageLibrary';
    //return 'mongodb+srv://test:phu123@phanphu-ktiiq.mongodb.net/test?retryWrites=true&w=majority';
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