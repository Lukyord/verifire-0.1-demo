"use client";
import ProtectedRoute from "../../middleware/ProtectedRoute";
import AboutCarousel from "../../src/AboutPage/AboutCarousel";

export default function About() {
  return (
    <ProtectedRoute>
      <div className="overflow-y-hidden">
        <AboutCarousel />
      </div>
    </ProtectedRoute>
  );
}
