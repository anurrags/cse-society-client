import "./blog.css";
import Loading from "../Loading/Loading";
import BlogComponent from "../BlogComponent/BlogComponent";
import useFetch from "../../hooks/useFetch";
export default function Blog() {
  const url = process.env.REACT_APP_BLOG || "http://localhost:8080/api/blogs";
  const { data, loading } = useFetch(url);
  return (
    <div className="blog-div">
      <h1 className="team-title">
        <span>Our</span> Blogs
      </h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="blog-component">
          {data.map((item) => (
            <BlogComponent
              topic={item.topic}
              image={item.image}
              desc={item.description}
              key={item.blogId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
