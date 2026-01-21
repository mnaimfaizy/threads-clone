import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";

import Comment from "@/components/forms/Comment";
import ThreadCard from "@/components/cards/ThreadCard";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchThreadById } from "@/lib/actions/thread.actions";

export const revalidate = 0;

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) return null;

  const { userId } = await auth();
  if (!userId) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(userId);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(id);

  return (
    <section className="relative">
      <div>
        <ThreadCard
          id={thread._id}
          currentUserId={userId}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>

      <div className="mt-7">
        <Comment
          threadId={params.id}
          currentUserImg={user.imageUrl}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className="mt-10">
        {thread.children.map(
          (childItem: {
            _id: string;
            parentId: string;
            text: string;
            author: { name: string; image: string; id: string };
            community: { name: string; id: string; image: string } | null;
            createdAt: string;
            children: unknown[];
          }) => (
            <ThreadCard
              key={childItem._id}
              id={childItem._id}
              currentUserId={userId}
              parentId={childItem.parentId}
              content={childItem.text}
              author={childItem.author}
              community={childItem.community}
              createdAt={childItem.createdAt}
              comments={childItem.children}
              isComment
            />
          ),
        )}
      </div>
    </section>
  );
}

export default page;
