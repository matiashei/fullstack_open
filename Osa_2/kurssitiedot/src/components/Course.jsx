const totalAmount = (parts) => parts.reduce((sum, part) => sum + part.exercises, 0);

const Course = ({ course }) => {
    return (
        <div>
            <h2>{course.name}</h2>
            {course.parts.map(part => <p key={part.id}>{part.name + ' ' + part.exercises}</p>)}
            <b>total of {totalAmount(course.parts)} exercises</b>
        </div>
    )
}

export default Course