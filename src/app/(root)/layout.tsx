import "../../styles/globals.css";
import { Roboto, Lora } from "next/font/google";
import StoreProvider from "../StoreProvider";
import Header from "@/components/ui/Header/Header";
import Footer from "@/components/ui/Footer";
import NavigateBar from "@/components/ui/NavigateBar/NavigateBar";
import LenisScroll from "@/utils/LenisScroll";
import DarkModeActive from "@/components/admin/UI/Sidebar/DarkModeActive";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal"],
  display: "swap",
  variable: "--font-roboto",
});

const App = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html className={`${roboto.variable} `}>
      <head>
        <title>PETZ - Pet Services and Product</title>
      </head>
      <body>
        <StoreProvider>
          <DarkModeActive />
          <LenisScroll />
          <Header />
          <NavigateBar />
          <main>{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
};

export default App;
