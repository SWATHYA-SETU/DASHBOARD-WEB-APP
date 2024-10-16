import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel } from "flowbite-react";
import "../App.css";
import banner from "../assets/banner_1_bgrm.png";
import banner2 from "../assets/banner_2_bgrm.png";
import aboutpic from "../assets/aboutpic1.png";
import {
  FaTools,
  FaClipboardList,
  FaMedkit,
  FaBell,
  FaSyringe,
  FaUsers,
  FaHospital,
} from "react-icons/fa";
import Lottie from "lottie-react";
import icon1 from "../med.json";
import icon2 from "../animatedicon2.json";
import icon3 from "../animatedicon3.json";
import h1 from "../assets/h1.png";
import v1 from "../assets/v2.png";
import c2 from "../assets/c2.png";
import ms2 from "../assets/ms2.png";
import bt from "../assets/bluetick.png";
import h2 from "../assets/h2.png";
import ms1 from "../assets/ml1.png";
import c1 from "../assets/c1.png";
const data = [
  {
    icon: FaTools,
    title: "City Administration Tools",
    para: "Monitor pandemic response, manage resources, and track city-wide health data.",
    label: "read more",
  },
  {
    icon: FaClipboardList,
    title: "Resource Management",
    para: "Smart Resources Distribution",
    label: "read more",
  },
  {
    icon: FaMedkit,
    title: "Medical Shop Integration",
    para: "Locate nearby pharmacies, check medicine availability, and place orders",
    label: "read more",
  },
  {
    icon: FaBell,
    title: "Real-Time Health Updates",
    para: "Real-Time Epidemic News & Alerts",
    label: "read more",
  },
  {
    icon: FaSyringe,
    title: "Medication Reminders",
    para: "Medication Adherence Alerts",
    label: "read more",
  },
  {
    icon: FaUsers,
    title: "Volunteer Assistance",
    para: "Volunteer Support & Services",
    label: "read more",
  },
  {
    icon: FaHospital,
    title: "Hospital Dashboard",
    para: "Track patient data, hospital capacity, and essential supplies",
    label: "read more",
  },
];
const packages = [
  {
    name: "Citizen",
    description: "Stay informed, access care, and manage your health with ease",
    features: [
      "AI-driven disease prediction",
      "Real-time epidemic updates",
      "Check hospital bed availability",
      "Set medication reminders",
      "Access and store medical reports",
    ],
    blue: bt,
    iconImage: c1,
  },
  {
    name: "Hospital",
    description:
      "Streamline patient care, give real-time updates, resource tracking",
    features: [
      "Track patient admissions",
      "Manage bed availability and capacity",
      "Update essential medical supplies",
      "Monitor pandemic response",
      "Real-time health data for efficient decision-making",
    ],
    blue: bt,
    iconImage: h2,
  },
  {
    name: "Pharmacy",
    description:
      "Manage inventory and serve your community during health crises.",
    features: [
      "Update available medicine stock",
      "Manage orders and discounts",
      "Provide real-time stock visibility",
      "Receive city-wide emergency alerts",
      "Assist in managing health supplies",
    ],
    blue: bt,
    iconImage: ms1,
  },
];

