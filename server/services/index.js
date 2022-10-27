const service = {}
const axios = require('axios')
service.HomeRoute = (req, res) => {
    axios.get('http://localhost:3000/api/user')
        .then(response => {
            res.render("home", { users: response.data })

        })
        .catch(err => {
            console.log(err);
        })
}
service.addRoute = (req, res) => {
    res.render('add_user')
}

service.updateRoute = (req, res) => {
    axios.get('http://localhost:3000/api/user', { params: { id: req.query.id } })
        .then(function (userdata) {
            res.render("update_user", { user: userdata.data })
            // const users = userdata.data.find({ "_id": req.query.id })
            // console.log(users);
        })
        .catch(err => {
            res.send(err);
        })
}

module.exports = service;