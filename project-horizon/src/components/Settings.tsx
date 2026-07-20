import { useState } from "react";
import "./Settings.css";

function Settings() {
  const [settings, setSettings] = useState({
    fullName: "",
    email: "",
    theme: "Light",
    language: "English",
    notifications: true,
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
  });
 const validateField = (name: string, value: string) => {
  let error = "";

  const scriptPattern =
    /<script|<\/script>|javascript:|onerror|onload|<img|iframe/i;

  if (scriptPattern.test(value)) {
    error = "Invalid characters detected.";
  }

  switch (name) {
    case "fullName":
      if (!value.trim()) {
        error = "Full Name is required.";
      } else if (value.trim().length < 3) {
        error = "Minimum 3 characters required.";
      }
      break;

    case "email":
      if (!value.trim()) {
        error = "Email is required.";
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        error = "Invalid Email Address.";
      }
      break;

    default:
      break;
  }

  setErrors((prev) => ({
    ...prev,
    [name]: error,
  }));

  return error;
};
  const isFormValid =
  settings.fullName.trim().length >= 3 &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email) &&
  !errors.fullName &&
  !errors.email;

  const sanitizeInput = (value: string) => {
  return value.trim().replace(/\s+/g, " ");
};

 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value, type } = e.target;

  const inputValue =
    type === "checkbox"
      ? (e.target as HTMLInputElement).checked
      : value;

  setSettings((prev) => ({
    ...prev,
    [name]: inputValue,
  }));

  if (type !== "checkbox") {
    validateField(name, value);
  }
};

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = e.target.value;

    setSettings((prev) => ({
      ...prev,
      theme: selectedTheme,
    }));

    switch (selectedTheme) {
      case "Light":
        console.log("Light Theme Selected");
        break;

      case "Dark":
        console.log("Dark Theme Selected");
        break;

      case "System":
        console.log("System Theme Selected");
        break;

      default:
        console.log("No Theme Selected");
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;

    setSettings((prev) => ({
      ...prev,
      language: selectedLanguage,
    }));

    console.log("Language:", selectedLanguage);
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const cleanedName = sanitizeInput(settings.fullName);
  const cleanedEmail = sanitizeInput(settings.email).toLowerCase();

  const fullNameError = validateField("fullName", cleanedName);
  const emailError = validateField("email", cleanedEmail);

  if (fullNameError || emailError) {
    return;
  }

  const finalData = {
    ...settings,
    fullName: cleanedName,
    email: cleanedEmail,
  };

  console.log(finalData);

  alert("Settings Saved Successfully!");
};

  return (
    <section className="settings-section">
      <div className="settings-card">
        <h2>Settings</h2>
        <p>Manage your application preferences.</p>

        <form onSubmit={handleSubmit}>
          <div className="settings-grid">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>

              <input
                id="fullName"
                type="text"
                name="fullName"
                value={settings.fullName}
                onChange={handleChange}
                className={errors.fullName ? "error" : ""}
              />

              {errors.fullName && (
                <span className="error-message">{errors.fullName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={settings.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />

              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="theme">Theme</label>

              <select
                id="theme"
                name="theme"
                value={settings.theme}
                onChange={handleThemeChange}
              >
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
                <option value="System">System</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="language">Language</label>

              <select
                id="language"
                name="language"
                value={settings.language}
                onChange={handleLanguageChange}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="French">French</option>
              </select>
            </div>

            <div className="checkbox-group">
              <label htmlFor="notifications">
                <input
  id="notifications"
  type="checkbox"
  name="notifications"
  checked={settings.notifications}
  onChange={handleChange}
  className="toggle"
/>
                Enable Notifications
              </label>
            </div>
          </div>

          <button
  type="submit"
  className="save-btn"
  disabled={!isFormValid}
>
  Save Settings
</button>
        </form>
      </div>
    </section>
  );
}

export default Settings;
