import { Star, StarHalf } from "lucide-react";
import { Colors } from "./colors";

export const startsGenerators = (
  rating,
  stroke = "0",
  size,
  fill = Colors.customYellow
) => {
  return Array.from({ length: 5 }, (element,index) => {
    const number = index + 0.5;
    return <span key={index}>
        {
            rating >= index + 1 ? <Star size={size} fill={fill} stroke={stroke} /> : rating >= number ? <StarHalf size={size} fill={fill} stroke={stroke} /> : <Star size={size}  stroke={Colors.customYellow} />
        }
    </span>
  });
};
