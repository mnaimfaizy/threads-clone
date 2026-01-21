import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { profileTabs } from "@/constants";

import { fetchUser } from "@/lib/actions/user.actions";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  // In Next.js 15+, params is a Promise and must be awaited
  const { id } = await params;

  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // Check if current user exists in database and needs onboarding
  const currentUserInfo = await fetchUser(userId);
  if (!currentUserInfo || !currentUserInfo.onboarded) {
    redirect("/onboarding");
  }

  // Fetch the profile being viewed
  const userInfo = await fetchUser(id);

  // If the profile user doesn't exist in database, redirect to home
  if (!userInfo) {
    redirect("/");
  }

  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={userId}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />

      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>

                {tab.label === "Threads" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {userInfo.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full text-light-1"
            >
              {/* @ts-ignore */}
              <ThreadsTab
                currentUserId={userId}
                accountId={userInfo.id}
                accountType="User"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default page;
