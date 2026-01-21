import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import Searchbar from "@/components/shared/Searchbar";
import UserCard from "@/components/cards/UserCard";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { userId } = await auth();
  if (!userId) return null;

  const userInfo = await fetchUser(userId);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchUsers({
    userId: userId,
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      <Searchbar routeType="search" />

      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No Result</p>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>

      {/* <Pagination
        path='search'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      /> */}
    </section>
  );
}

export default Page;
