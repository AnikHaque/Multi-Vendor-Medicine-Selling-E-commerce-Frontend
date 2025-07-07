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
      "https://firebase.google.com/static/images/brand-guidelines/logo-logomark.png",
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
    <section class="bg-white dark:bg-gray-900 py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
            recent posts{" "}
          </h1>

          <button class="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-gray-600 transition-colors duration-300 transform dark:text-gray-400 hover:text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        <hr class="my-8 border-gray-200 dark:border-gray-700" />

        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          <div>
            <img
              class="object-cover object-center w-full h-64 rounded-lg lg:h-80"
              src="https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt=""
            />

            <div class="mt-8">
              <span class="text-blue-500 uppercase">category</span>

              <h1 class="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                What do you want to know about UI
              </h1>

              <p class="mt-2 text-gray-500 dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam est
                asperiores vel, ab animi recusandae nulla veritatis id tempore
                sapiente
              </p>

              <div class="flex items-center justify-between mt-4">
                <div>
                  <a
                    href="#"
                    class="text-lg font-medium text-gray-700 dark:text-gray-300 hover:underline hover:text-gray-500"
                  >
                    John snow
                  </a>

                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    February 1, 2022
                  </p>
                </div>

                <a
                  href="#"
                  class="inline-block text-blue-500 underline hover:text-blue-400"
                >
                  Read more
                </a>
              </div>
            </div>
          </div>

          <div>
            <img
              class="object-cover object-center w-full h-64 rounded-lg lg:h-80"
              src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt=""
            />

            <div class="mt-8">
              <span class="text-blue-500 uppercase">category</span>

              <h1 class="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                All the features you want to know
              </h1>

              <p class="mt-2 text-gray-500 dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam est
                asperiores vel, ab animi recusandae nulla veritatis id tempore
                sapiente
              </p>

              <div class="flex items-center justify-between mt-4">
                <div>
                  <a
                    href="#"
                    class="text-lg font-medium text-gray-700 dark:text-gray-300 hover:underline hover:text-gray-500"
                  >
                    Arthur Melo
                  </a>

                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    February 6, 2022
                  </p>
                </div>

                <a
                  href="#"
                  class="inline-block text-blue-500 underline hover:text-blue-400"
                >
                  Read more
                </a>
              </div>
            </div>
          </div>

          <div>
            <img
              class="object-cover object-center w-full h-64 rounded-lg lg:h-80"
              src="https://images.unsplash.com/photo-1597534458220-9fb4969f2df5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
              alt=""
            />

            <div class="mt-8">
              <span class="text-blue-500 uppercase">category</span>

              <h1 class="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                Which services you get from Meraki UI
              </h1>

              <p class="mt-2 text-gray-500 dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam est
                asperiores vel, ab animi recusandae nulla veritatis id tempore
                sapiente
              </p>

              <div class="flex items-center justify-between mt-4">
                <div>
                  <a
                    href="#"
                    class="text-lg font-medium text-gray-700 dark:text-gray-300 hover:underline hover:text-gray-500"
                  >
                    Tom Hank
                  </a>

                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    February 19, 2022
                  </p>
                </div>

                <a
                  href="#"
                  class="inline-block text-blue-500 underline hover:text-blue-400"
                >
                  Read more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBlog;
