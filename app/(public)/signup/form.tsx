"use client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

function Form() {
  const [username, setUsername] = useState<undefined | string>("");
  const [password, setPassword] = useState<undefined | string>("");
  const [confrimPassword, setConfrimPassword] = useState<undefined | string>(
    ""
  );
  const [errors, setErrors] = useState<string[]>([]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors([]);
    if (password != confrimPassword) {
      const newErrors = [];
      newErrors.push("Password do not match");
      setErrors(newErrors);
      return;
    }

    const res = await fetch("api/signup", {
      method: "post",
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      window.location.href = "/signin";
    } else {
      alert("sign up failed");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 p-5 max-w-xs w-full bg-stone-800 rounded-lg"
    >
      <div className="text-center">
        <h3 className="font-semibold">Sign Up</h3>
      </div>
      <div className="my-3">
        <hr />
      </div>
      <div>
        <div className="flex flex-col gap-2">
          <label>Username</label>
          <input
            className="text-black p-3 border border-state-700 rounded-lg"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            id="username"
            placeholder="Username"
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label>Password</label>
        <input
          className="text-black p-3 border border-state-700 rounded-lg"
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          id="password"
          placeholder="Password"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>Confrim password</label>
        <input
          className="text-black p-3 border border-state-700 rounded-lg"
          type="text"
          onChange={(e) => setConfrimPassword(e.target.value)}
          value={confrimPassword}
          id="confrim-password"
          placeholder="Confrim Password"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-state-900 text-white p-3 rounded-l"
      >
        Sign Up
      </button>
      {errors.map((error) => {
        return (
          <div key={error} className="text-red-600">
            {error}
          </div>
        );
      })}
    </form>
  );
}
export default Form;
