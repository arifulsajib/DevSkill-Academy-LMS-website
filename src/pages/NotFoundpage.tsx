import picNot from "../assets/404-Page-2.png";

const NotFoundpage = () => {
  return (
    <section className="container flex justify-center items-center" style={{ minHeight: "90vh" }}>
      <img src={picNot} alt="404 not fount" className="w-full object-cover" style={{ maxHeight: "600px", maxWidth: "600px" }} />
    </section>
  );
};

export default NotFoundpage;
