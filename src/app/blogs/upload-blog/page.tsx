"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SideNavLayout from "@/app/sidenav/layout";
import React, { useState } from "react";

const formSchema = z.object({
  title: z.string().min(10, {
    message: "Blog title must be at least 3 characters.",
  }),
  email: z.string().email("Invalid email address."),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  content: z.string().min(20, {
    message: "Content must be at least 20 characters.",
  }),
  file: z
    .any()
    .refine((file) => file instanceof File, { message: "File is required." }),
});

export default function UploadBlog() {
  const [contentLength, setContentLength] = useState(0);
  const maxContentLength = 500;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      email: "",
      category: "",
      content: "",
    },
  });

  const categories = [
    { Catevalue: "", label: "Select a category" },
    { Catevalue: "Technology", label: "Technology" },
    { Catevalue: "Health", label: "Health" },
    { Catevalue: "Travel", label: "Travel" },
    { Catevalue: "Nature", label: "Nature" },
    { Catevalue: "World", label: "World" },
  ];

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Submitting form:", values);
  };

  return (
    // <SideNavLayout>
    <div className="mx-auto container bg-accent pb-2 my-5">
      <div className="w-full bg-primary justify-center h-12 flex items-center py-5 font-normal text-xl">
        <h2 className="text-white">Create a blog</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-10">
          <div className="md:flex gap-10 w-full">
            <div className="md:w-1/2 mx-auto bg-white p-5 space-y-5">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Blog Title</FormLabel>
                    <FormControl className="rounded-none">
                      <Input placeholder="Enter your blog title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Author Email</FormLabel>
                    <FormControl className="rounded-none">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Blog Category</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="shadow-sm border border-gray-300 rounded-none w-full py-2 px-3 text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {categories.map((category: any, index: number) => (
                          <option key={index} value={category.Catevalue}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Content */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Blog Content</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        rows={3}
                        placeholder="Write your blog content here..."
                        maxLength={maxContentLength}
                        className="shadow-sm border border-gray-300 rounded-none w-full py-2 px-3 text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => {
                          const value = e.target.value;
                          setContentLength(value.length);
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                    <div className="text-right text-sm text-gray-500 mt-1">
                      {contentLength}/{maxContentLength} characters
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* file upload */}
            <div className="md:w-1/2 mx-auto flex items-center justify-center bg-white p-3">
              {/* File Upload */}
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">
                      Upload File
                    </FormLabel>
                    <FormControl>
                      <label className="flex flex-col items-center justify-center md:w-[350px] md:h-[300px] w-full h-full px-14 py-8 bg-accent rounded-3xl border-2 border-dashed border-gray-400 shadow-lg hover:bg-gray-200 cursor-pointer transition-all duration-300">
                        <svg
                          viewBox="0 0 640 512"
                          height="50"
                          fill="currentColor"
                          className="mb-5 text-primary"
                        >
                          <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                        </svg>
                        <p className="text-gray-500 text-sm font-semibold">
                          Drag and Drop
                        </p>
                        <p className="text-gray-500 text-sm font-semibold">
                          or
                        </p>
                        <span className="bg-primary text-white py-1 mt-3 px-4 rounded-md text-sm hover:bg-blue-700">
                          Browse file
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) =>
                            field.onChange(e.target.files?.[0] ?? null)
                          }
                        />
                      </label>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center my-5 md:my-0">
            <Button type="submit" className="text-sm font-medium">
              Publish Blog
            </Button>
          </div>
        </form>
      </Form>
    </div>
    // </SideNavLayout>
  );
}
