export function Form({}){
    let SearchTerm = '';

    function handleChange(event){
        // event.target innehåller textinputen
        SearchTerm = event.target.value;
    }

    function handleSubmit(event){
        event.preventDefault();
        console.log(SearchTerm);
        // event.target innehåller form
        event.target.reset(); 
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} type="text" placeholder="sök produkt"/>
            <button>Sök!</button>
        </form>
    )
}
