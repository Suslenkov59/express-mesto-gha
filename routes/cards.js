const cardRouter = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  removeLike,
} = require('../controllers/cards');

/* возвращает все карточки/создать/удалить */
cardRouter.get('/', getCards);
cardRouter.post('/', createCard);
cardRouter.delete('/:cardId', deleteCard);
/* Поставить/ убрать лайк */
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', removeLike);

module.exports = cardRouter;
