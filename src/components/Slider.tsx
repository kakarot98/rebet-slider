import { useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

//width and heights of slider bar
const TRACK_W = 320;
const TRACK_H = 72;

//orb diameter
const ORB = 56;
const RANGE = ((TRACK_W - ORB) / 2) - 2 //this is the maximum drag distance on either side (the last deduction of 2 is to make sure the orb never touches the edge)



export default function Slider() {

    const x = useMotionValue(0); // x-motion value for orb's hor position


  //springing effect when orb comes back to the OG pos (also animate it to come back)
  function handleDragEnd() {
    animate(x, 0, {
      type: "spring",
      stiffness: 300,
      damping: 28,
    });
  }


  return (
    <div
      className="w-[320px] h-[72px] rounded-xl overflow-hidden
                 bg-gradient-to-b from-[#25252F] to-[#14141B]
                 border border-[#3A3A46] flex items-center justify-center p-[2px]"
    >
      {/* Orb */}
      <motion.div
        drag="x"
        dragElastic={0}
        dragConstraints={{ left: -RANGE, right: RANGE }}
        style={{ x }}
        onDragEnd={handleDragEnd}
        className="w-[56px] h-[56px] rounded-full
                   bg-gradient-to-b from-orange-400 to-orange-600
                   shadow-[0_0_12px_rgba(255,165,0,0.6)]
                   flex items-center justify-center select-none"
      />
    </div>
  );


}