import { Eye, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AuditTable({
  data,
  searchQuery,
}: {
  data: any[];
  searchQuery: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/50 border-b border-slate-100">
          <TableRow>
            <TableHead className="w-[120px] font-bold text-slate-600">
              LOG ID
            </TableHead>
            <TableHead className="font-bold text-slate-600">ACTION</TableHead>
            <TableHead className="font-bold text-slate-600">USER</TableHead>
            <TableHead className="font-bold text-slate-600">STATUS</TableHead>
            <TableHead className="text-right font-bold text-slate-600">
              DETAILS
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((log) => (
            <TableRow
              key={log.id}
              className="hover:bg-slate-50/80 transition-colors"
            >
              <TableCell className="font-mono text-xs font-semibold text-indigo-600">
                {log.id}
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium text-slate-700">
                    {log.action}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    {log.category}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-slate-600">{log.user}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {log.status === "Success" && (
                    <CheckCircle2 size={16} className="text-green-500" />
                  )}
                  {log.status === "Pending" && (
                    <Clock size={16} className="text-amber-500" />
                  )}
                  {log.status === "Error" && (
                    <AlertCircle size={16} className="text-red-500" />
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      log.status === "Success"
                        ? "text-green-700"
                        : log.status === "Pending"
                          ? "text-amber-700"
                          : "text-red-700"
                    }`}
                  >
                    {log.status}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-indigo-50 hover:text-indigo-600 rounded-full"
                    >
                      <Eye size={18} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] bg-white text-slate-900 border-none shadow-2xl rounded-3xl p-6">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold tracking-tight">
                        Review Request
                      </DialogTitle>
                      <DialogDescription className="text-slate-500 pt-1">
                        Tracking ID:{" "}
                        <span className="font-mono font-bold text-indigo-600">
                          {log.id}
                        </span>
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-6 py-8 px-1 max-h-[400px] overflow-y-auto">
                      <div className="flex flex-col items-end group">
                        <div className="bg-indigo-600 text-white p-4 rounded-2xl rounded-tr-none max-w-[85%] text-sm shadow-md leading-relaxed">
                          {log.request}
                        </div>
                        <span className="text-[10px] text-slate-400 mt-2 font-black tracking-widest uppercase">
                          {log.user} • {log.time}
                        </span>
                      </div>
                      <div className="flex flex-col items-start group">
                        <div className="bg-slate-100 text-slate-800 p-4 rounded-2xl rounded-tl-none max-w-[85%] text-sm border border-slate-200 shadow-sm leading-relaxed">
                          {log.aiResponse}
                        </div>
                        <span className="text-[10px] text-slate-400 mt-2 font-black tracking-widest uppercase">
                          AI ASSISTANT
                        </span>
                      </div>
                    </div>
                    <DialogFooter className="border-t border-slate-100 pt-6 flex gap-3 sm:justify-between">
                      <Button
                        variant="outline"
                        className="flex-1 rounded-xl h-11 border-red-100 text-red-600 hover:bg-red-50 font-bold"
                      >
                        Reject
                      </Button>
                      <Button className="flex-1 rounded-xl h-11 bg-indigo-600 text-white hover:bg-indigo-700 font-bold shadow-lg">
                        Approve & Deploy
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-10 text-slate-500"
              >
                No logs found for "{searchQuery}"
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
