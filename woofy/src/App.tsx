
import FeaturedCanine from "./components/FeaturedCanine";
import Hero from "./components/Hero";

const App: React.FC = () => (
  <>
    {/* Hero sits right below Navbar (which you already imported in main.tsx) */}
    <Hero />
    <FeaturedCanine />


  </>
);

export default App;