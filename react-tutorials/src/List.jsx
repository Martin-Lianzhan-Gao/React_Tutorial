
function List(props) {

    const fruits = props.items;
    const category = props.category;

    // Compare...
    // fruits.sort((a, b) => a.name.localeCompare(b.name)); // ALPHABETICAL
    // fruits.sort((a, b) => b.name.localeCompare(a.name)); // REVERSE ALPHABETICAL
    // fruits.sort((a, b) => a.calories - b.calories); // NUMERICAL

    // Filter...
    // const lowCalFruits = fruits.filter(fruit => fruit.calories < 100);
    // const highCalFruits = fruits.filter(fruit => fruit.calories >= 100);

    const listItems = fruits.map(fruit =>
        <li key={fruit.id}>
            {fruit.name}: &nbsp;
            <b>{fruit.calories}</b>
        </li>)

    return (<>
        <h3 className="list-category">{category}</h3>
        <ol className="list-items">{listItems}</ol>
        </>
    );
}

export default List;