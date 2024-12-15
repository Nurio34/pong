"use client";

import { useEffect, useRef, useState } from "react";
import { initilize2dContext } from "./functions/initilize2dContext";
import { Ball, initBall } from "./functions/initBall";
import { gameLoop } from "./functions/gameLoop";
import { initPaddles, Paddle } from "./functions/initPaddles";
import { handlePaddleMovement } from "./functions/handlePaddleMove";

export type MoveType = {
  down: boolean;
  up: boolean;
  right: boolean;
  left: boolean;
};

function Canvas() {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const ball = useRef<Ball | null>(null);
  const paddle1 = useRef<Paddle | null>(null);
  const paddle2 = useRef<Paddle | null>(null);
  const [moveState, setMoveState] = useState<MoveType>({
    down: false,
    up: false,
    right: false,
    left: false,
  });

  initilize2dContext(canvas, ctx);
  initBall(ctx, ball);
  initPaddles(canvas, ctx, paddle1, paddle2, moveState);
  gameLoop(canvas, ctx, ball, paddle1, paddle2);
  handlePaddleMovement(canvas, ctx, paddle1, setMoveState);

  useEffect(() => {
    paddle1.current?.move(moveState);
  }, [moveState]);

  return <canvas ref={canvas} style={{ display: "block" }}></canvas>;
}

export default Canvas;
