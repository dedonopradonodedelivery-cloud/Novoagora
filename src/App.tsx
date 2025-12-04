import React, { useState } from "react";
import { Layout } from "./components/Layout";
import { HomeFeed } from "./components/HomeFeed";
import { CashbackPaymentScreen } from "./components/CashbackPaymentScreen";

type View = "home" | "cashback-demo";

export const App: React.FC = () => {
  const [view, setView] = useState<View>("home");

  const handleTabChange = (tab: string) => {
    if (tab === "home") setView("home");
    if (tab === "cashback") setView("cashback-demo");
    // outros tabs podem ser adicionados depois
  };

  return (
    <Layout activeTab={view === "home" ? "home" : view === "cashback-demo" ? "cashback" : "home"} onTabChange={handleTabChange}>
      {view === "home" && (
        <HomeFeed
          onOpenCashback={() => {
            setView("cashback-demo");
          }}
        />
      )}

      {view === "cashback-demo" && (
        <CashbackPaymentScreen
          merchantId="demo-merchant"
          merchantName="Loja Parceira Demo"
          cashbackPercent={5}
          userBalance={10}
          onBack={() => setView("home")}
          onComplete={() => setView("home")}
        />
      )}
    </Layout>
  );
};
