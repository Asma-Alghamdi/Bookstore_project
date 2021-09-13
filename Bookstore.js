//The available books
Books = [
    [1, "Start with why", "Simon Sinek", 80.0, 13],
    [2, "But how do it know", "J. Clark Scott", 59.9, 22],
    [3, "Clean Code", "Robert Cecil Martin", 50.0, 5],
    [4, "Zero to One", "Peter Thiel", 45.0, 12],
    [5, "You don't know JS", "Kyle Simpson", 39.9, 9]
]

let bookID = Books[Books.length-1][0] + 1; 


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

console.log("\nWelcome to our Bookstore!")
console.log("--------------------------------------------\n")
console.log("WHAT DO YOU WANT?\n")
console.log("1. Show the available books.")
console.log("2. Add or remove a book.")
console.log("3. Inquiry about a specific book.")
console.log("4. Buy a book.")


  readline.question(`Enter your option: `, option => {
    switch(option){
        case "1": 
            showBooksInfo();
            break;
        case "2":
            readline.question(`To add a new book enter 1,\nTo remove an existed book enter 2: `, process => {
            if (process == "1"){
            let bookName='';
            let bookAuthor='';
            let bookPrice='';
            let bookQuantity='';
            readline.question(`Enter the name of the book: `, name => {
                bookName = name;  
                readline.question(`Enter the name of the author: `, author => {
                    bookAuthor = author;  
                    readline.question(`Enter the price of a single book: `, price => {
                        bookPrice = price;  
                        readline.question(`Enter the quantity of the books: `, quantity => {
                            bookQuantity = quantity;  
                            addBook(bookID,bookName,bookAuthor,Number(bookPrice),Number(bookQuantity));
                            readline.close()
                          })
                      })
                  })
               
              })}else{
                  console.log("The existed books are:")
                  for(let i =0; i< Books.length; i++){
                      console.log(`ID: ${Books[i][0]}, Book Name: ${Books[i][1]}, Book Author: ${Books[i][2]}, Book Price: ${Books[i][3]}, Book Quantity: ${Books[i][4]}`)
                      console.log("--------------------------------------------------------------------------------------------------------------------------------------------------")
                    }
                    readline.question(`Enter the id of the book you want to remove it: `, idbook => {
                        removeBook(idbook);
                        readline.close()
                      })
              }
            })
            break;
        case "3":
            readline.question(`\n1- Inquiry by Id \n2- Inquiry by book name \n3- Inquiry by book author  \nEnter your choice: `, selection => {
                inquiryAboutBook(selection);
              })
            break;
        case "4":
            let bookName; 
            let quantity;
            let balance;
            readline.question(`Enter the book name: `, book => {
                bookName = book;
                readline.question(`Enter the required quantity: `, numberOfBook => {
                quantity = numberOfBook;
                readline.question(`Enter the available balance: `, avaBalance => {
                    balance = avaBalance;
                    buyBook([bookName, Number(quantity), Number(balance)]);
                })
                })
              })
            break;
        default:
            console.log("Your option is unavailable! \nPlease select from existed options..")
            break;
    }
  })
 

//Show the available books with its information
function showBooksInfo(){
    for(let i =0; i < Books.length; i++){
        console.log(`Book Id: ${Books[i][0]}, Book Title: ${Books[i][1]}, Book Author: ${Books[i][2]}, Book Price: ${Books[i][3]}, Book Quantity: ${Books[i][4]}`)
    }   
    readline.close();
}

//Add a new book
function addBook(id, name, author, price, quantity){
    Books.push([id, name, author, price, quantity]);
    console.log("The available books now are: ");
    console.log(Books);
    readline.close();
}

//Remove an existed book
function removeBook(id){
    for( var i = 0; i < Books.length; i++){ 

        if ( Books[i][0] === Number(id)) { 
            Books.splice(i, 1); 
        }

}
console.log("The available books now are: ");
console.log(Books);
readline.close();
}

//Search about a specific book with specific information (id, title, or author)
function inquiryAboutBook(selection){

    switch(selection){
        case "1":
            readline.question(`Enter the ID: `, BookId => {
                let checkBook =false;
                for(let i =0; i < Books.length; i++){
                    if (Books[i].includes(Number(BookId))){
                        checkBook = true;
                        console.log(`Book Id: ${Books[i][0]}, Book Title: ${Books[i][1]}, Book Author: ${Books[i][2]}, Book Price: ${Books[i][3]}, Book Quantity: ${Books[i][4]}`)
                    }
                }

                if (!checkBook){
                    console.log(`The book with Id: ${BookId} doesn't found.`)
            }
                readline.close()
            })
            break;
        case "2":
            readline.question(`Enter the name of Book: `, BookTitle => {
                let checkBook =false;
                for(let i =0; i < Books.length; i++){
                    if (Books[i].includes(BookTitle)){
                        checkBook = true;
                        console.log(`Book Id: ${Books[i][0]}, Book Title: ${Books[i][1]}, Book Author: ${Books[i][2]}, Book Price: ${Books[i][3]}, Book Quantity: ${Books[i][4]}`)
                    }
                }
                if (!checkBook){
                    console.log(`The book with title: ${BookTitle} doesn't found.`)
            }
                readline.close()
            })
            break;
        case "3":
            readline.question(`Enter the name of author: `, BookAuthor => {
                let checkBook =false;
                for(let i =0; i < Books.length; i++){
                    if (Books[i].includes(BookAuthor)){
                        checkBook = true;
                        console.log(`Book Id: ${Books[i][0]}, Book Title: ${Books[i][1]}, Book Author: ${Books[i][2]}, Book Price: ${Books[i][3]}, Book Quantity: ${Books[i][4]}`)
                    }
                } 
                if (!checkBook){
                    console.log(`The book with Author name: ${BookAuthor} doesn't found.`)
            }
                readline.close()
            })
            break;
        default:
            console.log("Your option is unavailable! \nPlease select from existed options..")
            readline.close()
            break;
    }
}

//Purchase a book and print an invoice if the payment process was successful.
function buyBook (inputs){
    let checkBook = false; 
    for(let i =0; i < Books.length; i++){
        if (Books[i].includes(inputs[0])){
            checkBook = true;
            if (Books[i][4]>= inputs[1]){
                if ((inputs[1]*Books[i][3])<= inputs[2]){
                    console.log(`                             
                                 Book Id: ${Books[i][0]}
                                 Book Title: ${Books[i][1]}
                                 Book Author: ${Books[i][2]}
                                 Book Price: ${Books[i][3]}
                                 Required Quantity: ${inputs[1]}
                                 Total Price: ${Books[i][3]*inputs[1]}
                                 Cach: ${inputs[2]}
                                 Change: ${inputs[2]-inputs[1]*Books[i][3]}`)
                }else{
                    console.log(`You don't have enough balance.`)
                }
    
            }else{
                console.log(`The quantity of book \'${inputs[0]}\' doesn't available.`)
            }
            
        }
    }

    if (!checkBook){
            console.log(`The book ${inputs[0]} doesn't found.`)
    }
    readline.close()
}


 
