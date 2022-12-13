const express = require('express');
const path = require('path');
const members = require('./Member');
const logger = require('./middleware/logger')

const app = express();

// init middleware
// app.use(logger);

// Gets All members
app.get('/api/members', (req, res) => res.json(members)
);

// get single member
app.get('/api/members/:id', (req, res) =>{
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ msg : `no member with the id of ${req.params.id}`})
    }
    
})
//set static folder
app.use(express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))