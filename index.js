const { app, port } = require('./app');

app.listen(port, () => console.log(`Application started on port : ${port}`));
