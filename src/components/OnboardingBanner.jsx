import { useState } from "react";
import { trainerOnboarding } from "../api/trainerApi";
import { getErrorMessage } from "../api/axiosInstance";

// reminder to finish stripe setup, without it the trainer cannot add courses
export default function OnboardingBanner({ onboarded }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleOnboarding() {
    setError("");
    setLoading(true);
    try {
      const res = await trainerOnboarding();
      const url = res.data.onBoarding_url;
      if (url) {
        // open in a new tab so the dashboard stays open; stripe will redirect
        // that new tab back to the dashboard once onboarding is done
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        setError("Could not open the payment setup page, try again");
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  // already onboarded, nothing to remind them about
  if (onboarded) return null;

  return (
    <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-amber-900">
            Complete your payment setup to start adding courses
          </p>
          <p className="text-xs text-amber-700">
            You will finish this on Stripe's own page, then just come back to your dashboard.
          </p>
        </div>
        <button onClick={handleOnboarding} disabled={loading} className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 disabled:opacity-60">
          {loading ? "Opening Stripe..." : "Set up payments"}
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
