import React, { useEffect } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";

interface CashbackScanScreenProps {
  onBack: () => void;
  onScanSuccess: (data: { merchantId: string; storeId: string }) => void;
}

const CashbackScanScreen: React.FC<CashbackScanScreenProps> = ({
  onBack,
  onScanSuccess
}) => {

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();

    const startScanner = async () => {
      try {
        const videoInputDevices =
          await BrowserQRCodeReader.listVideoInputDevices();
        const backCamera = videoInputDevices.find(device =>
          device.label.toLowerCase().includes("back")
        );

        const selectedDeviceId =
          backCamera?.deviceId || videoInputDevices[0].deviceId;

        const previewElem = document.getElementById(
          "preview"
        ) as HTMLVideoElement;

        await codeReader.decodeFromVideoDevice(
          selectedDeviceId,
          previewElem,
          result => {
            if (result) {
              try {
                const payload = JSON.parse(result.getText());
                if (
                  payload.type === "localizei_cashback_qr" &&
                  payload.merchantId &&
                  payload.storeId
                ) {
                  codeReader.reset();
                  onScanSuccess({
                    merchantId: payload.merchantId,
                    storeId: payload.storeId
                  });
                }
              } catch (e) {
                console.error("Invalid QR Code");
              }
            }
          }
        );
      } catch (err) {
        console.error(err);
      }
    };

    startScanner();

    return () => codeReader.reset();
  }, []);

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center">
      <video
        id="preview"
        className="w-full h-full object-cover"
        autoPlay
        playsInline
      ></video>

      <button
        onClick={onBack}
        className="absolute top-5 left-5 px-4 py-2 bg-white text-black rounded-xl"
      >
        Voltar
      </button>
    </div>
  );
};

export default CashbackScanScreen;
