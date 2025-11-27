import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="w-screen min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
        <p className="text-gray-300">Loading token data...</p>
      </div>
    </div>
  );
}

export default Loader;