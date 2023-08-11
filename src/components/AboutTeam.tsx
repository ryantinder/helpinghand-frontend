import Image from "next/image";
import Link from "next/link";

const teamMembers = [
  {
    name: "Ryan Tinder",
    bio: "Ryan is a god at programming.",
    image: "/ryan.png",
    page: "https://www.linkedin.com/in/ryantinder/",
  },
  {
    name: "Trent Conley",
    bio: "Trent codes next.js in his sleep.",
    image: "/trent.jpeg",
    page: "https://www.linkedin.com/in/trent-conley/",
  },
];

const About = () => {
  return (
    <div className="animate-fadeIn scroll-smooth">
      <div className="flex flex-col items-center justify-center space-y-10 py-10 h-screen">
        <h1 className="text-4xl font-bold">About the Team</h1>
        <div className="flex flex-wrap items-center justify-center space-x-10">
          {teamMembers.map((teamMember, index) => (
            <div
              className="flex flex-col items-center justify-center"
              key={index}
            >
              <div className="rounded-full overflow-hidden h-40 w-40 flex items-center justify-center border-2 border-gray-300">
                <div className="">
                  <Link href={teamMember.page} passHref>
                    <Image
                      src={teamMember.image}
                      alt={teamMember.name}
                      className=""
                      height={160}
                      width={160}
                    />
                  </Link>
                </div>
              </div>
              <h2 className="text-xl font-bold">{teamMember.name}</h2>
              <p className="text-center">{teamMember.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
