import { useState } from "react";
import "./Settings.css";
import Button from "./Button";
import InputField from "./InputField";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { updateField, resetSettings } from "./store/slices/settingsSlice";
import api from "../api/axios";
import { addNotification } from "./store/slices/notificationSlice";
import axios from "axios";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const value = e.target.value;

    if (value === "Light" || value === "Dark" || value === "System") {
      dispatch(
        updateField({
          name: "theme",
          value,
        }),
      );
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (value === "English" || value === "Hindi" || value === "French") {
      dispatch(
        updateField({
          name: "language",
          value,
        }),
      );
    }
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateField({
        name: "notifications",
        value: e.target.checked,
      }),
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    const cleanedName = settings.fullName.trim().replace(/\s+/g, " ");
    const cleanedEmail = settings.email.trim().toLowerCase();

    const fullNameError = validateField("fullName", cleanedName);
    const emailError = validateField("email", cleanedEmail);

    if (fullNameError || emailError) {
      return;
    }

    try {
      setIsSubmitting(true);

      await api.post("/settings", {
        fullName: cleanedName,
        email: cleanedEmail,
        theme: settings.theme,
        language: settings.language,
        notifications: settings.notifications,
      });

      dispatch(
        updateField({
          name: "fullName",
          value: cleanedName,
        }),
      );

      dispatch(
        addNotification({
          type: "success",
          message: "Settings saved successfully!",
          duration: 5000,
        }),
      );
    } catch (error: unknown) {
  if (
    axios.isAxiosError<{
      errors: {
        fullName: string;
        email: string;
      };
    }>(error)
  ) {
    if (error.response?.status === 400) {
      setErrors({
        fullName: error.response.data.errors.fullName || "",
        email: error.response.data.errors.email || "",
      });
    }
  }
} finally {
      setIsSubmitting(false);
    }
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
              <Button
                type="submit"
                variant="primary"
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? "Saving..." : "💾 Save Changes"}
              </Button>
              <button
                type="button"
                className="reset-btn"
                onClick={() => dispatch(resetSettings())}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Settings;
