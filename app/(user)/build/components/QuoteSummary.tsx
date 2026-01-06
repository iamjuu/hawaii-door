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
        
        <h3 className="text-xl font-semibold mb-4 px-4 py-5 rounded-t-lg bg-gradient-to-r from-[#FFF7ED] to-[#FFEDD4]">
  Your Quote Request
</h3>

        <div className="p-6">
        <div className="space-y-3 ">

            <div>
              <p className="text-sm text-gray-600">Door Type</p>
              {quoteData.doorType && (
              <p className="font-medium">{quoteData.doorType}</p>
            )}
            </div>
          
          
          {quoteData.category && (
            <div>
              <p className="text-sm text-gray-600">Category</p>
              <p className="font-medium">{quoteData.category}</p>
            </div>
          )}

          {currentStep >= 3 && quoteData.width && quoteData.height && (
            <div>
              <p className="text-sm text-gray-600">Door Size</p>
              <p className="font-medium">
                {quoteData.width}" x {quoteData.height}"
              </p>
            </div>
          )}

          {currentStep >= 3 && quoteData.thickness && (
            <div>
              <p className="text-sm text-gray-600">Thickness</p>
              <p className="font-medium">{quoteData.thickness}</p>
            </div>
          )}

          {currentStep >= 3 && (
            <div>
              <p className="text-sm text-gray-600">Quantity</p>
              <p className="font-medium">{quoteData.quantity}</p>
            </div>
          )}
        </div>
  
        <button
          onClick={onRestart}
          className="mt-6  w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-white transition-colors"
        >
          <span>↻</span>
          <span>Restart Quote</span>
        </button>
        </div>
      </div>
    );
  };
  
  export default QuoteSummary;