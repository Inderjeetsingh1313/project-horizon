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
  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };
  const handleThemeChange = (
  e: React.ChangeEvent<HTMLSelectElement>
) => {

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
const handleLanguageChange = (
  e: React.ChangeEvent<HTMLSelectElement>
) => {

  const language = e.target.value;

  setSettings((prev) => ({
    ...prev,
    language,
  }));

  console.log("Language:", language);
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(settings);

    alert("Settings Saved!");
  };

  return (
    <section className="settings-section">
      <div className="settings-card">

        <h2>Settings</h2>

        <form onSubmit={handleSubmit}>

          <div className="settings-grid">

            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="fullName"
                value={settings.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
  <label htmlFor="theme">Theme</label>

  <select
    id="theme"
    name="theme"
    value={settings.theme}
    onChange={handleThemeChange}
  >
    <option value="">Select Theme</option>
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

              <label>

                <input
                  type="checkbox"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleChange}
                />

                Enable Notifications

              </label>

            </div>

          </div>

          <button type="submit" className="save-btn">
            Save Settings
          </button>

        </form>

      </div>
    </section>
  );
}

export default Settings;