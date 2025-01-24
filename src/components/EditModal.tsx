"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
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
import ImageUpload from "@/components/ImageUpload";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  category: z.string().nonempty("Category is required."),
  desc: z.string().min(20, "Content must be at least 20 characters."),
  file: z.string().nonempty("An image URL is required."),
});

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  defaultValues: z.infer<typeof formSchema>;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues); // Reset form values when defaultValues change
  }, [defaultValues, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent  className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
           <div className="flex gap-2">
           <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog title" {...field} />
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
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="border rounded-md p-2 w-full"
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      <option value="Technology">Technology</option>
                      <option value="Health">Health</option>
                      <option value="Travel">Travel</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Photography">Photography</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           </div>
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      className="border rounded-md p-2 w-full"
                      rows={4}
                      placeholder="Enter blog content"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      onChange={(imageUrl) => field.onChange(imageUrl)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="text-center flex items-center">
              <Button type="submit">Save Changes</Button>
              <DialogClose asChild>
                <Button variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
