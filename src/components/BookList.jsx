import React, { useEffect } from "react";

const BookList = ({ books, setListUpdated, book, setBook }) => {
  const handleDelete = (id) => {
    const request = {
      method: "DELETE",
    };
    fetch(`http://localhost:9000/api/${id}`, request)
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setListUpdated(true);
  };

  let { titulo, autor, edicion } = book;

  const handleUpdate = (id) => {
    if (titulo === "" || autor === "" || Number(edicion) <= 0) {
      alert("Please fill in all fields");
      return;
    }
    const request = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    };
    fetch(`http://localhost:9000/api/${id}`, request)
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    alert("Edited book");
    setListUpdated(true);

    setBook({
      titulo: "",
      autor: "",
      edicion: 0,
    });
  };

  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          {/* <th>ID</th> */}
          <th>TITLE</th>
          <th>AUTHOR</th>
          <th>EDITION</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            {/* <td>{book.id}</td> */}
            <td>{book.titulo}</td>
            <td>{book.autor}</td>
            <td>{book.edicion}</td>
            <td>
              <div className="mb-3">
                <button
                  onClick={() => handleDelete(book.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
              <div className="mb-3">
                <button
                  onClick={() => handleUpdate(book.id)}
                  className="btn btn-warning"
                >
                  Update
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookList;
