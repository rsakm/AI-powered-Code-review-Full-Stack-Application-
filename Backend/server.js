
require('dotenv').config();

const app = require('./src/app');

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// })

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
