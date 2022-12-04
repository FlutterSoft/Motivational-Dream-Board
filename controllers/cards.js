// Import the model for User from models folder
const Card = require("../models/Card");

// Users Controller
module.exports = {
    // Gets a list of all users and renders views/users page passing in the list to the ejs
    getCards: async (req, res) => {
        try{
            let cards = await Card.find({ user: req.user.id })
            res.render("cards", { cards: cards, user: req.user });
        }
        catch(err){
            console.log(err)
        }
    },
    // Adds a new user to the DB 
    addCard: async (req, res) => {
        try {
            console.log(req.body)
            // Only if both name and position filled
            if(req.body.dream && req.body.dreamTopic){
                // Mongoose creates a new user in DB
                await Card.create({
                    dream: req.body.dream,
                    dreamTopic: req.body.dreamTopic,
                    user: req.user.id,
                  });
                  console.log("Card has been added!");
            }
            else{
                console.log("Details missing.")
            }
            res.redirect("/cards");
        } 
        catch(err) {
            console.log(err);
        }
    },
    // Delete a user from the DB
    deleteCard: async (req, res) => {
        try {
            let card = await Card.findById({ _id: req.params.id })
            await Card.deleteOne({ _id: req.params.id })
            console.log("Card has been deleted!");
            res.redirect("/cards"); 
        } 
        catch(err) {
            console.log(err);
            res.redirect("/cards")
        }
    }
  }
  

