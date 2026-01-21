import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const userInfo = await fetchUser(userId);

  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text">Create Thread</h1>

      <PostThread userId={userInfo._id.toString()} />
    </>
  );
};

export default page;
