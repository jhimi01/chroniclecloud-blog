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
import React, { useEffect, useState } from "react";
import { userStore } from "@/stores/userStore";
import { useCookie } from "@/hooks/useCookie";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";

const formSchema = z.object({
  title: z.string().min(10, {
    message: "Blog title must be at least 3 characters.",
  }),
  useEmail: z.string().nonempty({ message: "File is required." }),
  category: z.string().nonempty("Please select a category."),
  desc: z.string().min(20, {
    message: "Content must be at least 20 characters.",
  }),
  file: z.string().nonempty({ message: "File is required." }),
});

export default function UploadBlog() {
  const {
    reset,
  } = useForm()
  const userInfo = userStore((state) => state.userInfo);
  const fetchUserInfo = userStore((state) => state.fetchUserInfo);
  // const { setValue } = useForm();
  const [descLength, setdescLength] = useState(0);
  const maxDescLength = 500;
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      useEmail: userInfo?.email || "",
      category: "",
      desc: "",
    },
  });
  
  const router = useRouter()

  const categories = [
    { Catevalue: "", label: "Select a category" },
    { Catevalue: "Technology", label: "Technology" },
    { Catevalue: "Health", label: "Health" },
    { Catevalue: "Travel", label: "Travel" },
    { Catevalue: "Fashion", label: "Fashion" },
    { Catevalue: "Photography", label: "Photography" },
  ];

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { file, ...restOfValues } = values;
    console.log("Form values on submit:", values);

    try {
      const response = await fetch("/api/post-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...restOfValues,
          file,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        router.push("/")
        console.log("Blog posted successfully:", data);
        reset()
        // Optionally, redirect the user or show a success message
      } else {
        console.error("Error posting blog:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const { getCookie } = useCookie({
    key: "authToken",
    days: 7,
    defaultValue: "",
  });



  // console.log("userInfo from upload blog", userInfo);

  useEffect(() => {
    const token = getCookie();
    if (!token) {
      router.push("/userProfile"); // Redirect to login if no token is found
      return;
    }

    // Fetch user info using Zustand store
    fetchUserInfo(token);
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

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
                name="useEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Author Email</FormLabel>
                    <FormControl className="rounded-none">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        {...field}
                        value={
                          userInfo?.email ? userInfo?.email : "email not found"
                        } // Fix the value here
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
                name="desc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Blog Content</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        rows={3}
                        placeholder="Write your blog content here..."
                        maxLength={maxDescLength}
                        className="shadow-sm border border-gray-300 rounded-none w-full py-2 px-3 text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => {
                          const value = e.target.value;
                          setdescLength(value.length);
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                    <div className="text-right text-sm text-gray-500 mt-1">
                      {descLength}/{maxDescLength} characters
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* file upload */}
            <ImageUpload
              onChange={(imageUrl) => {
                form.setValue("file", imageUrl);
              }}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center my-5 md:my-0">
            <Button
              type="submit"
              className="text-sm font-medium"
              // disabled={Object.keys(form.errors).length > 0}
            >
              Publish Blog
            </Button>
          </div>
        </form>
      </Form>
    </div>
    // </SideNavLayout>
  );
}
