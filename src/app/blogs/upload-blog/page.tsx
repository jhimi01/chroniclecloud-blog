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
import { toast, ToastContainer } from "react-toastify";

const formSchema = z.object({
  title: z.string().min(10, {
    message: "Blog title must be at least 3 characters.",
  }),
  category: z.string().nonempty("Please select a category."),
  desc: z.string().min(20, {
    message: "Content must be at least 20 characters.",
  }),
  file: z.string().min(1, { message: "File is required." }),
});

export default function UploadBlog() {
  const userInfo = userStore((state) => state.userInfo);
  const fetchUserInfo = userStore((state) => state.fetchUserInfo);
  const [descLength, setdescLength] = useState(0);
  const maxDescLength = 500;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      desc: "",
      file: "",
    },
  });

  const router = useRouter();
  const { getCookie } = useCookie({
    key: "authToken",
    days: 7,
    defaultValue: "",
  });

  useEffect(() => {
    const token = getCookie();
    if (!token) {
      router.push("/login"); // Redirect to login if no token is found
      return;
    }
    fetchUserInfo(token);
  }, []);

  // blog posting
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/post-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          userId: userInfo?.id,
          userEmail: userInfo?.email,
        }),
      });

      if (response.ok) {
        toast("successfully published!");
        router.push("/userProfile");
      } else {
        toast("Error posting blog!");
        console.error("Error posting blog");
      }
    } catch (error) {
      toast("error!");
      console.error("Error:", error);
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto container bg-accent pb-2 my-5">
      <div className="w-full bg-primary justify-center h-12 flex items-center py-5 font-normal text-xl">
        <h2 className="text-white">Create a blog</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-10">
          <div className="md:flex gap-10 w-full">
            <div className="md:w-1/2 mx-auto bg-white p-5 space-y-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Blog Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your blog title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Blog Category</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="shadow-sm border border-gray-300 rounded-none w-full py-2 px-3"
                      >
                        <option value="" disabled>
                          Select a category
                        </option>
                        <option value="Technology">Technology</option>
                        <option value="Health">Health</option>
                        <option value="Travel">Travel</option>
                        <option value="Travel">Fashion</option>
                        <option value="Travel">Photography</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        maxLength={maxDescLength}
                        className="shadow-sm border w-full py-2 px-3"
                        onChange={(e) => {
                          setdescLength(e.target.value.length);
                          field.onChange(e.target.value);
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
            <ImageUpload
              onChange={(imageUrl) => form.setValue("file", imageUrl)}
            />
          </div>
          <div className="flex justify-center my-5">
            <Button type="submit" className="text-sm font-medium">
              Publish Blog
            </Button>
          </div>
        </form>
      </Form>
      <ToastContainer />
    </div>
  );
}
