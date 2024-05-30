"use client";

import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { ImageIcon, XIcon } from "lucide-react";

const PostForm = () => {
  const { user } = useUser();
  const ref = useRef<HTMLFormElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePostAction = async (formData: FormData) => {
    const formDataCopy = formData;
    ref.current?.reset();

    const text = formDataCopy.get("postInput") as string;

    if (!text.trim()) {
      throw new Error("Post cannot be empty");
    }
    setPreview(null);

    try {
    //   await createPostAction(formDataCopy);
    } catch (error) {
      console.error("Error creating post", error);
    }
  };

  return (
    <div className="mb-2">
      <form
        action={(formData) => {
          console.log(formData);

          // Handle form submission server action

          handlePostAction(formData);

          // Toast notification based on promise from above
        }}
        ref={ref}
        className="p-3 bg-white rounded-lg border"
      >
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>
              {user?.username?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <input
            type="text"
            name="postInput"
            placeholder="What's on your mind?"
            className="flex-1 outline-none rounded-full py-3 px-4 border"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            hidden
            onChange={handleImageChange}
            ref={fileInput}
          />

          <button type="submit" hidden>
            Post
          </button>
        </div>

        {/* Preview condition check*/}

        {preview && (
          <div className="mt-4">
            <img src={preview} alt="preview" className="w-full object-cover" />
          </div>
        )}

        <div className="flex justify-end mt-2 space-x-2">
          <Button type="button" onClick={() => fileInput.current?.click()}>
            <ImageIcon className="mr-2" size={16} color="currentColor" />
            {preview ? "Change Image" : "Upload Image"}
          </Button>

          {/* Remove preview button */}

          {preview && (
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                setPreview(null);
              }}
            >
              <XIcon className="mr-2" size={16} color="currentColor" />
              Remove Image
            </Button>
          )}
        </div>
      </form>
      <hr className="mt-4 border-gray-300" />
    </div>
  );
};

export default PostForm;
