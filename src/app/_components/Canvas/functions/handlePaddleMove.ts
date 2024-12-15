import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import { Paddle } from "./initPaddles";
import { MoveType } from "..";

export const handlePaddleMovement = (
  canvas: RefObject<HTMLCanvasElement | null>,
  ctx: RefObject<CanvasRenderingContext2D | null>,
  paddle: RefObject<Paddle | null>,
  setMoveState: Dispatch<SetStateAction<MoveType>>
) => {
  useEffect(() => {
    const handlePaddleKeyDown = (e: KeyboardEvent) => {
      if (!canvas.current || !ctx.current || !paddle.current) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setMoveState((prev) => ({ ...prev, down: true, up: false }));
          break;
        case "ArrowUp":
          e.preventDefault();
          setMoveState((prev) => ({ ...prev, up: true, down: false }));
          break;
        case "ArrowRight":
          e.preventDefault();
          setMoveState((prev) => ({ ...prev, right: true, lef: false }));
          break;
        case "ArrowLeft":
          e.preventDefault();
          setMoveState((prev) => ({ ...prev, left: true, right: false }));
          break;
        default:
          return;
      }
    };

    const handlePaddleKeyUp = (e: KeyboardEvent) => {
      if (!canvas.current || !ctx.current || !paddle.current) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setMoveState((prev) => ({ ...prev, down: false }));
          break;
        case "ArrowUp":
          e.preventDefault();
          setMoveState((prev) => ({ ...prev, up: false }));
          break;
        case "ArrowRight":
          e.preventDefault();
          setMoveState((prev) => ({ ...prev, right: false }));
          break;
        case "ArrowLeft":
          e.preventDefault();
          setMoveState((prev) => ({ ...prev, left: false }));
          break;
        default:
          return;
      }
    };

    window.addEventListener("keydown", handlePaddleKeyDown);
    window.addEventListener("keyup", handlePaddleKeyUp);

    return () => {
      window.removeEventListener("keydown", handlePaddleKeyDown);
      window.removeEventListener("keyup", handlePaddleKeyUp);
    };
  }, [canvas, ctx, paddle]);
};
