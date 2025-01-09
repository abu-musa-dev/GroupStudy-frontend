import React from "react";
import "tailwindcss/tailwind.css";

const Banner = () => {
  const slides = [
    {
      url: "https://i.ibb.co.com/4NX8Y4W/colleagues-studying-together-exam.jpg",
      title: "Collaborative Learning",
      description: "Study together, share knowledge, and grow as a team."
    },
    {
      url: "https://i.ibb.co.com/0p7R9Lc/young-people-working-laptop.jpg",
      title: "Interactive Study Sessions",
      description: "Engage with peers for a more effective and engaging study experience."
    },
    {
      url: "https://i.ibb.co.com/ykmMJQK/three-students-studying-using-tablet-chatting.jpg",
      title: "Focused Group Discussions",
      description: "Discuss key topics and solve problems together for better understanding."
    },
  ];

  return (
    <section className="container mx-auto ">
      <div className="relative carousel w-full rounded-lg overflow-hidden shadow-xl">
        {slides.map((slide, index) => (
          <div
            id={`slide${index}`}
            className="carousel-item relative w-full"
            key={index}
          >
            <img
              src={slide.url}
              className="w-full h-[450px] object-cover transition-transform duration-1000 ease-in-out transform hover:scale-105"
              alt={slide.title}
            />
            <div className="absolute bottom-0 bg-gradient-to-t from-black via-transparent to-transparent w-full text-white p-6">
              {/* Grouping Title and Description */}
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold mb-2">{slide.title}</h2>
                <p className="text-lg">{slide.description}</p>
              </div>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href={`#slide${(index - 1 + slides.length) % slides.length}`}
                className="btn btn-circle text-white bg-gray-800 hover:bg-gray-600 transition-colors duration-300"
              >
                ❮
              </a>
              <a
                href={`#slide${(index + 1) % slides.length}`}
                className="btn btn-circle text-white bg-gray-800 hover:bg-gray-600 transition-colors duration-300"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Banner;
