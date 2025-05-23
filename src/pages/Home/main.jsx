import Home from "./home";
import About from "./about";
import Education from "./education";
import Statistics from "../statistics";
import LessonPlan from "./lesson-plan";
import Comments from "./comments";
import Header from "./header";
import Footer from "./footer";

export default function Main() {
  return (
    <>
    <Header />
      <main>
        <Home />
        <About />
        <Education />
        <Statistics />
        <LessonPlan />
        <Comments />
      </main>
      <Footer />
    </>
  );
}
