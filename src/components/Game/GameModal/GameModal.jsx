import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { X, ChevronRight, ChevronLeft, Check, Gift, Shield, Zap, Info, User, Package, CreditCard, Star } from 'lucide-react';

// --- Sub-components for each step ---

const Step1 = ({ userId, setUserId, serverId, setServerId }) => {
  const handleInputChange = (e, setter) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setter(value);
    }
  };

  return (
  <div className="max-w-2xl mx-auto animate-fade-in-up">
    <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-400">Enter Your Game ID</h3>
    <p className="text-slate-500 mb-6">Please enter your user ID and server ID (if applicable)</p>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          User ID / Game ID *
        </label>
        <input
          type="text"
          value={userId}
          onChange={(e) => handleInputChange(e, setUserId)}
          inputMode="numeric"
          placeholder="Enter your User ID"
          className="w-full px-4 py-3 bg-white border-2 border-emerald-200 focus:border-emerald-500 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Server ID (Optional)
        </label>
        <input
          type="text"
          value={serverId}
          onChange={(e) => handleInputChange(e, setServerId)}
          inputMode="numeric"
          placeholder="Enter your Server ID (if applicable)"
          className="w-full px-4 py-3 bg-white border-2 border-emerald-200 focus:border-emerald-500 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all"
        />
      </div>
      <div className="flex items-start space-x-2 bg-emerald-50 border-2 border-emerald-200 p-4 rounded-xl">
        <Info className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-700">
          You can find your User ID in the game profile section. Make sure to enter the correct ID to avoid issues or <a href="#" className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline">contact support.</a>
        </p>
      </div>
    </div>
  </div>
  );
};

