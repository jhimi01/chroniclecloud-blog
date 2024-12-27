import SideNavLayout from "@/app/sidenav/layout";
import React from "react";

export default function UploadBlog() {
  return (
    <SideNavLayout>
      <div className="">
        <form className="md:px-6 w-full py-5">
          <h2 className="text-2xl text-center font-bold text-gray-800 mb-6">
            Upload a New Blog
          </h2>

          <div className="md:flex md:gap-10">
            {/* input fileds */}
            <div className="md:w-[60%]">
              {/* Title */}
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Blog Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter your blog title"
                  className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Author Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Category */}
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Blog Category
                </label>
                <select
                  id="category"
                  className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="tech">Tech</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="health">Health</option>
                  <option value="finance">Finance</option>
                </select>
              </div>

              {/* Content */}
              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Blog Content
                </label>
                <textarea
                  id="content"
                  rows={3}
                  placeholder="Write your blog content here..."
                  className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* File Upload */}
            <div className="md:w-[40%] flex items-center justify-center">
              <label
                htmlFor="file"
                className="flex flex-col items-center justify-center w-full px-14 py-8 bg-accent rounded-3xl border-2 border-dashed border-gray-400 shadow-lg hover:bg-gray-200 cursor-pointer transition-all duration-300"
              >
                <svg
                  viewBox="0 0 640 512"
                  height="50"
                  fill="currentColor"
                  className="mb-5 text-blue-500"
                >
                  <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                </svg>
                <p className="text-gray-500 text-sm font-semibold">Drag and Drop</p>
                <p className="text-gray-500 text-sm font-semibold">or</p>
                <span className="bg-blue-500 text-white py-1 mt-3 px-4 rounded-md text-sm hover:bg-blue-700">
                  Browse file
                </span>
                <input id="file" type="file" className="hidden" />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center my-5 md:my-0">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
            >
              Publish Blog
            </button>
          </div>
        </form>
      </div>
    </SideNavLayout>
  );
}
