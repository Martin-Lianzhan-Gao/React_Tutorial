import propTypes from 'prop-types'

function Student(props) {

    const { name = "Guest", age = 18, isStudent = false } = props;
    
    return (
        <div className="student">
            <p>Name: { name } </p>
            <p>Age: { age } </p>
            <p>Student: { isStudent ? "YES" : "NO" }</p>
        </div>
    );
}

Student.propTypes = { 
    name: propTypes.string,
    age: propTypes.number,
    isStudent: propTypes.bool
}

export default Student;