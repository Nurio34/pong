import { RefObject, useEffect } from "react";
import { ballColusionEdge } from "./ballColusionEdge";
import { Paddle } from "../initPaddles";

export const gameLoop = (
  canvas: RefObject<HTMLCanvasElement | null>,
  ctx: RefObject<CanvasRenderingContext2D | null>,
  ball: RefObject<any>,
  paddle1: RefObject<Paddle | null>,
  paddle2: RefObject<Paddle | null>
) => {
  useEffect(() => {
    function loop() {
      if (
        canvas.current &&
        ctx.current &&
        ball.current &&
        paddle1.current &&
        paddle2.current
      ) {
        ctx.current.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ball.current.update();
        ball.current.draw();

        paddle1.current.draw();
        paddle2.current.draw();

        ballColusionEdge(canvas, ctx, ball);

        console.log({ ball: ball.current, paddle1: paddle1.current });

        window.requestAnimationFrame(loop);
      }

      return () => {
        console.log("Animation stopped");
      };
    }

    loop();
  }, []);
};
