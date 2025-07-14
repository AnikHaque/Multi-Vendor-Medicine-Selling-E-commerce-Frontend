import React from "react";
import { useParams } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "Covaxin vs Covishield – A Detailed Comparision",
    date: "June 4, 2021",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Uis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    image:
      "https://demo2.wpthemego.com/themes/sw_mallon/wp-content/uploads/2021/06/blog-21.jpg",
  },
  {
    id: 2,
    title: "Veritatis Eet Quasi Architecto Aeat Vitae DictaSunt",
    date: "2025-04-20",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Uis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    image: "https://demo2.wpthemego.com/themes/sw_mallon/wp-content/uploads/2021/06/blog-22.jpg",
  },
  {
    id: 3,
    title: "Nemo enim ipsam voluptatem quia",
    date: "2025-04-10",
      excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Uis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    image:
      "https://demo2.wpthemego.com/themes/sw_mallon/wp-content/uploads/2021/06/blog-23.jpg",
  }
];


const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogPosts.find((post) => post.id === parseInt(id));

  if (!blog) {
    return <div className="p-10 text-center">Blog not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-20">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-2">{blog.date}</p>
      <hr className="mb-6" />
      <p className="text-lg text-gray-700 leading-relaxed">
        {/* Replace with dynamic content */}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
        facilisis erat. Quisque at dignissim lorem, nec cursus quam. Curabitur
        sit amet pretium nisi. Integer nec erat sed purus congue suscipit.
      </p>
    </div>
  );
};

export default BlogDetails;
