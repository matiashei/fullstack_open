const totalAmount = (parts) => parts.reduce((sum, part) => sum + part.exercises, 0);

const Course = ({ course }) => {
    return (
        <>
            <h1>{course.name}</h1>
            {course.parts.map(part => <div key={part.id}>{part.name + ' ' + part.exercises}</div>)}
            <b>total of {totalAmount(course.parts)} exercises</b>
        </>
    )
}

export default Course