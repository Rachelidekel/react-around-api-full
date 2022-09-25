const Card = require('../models/card');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

const getCards = (req, res, next) =>
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            `${Object.values(err.errors)
              .map((error) => error.message)
              .join(',')}`
          )
        );
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;
  Card.findById(id)
    .orFail(() => {
      throw new NotFoundError('No card found with that id');
    })
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        next(new ForbiddenError("You cannot delete someone else's card"));
      } else {
        Card.deleteOne(card).then(() => res.send({ data: card }));
      }
    })
    .catch(next);
};

const updateLike = (req, res, next, method) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { [method]: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError('No card found with this id');
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};

const likeCard = (req, res, next) => updateLike(req, res, next, '$addToSet');

const dislikeCard = (req, res, next) => updateLike(req, res, next, '$pull');

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };
