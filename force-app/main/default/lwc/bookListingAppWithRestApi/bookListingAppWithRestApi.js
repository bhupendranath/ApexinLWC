import { LightningElement } from 'lwc';
import Google_Books_API_Key from '@salesforce/label/c.Google_Books_API_Key'
const BOOK_URL = 'https://www.googleapis.com/books/v1/volumes?q='  //here we'll pass the query dynamically and URL should be inclosed with back tick ``
export default class BookListingAppWithRestApi extends LightningElement {

    //to make search dynamic >> 'https://openlibrary.org/search.json?q=Salesforce' : here "Salesforce" is fixed search key
    query = 'Salesforce'  //I am searching book that has 'Salesforce' as a keyword

    books
    
    timer

   //I want to call fetch API on the load of the component for that we use : connectedCallback()
   //OR to call something on load we use connectedCallback() lifecycle hook
   connectedCallback(){
         this.fetchBookData()
   }

   fetchBookData(){
        
        const endPoint = `${BOOK_URL}${encodeURIComponent(this.query)}&key=${Google_Books_API_Key}`
         fetch(endPoint)
            .then(response =>response.json())
            .then(data=>{
                console.log(data)
                this.books = data    //we'll store tha data into property: books
            }
            )
            .catch(error=>console.error(error))
   }

   fetchBooksHandler(event){
        this.query = event.target.value
        //we want to add some delay on typing each char : debouncing technique <<Performance efficient technique for searching>>
        //to reduce the server call we use debouncing technique 
        window.clearTimeout(this.timer)  //to cancel the timeout and register it again
        this.timer = setTimeout(()=>{
            this.fetchBookData()
         }, 1000)
   }
}