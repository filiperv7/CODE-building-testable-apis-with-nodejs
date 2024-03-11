import express from 'express'

const router = express.Router()

app.get('/', (req, res) =>
  res.send([
    {
      name: 'Default product',
      description: 'Product description',
      price: 100
    }
  ])
)

export default router
