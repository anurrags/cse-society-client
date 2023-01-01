import React from "react";
import TeamMembers from "../TeamMembers/teamMembers";
import useFetch from "../../hooks/useFetch";
import Loading from "../Loading/Loading";
const SecondYear = () => {
  const url =
    process.env.REACT_APP_THIRDYEAR ||
    "http://localhost:8080/api/team/year/2024";
  const { data, loading } = useFetch(url);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="year-members">
          {data.map((item) => (
            <TeamMembers
              image={item.image}
              name={item.name}
              designation={item.designation}
              linekdin={item.linekdin}
              instagram={item.instagram}
              twitter={item.twitter}
              key={item.rollNo}
              className="year-member"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SecondYear;
