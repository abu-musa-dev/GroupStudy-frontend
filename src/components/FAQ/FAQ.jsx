import React, { useState } from "react";

// FAQ Item Component
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapse collapse-plus border border-base-300 bg-base-100 rounded-lg mb-4">
      <input type="checkbox" className="peer" onClick={toggleAnswer} />
      <div className="collapse-title text-xl font-semibold">{question}</div>
      {isOpen && (
        <div className="collapse-content">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

// Main FAQ Section Component
const FAQ = ({ theme }) => {
  const faqs = [
    {
      question: "How do I create an assignment?",
      answer:
        "To create an assignment, simply click the 'Create Assignment' button and fill in the required fields like title, description, marks, and due date.",
    },
    {
      question: "Can I update an existing assignment?",
      answer:
        "Yes, you can update assignments by editing their details on the 'Assignments' page and saving the changes.",
    },
    {
      question: "Is my data secure?",
      answer:
        "We use industry-standard encryption and secure authentication methods to protect your data.",
    },
    {
      question: "How do I log in?",
      answer:
        "To log in, simply enter your credentials on the login page. If you don't have an account, you can sign up for a new one.",
    },
    {
      question: "What devices can I use this on?",
      answer:
        "Our application is fully responsive, so you can use it on any device, including desktops, tablets, and mobile phones.",
    },
  ];

  return (
    <section
      className={`py-16 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="max-w-screen-xl  mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
