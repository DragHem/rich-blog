"use client";

export default async function Home() {
  const loginHandler = async () => {
    const resp = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: "mail@mail.pl",
        password: "test",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();

    console.log(data);
  };

  return (
    <>
      <button onClick={loginHandler}>Zaloguj</button>
    </>
  );
}
