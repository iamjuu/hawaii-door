// components/user/build-door/QuoteSummary.tsx
interface QuoteData {
    doorType: string;
    category: string;
    doorConfig: string;
    width: string;
    height: string;
    thickness: string;
    quantity: number;
  }
  
  interface QuoteSummaryProps {
    quoteData: QuoteData;
    currentStep: number;
    onRestart: () => void;
  }
  
  const QuoteSummary = ({ quoteData, currentStep, onRestart }: QuoteSummaryProps) => {
    return (
      <div className="lg:w-80 border border-gray-100 shadow-2xl rounded-b-[15px]  h-min md:mt-[28px] ">
        
        <h3 className="text-[16px] font-[400] mb-4 px-4 py-5 rounded-b-[15.33px] bg-gradient-to-r from-[#FFF7ED] to-[#FFEDD4] text-black border-b border-gray-200">
  Your Quote Request
</h3>

        <div className="p-6">
        <div className="space-y-3 ">

            <div className="border-b border-gray-200 mb-[10px] md:mb-[20px]">
              <p className="text-[12px] md:text-[14px]  font-[400] text-[#4A5565] mb-[1px]">Door Type</p>
              {quoteData.doorType && (
              <p className="text-[12px] font-roboto md:text-[14px] text-black">{quoteData.doorType}</p>
            )}
            </div>
          
          
          {quoteData.category && (
           <div className="border-b border-gray-200 mb-[10px] md:mb-[20px]">
              <p className="text-[12px] md:text-[14px]  font-[400] text-[#4A5565]">Category</p>
              <p className="text-[12px] font-roboto md:text-[14px] text-black">{quoteData.category}</p>
            </div>
          )}

          {currentStep >= 3 && quoteData.width && quoteData.height && (
            <div className="border-b border-gray-200 mb-[10px] md:mb-[20px]">
              <p className="text-[12px] md:text-[14px]  font-[400] text-[#4A5565]">Door Size</p>
              <p className="text-[12px] font-roboto md:text-[14px] text-black">
                {quoteData.width}" x {quoteData.height}"
              </p>
            </div>
          )}

          {currentStep >= 3 && quoteData.thickness && (
           <div className="border-b border-gray-200 mb-[10px] md:mb-[20px]">
              <p className="text-[12px] md:text-[14px]  font-[400] text-[#4A5565]">Thickness</p>
              <p className="text-[12px] font-roboto md:text-[14px] text-black">{quoteData.thickness}</p>
            </div>
          )}

          {currentStep >= 3 && (
           <div className="border-b border-gray-200 mb-[10px] md:mb-[20px]">
              <p className="text-[12px] md:text-[14px]  font-[400] text-[#4A5565]">Quantity</p>
              <p className="text-[12px] font-roboto md:text-[14px] text-black">{quoteData.quantity}</p>
            </div>
          )}
        </div>
  
        <button
          onClick={onRestart}
          className="mt-6  w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-[8.17px] hover:bg-white transition-colors text-[#0A0A0A] text-[14px] font-roboto"
        >
          <span>↻</span>
          <span>Restart Quote</span>
        </button>
        </div>
      </div>
    );
  };
  
  export default QuoteSummary;