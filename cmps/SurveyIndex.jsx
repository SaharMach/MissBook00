const {useState} = React

export function SurveyIndex({ ratingType, onChangeVal }) {
    const [answersMap, setAnswersMap] = useState({});

    function handleRatingChange(id, val) {
        const updatedAnswers = { ...answersMap };
        updatedAnswers[id] = val;
        setAnswersMap(updatedAnswers);
        onChangeVal(val); 
    }

    const style = {
        backgroundColor: '#99a695',
        padding: '5px',
        margin: '5px'
    };

    return (
        <section className="survey-app">
            <div style={style}>
                <DynamicCmp
                    type={ratingType}
                    onChangeVal={(val) => handleRatingChange('rating', val)}
                />
            </div>
            <hr />
            {/* <pre>{JSON.stringify(answersMap, null, 2)}</pre> */}
        </section>
    );
}

function RateByStars({ onChangeVal }) {
    return (
        <label>
            Star Rating:
            <select onChange={(ev) => onChangeVal(ev.target.value)}>
                <option value="">Select Stars</option>
                {['⭐️', '⭐️⭐️', '⭐️⭐️⭐️', '⭐️⭐️⭐️⭐️', '⭐️⭐️⭐️⭐️⭐️'].map(star => (
                    <option key={star} value={star}>
                        {star}
                    </option>
                ))}
            </select>
        </label>
    );
}

function RateByTextbox({ onChangeVal }){
    return (
        <label>
            TextBox Rating: 
            <input type="text" name="" id="" onChange={(ev) => onChangeVal(ev.target.value)}/>
        </label>
    )
}

function SelectBox({ onChangeVal, label, opts }) {
    return (
        <label>
            {label}
            <select onChange={(ev) => onChangeVal(ev.target.value)}>
                <option value="">Select Rating</option>
                {
                    opts.map(opt => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))
                }
            </select>
        </label>
    );
}


function DynamicCmp(props) {
    console.log(props);
    switch (props.type) {
        case 'TextBox':
            return <RateByTextbox {...props} label="RateByTextbox" />;
        case 'SelectBox':
            return <SelectBox {...props} label="Select Rating" opts={['1', '2', '3', '4', '5']} />;
        case 'RateByStars':
            return <RateByStars {...props} />;
        default:
            return null;
    }
}