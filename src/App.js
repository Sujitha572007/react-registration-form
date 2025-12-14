import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";

/* ---------------- FORM PAGE ---------------- */
function RegisterForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    city: "",
    pan: "",
    aadhaar: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.firstName) e.firstName = "Required";
    if (!form.lastName) e.lastName = "Required";
    if (!form.username) e.username = "Required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Invalid Email";
    if (form.password.length < 6) e.password = "Min 6 characters";
    if (form.phone.length < 10) e.phone = "Invalid phone";
    if (!form.country) e.country = "Required";
    if (!form.city) e.city = "Required";
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.pan)) e.pan = "Invalid PAN";
    if (!/^\d{12}$/.test(form.aadhaar)) e.aadhaar = "Invalid Aadhaar";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/summary", { state: form });
    }
  };

  return (
    <div className="container">
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        {Object.keys(form).map((key) => (
          <div className="field" key={key}>
            <input
              type={key === "password" ? (showPassword ? "text" : "password") : "text"}
              placeholder={key.toUpperCase()}
              value={form[key]}
              className={errors[key] ? "error" : ""}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />

            {key === "password" && (
              <span className="toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </span>
            )}

            {errors[key] && <small>{errors[key]}</small>}
          </div>
        ))}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

/* ---------------- SUMMARY PAGE ---------------- */
function Summary() {
  const { state } = useLocation();

  return (
    <div className="container">
      <h2>Submitted Details</h2>
      <div className="card">
        {Object.entries(state || {}).map(([k, v]) => (
          <p key={k}>
            <b>{k.toUpperCase()}:</b> {v}
          </p>
        ))}
      </div>
    </div>
  );
}

/* ---------------- MAIN APP ---------------- */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </BrowserRouter>
  );
}
