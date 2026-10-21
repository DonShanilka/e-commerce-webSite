import type { FormEvent } from "react";
import { Send } from "lucide-react";

export function AiPromptForm({
  tool,
  prompt,
  loading,
  onPromptChange,
  onSubmit,
}: {
  tool: "assistant" | "search";
  prompt: string;
  loading: boolean;
  onPromptChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const isSearch = tool === "search";
  const maxLength = isSearch ? 500 : 2000;

  return (
    <form
      className="ai-form-card ai-assistant-form mt-[15px] p-[19px] [border:1px_solid_#eff6ff] rounded-[5px] bg-[#fff] max-[430px]:p-[14px]"
      onSubmit={onSubmit}
    >
      <label
        className="ai-input-label block mb-[8px] text-[#334155] text-[10px] font-bold"
        htmlFor="assistant-message"
      >
        {isSearch
          ? "Describe the product you have in mind"
          : "What can we help you find?"}
      </label>
      <textarea
        id="assistant-message"
        maxLength={maxLength}
        onChange={(event) => onPromptChange(event.target.value)}
        placeholder={
          isSearch
            ? "For example: a comfortable chair for working from home"
            : "For example: I need a thoughtful housewarming gift under LKR 10,000"
        }
        required
        rows={4}
        value={prompt}
        className="w-[100%] min-h-[106px] [resize:vertical] p-[12px] [border:1px_solid_#eff6ff] rounded-[4px] outline-none text-[#2d2a25] text-[11px] leading-[1.6] focus:border-[#475569] focus:[box-shadow:0_0_0_3px_#93c5fd1a] placeholder:text-[#475569]"
      />
      <div className="ai-form-bottom mt-[9px] flex justify-between items-center gap-[12px] max-[430px]:items-start max-[430px]:flex-col">
        <span className="text-[#475569] text-[8px]">
          {prompt.length}/{isSearch ? "500" : "2,000"} characters
        </span>
        <button
          className="market-button min-h-[43px] w-[fit-content] inline-flex justify-center items-center gap-[11px] p-[0_18px] [border:1px_solid_#242320] rounded-[4px] bg-[#242320] text-[#fff] text-[11px] font-bold [transition:transform_0.18s_ease,_background_0.18s_ease,_border-color_0.18s_ease] cursor-pointer [&:hover:not(:disabled)]:[transform:translateY(-1px)] [&:hover:not(:disabled)]:border-[#334155] [&:hover:not(:disabled)]:bg-[#2563eb] [&:disabled]:[opacity:0.6] [&:disabled]:cursor-wait [.market-hero_&]:mt-[10px] [.bag-empty_&]:mt-[9px] [.ai-hub-hero_&]:mt-[17px] max-[760px]:[.admin-ai-controls_&]:w-[100%] max-[430px]:[.ai-form-bottom_&]:w-[100%] [.admin-ai-controls_&]:flex-none"
          disabled={loading || !prompt.trim()}
          type="submit"
        >
          {loading
            ? "Looking through the catalog..."
            : isSearch
              ? "Search products"
              : "Find ideas"}{" "}
          <Send size={16} />
        </button>
      </div>
      <div className="ai-prompt-suggestions mt-[17px] pt-[12px] flex flex-wrap items-center gap-[7px] [border-top:1px_solid_#f0ede8]">
        <span className="mr-[2px] text-[#475569] text-[8px]">Try asking</span>
        {[
          "A useful gift for a new home",
          "Everyday products under LKR 5,000",
          "Something stylish for work",
        ].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onPromptChange(suggestion)}
            type="button"
            className="p-[7px_9px] [border:1px_solid_#eff6ff] rounded-[20px] bg-[#fff] text-[#334155] text-[8px] cursor-pointer hover:border-[#475569]"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </form>
  );
}
