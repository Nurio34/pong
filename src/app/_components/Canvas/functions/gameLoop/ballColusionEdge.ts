import { RefObject, useEffect } from "react";
import { Ball } from "../initBall";

export const ballColusionEdge = (
  canvasRef: RefObject<HTMLCanvasElement | null>,
  ctxRef: RefObject<CanvasRenderingContext2D | null>,
  ballRef: RefObject<Ball | null>
) => {
  if (canvasRef.current && ctxRef.current && ballRef.current) {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const ball = ballRef.current;

    if (ball.x + ball.r > canvas.width) {
      ball.vx = -1;
    }
    if (ball.x - ball.r < 0) {
      ball.vx = 1;
    }
    if (ball.y + ball.r > canvas.height) {
      ball.vy = -1;
    }
    if (ball.y - ball.r < 0) {
      ball.vy = 1;
    }
  }
};
