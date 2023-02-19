import Image from 'next/image';
import Link from 'next/link';

const teamMembers = [
  {
    name: 'Ryan Tinder',
    bio: 'Ryan is a god at programming. He did the entire project by himself.',
    image: '/ryan.png',
  },
  {
    name: 'Trent Conley',
    bio: 'Trent is a low-tier mortal who developed the measly frontend.',
    image: '/ryan.png',
  },
];

const About = () => {
    return (
      <div className="flex flex-col items-center justify-center space-y-10 py-10 h-screen">
        <h1 className="text-4xl font-bold">About the Team</h1>
        <div className="flex flex-wrap items-center justify-center space-x-10">
          {teamMembers.map((teamMember, index) => (
            <div className="flex flex-col items-center justify-center" key={index}>
              <div className="rounded-full overflow-hidden h-40 w-40 flex items-center justify-center border-2 border-gray-300">
              <div className="">
                <Image src={teamMember.image} alt={teamMember.name} className="" height={160} width={160}  />
                </div>
              </div>
              <h2 className="text-xl font-bold">{teamMember.name}</h2>
              <p className="text-center">{teamMember.bio}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
export default About;
