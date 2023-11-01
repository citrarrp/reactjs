const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Menambahkan endpoint khusus untuk pencarian berdasarkan kategori
server.get('/Tempatwisata', (req, res) => {
  const kategori = req.query.kategori;
  const data = router.db.get('Tempatwisata').filter({ kategori: kategori }).value();
  res.json(data);
});

server.use(router);
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
