import './App.css';
import { useState, useEffect} from 'react'

const App = () => {
  const [wisata, setWisata] = useState([]);
  const [Search, setSearch] = useState('');
  const [filteredWisata, setFilteredWisata] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    fetchData();
    // console.log("Data Telah Diambil")
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/Tempatwisata');
      const data = await response.json();
      setWisata(data);
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  const handleSearch = () => {
    const keyword = Search.trim().toLowerCase();
    if (keyword === '') {
      setFilteredWisata(wisata);
    } else {
      const filteredData = wisata.filter((item) =>
        (Array.isArray(item.kategori)
          ? item.kategori.some((kategoriItem) =>
              kategoriItem.toLowerCase().includes(keyword)
            )
          : item.kategori.toLowerCase().includes(keyword)
        ) || item.nama.toLowerCase().includes(keyword)
      );
      // console.log(keyword);
      // console.log(filteredData);
      // filteredData.forEach((item) => {
      //   if (Array.isArray(item.kategori)) {
      //     item.kategori.forEach((kategoriItem) => {
      //       if (kategoriItem.toLowerCase().includes(keyword)) {
      //         console.log(kategoriItem.toLowerCase());
      //       }
      //     });
      //   } else if (item.kategori.toLowerCase().includes(keyword)) {
      //         console.log(item.kategori.toLowerCase());
      //   }
      //   else {
      //     if (item.nama.toLowerCase().includes(keyword)) {
      //       console.log(item.nama)
      //     }
      //   }
      // });
      setFilteredWisata(filteredData);
    }
    setIsSearched(true);
  };
  
  const resetSearch = () => {
    setFilteredWisata(wisata);
    setIsSearched(false);
  }

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <input type="text" value={Search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari berdasarkan kategori atau nama"
          />
          <button onClick={handleSearch}>Cari</button>
          <button onClick={resetSearch}>Hapus Pencarian</button>
        </div>
      </header>
      <div className="card-container">
      {(isSearched? filteredWisata : wisata).length > 0 ? (
        (isSearched? filteredWisata : wisata).map((item) => (
          <div key={item.id} className="card">
            <h2>{item.nama}</h2>
            <img src={item.gambar} alt={item.nama} />
            <p>Tiket Masuk: {item.harga}</p>
            <p>Alamat: {item.alamat}</p>
            <p>Jadwal Buka: {item.jadwal_buka}</p>
            <a href={item.link_gmaps}>Lihat di Google Maps</a>
          </div>
        ))
      ) : (
        <div className="dataNotfound">
          <p>Tidak ada hasil untuk pencarian "{Search}", Anda dapat mencoba dengan kata kunci lain!</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default App;

