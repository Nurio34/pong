import { RefObject, useEffect } from "react";

export const initilize2dContext = (
  canvasRef: RefObject<HTMLCanvasElement | null>,
  ctxRef: RefObject<CanvasRenderingContext2D | null>
) => {
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctxRef.current = ctx;
      } else {
        console.error("Failed to get 2D context");
      }
    }
  }, []);
};
