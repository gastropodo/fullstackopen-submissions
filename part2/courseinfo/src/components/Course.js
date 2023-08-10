const Header = ({ title }) => {
    return <h1>{title}</h1>
}

const Part = (props) => {
    const { name, exercises } = props;
    return (
        <p>
            {name} {exercises}
        </p>
    )
};

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => {
                return (
                    <Part key={part.id} name={part.name} exercises={part.exercises} />
                )
            })}
        </div>
    )
};

const Total = ({ parts }) => {
    const total = parts.reduce((prev, curr) => prev + curr.exercises, 0);

    return (
        <strong>
            total of {total} exercises
        </strong>
    )
}

const Course = ({ course }) => {

    return (
        <>
            <Header title={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course;