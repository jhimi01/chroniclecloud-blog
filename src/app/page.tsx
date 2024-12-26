import LeftSideber from "@/components/LeftSideber";
import SideNavLayout from "./sidenav/layout";
import CardBlog from "@/components/CardBlog";

export default function Home() {
  const blogs = [
    {
      author: "johndoe@example.com",
      title: "The Future of Web Development",
      image: "/images/future-web.jpg",
      date: "2024-12-26",
      category: "Technology",
      desc: "Exploring the latest trends and predictions shaping the future of web development.",
      likes: 120,
    },
    {
      author: "janesmith@example.com",
      title: "10 Tips for Healthy Eating",
      image: "/images/healthy-eating.jpg",
      date: "2024-12-20",
      category: "Health",
      desc: "Discover simple yet effective tips to maintain a healthy diet in your busy life.",
      likes: 85,
    },
    {
      author: "alexanderlee@example.com",
      title: "Traveling on a Budget",
      image: "/images/budget-travel.jpg",
      date: "2024-11-15",
      category: "Travel",
      desc: "Learn how to explore the world without breaking the bank with these budget travel hacks.",
      likes: 200,
    },
    {
      author: "emilywhite@example.com",
      title: "The Power of Minimalism",
      image: "/images/minimalism.jpg",
      date: "2024-10-10",
      category: "Lifestyle",
      desc: "Understand how embracing minimalism can lead to a happier and more focused life.",
      likes: 150,
    },
    {
      author: "michaelbrown@example.com",
      title: "Mastering JavaScript in 2024",
      image: "/images/javascript-mastery.jpg",
      date: "2024-09-30",
      category: "Programming",
      desc: "An in-depth guide to improving your JavaScript skills and staying ahead in 2024.",
      likes: 320,
    },
  ];

  return (
    <SideNavLayout>
      <div className="flex">
        <div className="flex-1 w-full md:w-[70%] space-y-5 md:mr-5">
          {blogs?.map((blogs, index) => (
            <CardBlog key={index} />
          ))}
        </div>
        <div>
          <LeftSideber />
        </div>
      </div>
    </SideNavLayout>
  );
}
