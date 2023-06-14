import React from "react";

const Form = ({ book, setBook }) => {
  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  let { titulo, autor, edicion } = book;

  const handleSubmit = (e) => {
    e.preventDefault();
    // validation of fields
    if (titulo === "" || autor === "" || Number(edicion) <= 0) {
      alert("Please fill in all fields");
      return;
    }
    // add book to list
    const requestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    };
    fetch("http://localhost:9000/api", requestInit)
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setBook({
      titulo: "",
      autor: "",
      edicion: 0,
    });
    alert("Libro agregado");
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          onChange={handleChange}
          type="text"
          className="form-control"
          id="title"
          name="titulo"
          value={titulo}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="author" className="form-label">
          Author
        </label>
        <input
          onChange={handleChange}
          type="text"
          className="form-control"
          id="author"
          name="autor"
          value={autor}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="edition" className="form-label">
          Edition
        </label>
        <input
          onChange={handleChange}
          type="number"
          className="form-control"
          id="edition"
          name="edicion"
          value={edicion}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Enviar
      </button>
    </form>
  );
};

export default Form;
