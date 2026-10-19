import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import type { CartLine } from "@/src/features/cart/cart-slice";

const money = (amount: number) => `LKR ${amount.toLocaleString("en-LK")}`;

export function CartDrawer({
  lines,
  onClose,
  onChange,
  onRemove,
  onCheckout,
  onClear,
}: {
  lines: CartLine[];
  onClose: () => void;
  onChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
  onClear: () => void;
}) {
  const itemCount = lines.reduce((total, line) => total + line.quantity, 0);
  const total = lines.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  );

  return (
    <div
      className="bag-overlay fixed z-[50] [inset:0] flex [justify-content:flex-end] bg-[#14131080] animate-[overlay-in_0.18s_ease-out]"
      onClick={onClose}
    >
      <aside
        aria-label="Shopping bag"
        className="bag-drawer w-[min(460px,_100%)] h-[100%] p-[27px] flex flex-col bg-[#fff] [box-shadow:-15px_0_45px_#00000018] 
        animate-[drawer-in_0.22s_ease-out] max-[760px]:p-[21px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="bag-drawer-head flex justify-between items-center pb-[18px] [border-bottom:1px_solid_#eff6ff]">
          <div>
            <span className="market-kicker block text-[#64748b] text-[10px] font-bold tracking-[0.12em] uppercase">
              Your selection
            </span>
            <h2 className="m-[4px_0_0] text-[20px] tracking-[-0.04em]">
              Your bag{" "}
              <small className="text-[#334155] text-[12px] font-medium">
                ({itemCount})
              </small>
            </h2>
          </div>
          <button
            aria-label="Close bag"
            className="bag-close w-[35px] h-[35px] grid place-items-center [border:1px_solid_#eff6ff] rounded-[50%] 
            bg-[#fff] cursor-pointer"
            onClick={onClose}
            type="button"
          >
            <X size={19} />
          </button>
        </div>
        {lines.length ? (
          <div className="bag-lines [flex:1] overflow-auto">
            {lines.map(({ product, quantity }) => (
              <article
                className="bag-line p-[16px_0] grid grid-cols-[55px_1fr_auto] gap-[12px] [border-bottom:1px_solid_#f0ede9]"
                key={product.id}
              >
                <div className="bag-line-visual w-[55px] h-[55px] grid place-items-center 
                rounded-[4px] bg-[#f1eee9] text-[#334155]">
                  <ShoppingBag size={24} />
                </div>
                <div className="bag-line-copy grid content-start gap-[5px]">
                  <strong className="text-[10px] text-[11px]">
                    {product.name}
                  </strong>
                  <span className="text-[#334155] text-[9px]">
                    {money(product.price)} each
                  </span>
                  <div className="bag-line-actions flex items-center gap-[9px] mt-[4px]">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() => onChange(product.id, quantity - 1)}
                      type="button"
                      className="w-[24px] h-[24px] grid place-items-center [border:1px_solid_#eff6ff] rounded-[3px]
                       bg-[#fff] cursor-pointer"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-[#334155] text-[9px] text-[10px]">
                      {quantity}
                    </span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => onChange(product.id, quantity + 1)}
                      type="button"
                      className="w-[24px] h-[24px] grid place-items-center [border:1px_solid_#eff6ff] 
                      rounded-[3px] bg-[#fff] cursor-pointer"
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      aria-label="Remove item"
                      className="bag-remove [.bag-line-actions_&]:ml-[5px] [.bag-line-actions_&]:text-[#334155] w-[24px] 
                      h-[24px] grid place-items-center [border:1px_solid_#eff6ff] rounded-[3px] bg-[#fff] cursor-pointer"
                      onClick={() => onRemove(product.id)}
                      type="button"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <strong className="text-[10px]">
                  {money(product.price * quantity)}
                </strong>
              </article>
            ))}
          </div>
        ) : (
          <div className="bag-empty [flex:1] flex flex-col justify-center items-center gap-[10px] text-[#334155] text-center">
            <ShoppingBag size={30} />
            <strong className="text-[#272520] text-[15px]">
              Your bag is waiting.
            </strong>
            <span className="text-[10px]">
              Find something thoughtful for your day.
            </span>
            <button
              className="market-button min-h-[43px] w-[fit-content] inline-flex justify-center items-center gap-[11px] 
              p-[0_18px] [border:1px_solid_#242320] rounded-[4px] bg-[#242320] text-[#fff] text-[11px] font-bold 
              [transition:transform_0.18s_ease,_background_0.18s_ease,_border-color_0.18s_ease] cursor-pointer [
              &:hover:not(:disabled)]:[transform:translateY(-1px)] [&:hover:not(:disabled)]:border-[#334155] [&:hover:not(:disabled)]:bg-[#2563eb] 
              [&:disabled]:[opacity:0.6] [&:disabled]:cursor-wait [.market-hero_&]:mt-[10px] [.bag-empty_&]:mt-[9px] 
              [.ai-hub-hero_&]:mt-[17px] max-[760px]:[.admin-ai-controls_&]:w-[100%] max-[430px]:[.ai-form-bottom_&]:w-[100%] 
              [.admin-ai-controls_&]:flex-none"
              onClick={onClose}
              type="button"
            >
              Explore products <ArrowRight size={15} />
            </button>
          </div>
        )}
        <div className="bag-drawer-bottom mt-[auto] [border-top:1px_solid_#eff6ff]">
          <div className="bag-subtotal pt-[18px] flex justify-between text-[12px]">
            <span>Subtotal</span>
            <strong>{money(total)}</strong>
          </div>
          <p className="text-[#334155] text-[9px] leading-[1.6]">
            Delivery and final order details will be confirmed at checkout.
          </p>
          {lines.length > 0 && (
            <button
              className="market-button bag-checkout min-h-[43px] w-[fit-content] inline-flex justify-center items-center 
              gap-[11px] p-[0_18px] [border:1px_solid_#242320] rounded-[4px] bg-[#242320] text-[#fff] text-[11px] 
              font-bold [transition:transform_0.18s_ease,_background_0.18s_ease,_border-color_0.18s_ease] cursor-pointer 
              [&:hover:not(:disabled)]:[transform:translateY(-1px)] [&:hover:not(:disabled)]:border-[#334155] 
              [&:hover:not(:disabled)]:bg-[#2563eb] [&:disabled]:[opacity:0.6] [&:disabled]:cursor-wait [.market-hero_&]:mt-[10px] 
              [.bag-empty_&]:mt-[9px] [.ai-hub-hero_&]:mt-[17px] max-[760px]:[.admin-ai-controls_&]:w-[100%] 
              max-[430px]:[.ai-form-bottom_&]:w-[100%] [.admin-ai-controls_&]:flex-none w-[100%] mt-[9px]"
              onClick={onCheckout}
              type="button"
            >
              Continue to checkout <ArrowRight size={16} />
            </button>
          )}
          {lines.length > 0 && (
            <button
              className="bag-clear block m-[13px_auto_0] border-0 bg-transparent text-[#334155] text-[10px] cursor-pointer"
              onClick={onClear}
              type="button"
            >
              Clear bag
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
