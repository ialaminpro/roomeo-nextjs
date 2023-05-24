import { getServerSession } from "next-auth";
import Header from "@/components/header.component";
import { authOptions } from "@/lib/auth";
import { redirect } from 'next/navigation';

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if(!user) redirect('/login');
  

  return (
    <>
      <Header />
      {/* <section className="bg-ct-blue-600  min-h-screen pt-20"> */}
      <section className="min-h-screen pt-20">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
          <div>
            <p className="mb-3 text-5xl text-center font-semibold">
              Profile Page
            </p>
            {!user ? (
              <p>Loading...</p>
            ) : (
              <div className="flex items-center gap-8">
                <div>
                  <img
                    src={user.image ? user.image : "/images/default.png"}
                    className="max-h-36"
                    alt={`profile photo of ${user.firstName} ${user.lastName}`}
                  />
                </div>
                <div className="mt-8">
                  <p className="mb-3">Name: {user.firstName} {user.lastName}</p>
                  <p className="mb-3">Email: {user.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
