import { useState, useEffect } from "react";

const CounselorRegistrationForm = ({ onRegistered }) => {
  const [form, setForm] = useState({ name: "", email: "", type: "" });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data.message });
      } else {
        setMessage({ type: "success", text: data.message });
        setForm({ name: "", email: "", type: "" });
        onRegistered(); // Refresh list
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Something went wrong" });
    }
  };

  // Click-to-dismiss effect
  useEffect(() => {
    const handleClick = () => {
      if (message) {
        setMessage(null);
      }
    };
    if (message) {
      window.addEventListener("click", handleClick);
    }
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [message]);

  return (
    <div className="bg-white p-6 shadow rounded-lg w-full">
      <h2 className="text-xl font-bold mb-4">Register Counselor</h2>

      {message && (
        <div
          className={`mb-4 text-sm p-2 rounded cursor-pointer ${
            message.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="type" className="block mb-1 font-medium">
            Role
          </label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Role</option>
            <option value="gate">Gate</option>
            <option value="desk1">Desk 1</option>
            <option value="desk2">Desk 2</option>
            <option value="desk3">Desk 3</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-red-700 text-white px-4 py-2 my-2 rounded w-full hover:bg-red-800"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default CounselorRegistrationForm;