const Home = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="md:px-12 p-4 max-w-screen-2x1 mx-auto mt-3">
      <div className="gradientBg rounded-x1 rounded-br-[80px] md:p-9 px-4 py-9">
        {/* Carousel Component */}
        <Carousel className="h-96">
          {/* First Slide */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-10">
            {/* Banner Content */}
            <div className="md:w-3/5 text-left pl-20 pt-4">
              <h2 className="text-white text-4xl font-bold">
                Empowering Health, Prioritizing Lives
              </h2>
              <p className="text-white text-lg mt-4">
                Seamlessly connect with hospitals, pharmacies, and volunteers to
                fight epidemics together, while accessing vital health
                information, medication reminders, and outbreak predictions—all
                at your fingertips.
              </p>
              <div className="mt-6">
                <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-xl">
                  Get Started
                </button>
              </div>
            </div>
            {/* Banner Image */}
            <div className="md:w-2/5 flex justify-end pr-20 mr-4">
              <img src={banner} alt="" className="lg:h-[300px]" />
            </div>
          </div>

          {/* Second Slide */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-10">
            {/* Banner Content */}
            <div className="md:w-3/5 text-left pl-20 pt-4">
              <h2 className="text-white text-4xl font-bold">
                Stay Informed, Stay Healthy
              </h2>
              <p className="text-white text-lg mt-4">
                Stay ahead of the curve with real-time updates on health
                epidemics, weather conditions, and disease outbreaks. We help
                you keep your family safe.
              </p>
              <div className="mt-6">
                <button className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-xl">
                  Learn More
                </button>
              </div>
            </div>
            {/* Banner Image */}
            <div className="md:w-2/5 flex justify-end pr-20 mr-4">
              <img src={banner2} alt="" className="lg:h-[300px]" />
            </div>
          </div>
        </Carousel>
      </div>
      <div className="w-full bg-slate-200 h-fit flex flex-col justify-center items-center px-4 py-10 lg:px-20 lg:py-20 gap-6 bg-gradient-to-r from-blue-50 to-blue-100">
        <h2 className="text-3xl font-bold text-blue-500">
          Our Services & Features
        </h2>
        <p className="text-x1 text-center">
          Discover our innovative solutions designed to enhance health
          management, empower communities, and streamline access to essential
          resources.
        </p>
        <div className="w-full h-fit p-8">
          <Slider {...settings}>
            {data.map((item, index) => (
              <div
                id="slider-boxes"
                key={index}
                className="bg-white p-4 rounded-xl flex flex-col justify-center items-center border-b-[8px] border-blue-600 w-[220px] h-[300px]"
              >
                <div
                  id="icon-box"
                  className="bg-yellow-400 p-6 rounded-full hover:bg-yellow-500 cursor-pointer "
                >
                  {item.icon && <item.icon className="w-[40px] h-[40px]" />}
                </div>
                <div className="flex flex-col justify-center items-center gap-4 mt-4">
                  <h1 className="text-xl text black font-bold">{item.title}</h1>
                  <p className="text-[15px] text-center">{item.para}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="w-full h-auto flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-gradient-to-r from-blue-50 to-blue-100">
        {/* Left: About Image */}
        <div className="w-full md:w-[45%] h-full flex justify-center">
          <img
            src={aboutpic} // Use your actual image path here
            alt="About Us"
            className="rounded-lg shadow-lg w-full h-[400px] object-cover"
          />
        </div>

        {/* Right: About Content */}
        <div className="w-full md:w-[45%] h-full flex flex-col justify-center items-center mt-8 md:mt-0 ml-6">
          <div className="bg-white p-8 rounded-xl shadow-2xl border-4 border-blue-500 hover:border-blue-700 transform hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-lg w-full h-[400px] flex flex-col justify-between">
            <h3 className="text-2xl font-bold mb-4">
              About <span className="text-blue-500">Our Software</span>
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              Our platform is designed to streamline epidemic management,
              integrating hospitals, pharmacies, volunteers, and government
              services for a unified response. With advanced real-time data
              tracking, resource management tools, and alert systems, we empower
              communities to stay informed and act quickly during health crises.
            </p>

            <div className="flex justify-between items-center mt-4">
              <Lottie animationData={icon2} className="w-32 h-32" />{" "}
              {/* Left Lottie Icon */}
              <Lottie animationData={icon1} className="w-32 h-32" />{" "}
              {/* Middle Lottie Icon */}
              <Lottie animationData={icon3} className="w-32 h-32" />{" "}
              {/* Right Lottie Icon */}
            </div>
          </div>
        </div>
      </div>
      {/*company stats*/}
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto bg-gradient-to-r from-blue-50 to-blue-100 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="md:w-1/2 pl-8">
            <h2 className="text-4xl font-semibold text-gray-600 mb-7 md:w-2/3 pl-8">
              Connecting Care<br></br>
              <span className="text-blue-500"> Our Health Network!</span>
            </h2>
            <p className="max-w-[80%] -ml-6">
              Join us in celebrating our incredible network of hospitals,
              <br />
              medical shops, and volunteers! Together, we are shaping <br />a
              community where health is a priority and care is always <br />
              within reach.
            </p>
          </div>
          {/*stats*/}
          <div className="md:w-1/2 mx-auto flex sm:flex-row flex-col sm:items-center justify-around gap-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <img src={h1} alt="" className="w-10 h-10" />
                <div>
                  <h4 className="text-2xl font-semibold text-gray-600">3000</h4>
                  <p>Hospitals</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img src={ms2} alt="" className="w-10 h-10" />
                <div>
                  <h4 className="text-2xl font-semibold text-gray-600">6000</h4>
                  <p>Pharmacies</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <img src={v1} alt="" className="w-10 h-10" />
                <div>
                  <h4 className="text-2xl font-semibold text-gray-600">
                    20000
                  </h4>
                  <p>Volunteers</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img src={c2} alt="" className="w-10 h-10" />
                <div>
                  <h4 className="text-2xl font-semibold text-gray-600">
                    250000
                  </h4>
                  <p>Users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*3 cards mentioning the features the citizens, hospitals and pharmacies can use*/}
      <div className="w-full bg-slate-200 h-fit flex flex-col justify-center items-center px-4 py-10 lg:px-20 lg:py-20 gap-6 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-950">
            How <span className="text-blue-500"> We Work!</span>
          </h2>
          <p className="text-x1 text-center">
            Connecting people, healthcare, and resources for a healthier
            tomorrow.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-20 md:w-11/12 mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="bg-white border py-10 md:px-6 px-4 rounded-3xl shadow-4xl hover:shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out"
              style={{
                boxShadow: "0 0 15px rgba(0, 0, 255, 0.1)", // Subtle glow effect
              }}
            >
              {/* Added an icon image above each card heading */}
              <div className="flex justify-center mb-4">
                <img
                  src={pkg.iconImage} // Replace with actual icon path
                  alt={`${pkg.name} icon`}
                  className="w-16 h-16"
                />
              </div>

              <h3 className="text-3xl font-bold text-center text-blue-900">
                {pkg.name}
              </h3>
              <p className="text-center my-5">{pkg.description}</p>

              <ul className="mt-4 space-y-2 px-4">
                {pkg.features.map((feature, featureIndex) => (
                  <li
                    className="flex gap-3 items-center text-blue-500" // Made list text color blue
                    key={featureIndex}
                  >
                    <img src={pkg.blue} alt="" className="w-5 h-5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
