
require('dotenv').config();

const app = require('./src/app');

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// })

app.listen(4000, () => {
    console.log('Server running on port 4000');
});