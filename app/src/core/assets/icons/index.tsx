import { View } from 'react-native';
import Svg, { Circle, Path, Rect, SvgProps } from 'react-native-svg';
export const InfoIcon = (props: SvgProps) => {
    return (
        <Svg
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            fill="none"
            {...props}

        >
            <Path
                opacity={0.5}
                d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"
                fill="#1C274C"
            />
            <Path
                d="M12 17.75a.75.75 0 00.75-.75v-6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75zM12 7a1 1 0 110 2 1 1 0 010-2z"
                fill="#1C274C"
            />
        </Svg>
    );
}