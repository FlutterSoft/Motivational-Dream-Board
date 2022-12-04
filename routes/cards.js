// Members Routes
const express = require('express')
const router = express.Router()
const { ensureAuth } = require("../middleware/auth");
const cardsController = require("../controllers/cards")

router.get('/', ensureAuth, cardsController.getCards)

router.post('/addCard', cardsController.addCard)

// Important to keep at the bottom as the code cascades and will read anything after '/' as a paramter
// Same as the routers below but tidies it up
router
    .route("/:id")
    .get((req, res) => {
        res.send(`Finding card: ${req.params.id}`)
    })
    .put((req, res) => {
        res.send(`Updating card: ${req.params.id}`)
    })
    .delete(cardsController.deleteCard)



module.exports = router