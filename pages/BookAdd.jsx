const {useState,useEffect} = React

import { bookService } from '../services/book.service.js'
import { googleBookService } from '../services/google-book.service.js'

export function BookAdd(){
    const [filterBy, setFilterBy] = useState({titie:''})
    const [books, setBooks] = useState({})

    useEffect(() =>{
        googleBookService.query(filterBy)
            .then(books =>{
                console.log(books);
                setBooks(books)
            })
            .catch(err=> console.log('err',err))
    },[filterBy])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        console.log(field);
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;
            case 'checkbox':
                value = target.checked
                break
            case 'datetype':
                value = target.value
            default:
                break;
        }
        console.log(value);
        setFilterBy(prevFilter => ({ ...prevFilter, [field]: value }))
    }



    function handleAdd(book){
        bookService.addGoogleBook(book)
    }
    
    function onSubmitFilter(ev) {
        console.log(filterBy);
        console.log(ev.target);
        ev.preventDefault()
        setFilterBy(filterBy)
    }
    console.log(books);
    function renderList(books) {
        if (!books || !books.items) return null
        console.log('rendereing');
        console.log(books);
        return (
            <ul>
                {
                    books.items.map(book => (
                    <li key={book.id}>
                        {book.volumeInfo.title}
                        <button onClick={() => handleAdd(book.volumeInfo)}>+</button>
                    </li>
                ))
                } 
            </ul>
        );
    }
    
    if(!books) return <div>Search please</div>
    return (
        <section>

            <form onSubmit={onSubmitFilter}>
                <label htmlFor="title">Name: </label>
                <input onChange={handleChange} type="text" placeholder="By name" id="title" name="title" />
                <button>Submit</button>
            </form>
            {renderList(books)}
        </section>
    )

}















