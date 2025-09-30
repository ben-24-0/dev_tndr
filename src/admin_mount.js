const express = require("express");
const port=7777

const app = express() // the main app
const admin = express() // the sub app


admin.get('/', (req, res) => {
  console.log(admin.mountpath) // /admin
  res.send('Admin Homepage')
})

app.use('/admin', admin) // mount the sub app

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