const Step2 = ({ game, selectedPackage, setSelectedPackage, formatPrice }) => (
  <div className="animate-fade-in-up">
    <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-400 text-center">Choose Your Package</h3>
    <p className="text-slate-500 mb-6 text-center">Select the diamond/currency package you want</p>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {game.packages?.map((pkg) => (
        <div
          key={pkg.id}
          onClick={() => setSelectedPackage(pkg)}
          className={`group relative bg-gradient-to-br from-white to-emerald-50/30 border-2 p-5 rounded-2xl cursor-pointer transition-all duration-500 ${
            selectedPackage?.id === pkg.id
              ? 'border-emerald-500 ring-4 ring-emerald-500/30 shadow-xl shadow-emerald-500/30 scale-105'
              : 'border-emerald-200 hover:border-emerald-400 hover:shadow-lg hover:scale-102'
          }`}
        >
          {pkg.popular && (
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-emerald-600 to-lime-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg flex items-center space-x-1 shadow-emerald-500/40 animate-pulse">
              <Gift className="w-3 h-3" />
              <span>BEST DEAL</span>
            </div>
          )}
          
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">{pkg.amount}</div>
            {pkg.bonus !== '0' && (
              <div className="text-emerald-600 text-sm font-semibold mb-2 flex items-center justify-center space-x-1">
                <Gift className="w-4 h-4" />
                <span>+{pkg.bonus} Bonus</span>
              </div>
            )}
            <div className="text-emerald-600 font-bold text-xl">{formatPrice(pkg.price)}</div>
          </div>
          
          {selectedPackage?.id === pkg.id && (
            <div className="absolute top-3 left-3 bg-emerald-500 rounded-full p-1 shadow-lg animate-scale-in">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-lime-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
        </div>
      ))}
    </div>

    {/* Features */}
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 p-4 rounded-xl flex items-center space-x-3 hover:shadow-lg transition-all">
        <Zap className="w-8 h-8 text-yellow-600" />
        <div>
          <div className="font-semibold text-gray-900 text-sm">Instant Delivery</div>
          <div className="text-xs text-gray-600">Within 30 seconds</div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 p-4 rounded-xl flex items-center space-x-3 hover:shadow-lg transition-all">
        <Shield className="w-8 h-8 text-green-600" />
        <div>
          <div className="font-semibold text-gray-900 text-sm">100% Safe</div>
          <div className="text-xs text-gray-600">Secure transaction</div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-emerald-50 to-lime-50 border-2 border-emerald-200 p-4 rounded-xl flex items-center space-x-3 hover:shadow-lg transition-all">
        <Gift className="w-8 h-8 text-emerald-600" />
        <div>
          <div className="font-semibold text-gray-900 text-sm">Bonus Rewards</div>
          <div className="text-xs text-gray-600">Extra currency</div>
        </div>
      </div>
    </div>
  </div>
);

const Step3 = ({ paymentMethods, selectedPayment, setSelectedPayment }) => (
  <div className="animate-fade-in-up">
    <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-400 text-center">Select Payment Method</h3>
    <p className="text-slate-500 mb-6 text-center">Choose your preferred payment option</p>
    
    <div className="space-y-4 max-w-3xl mx-auto">
      {paymentMethods?.map((method, index) => (
        <div key={index} className="bg-gradient-to-br from-white to-emerald-50/20 border-2 border-emerald-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
          <div className="p-4 bg-gradient-to-r from-emerald-50 to-lime-50">
            <div className="flex items-center space-x-3">
              <div className="text-emerald-600">{method.icon}</div>
              <span className="font-semibold text-lg text-gray-900">{method.name}</span>
            </div>
          </div>
          <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {method.methods.map((m, i) => (
              <button
                key={i}
                onClick={() => setSelectedPayment(`${method.name}-${m}`)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedPayment === `${method.name}-${m}`
                    ? 'bg-gradient-to-r from-emerald-600 to-lime-600 text-white shadow-lg shadow-emerald-500/30 scale-105'
                    : 'bg-white text-gray-700 hover:bg-emerald-50 border-2 border-emerald-200 hover:border-emerald-400'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Step4Summary = ({ game, userId, serverId, selectedPackage, selectedPayment, formatPrice, agreeTerms, setAgreeTerms }) => (
  <div className="max-w-2xl mx-auto animate-fade-in-up">
    <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-400 text-center">Order Summary</h3>
    <p className="text-slate-500 mb-6 text-center">Please review your order before proceeding</p>
    
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-white to-emerald-50/30 border-2 border-emerald-200 p-6 rounded-2xl shadow-lg">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Package className="w-5 h-5 text-emerald-600" />
          <span>Order Details</span>
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Game</span>
            <span className="text-gray-900 font-medium">{game.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">User ID</span>
            <span className="text-gray-900 font-medium">{userId}</span>
          </div>
          {serverId && (
            <div className="flex justify-between">
              <span className="text-gray-600">Server ID</span>
              <span className="text-gray-900 font-medium">{serverId}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Package</span>
            <span className="text-gray-900 font-medium">{selectedPackage?.amount}</span>
          </div>
          {selectedPackage?.bonus !== '0' && (
            <div className="flex justify-between">
              <span className="text-gray-600">Bonus</span>
              <span className="text-emerald-600 font-medium">+{selectedPackage?.bonus}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Method</span>
            <span className="text-gray-900 font-medium">{selectedPayment}</span>
          </div>
          <div className="border-t-2 border-emerald-200 pt-3 mt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total Payment</span>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-lime-600 to-emerald-600">
                {formatPrice(selectedPackage?.price)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Terms */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 p-4 rounded-2xl space-y-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-gray-900 mb-1">Secure Transaction</p>
            <p className="text-sm text-gray-700">Your payment is protected. Items will be delivered instantly after payment confirmation.</p>
          </div>
        </div>
        <div className="border-t-2 border-green-200 pt-4">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 w-5 h-5 rounded border-2 border-emerald-300 bg-white text-emerald-600 focus:ring-emerald-500 focus:ring-offset-0 cursor-pointer transition-all"
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
              I agree to the <a href="#" className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline">Terms of Service</a> and confirm that the User ID is correct.
            </span>
          </label>
        </div>
      </div>
    </div>
  </div>
);

const GameModal = ({ game, onClose, paymentMethods = [], formatPrice = (price) => price }) => {
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [userId, setUserId] = useState('');
  const [serverId, setServerId] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Reset when game changes
  useEffect(() => {
    setStep(1);
    setSelectedPackage(null);
    setSelectedPayment(null);
    setUserId('');
    setServerId('');
    setAgreeTerms(false);
  }, [game]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!game) return null;

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    if (step === 1) return userId.length > 0;
    if (step === 2) return selectedPackage !== null;
    if (step === 3) return selectedPayment !== null;
    return false;
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <Step1 userId={userId} setUserId={setUserId} serverId={serverId} setServerId={setServerId} />;
      case 2:
        return <Step2 game={game} selectedPackage={selectedPackage} setSelectedPackage={setSelectedPackage} formatPrice={formatPrice} />;
      case 3:
        return <Step3 paymentMethods={paymentMethods} selectedPayment={selectedPayment} setSelectedPayment={setSelectedPayment} />;
      case 4:
        return <Step4Summary game={game} userId={userId} serverId={serverId} selectedPackage={selectedPackage} selectedPayment={selectedPayment} formatPrice={formatPrice} agreeTerms={agreeTerms} setAgreeTerms={setAgreeTerms} />;
      default:
        return null;
    }
  };

  const steps = [
    { num: 1, label: 'User ID', Icon: User },
    { num: 2, label: 'Package', Icon: Package },
    { num: 3, label: 'Payment', Icon: CreditCard },
    { num: 4, label: 'Confirm', Icon: Check }
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in custom-scrollbar">
      <div className="bg-white border-4 border-emerald-300 rounded-3xl max-w-5xl w-full max-h-[90vh] shadow-2xl shadow-emerald-500/30 flex flex-col relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-lime-300/10 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Header */}
        <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
          <img src={game.image} alt={`${game.name} banner`} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900 via-emerald-900/80 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-emerald-600 p-2.5 rounded-full transition-all hover:scale-110 active:scale-95"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative h-full flex flex-col justify-end p-6">
            <h2 className="text-3xl font-bold text-white drop-shadow-lg">{game.name}</h2>
            <p className="text-slate-200 text-sm drop-shadow-md">{game.description}</p>
            <div className="flex items-center space-x-3 mt-2">
              <span className="text-xs bg-gradient-to-r from-emerald-500 to-lime-500 text-white px-3 py-1 rounded-full font-medium shadow-lg">
                {game.category}
              </span>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star size={14} className="fill-current" />
                <span className="text-xs text-white font-semibold">{game.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-y-4 border-emerald-200 flex-shrink-0 relative z-10 bg-gradient-to-r from-emerald-50/50 via-lime-50/50 to-emerald-50/50">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 ${
                      step >= s.num
                        ? 'bg-gradient-to-br from-emerald-500 to-lime-500 text-white shadow-xl shadow-emerald-500/40 scale-110'
                        : 'bg-white text-gray-400 border-2 border-gray-300'
                    }`}
                  >
                    {step > s.num ? <Check className="w-6 h-6" /> : <s.Icon className="w-6 h-6" />}
                  </div>
                  <span
                    className={`text-xs mt-2 font-medium transition-colors ${
                      step >= s.num ? 'text-emerald-600' : 'text-gray-400'
                      }`}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < 3 && (
                  <div
                    className={`flex-1 h-2 mx-2 rounded-full transition-all duration-500 ${
                      step > s.num ? 'bg-gradient-to-r from-emerald-500 to-lime-500 shadow-lg shadow-emerald-500/30' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-grow relative z-10">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="p-6 border-t-4 border-emerald-200 bg-gradient-to-r from-emerald-50 to-lime-50 flex-shrink-0 relative z-10">
          <div className="flex items-center justify-between">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-emerald-300 hover:bg-emerald-50 hover:border-emerald-400 rounded-xl font-semibold transition-all text-gray-700 hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            )}
            {step < 4 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`ml-auto flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition-all ${
                  canProceed()
                    ? 'bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-white shadow-xl shadow-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 active:scale-95'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed border-2 border-gray-300'
                }`}
              >
                <span>Next Step</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                disabled={!agreeTerms}
                className={`ml-auto px-8 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all ${
                  agreeTerms
                    ? 'bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-white shadow-xl shadow-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 active:scale-95'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed border-2 border-gray-300'
                }`}
              >
                  <span>Complete Payment</span>
                  <Check className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

GameModal.propTypes = {
  game: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  paymentMethods: PropTypes.array,
  formatPrice: PropTypes.func,
};

export default GameModal;

