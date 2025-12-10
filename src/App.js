import React, { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  PieChart,
  TrendingUp,
  Target,
  DollarSign,
  Briefcase,
  Landmark,
  Calculator,
  ArrowRight,
  ShieldCheck,
  Loader2,
} from "lucide-react";

// 【重要】請將下方的網址換成你在 Formspree 申請到的 Endpoint URL
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mkgdqzar";

const App = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    stage: "",
    financialGoals: [],
    investmentExperience: [],
    monthlySavings: "",
    concerns: [],
    contactInfo: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field, value) => {
    const current = formData[field] || [];
    if (current.includes(value)) {
      handleChange(
        field,
        current.filter((item) => item !== value)
      );
    } else {
      handleChange(field, [...current, value]);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setErrorMsg("傳送失敗，請稍後再試");
      }
    } catch (error) {
      setErrorMsg("網路連線異常，請檢查您的網路");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    {
      title: "財務策劃初診",
      subtitle: "您的私人財務建築師",
      content: (
        <div className="space-y-8 text-slate-700">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center p-4 bg-slate-900 rounded-2xl shadow-xl mb-2">
              <Landmark size={32} className="text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              建構您的財富藍圖
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm max-w-xs mx-auto">
              真正的財富管理，不是單一產品的買賣，而是透過系統化的配置，讓資產穩健增長並有效傳承。
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
            <h3 className="font-bold text-slate-800 text-sm border-b border-slate-200 pb-2 mb-2">
              本次諮詢將協助您釐清：
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Target className="text-amber-600 shrink-0 mt-0.5" size={18} />
                <div>
                  <span className="font-bold text-sm text-slate-800">
                    目標具象化
                  </span>
                  <p className="text-xs text-slate-500">
                    將抽象的退休或購屋夢想，轉化為可執行的數字。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <PieChart
                  className="text-amber-600 shrink-0 mt-0.5"
                  size={18}
                />
                <div>
                  <span className="font-bold text-sm text-slate-800">
                    資產配置優化
                  </span>
                  <p className="text-xs text-slate-500">
                    檢視現有工具效率，補足缺口並降低無謂風險。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck
                  className="text-amber-600 shrink-0 mt-0.5"
                  size={18}
                />
                <div>
                  <span className="font-bold text-sm text-slate-800">
                    稅務與傳承
                  </span>
                  <p className="text-xs text-slate-500">
                    預先做好防護網，確保財富能按照您的意願留存。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg group"
          >
            開啟規劃旅程{" "}
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      ),
    },
    {
      title: "人生階段定位",
      subtitle: "財務規劃始於對現狀的理解",
      icon: <Target className="text-amber-600" />,
      content: (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">
              您目前處於哪個人生階段？
            </label>
            <div className="grid grid-cols-1 gap-3">
              {[
                {
                  label: "資產累積期",
                  desc: "專注本業收入，尋求資產增值與第一桶金",
                  val: "accumulation",
                },
                {
                  label: "家庭責任期",
                  desc: "重視家庭現金流穩定、房貸與子女教育",
                  val: "family",
                },
                {
                  label: "財富成熟期",
                  desc: "資產已有基礎，思考退休後的被動收入來源",
                  val: "pre_retirement",
                },
                {
                  label: "樂齡傳承期",
                  desc: "重視資產保全、稅務規劃與順利移轉",
                  val: "legacy",
                },
              ].map((opt) => (
                <div
                  key={opt.val}
                  onClick={() => handleChange("stage", opt.val)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    formData.stage === opt.val
                      ? "bg-amber-50 border-amber-500 shadow-md ring-1 ring-amber-500"
                      : "bg-white border-slate-200 hover:border-amber-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4
                        className={`font-bold ${
                          formData.stage === opt.val
                            ? "text-amber-900"
                            : "text-slate-700"
                        }`}
                      >
                        {opt.label}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">{opt.desc}</p>
                    </div>
                    {formData.stage === opt.val && (
                      <CheckCircle size={20} className="text-amber-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              如何稱呼您
            </label>
            <input
              type="text"
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
              placeholder="例如：陳先生 / Alice"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
        </div>
      ),
    },
    {
      title: "財務目標設定",
      subtitle: "我們將為此目標量身打造策略",
      icon: <Landmark className="text-amber-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-slate-500">
            請選擇 1-3 個您目前最重視的項目：
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                id: "cashflow",
                label: "增加被動收入",
                icon: <DollarSign size={16} />,
              },
              {
                id: "house",
                label: "購屋/置產計畫",
                icon: <Briefcase size={16} />,
              },
              {
                id: "fire",
                label: "提早退休 (FIRE)",
                icon: <TrendingUp size={16} />,
              },
              {
                id: "tax",
                label: "稅務優化/節稅",
                icon: <Calculator size={16} />,
              },
              {
                id: "education",
                label: "子女教育基金",
                icon: <CheckCircle size={16} />,
              },
              {
                id: "risk",
                label: "資產保全/避險",
                icon: <PieChart size={16} />,
              },
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => handleMultiSelect("financialGoals", item.id)}
                className={`p-3 rounded-xl border cursor-pointer flex flex-col items-center text-center justify-center gap-2 transition-all h-28 ${
                  formData.financialGoals.includes(item.id)
                    ? "bg-slate-800 text-white border-slate-800 shadow-lg transform scale-[1.02]"
                    : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600"
                }`}
              >
                <div
                  className={`${
                    formData.financialGoals.includes(item.id)
                      ? "text-amber-400"
                      : "text-slate-400"
                  }`}
                >
                  {item.icon}
                </div>
                <span className="font-medium text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "資產配置概況",
      subtitle: "了解您的工具，才能優化配置",
      icon: <PieChart className="text-amber-600" />,
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              您目前持有或熟悉的工具（可複選）：
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                "股票/ETF",
                "基金/債券",
                "房地產",
                "保險/儲蓄",
                "虛擬貨幣",
                "定存/現金",
                "公司股權",
              ].map((tool) => (
                <button
                  key={tool}
                  onClick={() =>
                    handleMultiSelect("investmentExperience", tool)
                  }
                  className={`px-4 py-2 rounded-full text-sm border transition-all ${
                    formData.investmentExperience.includes(tool)
                      ? "bg-slate-800 text-amber-400 border-slate-800"
                      : "bg-white border-slate-300 text-slate-600 hover:border-slate-400"
                  }`}
                >
                  {tool}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              每月的「財務結餘」大約是多少？
            </label>
            <p className="text-xs text-slate-500 mb-2">
              （收入扣除所有開銷後，可用於理財規劃的資金）
            </p>
            <select
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none bg-white"
              value={formData.monthlySavings}
              onChange={(e) => handleChange("monthlySavings", e.target.value)}
            >
              <option value="">請選擇區間</option>
              <option value="1-3w">1萬 - 3萬</option>
              <option value="3-5w">3萬 - 5萬</option>
              <option value="5-10w">5萬 - 10萬</option>
              <option value="10w+">10萬以上</option>
              <option value="negative">目前無結餘，需協助檢視收支</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      title: "現況關注點",
      subtitle: "有什麼阻礙了您的財富增長？",
      icon: <TrendingUp className="text-amber-600" />,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-slate-600 mb-2">
            除了市場波動，您目前最擔心的財務風險？
          </p>
          {[
            "現金購買力下降（通膨風險）",
            "缺乏穩定被動現金流（收入單一）",
            "資產傳承與稅務問題",
            "突發健康狀況導致資產縮水",
            "投資過於分散，缺乏整體策略",
          ].map((concern) => (
            <div
              key={concern}
              onClick={() => handleMultiSelect("concerns", concern)}
              className={`p-3 rounded-lg border cursor-pointer flex items-center gap-3 transition-all ${
                formData.concerns.includes(concern)
                  ? "bg-amber-50 border-amber-400"
                  : "bg-white border-slate-200 hover:bg-slate-50"
              }`}
            >
              <div
                className={`w-5 h-5 rounded border flex items-center justify-center ${
                  formData.concerns.includes(concern)
                    ? "bg-amber-500 border-amber-500"
                    : "border-slate-300"
                }`}
              >
                {formData.concerns.includes(concern) && (
                  <CheckCircle size={14} className="text-white" />
                )}
              </div>
              <span
                className={`text-sm ${
                  formData.concerns.includes(concern)
                    ? "text-slate-900 font-medium"
                    : "text-slate-600"
                }`}
              >
                {concern}
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "預約初步分析",
      subtitle: "讓我們開始對話",
      icon: <Briefcase className="text-amber-600" />,
      content: (
        <div className="space-y-6">
          <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
            <h4 className="font-bold text-slate-800 text-sm mb-2">
              接下來的步驟：
            </h4>
            <ul className="text-sm text-slate-600 space-y-2">
              <li className="flex gap-2">
                <span className="text-amber-600 font-bold">1.</span>
                <span>收到資料後，我會進行初步的財務架構檢視。</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-600 font-bold">2.</span>
                <span>
                  24小時內，透過訊息與您確認一對一的線上/線下解說時間。
                </span>
              </li>
            </ul>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              聯絡方式 (Line ID / 手機)
            </label>
            <input
              type="text"
              className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-lg placeholder:text-slate-300"
              placeholder="0912-345-678"
              value={formData.contactInfo}
              onChange={(e) => handleChange("contactInfo", e.target.value)}
            />
          </div>

          {errorMsg && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
              {errorMsg}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={!formData.contactInfo || !formData.name || isSubmitting}
            className={`w-full py-4 px-6 rounded-lg font-bold text-lg flex items-center justify-center gap-2 shadow-xl transition-all ${
              !formData.contactInfo || !formData.name || isSubmitting
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-2xl hover:-translate-y-1"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" /> 資料傳送中...
              </>
            ) : (
              <>
                提交並索取分析 <ChevronRight size={20} />
              </>
            )}
          </button>
        </div>
      ),
    },
  ];

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen md:min-h-0 md:my-10 md:rounded-2xl shadow-2xl overflow-hidden flex flex-col items-center justify-center p-8 text-center font-sans">
        <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-slate-300">
          <CheckCircle size={36} className="text-amber-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">資料已送出</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          謝謝您，{formData.name}。<br />
          我將著手準備您的財務初診報告，
          <br />
          並會盡快透過 {formData.contactInfo} 與您聯繫。
        </p>
        <button
          onClick={() => window.location.reload()}
          className="text-slate-500 text-sm hover:text-slate-800 underline"
        >
          返回首頁
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen md:min-h-0 md:my-10 md:rounded-2xl shadow-2xl overflow-hidden flex flex-col font-sans border-t-8 border-slate-900">
      {/* Header */}
      {step > 0 && (
        <div className="bg-white p-6 pb-2 relative">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="text-xs font-bold tracking-widest text-slate-400 uppercase">
              Planning Process {step}/{steps.length - 1}
            </div>
            <div className="w-10"></div>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
              {steps[step].icon}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                {steps[step].title}
              </h2>
              <p className="text-xs text-slate-500">{steps[step].subtitle}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-slate-100 w-full mt-4 rounded-full overflow-hidden">
            <div
              className="h-full bg-slate-900 transition-all duration-500 ease-out"
              style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className={`flex-1 p-6 ${
          step === 0 ? "flex flex-col justify-center bg-white" : ""
        }`}
      >
        <div className="animate-fade-in">{steps[step].content}</div>
      </div>

      {/* Footer Nav */}
      {step > 0 && step < steps.length - 1 && (
        <div className="p-6 pt-0 bg-white">
          <button
            onClick={handleNext}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            下一步
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
