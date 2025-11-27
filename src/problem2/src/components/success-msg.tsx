import { CheckCircle2 } from "lucide-react";

const SuccessMsg = () => {
  return (
    <div className="mt-4 bg-green-500/10 border border-green-500/50 rounded-xl p-4 flex items-center gap-3">
      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
      <p className="text-green-300 text-sm">Swap successful!</p>
    </div>
  );
};

export default SuccessMsg;