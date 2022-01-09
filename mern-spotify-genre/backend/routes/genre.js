const router = require('express').Router();
let Genre = require('../models/genre.model');

router.route('/').get((req, res) => {
    Genre.find()
        .then(genres => res.json(genres))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const genre = req.body.genre;
    const likes = Number(req.body.likes);
    const dislikes = Number(req.body.dislikes);

    const newGenre = new Genre({
        genre,
        likes,
        dislikes,
    });

    newGenre.save()
        .then(() => res.json('Genre Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Genre.findById(req.params.id)
        .then(genre => res.json(genre))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Genre.findByIdAndDelete(req.params.id)
        .then(() => res.json('Genre deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Genre.findById(req.params.id)
        .then(genres => {
            genres.genre = req.body.genre;
            genres.likes = Number(req.body.likes);
            genres.dislikes = Number(req.body.dislikes);

            genres.save()
                .then(() => res.json('Genre Updated'))
                .catch(err => res.status(400).json('Error' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;