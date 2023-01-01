import "./alumni.css";
import Loading from "../Loading/Loading";
import AlumniMembers from "../AlumniMembers/AlumniMembers";
import useFetch from "../../hooks/useFetch";
const Alumni = () => {
  const url =
    process.env.REACT_APP_ALUMNI ||
    "http://localhost:8080/api/team/alumni/2022";
  const { data, loading } = useFetch(url);
  return (
    <div className="all-members">
      <h1 className="alumni-title">
        <span>Our</span> Alumni
      </h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="alumni-members">
          {data.map((item) => (
            <AlumniMembers
              image={item.image}
              name={item.name}
              designation={item.designation}
              linkedin={item.linkedin}
              instagram={item.insta}
              twitter={item.twitter}
              key={item.rollNo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Alumni;
