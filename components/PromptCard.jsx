"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({
  post,
  handleEdit,
  handleDelete,
  handleTagClick,
  fetchPosts,
}) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/prompt/like`, {
        method: "PATCH",
        body: JSON.stringify({
          userId: session?.user.id,
          promptId: post._id,
        }),
      });

      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
          </div>
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer mb-3"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      <div class="flex items-center space-x-1 gap-3">
        <div onClick={handleLike} className="mt-5 cursor-pointer flex gap-2">
          <Image
            src={
              post.likes.includes(session?.user.id)
                ? "/assets/icons/heartFill.svg"
                : "/assets/icons/heart.svg"
            }
            alt={
              post.likes.includes(session?.user.id) ? "tick_icon" : "copy_icon"
            }
            width={20}
            height={20}
          />
          <p className="text-blue">{post.likes.length}</p>
        </div>

        <div onClick={handleCopy} className="mt-5 cursor-pointer">
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={20}
            height={20}
          />
        </div>

        {post?.link && (
          <Link
            href={post?.link ? post.link : "not found"}
            className="mt-5 cursor-pointer"
            target="_blank"
          >
            <Image
              src="/assets/icons/external.svg"
              alt="external_icon"
              width={20}
              height={20}
            />
          </Link>
        )}
      </div>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
