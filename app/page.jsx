import Feed from "@components/Feed";

const Home = () => (
  <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">
      <span>Discover & Share</span> <br className="max-md:hidden" />
      <span className="blue_gradient text-center"> AI-Powered Prompts</span>
    </h1>
    <p className="desc text-center">
      Discover a world of endless possibilities through the magic of
      prompts
    </p>
    <Feed />
  </section>
);

export default Home;
