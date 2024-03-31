import Fastify from 'fastify'
import qrcode from 'qrcode'
import {generate} from 'promptparse'

const fastify = Fastify()

fastify.get('/:to/:amount', async function (request, reply) {

    const payload = generate.truemoney({
        mobileNo: request.params.to,
        amount: +request.params.amount,
        message: request.query.message||''
    })


    try {
        const buf = await qrcode.toBuffer(payload)

        reply.header('Content-Type', 'image/png')

        reply.send(buf)
    } catch (error) {
        reply.code(500).send({ error: 'Internal Server Error' })
    }
})

fastify.get('/', function (request, reply) {
  reply.send({ fuk: 'world', how_to: '/:to/:amount?message=' })
})

fastify.listen({ host: '0.0.0.0',port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})