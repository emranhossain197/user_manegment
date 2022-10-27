const userSchema = require('../module/index')
const route = {}
// create user 
route.create = async (req, res) => {

    if (req.body) {
        const user = new userSchema({
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            status: req.body.status
        })

        // save user in the database
        user
            .save(user)
            .then(data => {
                // res.send(data)
                console.log(data);
                res.redirect('/add-user');
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating a create operation"
                });
            });
    } else {
        res.status(400).send({ message: "Content can not be emtpy!" });
    }

}

// find user 
route.find = async (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        userSchema.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found user with id " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Erro retrieving user with id " + id })
            })

    } else {
        userSchema.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving user information" })
            })
    }
}

// update the user
route.update = (req, res) => {

    if (req.params.id) {
        if (req.body) {
            console.log(req.body);
            const id = req.params.id
            userSchema.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
                .then(data => {
                    if (!data) {
                        res.status(404).send({ Error: "user information not updated!" })
                    } else {
                        res.status(200).send(data)
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            res.status(404).send({ Error: "user information not updated!" })
        }

    } else {
        res.status(500).send({ Error: "user are not valid!" })
    }
}

// delete the user 

route.delete = (req, res) => {
    if (req.params.id) {
        const id = req.params.id
        userSchema.findByIdAndDelete(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
                } else {
                    res.send({
                        message: "User was deleted successfully!"
                    })
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete User with id=" + id
                });
            });
    } else {
        res.status(404).send({ Error: "There are not valid id " })
    }
}

module.exports = route;