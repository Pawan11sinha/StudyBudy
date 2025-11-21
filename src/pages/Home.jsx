import React from 'react'
import { FaArrowRight, FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from "../components/core/HomePage/Button.jsx"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks.jsx';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection.jsx';
import TimelineSection from '../components/core/HomePage/TimelineSection.jsx';
import InstructorSection from '../components/core/HomePage/InstructorSection.jsx';
import ExploreMore from '../components/core/HomePage/ExploreMore.jsx';

const Home = () => {
  return (
    <div>
        
      {/* section1*/}  

<div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent
items-center text-black justify-between'>
    <Link to="/signup">
    <div className='mt-16 p-1 mx-auto rounded-full bg-Apricot-70 font-bold text-black transition-all duration-200 hover:scale-95 w-fit'>
        <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[6px]
        transition-all duration-200 group-hover:bg-Apple Core-50'>
            <p>Become an Instructor </p>
            <FaArrowRightLong />
        </div>
    </div>
    </Link>

    <div className='text-center text-4xl font-semibold mt-7'>
        Empower your Future with 
        <HighlightText text={"Coding Skills"}/>
    </div>

<div className='mt-4 w-[90%] text-center text-lg font-bold text-black'>
With our online coding courses, you can learn at your own pace, from anywhere in the world, gaining the knowledge and confidence you need to excel in the tech industry.
</div>

<div className='flex flex-row gap-7 mt-8'> 
    <CTAButton active={true} linkto={"/signup"}>
        Learn More
    </CTAButton>

     <CTAButton active={false} linkto={"/login"}>
      Book a Demo
    </CTAButton>
</div>

{/* Outer white card */}
<div className="relative w-fit mx-auto my-12">
  
  {/* White card background + bottom-right shadow */}
  <div className="absolute bottom-[-12px] right-[-12px] w-full h-full bg-white  shadow-[8px_8px_20px_rgba(0,0,0,0.3)]"></div>
  
  {/* Blue border + padding */}
  <div className="relative  bg-[#0c1a2a]">
    <video
      muted
      loop
      autoPlay
      playsInline
      className="rounded-lg"
    >
      <source src={Banner} type="video/mp4" />
    </video>
  </div>

</div>
{/* code section 1 */}

<div>
  <CodeBlocks
    position={"lg:flex-row"}
    heading={
        <div className='text-4xl font-semibold'>
            Unlock Your
            <HighlightText text={"coding potential"}/>
            {" "}
             with our online courses
        </div>
        }
        subheading={
            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
        }
        ctabtn1={
            {
                btnText:"try it youself",
                linkto:"/signup",
                active:true,
            }
        }
          ctabtn2={
            {
                btnText:"learn more",
                linkto:"/login",
                active:false,
            }
        }
        codeblock={
            `<<!DOCTYPE html>\n<html>\n <head>\n <title>My First Web Page</title>\n</head>\n<body>\n <h1>Hello, World!</h1>\n<p>This is my first web page.</p>\n</body>\n</html>>`
        }
        codeColor={"text-black"}

/>
</div>
        {/* code section 2 */}
<div>
  <CodeBlocks
    position={"lg:flex-row-reverse"}
    heading={
        <div className='text-4xl font-semibold'>
            Start
            <HighlightText text={"coding potential"}/>
            {" "}
            coding in seconds
        </div>
        }
        subheading={
            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
        }
        ctabtn1={
            {
                btnText:"Continue Lesson",
                linkto:"/signup",
                active:true,
            }
        }
          ctabtn2={
            {
                btnText:"learn more",
                linkto:"/login",
                active:false,
            }
        }
        codeblock={
            `<<!DOCTYPE html>\n<html>\n <head>\n <title>My First Web Page</title>\n</head>\n<body>\n <h1>Hello, World!</h1>\n<p>This is my first web page.</p>\n</body>\n</html>>`
        }
        codeColor={"text-black"}

/>
</div>
   <ExploreMore />

</div>  
<div>

</div>


 <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[320px]">
          {/* Explore Full Catagory Section */}
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
            <div className="lg:h-[150px]"></div>
            <div className="flex flex-row gap-7 text-black lg:mt-8">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-2">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/login"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
          {/* Job that is in Demand - Section 1 */}
          <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%] ">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </div>
            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div className="">Learn More</div>
              </CTAButton>
            </div>
          </div>

          {/* Timeline Section - Section 2 */}
          <TimelineSection />

          {/* Learning Language Section - Section 3 */}
          <LearningLanguageSection/>
        </div>
      </div>

        {/* Section 3 */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-Apple Core-50 text-white">
        {/* Become a instructor section */}
        <InstructorSection />

        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        {/* <ReviewSlider /> */}
      </div>




    
          {/* Footer*/} 



    </div>
  )
}

export default Home;





