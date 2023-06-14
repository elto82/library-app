import BookList from "./components/BookList";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
function App() {
  const [book, setBook] = useState({
    titulo: "",
    autor: "",
    edicion: 0,
  });
  const [books, setBooks] = useState([]);
  const [listUpdated, setListUpdated] = useState(false);

  useEffect(() => {
    const getBooks = () => {
      fetch(`http://localhost:9000/api`)
        .then((res) => res.json())
        .then((res) => setBooks(res.rows));
    };
    getBooks();
    setListUpdated(false);
  }, [book, listUpdated]);

  return (
    <>
      <Navbar brand="library app" />
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <h2 style={{ textAlign: "center" }}>Book Library</h2>
            <BookList
              books={books}
              setListUpdated={setListUpdated}
              book={book}
              setBook={setBook}
            />
          </div>
          <div className="col-md-5">
            <h2 style={{ textAlign: "center" }}>Book Form</h2>
            <Form book={book} setBook={setBook} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
