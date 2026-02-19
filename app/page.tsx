import DisplayRepo from "@/components/display-repo";

const Home = () => {
  return (
    <div className="main">
      <div className="text-center flex flex-col gap-4 font-mono mb-5">
        <h1 className="text-3xl  font-bold tracking tracking-widest">
          GitHub Random Repo Finder
        </h1>
        <p className="text-muted-foreground text-lg">
          Select a language and get a random GitHub repository that primarily
          uses that language.
        </p>
      </div>
      <DisplayRepo />
    </div>
  );
};

export default Home;
