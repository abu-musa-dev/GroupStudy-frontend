import React, { useEffect } from "react";
import 'animate.css/animate.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SuccessStories = () => {
  const stories = [
    {
      name: "Ayesha Rahman",
      story: "With the help of Siter Bondhu, we received warm clothes and blankets which helped us survive the harsh winter.",
      image: "https://i.ibb.co/L89BW3V/download-16.jpg",
    },
    {
      name: "Kamrul Hasan",
      story: "The food donations we received made a huge difference in our lives. We are so thankful for the support.",
      image: "https://i.ibb.co/VNNNkgH/download-17.jpg",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      offset: 100, // Offset (in px) from the original trigger point
      easing: 'ease-in-out', // Easing function
      delay: 100, // Delay before the animation starts
      once: true, // Whether animation should happen only once - while scrolling down
    });
  }, []);

  return (
    <section className="py-16 px-4 bg-gray-100 text-center animate__animated animate__fadeInUp">
      <h2 className="text-3xl font-extrabold text-gradient text-gray-700 mb-8" data-aos="fade-up">Success Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
        {stories.map((story, index) => (
          <div
            key={index}
            className="bg-gray-200 p-6 shadow-lg rounded-md animate__animated animate__fadeIn"
            data-aos="zoom-in"
            data-aos-delay={`${index * 200}`} // Delay for each item
          >
            <img src={story.image} alt={story.name} className="w-32 h-32 mx-auto rounded-full mb-4" />
            <h3 className="text-xl font-semibold mb-2">{story.name}</h3>
            <p className="text-gray-700">{story.story}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;
