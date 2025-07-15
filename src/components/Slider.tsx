import { useRef } from "react";
import { motion, useMotionValue, animate, useTransform } from "framer-motion";

import leftArrows from "@anim/glowing_left_arrows.json";
import rightArrows from "@anim/glowing_right_arrows.json";
import orbGlow from "@anim/glowing_circle.json";

//width and heights of slider bar
const TRACK_W = 320;
const TRACK_H = 72;

//orb diameter
const ORB = 56;
const RANGE = ((TRACK_W - ORB) / 2) - 2 //this is the maximum drag distance on either side (the last deduction of 2 is to make sure the orb never touches the edge)

//color pallettes
const COLORS = {
    orangeLight: "rgba(37, 37, 47, 1)",
    orangeDark: "rgba(20, 20, 27, 1)",
    orangeBorder: "rgba(255, 238, 146, 1)",

    redLight: "rgba(98, 22, 49, 1)",
    redDark: "rgba(255, 90, 139, 1)",
    redBorder: "rgba(218, 73, 108, 1)",

    greenLight: "rgba(27, 125, 67, 1)",
    greenDark: "rgba(108, 231, 150, 1)",
    greenBorder: "rgba(64, 198, 134, 1)",
}

export default function Slider() {

    const x = useMotionValue(0); // x-motion value for orb's hor position


    const trackBg = useTransform(x, [-RANGE, 0, RANGE], [
        `linear-gradient(180deg, ${COLORS.redLight} 0%, ${COLORS.redDark} 100%)`,
        `linear-gradient(180deg, ${COLORS.orangeLight} 0%, ${COLORS.orangeDark} 100%)`,
        `linear-gradient(180deg, ${COLORS.greenLight} 0%, ${COLORS.greenDark} 100%)`,
    ]) //this changes the bg gradient when moved along x axis

    const borderClr = useTransform(x, [-RANGE, 0, RANGE], [
        COLORS.redBorder,
        COLORS.orangeBorder,
        COLORS.greenBorder,
    ]); // this will change border color when dragged along x


    //springing effect when orb comes back to the OG pos (also animate it to come back)
    function handleDragEnd() {
        animate(x, 0, {
            type: "spring",
            stiffness: 300,
            damping: 28,
        });
    }


    return (
        <motion.div
            style={{
                width: TRACK_W,
                height: TRACK_H,
                background: trackBg,
                borderColor: borderClr,
            }}

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
        </motion.div>
    );


}