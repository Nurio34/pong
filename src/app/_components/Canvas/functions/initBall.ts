import { RefObject, useEffect } from "react";

export class Ball {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  speed: number;
  ctx: CanvasRenderingContext2D | null;

  constructor(
    x: number,
    y: number,
    r: number,
    vx: number,
    vy: number,
    speed: number,
    ctx: CanvasRenderingContext2D | null
  ) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = vx;
    this.vy = vy;
    this.speed = speed;
    this.ctx = ctx;
  }

  draw() {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      this.ctx.fillStyle = "blue";
      this.ctx.fill();
      this.ctx.strokeStyle = "black";
      this.ctx.stroke();
    } else {
      console.error("Canvas context is not initialized");
    }
  }

  update() {
    this.x += this.speed * this.vx;
    this.y += this.speed * this.vy;
  }
}

export const initBall = (
  ctxRef: RefObject<CanvasRenderingContext2D | null>,
  ballRef: RefObject<Ball | null>
) => {
  useEffect(() => {
    if (ctxRef.current) {
      const ball = new Ball(100, 100, 25, 1, 1, 10, ctxRef.current);
      ballRef.current = ball;
    }
  }, []);
};
