import React from "react";

const featuresData = [
  {
    title: "Assignment Creation",
    description:
      "Easily create and share assignments with groups, set deadlines, and track progress effectively.",
  },
  {
    title: "Collaborative Grading",
    description:
      "Simplify reviewing and grading submissions with peer collaboration and constructive feedback.",
  },
  {
    title: "User-friendly Interface",
    description:
      "Experience a clean, intuitive platform designed to make assignment management seamless.",
  },
  {
    title: "Real-time Updates",
    description:
      "Get instant notifications on submissions, feedback, and important activities without delays.",
  },
];

export default function Features() {
  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      {/* Section Heading */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          🚀 Key Features
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Powerful tools designed to enhance your group study experience with simplicity and efficiency.
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {featuresData.map((feature, index) => (
          <div
            key={index}
            className="p-8 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center mb-4">
              <div className="bg-green-100 text-green-600 p-2 rounded-full text-xl">
                ✅
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-md leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
