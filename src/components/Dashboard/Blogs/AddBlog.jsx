import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Typewriter } from "react-simple-typewriter";

const AddBlog = ({ user, token }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:8800/api/add-blog", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire("✅ Success!", "Blog added successfully.", "success");
      reset();
    } catch (err) {
      setMessage("❌ Error adding blog. Please try again.");
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-red-600">Please log in to add a blog.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4 py-20">
      <div className="bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-2xl p-10 border border-white/40">
        <h2 className="text-4xl font-bold text-center mb-8 text-blue-900">
          <Typewriter
            words={[
              "📋 Add New Blog",
              "🚀 Launch Your Project",
              "💼 Post a Blog",
            ]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={80}
            deleteSpeed={60}
            delaySpeed={1200}
          />
        </h2>

        {/* User Info */}
        <div className="mb-6 text-center">
          <p className="text-xl font-semibold text-gray-800">
            👋 Hello, {user?.name}
          </p>
          <p className="text-md text-gray-600">{user?.email}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div>
            <input
              type="text"
              placeholder="Blog Title"
              {...register("title", { required: "Title is required" })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300"
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300"
            >
              <option value="">Select Category</option>
              <option value="Web Development">Development</option>
              <option value="Design">Design</option>
              <option value="Writing">Graphics Design</option>
              <option value="Marketing">Marketing</option>
            </select>
            {errors.category && (
              <p className="text-sm text-red-500 mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <textarea
              placeholder="Description"
              {...register("description", {
                required: "Description is required",
              })}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300"
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Deadline */}
          <div>
            <input
              type="date"
              {...register("date", { required: "Date is required" })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300"
            />
            {errors.date && (
              <p className="text-sm text-red-500 mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* image */}
          <div>
            <input
              type="text"
              placeholder="Image"
              {...register("picture", { required: "Image is required" })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300"
            />
          </div>

          {/* Hidden User Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              value={user?.email || ""}
              readOnly
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-500"
            />
            <input
              type="text"
              value={user?.name || ""}
              readOnly
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-500"
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full py-3 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 bg-blue-500"
            >
              ➕ Add Blog
            </button>
          </div>

          {/* Message */}
          {message && (
            <p className="text-center text-lg mt-4 text-red-600 font-medium">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
