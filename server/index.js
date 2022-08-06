import express from 'express';
import cors from 'cors';
import {writeFile, readFile} from 'fs/promises';

const BASKET = './public/basket_goods.json'
const GOODS = './public/goods.json'

function getGoods() {
  return readFile(GOODS_PATH, 'utf-8').then((file) => JSON.parse(file))
}

function getBasket() {
  return readFile(GOODS_PATH, 'utf-8').then((file) => JSON.parse(file))
}

function getReformBasket () {
  return Promise.all([
    getGoods(),
    getBasket()
   ]).then(([goods, basket]) => {
    const result = basket.map((basketGood) => {
      const { id: _basketId } = basketGood;
      const good = goods.find(({ id: _goodsId}) => _basketId == _goodsId);
      return {
        ...basketGood,
        ...good
      }
    })
    return result
   })
}

const app = express();
app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));

  const readBasket = () => readFile(BASKET, 'utf-8')
  .then((basketFile) => {
      return JSON.parse(basketFile)
  })
  const readGoods = () => readFile(GOODS, 'utf-8')
  .then((basketFile) => {
      return JSON.parse(basketFile)
  })
  
  app.post('/basket', (res, req) => {
    getBasket().then((basket) => {
      const basketItem = basket.find(({id: _id}) => _id === res.body.id)
      if (!basketItem) {
        basket.push ({
          id: res.body.id, 
          count: 1,
        })
      } else {
        basket = basket.map((basketItem) => {
          if (basketItem.id === res.body.id) {
            return {
              ...basketItem,
              count: basketItem + 1
            }
          } else {
            return basketItem
          }
        })
      }
      return writeFile(BASKET_PATH, JSON.stringify(basket)).then(() => {
        return getReformBasket()
      }).then((result) => {
        req.send(result)
      })
    })
    
  })

  app.delete(('/basket', (res, req) => {
    getBasket().then((basket) => {
      const basketItem = basket.find(({id: _id}) => _id === res.body.id)
      if (!basketItem) {
        basket.pop ({
          id: res.body.id, 
          count: 1,
        })
      } else {
        basket = basket.map((basketItem) => {
          if (basketItem.id === res.body.id) {
            return {
              ...basketItem,
              count: basketItem - 1
            }
          } else {
            return basketItem
          }
        })
      }
      return writeFile(BASKET_PATH, JSON.stringify(basket)).then(() => {
        return getReformBasket()
      }).then((result) => {
        req.send(result)
      })
    })
  })
  )
  app.get('/basket', (res, req) => {
   getReformBasket().then((result) => {
    req.send(JSON.stringify(result))
  })
})

  app.listen('8000', () => {
    console.log('server is starting!');
  });