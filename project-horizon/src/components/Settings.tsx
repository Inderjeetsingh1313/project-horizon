import { useState } from "react";
import "./Settings.css";
import Button from "./Button";
import InputField from "./InputField";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { updateField } from "./store/slices/settingsSlice";

type Theme = "Light" | "Dark" | "System";
type Language = "English" | "Hindi" | "French";

interface ValidationErrors {
  fullName: string;
  email: string;
}

function Settings() {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);

  const [errors, setErrors] = useState<ValidationErrors>({
    fullName: "",
    email: "",
  });

  const validateField = (
    name: keyof ValidationErrors,
    value: string,
  ): string => {
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
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Invalid Email Address.";
        }
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    return error;
  };

  const sanitizeInput = (value: string): string => {
    return value.replace(/\s{2,}/g, " ");
  };

  const isFormValid =
    settings.fullName.trim().length >= 3 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email) &&
    !errors.fullName &&
    !errors.email;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let inputValue = sanitizeInput(value);

    if (name === "email") {
      inputValue = inputValue.toLowerCase();
    }

    validateField(name as keyof ValidationErrors, inputValue);

    dispatch(
      updateField({
        name,
        value: inputValue,
      }),
    );
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  dispatch(
    updateField({
      name: "theme",
      value: e.target.value as Theme,
    }),
  );
};

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  dispatch(
    updateField({
      name: "language",
      value: e.target.value as Language,
    }),
  );
};

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateField({
        name: "notifications",
        value: e.target.checked,
      }),
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanedName = settings.fullName.trim().replace(/\s+/g, " ");

    const cleanedEmail = settings.email.trim().toLowerCase();

    const fullNameError = validateField("fullName", cleanedName);

    const emailError = validateField("email", cleanedEmail);

    if (fullNameError || emailError) {
      return;
    }

    dispatch(
      updateField({
        name: "fullName",
        value: cleanedName,
      }),
    );

    dispatch(
      updateField({
        name: "email",
        value: cleanedEmail,
      }),
    );
    alert("✅ Settings saved successfully!");
  };

  return (
    <section className="settings-section">
      <div className="settings-card">
        <h2>⚙️ Application Settings</h2>

        <p>
          Update your profile information and personalize your dashboard
          preferences.
        </p>

        <hr className="settings-divider" />

        <form onSubmit={handleSubmit}>
          <div className="settings-grid">
            <InputField
              id="fullName"
              label="Full Name"
              name="fullName"
              value={settings.fullName}
              placeholder="e.g. Inderjeet Singh"
              error={errors.fullName}
              required
              maxLength={50}
              onChange={handleChange}
            />

            <InputField
              id="email"
              label="Email Address"
              name="email"
              type="email"
              value={settings.email}
              placeholder="e.g. inderjeet@example.com"
              error={errors.email}
              required
              maxLength={100}
              onChange={handleChange}
            />

            <div className="form-group">
              <label htmlFor="theme">🎨 Theme</label>

              <select
                id="theme"
                value={settings.theme}
                onChange={handleThemeChange}
              >
                <option value="Light">Light</option>

                <option value="Dark">Dark</option>

                <option value="System">System</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="language">🌐 Language</label>

              <select
                id="language"
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
                  checked={settings.notifications}
                  onChange={handleNotificationChange}
                  className="toggle"
                />
                Receive Dashboard Notifications
              </label>
            </div>

            <div className="button-container">
              <Button type="submit" variant="primary" disabled={!isFormValid}>
                💾 Save Changes
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Settings;