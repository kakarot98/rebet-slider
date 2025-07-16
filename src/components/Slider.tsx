import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";


import leftArrows from "../assets/AnimatedAssets/glowing_left_arrows.json";
import rightArrows from "../assets/AnimatedAssets/glowing_right_arrows.json";


import orbOrange from "../assets/StaticAssets/orange_button.png";
import orbRed    from "../assets/StaticAssets/red_button.png";
import orbGreen  from "../assets/StaticAssets/green_button.png";

// Dimensions
const TRACK_W = 320;
const TRACK_H = 72;
const ORB     = 56;
// leave 2px gap so the orb never touches the edge
const RANGE   = (TRACK_W - ORB) / 2 - 2;
// arrows sit 40px from center (ORB/2 + 12)
const ARROW_OFFSET = ORB / 2 + 12;

export default function Slider() {
  const x = useMotionValue(0);


  const redOpacity    = useTransform(x, [-RANGE, -RANGE * 0.2, 0], [1, 0, 0]);
  const orangeOpacity = useTransform(x, [-RANGE * 0.2, 0, RANGE * 0.2], [0, 1, 0]);
  const greenOpacity  = useTransform(x, [0, RANGE * 0.2, RANGE], [0, 0, 1]);


  const leftArrowOpacity  = useTransform(x, [-RANGE, -RANGE * 0.4], [1, 0]);
  const rightArrowOpacity = useTransform(x, [RANGE * 0.4, RANGE], [0, 1]);
  const trackBg = useTransform(x, [-RANGE, 0, RANGE], [
    "linear-gradient(180deg, rgba(98,22,49,1) 0%, rgba(255,90,139,1) 100%)",
    "linear-gradient(180deg, rgba(37,37,47,1) 0%, rgba(20,20,27,1) 100%)",
    "linear-gradient(180deg, rgba(27,125,67,1) 0%, rgba(108,231,150,1) 100%)"
  ]);
  const borderClr = useTransform(x, [-RANGE, 0, RANGE], [
    "rgba(218,73,108,1)",
    "rgba(255,238,146,1)",
    "rgba(64,198,134,1)"
  ]);

  // Snap back on release
  function handleDragEnd() {
    animate(x, 0, { type: "spring", stiffness: 300, damping: 28 });
  }

  return (
    <motion.div
      style={{ width: TRACK_W, height: TRACK_H, background: trackBg, borderColor: borderClr }}
      className="relative w-[320px] h-[72px] rounded-xl border border-[#3A3A46] overflow-visible p-[2px]"
    >
      {/* Left arrow */}
      <motion.div
        style={{ opacity: leftArrowOpacity }}
        className="absolute left-[calc(50%-40px)] top-1/2 -translate-y-1/2 w-[32px] h-[32px] pointer-events-none"
      >
        <Player autoplay loop src={leftArrows} className="w-full h-full" />
      </motion.div>

      {/* Right arrow */}
      <motion.div
        style={{ opacity: rightArrowOpacity }}
        className="absolute left-[calc(50%+40px)] top-1/2 -translate-y-1/2 w-[32px] h-[32px] pointer-events-none"
      >
        <Player autoplay loop src={rightArrows} className="w-full h-full" />
      </motion.div>

      {/* Draggable orb */}
      <motion.div
        drag="x"
        dragElastic={0}
        dragConstraints={{ left: -RANGE, right: RANGE }}
        style={{ x }}
        onDragEnd={handleDragEnd}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[56px] h-[56px] select-none"
      >
        <motion.img
          src={orbRed}
          style={{ opacity: redOpacity }}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <motion.img
          src={orbOrange}
          style={{ opacity: orangeOpacity }}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <motion.img
          src={orbGreen}
          style={{ opacity: greenOpacity }}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      </motion.div>
    </motion.div>
  );
}
