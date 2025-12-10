declare module "jsqr" {
  interface Point {
    x: number;
    y: number;
  }

  export interface QRLocation {
    topLeftCorner: Point;
    topRightCorner: Point;
    bottomLeftCorner: Point;
    bottomRightCorner: Point;
  }

  export interface QRCode {
    binaryData: Uint8ClampedArray;
    data: string;
    location: QRLocation;
  }

  export default function jsQR(
    imageData: Uint8ClampedArray | Uint8Array,
    width: number,
    height: number,
    options?: any
  ): QRCode | null;
}
