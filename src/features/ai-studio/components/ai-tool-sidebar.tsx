import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { toolInfo, toolTabs } from "../ai-tool-config";
import type { AiTool } from "../types";

export function AiToolSidebar({ selectedTool }: { selectedTool: AiTool }) {
  return (
    <aside className="ai-tool-sidebar p-[16px_11px] [border:1px_solid_#eff6ff] rounded-[5px] bg-[#fbfaf8] max-[760px]:p-[10px]">
      <Link
        className="ai-back-link inline-flex items-center gap-[7px] m-[0_0_20px_5px] text-[#334155] text-[9px] max-[760px]:mb-[9px]"
        href="/ai"
      >
        <ArrowLeft size={15} /> AI studio
      </Link>
      <span className="ai-sidebar-label block p-[0_5px_9px] text-[#475569] text-[8px] font-[750] tracking-[0.12em] uppercase max-[760px]:hidden">
        Shopping tools
      </span>
      <nav
        aria-label="AI shopping tools"
        className="grid gap-[4px] max-[760px]:flex max-[760px]:overflow-x-auto max-[760px]:gap-[5px]"
      >
        {toolTabs.map(({ id, label }) => {
          const TabIcon = toolInfo[id].icon;
          return (
            <Link
              aria-current={selectedTool === id ? "page" : undefined}
              className={`min-h-[38px] p-[0_9px] flex items-center gap-[9px] rounded-[3px] text-[#334155] text-[9px] hover:bg-[#eff6ff] hover:text-[#334155] max-[760px]:flex-none max-[760px]:min-h-[34px] max-[760px]:p-[0_9px] max-[760px]:text-[8px] ${selectedTool === id ? "bg-[#eff6ff] font-bold" : ""}`}
              href={`/ai/${id}`}
              key={id}
            >
              <TabIcon size={17} className="max-[760px]:w-[14px]" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="ai-sidebar-note mt-[20px] p-[11px_9px] flex items-start gap-[7px] [border-top:1px_solid_#eff6ff] text-[#475569] text-[8px] leading-[1.6] max-[760px]:hidden">
        <ShieldCheck size={17} className="[flex:0_0_17px] text-[#475569]" />
        <span>
          Suggestions use current catalog data. Always check product details
          before ordering.
        </span>
      </div>
    </aside>
  );
}
