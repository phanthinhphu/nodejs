const mongoose = require('mongoose');

function getDatabaseUri() {
    if (process.env.NODE_ENV === 'production') return '';
    if (process.env.NODE_ENV === 'test') return '';
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