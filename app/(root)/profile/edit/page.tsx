import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";

async function Page() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const userInfo = await fetchUser(userId);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const userData = {
    id: user.id,
    objectId: userInfo?._id?.toString(),
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : (user.firstName ?? ""),
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (
    <>
      <h1 className="head-text">Edit Profile</h1>
      <p className="mt-3 text-base-regular text-light-2">Make any changes</p>

      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </>
  );
}

export default Page;
