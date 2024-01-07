const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

/* const Total = ({ parts }) => {
    return (
      <p>
        Number of exercises{" "}
        {parts[0].exercises + parts[1].exercises + parts[3].exercises}
      </p>
    );
  }; */

const Total = ({ parts }) => {
  return (
    <h3>
      Number of exercises{" "}
      {parts.reduce((acc, curr) => {
        return acc + curr.exercises;
      }, 0)}
    </h3>
  );
};

const Course = ({ course }) => {
  return (
    <>
      {course.map((course) => {
        return (
          <div key={course.id}>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        );
      })}
    </>
  );
};

export default Course;
