import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Dashboard from "@/pages/Dashboard";
import About from "@/components/sections/About";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Dashboard />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
