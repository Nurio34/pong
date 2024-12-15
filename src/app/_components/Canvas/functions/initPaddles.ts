import { RefObject, useEffect } from "react";
import { MoveType } from "..";

export class Paddle {
  player: number;
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  speed: number;
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  moveState: MoveType;

  constructor(
    player: number,
    w: number,
    h: number,
    vx: number,
    vy: number,
    speed: number,
    canvas: HTMLCanvasElement | null,
    ctx: CanvasRenderingContext2D | null,
    moveState: MoveType
  ) {
    this.player = player;
    this.canvas = canvas;
    this.ctx = ctx;
    this.w = w;
    this.h = h;
    this.vx = vx;
    this.vy = vy;
    this.speed = speed;
    this.x =
      this.player === 1
        ? this.w
        : this.canvas
        ? this.canvas.width - this.w * 2
        : 0;
    this.y = this.canvas ? this.canvas.height / 2 - this.h / 2 : 0;
    this.moveState = moveState;
  }

  draw() {
    if (this.ctx) {
      this.ctx.fillStyle = this.player === 1 ? "red" : "purple";
      this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }
  move(moveState: MoveType) {
    if (this.canvas) {
      if (moveState.down) {
        if (this.y > this.canvas.height - this.h) return;
        this.y += this.speed * this.vy;
      }
      if (moveState.right) {
        if (this.x >= this.canvas.width / 2 - this.w) return;
        this.x += this.speed * this.vx;
      }
      if (moveState.up) {
        if (this.y <= 0) return;
        this.y -= this.speed * this.vy;
      }
      if (moveState.left) {
        if (this.x <= 0) return;
        this.x -= this.speed * this.vx;
      }
    }
  }
}

export const initPaddles = (
  canvasRef: RefObject<HTMLCanvasElement | null>,
  ctxRef: RefObject<CanvasRenderingContext2D | null>,
  paddle1Ref: RefObject<Paddle | null>,
  paddle2Ref: RefObject<Paddle | null>,
  moveState: MoveType
) => {
  useEffect(() => {
    if (canvasRef.current && ctxRef.current) {
      const paddle1 = new Paddle(
        1,
        10,
        100,
        1,
        1,
        10,
        canvasRef.current,
        ctxRef.current,
        moveState
      );
      const paddle2 = new Paddle(
        2,
        10,
        100,
        1,
        1,
        10,
        canvasRef.current,
        ctxRef.current,
        moveState
      );
      paddle1Ref.current = paddle1;
      paddle2Ref.current = paddle2;
    }
  }, []);
};
