import useBlogStore from "@/stores/blogStore";
import { CalendarDays, CircleUserRound, File, ThumbsUp } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Hero() {
  const blogs = [
    {
      author: "janesmith@example.com",
      title: "The Future of Web Development",
      image: "/img/bg.jpg",
      date: "2024-12-20",
      category: "Health",
      desc: "Discover simple yet effective tips to maintain a healthy diet in your busy life.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati omnis, fuga sed excepturi sapiente unde ab sequi nisi. Ex totam quo id labore voluptate numquam at itaque, tenetur consequatur ipsum illum odio, officiis ad est? Iusto amet, voluptate tempora itaque et laboriosam delectus, esse officia nam at sed eligendi obcaecati ea quis minima excepturi inventore rerum! Mollitia magni facere molestiae!",
      likes: 85,
    },
    {
      author: "janesmith@example.com",
      title: "A red-rock wonderland",
      image: "/img/bg3.jpg",
      date: "2024-12-20",
      category: "Health",
      desc: "Discover simple yet effective tips to maintain a healthy diet in your busy life.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati omnis, fuga sed excepturi sapiente unde ab sequi nisi. Ex totam quo id labore voluptate numquam at itaque, tenetur consequatur ipsum illum odio, officiis ad est? Iusto amet, voluptate tempora itaque et laboriosam delectus, esse officia nam at sed eligendi obcaecati ea quis minima excepturi inventore rerum! Mollitia magni facere molestiae!",
      likes: 85,
    },
    {
      author: "janesmith@example.com",
      title: "10 Tips for Healthy Eating",
      image: "/img/bg5.jpg",
      date: "2024-12-20",
      category: "Travel",
      desc: "Discover simple yet effective tips to maintain a healthy diet in your busy life.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati omnis, fuga sed excepturi sapiente unde ab sequi nisi. Ex totam quo id labore voluptate numquam at itaque, tenetur consequatur ipsum illum odio, officiis ad est? Iusto amet, voluptate tempora itaque et laboriosam delectus, esse officia nam at sed eligendi obcaecati ea quis minima excepturi inventore rerum! Mollitia magni facere molestiae!",
      likes: 85,
    },
  ];

  // Assume the first blog is the main article, and the rest are side articles
  const mainArticle = blogs[0];
  const sideArticles = blogs.slice(1, 3); // Show up to 2 side articles

  // Helper function to format date
  const formatDate = (isoDate: any) => {
    if (!isoDate) return "Unknown Date";
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="container mx-auto my-5 md:px-0 px-5">
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-2 h-full">
        {/* Main Article */}
        <div className="col-span-2 flex flex-col h-full group overflow-hidden  relative">
          <div className="relative h-full group">
            {mainArticle && (
              <>
                <Image
                  height={500}
                  width={500}
                  priority
                  src={mainArticle?.image || "/img/bg2.jpg"}
                  alt={mainArticle?.title || "Main Article"}
                  sizes="100vw"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-1000  cursor-pointer"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40"></div>
                <div className="absolute bottom-4 left-10 bg-secondary text-white text-xs font-bold px-2 py-1">
                  {mainArticle.category || "Food Habit"}
                </div>
                <div className="absolute bottom-14 left-10 text-white">
                  <h2 className="md:text-5xl font-semibold text-xl">
                    {mainArticle.title}
                  </h2>
                  <div className="md:flex gap-4 mt-2">
                    <div className="flex items-center gap-1 text-sm">
                      <CircleUserRound size={16} strokeWidth={1.75} />
                      <p>{mainArticle.author}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <CalendarDays size={16} strokeWidth={1.75} />
                      <p>{formatDate(mainArticle.date)}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <ThumbsUp size={16} strokeWidth={1.75} />
                      <p>{mainArticle.likes}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Side Articles */}
        <div className="md:space-y-2 flex md:flex-col gap-2 mt-2 md:mt-0 md:gap-0 h-full">
          {sideArticles?.map((article, index) => (
            <div className="relative group overflow-hidden " key={index}>
              <Image
                height={500}
                width={500}
                priority
                src={article?.image || "/img/bg3.jpg"}
                alt={article?.title || "Side Article"}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-1000  cursor-pointer"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40"></div>
              <div className="absolute bottom-2 left-5 bg-secondary text-white text-xs font-bold px-2 py-1">
                {article.category || "Food Habit"}
              </div>
              <div className="absolute bottom-9 left-5 text-white">
                <h2 className=" md:text-2xl font-semibold text-xl">
                  {article.title}
                </h2>
                <div className="md:flex gap-2 text-sm ">
                  <div className="flex items-center gap-1 text-sm">
                    <CircleUserRound size={16} strokeWidth={1.75} />
                    <p className="text-sm">{article.author}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <CalendarDays size={16} strokeWidth={1.75} />
                    <p>{formatDate(article.date)}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <ThumbsUp size={16} strokeWidth={1.75} />
                    <p>{article.likes}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
