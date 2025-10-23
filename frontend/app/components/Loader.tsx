"use client";
import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="w-8 h-8 animate-spin text-indigo-400 mb-4" />
      <p className="text-gray-400 text-lg">Loading Zora profiles...</p>
      <p className="text-gray-500 text-sm mt-2">Fetching real-time data from Zora API</p>
    </div>
  );
}

