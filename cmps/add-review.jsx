import { bookService } from "../services/book.service.js";
import { utilService } from "../services/util.service.js";
import { SurveyIndex } from "./SurveyIndex.jsx";
const {useState,useEffect} = React

export function AddReview({book, onAddingReview}){
    const [ratingType,setRatingType] = useState('')
    const [review, setReview] = useState({
        id: utilService.makeId(),
        fullname: '',
        rating: 1,
        readAt: 0,
        writtenAt: utilService.getFullDate()
    });

    

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
        setReview(prevBookToEdit => ({ ...prevBookToEdit, [field]: value }))
    }
    
    function onSaveReview(ev){
        console.log(book);
        ev.preventDefault()
        bookService.addReview(book.id,review)
            .then(()=>{
                onAddingReview(review)
            })
    }

    
    function handleChangeRating(value) {
        setReview(prevReview => ({ ...prevReview, rating: value }));
    }

    const {fullname, rating, readAt} = review
    return (
        <section className="add-review">
            <form onSubmit={onSaveReview}>
                <label htmlFor="fullname">Fullname: </label>
                <input onChange={handleChange} value={fullname} type="text" name="fullname" id="fullname" />

                <div className="rating-selection">
                    <label>
                        <input type="radio" value="SelectBox" checked={ratingType === 'SelectBox'} onChange={(e) => setRatingType(e.target.value)} />
                        Select Rating
                    </label>
                    <label>
                        <input type="radio" value="TextBox" checked={ratingType === 'TextBox'} onChange={(e) => setRatingType(e.target.value)} />
                        Textbox Rating
                    </label>
                    <label>
                        <input type="radio" value="RateByStars" checked={ratingType === 'RateByStars'} onChange={(e) => setRatingType(e.target.value)} />
                        Star Rating
                    </label>
                </div>

                <SurveyIndex ratingType={ratingType} onChangeVal={handleChangeRating} />
                
                
                <label htmlFor="readAt"> readAt: </label>
                <input onChange={handleChange} value={readAt} type="date" name="readAt" id="readAt" />

                <button>Save</button>
            </form>
        </section>
    )
}




