import React from "react";
import Animation from "../../components/Animation";

const About = () => {
  return (
    <Animation>
      <div className=" h-screen flex flex-col justify-between">
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto">
            <a href="/home" className="text-3xl font-bold">
              Blog's Up
            </a>
          </div>
        </nav>

        <section className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-6">About Us</h1>

          <p className="text-lg mb-4">
            Welcome to Blog's Up, your go-to destination for insightful
            articles, captivating stories, and thought-provoking discussions.
          </p>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">Our Mission</h3>
            <p className="text-lg mb-4">
              At Blog's Up, we believe in the power of words to inspire, inform,
              and connect people from all walks of life. Our mission is to
              provide a platform where voices are heard, ideas are shared, and
              communities are built.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">What We Offer</h3>
            <ul className="list-disc pl-4">
              <li className="text-lg mb-2">
                <strong>Diverse Content:</strong> From technology to travel,
                from health to hobbies, we cover a wide range of topics to cater
                to every interest and curiosity.
              </li>
              <li className="text-lg mb-2">
                <strong>Expert Insights:</strong> Our team of experienced
                writers and contributors bring a wealth of knowledge and
                expertise to each article, ensuring that you receive accurate
                information and valuable insights.
              </li>
              <li className="text-lg mb-2">
                <strong>Engaging Stories:</strong> Whether it's a personal
                narrative, a deep dive into a trending topic, or a how-to guide,
                our articles are crafted to engage and entertain readers from
                start to finish.
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">Our Community</h3>
            <p className="text-lg mb-4">
              At Blog's Up, we believe in the power of community. We encourage
              lively discussions, respectful debates, and the sharing of diverse
              perspectives. Join us in building a supportive and inclusive
              community where everyone's voice is valued.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">Get Involved</h3>
            <p className="text-lg mb-4">
              We love hearing from our readers! Whether you have feedback,
              suggestions, or want to contribute your own article, we're always
              here to listen. Connect with us on social media, leave a comment
              on your favorite articles, or reach out via email. Together, let's
              continue to make Blog's Up a vibrant hub of ideas and inspiration.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">Stay Connected</h3>
            <p className="text-lg mb-4">
              Don't miss out on the latest updates and articles from Blog's Up.
              Subscribe to our newsletter and follow us on social media to stay
              connected with our growing community.
            </p>
          </div>

          <p className="text-lg">
            Thank you for being a part of our journey. Here's to a world of
            endless discovery and meaningful conversations!
          </p>
        </section>

        <footer className="bg-gray-800 text-white p-1 mt-8">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Blog's Up. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Animation>
  );
};

export default About;
