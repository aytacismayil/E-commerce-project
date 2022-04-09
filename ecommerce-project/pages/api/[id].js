import nc from 'next-connect';

const handler = nc();

handler.get(async (req, res) => {
  const product = await client.fetch(`/api/data/${id}`, {
    id: req.query.id,
  });
  res.send(product);
});
export default handler;