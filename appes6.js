class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    //create element
    const row = document.createElement("tr");
    //insert cols
    row.innerHTML = `<td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class = "delete">X<a></td>`;

    list.appendChild(row);
  }
  showAlert(message, className) {
    //create div
    const div = document.createElement("div");
    //add classes
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    //get parent
    const container = document.querySelector(".container");
    //get form
    const form = document.querySelector("#book-form");
    //insert alert
    container.insertBefore(div, form);
    //timeout after 3 sec
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  deleteBook(target, ui) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
      //show message
      ui.showAlert("Book removed.", "success");
    }
  }
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

//event listeners

document.getElementById("book-form").addEventListener("submit", function(e) {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;
  //instantiate book
  const book = new Book(title, author, isbn);
  //instantiate ui
  const ui = new UI();
  //validate
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Fill in all fields", "error");
  } else {
    //add book to list
    ui.addBookToList(book);
    //show sucess
    ui.showAlert("Book Added!", "success");
    //clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

document.getElementById("book-list").addEventListener("click", function(e) {
  const ui = new UI();
  ui.deleteBook(e.target, ui);
  e.preventDefault();
});