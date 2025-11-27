import { AlertCircle } from "lucide-react";

const ErrorMsg = ({ error }: { error: string }) => {
  return (
    <div className="mt-4 bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-center gap-3">
      <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
      <p className="text-red-300 text-sm">{error}</p>
    </div>
  );
};

export default ErrorMsg;
