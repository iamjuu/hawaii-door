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
      <div className="lg:w-80 border border-gray-100 shadow-2xl rounded-lg  h-min ">
        
        <h3 className="text-[16px] font-[400] mb-4 px-4 py-5 rounded-t-lg bg-gradient-to-r from-[#FFF7ED] to-[#FFEDD4] text-black">
  Your Quote Request
</h3>

        <div className="p-6">
        <div className="space-y-3 ">

            <div>
              <p className="text-sm text-black">Door Type</p>
              {quoteData.doorType && (
              <p className="font-medium text-black">{quoteData.doorType}</p>
            )}
            </div>
          
          
          {quoteData.category && (
            <div>
              <p className="text-sm text-black">Category</p>
              <p className="font-medium text-black">{quoteData.category}</p>
            </div>
          )}

          {currentStep >= 3 && quoteData.width && quoteData.height && (
            <div>
              <p className="text-sm text-black">Door Size</p>
              <p className="font-medium text-black">
                {quoteData.width}" x {quoteData.height}"
              </p>
            </div>
          )}

          {currentStep >= 3 && quoteData.thickness && (
            <div>
              <p className="text-sm text-black">Thickness</p>
              <p className="font-medium text-black">{quoteData.thickness}</p>
            </div>
          )}

          {currentStep >= 3 && (
            <div>
              <p className="text-sm text-black">Quantity</p>
              <p className="font-medium text-black">{quoteData.quantity}</p>
            </div>
          )}
        </div>
  
        <button
          onClick={onRestart}
          className="mt-6  w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-white transition-colors text-black"
        >
          <span>↻</span>
          <span>Restart Quote</span>
        </button>
        </div>
      </div>
    );
  };
  
  export default QuoteSummary;