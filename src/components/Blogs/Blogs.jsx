import React from "react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "Why Firebase is Perfect for Startups",
    date: "2025-05-01",
    excerpt:
      "Discover why Firebase is a top choice for rapid development and scalability...",
    image:
      "https://demo2.wpthemego.com/themes/sw_mallon/wp-content/uploads/2021/06/blog-21.jpg",
  },
  {
    id: 2,
    title: "Top UI Libraries for React in 2025",
    date: "2025-04-20",
    excerpt:
      "Explore the most powerful and easy-to-use UI libraries available today...",
    image: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
  },
  {
    id: 3,
    title: "Boost Your DevOps Workflow with DevOps Guard",
    date: "2025-04-10",
    excerpt: "Enhance your DevOps lifecycle using top-tier monitoring tools...",
    image:
      "https://cdn.cloudeq.com/wp-content/uploads/2023/03/15061618/dev-ops.webp",
  },
  {
    id: 4,
    title: "CloudSync: Your Data’s Best Friend",
    date: "2025-03-30",
    excerpt: "A deep dive into why CloudSync leads the cloud storage race...",
    image:
      "https://cdni.iconscout.com/illustration/premium/thumb/data-synchronise-illustration-download-in-svg-png-gif-file-formats--cloud-sync-computing-technology-web-services-pack-seo-illustrations-3324644.png",
  },
  {
    id: 5,
    title: "How AI Writer Changes the Content Game",
    date: "2025-03-20",
    excerpt: "Write better, faster, and smarter using cutting-edge AI tools...",
    image: "https://via.placeholder.com/600x300.png?text=AI+Writer",
  },
  {
    id: 6,
    title: "Design Smarter with DesignCraft",
    date: "2025-03-10",
    excerpt: "Unleashing creativity using next-gen design tools...",
    image: "https://via.placeholder.com/600x300.png?text=DesignCraft",
  },
];

const HomeBlog = () => {
  return (
    <section className="bg-white py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">
            recent posts
          </h1>
        </div>

        <hr className="my-8 border-gray-200" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {blogPosts.map((blog) => (
            <div key={blog.id}>
              <img
                className="object-cover w-full h-64 rounded-lg lg:h-80"
                src={blog.image}
                alt={blog.title}
              />
              <div className="mt-8">
                <span className="text-blue-500 uppercase">Blog</span>
                <h1 className="mt-4 text-xl font-semibold text-gray-800">
                  {blog.title}
                </h1>
                <p className="mt-2 text-gray-500">{blog.excerpt}</p>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-500">{blog.date}</p>
                  <Link
                    to={`/blog/${blog.id}`}
                    className="text-blue-500 underline hover:text-blue-400"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeBlog;
