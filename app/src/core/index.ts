import { FontFamily } from '../../_layout';
import { StyleSheet, TextStyle, ViewStyle, StyleSheetProperties, DimensionValue } from 'react-native';

type SpaceProps = {
    width?: DimensionValue | number;
    height?: DimensionValue | number;
    backgroundColor?: string;
    // allow any other ViewStyle properties here
};

type BoxProps = {
    flex?: number;
    flexDirection?: 'row' | 'column';
    justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
    alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';
    gap?: number;
    rowGap?: number;
    columnGap?: number;
    padding?: number;
    paddingHorizontal?: number;
    paddingVertical?: number;
};

type TextProps = {
    fontSize?: number;
    color?: string;
    fontWeight?: 'normal' | 'bold';
    fontFamily?: FontFamily;
};

type ButtonProps = {
    backgroundColor?: string;
    borderRadius?: number;
    padding?: number;
    fontSize?: number;
    color?: string;
    width?: DimensionValue | number;
    height?: DimensionValue | number;
    FontFamily?: FontFamily;
};

type InputFieldProps = {
    backgroundColor?: string;
    borderRadius?: number;
    padding?: number;
    fontSize?: number;
    color?: string;
};
type FlexBoxProps = {
    flex?: number;
    flexDirection?: 'row' | 'column';
    justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
    alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';
    gap?: number;
    rowGap?: number;
    columnGap?: number;
    padding?: number;
    paddingHorizontal?: number;
    paddingVertical?: number;
};


class SharedStyles {
    private styles: { [key: string]: any } = {};
    flexBox({
        flex = 1,
        flexDirection = 'column',
        justifyContent = 'center',
        alignItems = 'center',
        gap = 0,
        rowGap = 0,
        columnGap = 0,
        padding = 10,
        paddingHorizontal = 20,
        paddingVertical = 10,
        ...props
    }: FlexBoxProps = {}): ViewStyle {
        this.styles.flex = StyleSheet.create({
            flex: {
                flex: flex,
                flexDirection: flexDirection,
                justifyContent: justifyContent,
                alignItems: alignItems,
                gap: gap,
                rowGap: rowGap,
                columnGap: columnGap,
                padding: padding,
                paddingHorizontal: paddingHorizontal,
                paddingVertical: paddingVertical,
                ...props as StyleSheetProperties,
            },
        });
        return this.styles.flex.flex;
    }
    space({
        width = 10,
        height = 10,
        backgroundColor = 'transparent',
        ...props
    }: SpaceProps = {}): ViewStyle {
        this.styles.space = StyleSheet.create({
            space: {
                width: width,
                height: height,
                backgroundColor: backgroundColor,
                ...props as StyleSheetProperties,
            },
        });
        return this.styles.space.space;
    }

    box({
        flex = 1,
        flexDirection = 'column',
        justifyContent = 'center',
        alignItems = 'center',
        gap = 0,
        rowGap = 0,
        columnGap = 0,
        padding = 10,
        paddingHorizontal = 20,
        paddingVertical = 10,
        ...props
    }: BoxProps = {}): ViewStyle {
        this.styles.flex = StyleSheet.create({
            flex: {
                flex: flex,
                flexDirection: flexDirection,
                justifyContent: justifyContent,
                alignItems: alignItems,
                gap: gap,
                rowGap: rowGap,
                columnGap: columnGap,
                padding: padding,
                paddingHorizontal: paddingHorizontal,
                paddingVertical: paddingVertical,
                ...props as StyleSheetProperties,
            },
        });
        return this.styles.flex.flex;
    }

    text({
        fontSize = 14,
        color = 'black',
        fontWeight = 'normal',
        fontFamily = 'Manrope_400Regular',
        ...props
    }: TextProps = {}): TextStyle {
        this.styles.text = StyleSheet.create({
            text: {
                fontSize: fontSize,
                color: color,
                fontWeight: fontWeight,
                fontFamily: fontFamily,
                ...props as StyleSheetProperties,
            },
        });
        return this.styles.text.text;
    }

    button({
        backgroundColor = 'blue',
        borderRadius = 5,
        padding = 10,
        fontSize = 16,
        color = 'white',
        width = '100%',
        height = 50,
        FontFamily = 'Manrope_400Regular',
        ...props
    }: ButtonProps = {}): ViewStyle {
        this.styles.button = StyleSheet.create({
            button: {
                backgroundColor: backgroundColor,
                borderRadius: borderRadius,
                padding: padding,
                width: width,
                height: height,
                ...props as StyleSheetProperties,
            },
            buttonText: {
                fontSize: fontSize,
                color: color,
                fontFamily: FontFamily,
                ...props as StyleSheetProperties,
            },
        });
        return this.styles.button.button;
    }

    inputField({
        backgroundColor = '#D9D9D966',
        borderRadius = 2,
        padding = 10,
        fontSize = 16,
        color = 'black',
        ...props
    }: InputFieldProps = {}): ViewStyle {
        this.styles.inputField = StyleSheet.create({
            inputField: {
                backgroundColor: backgroundColor,
                borderRadius: borderRadius,
                padding: padding,
                width: '100%',
                ...props as StyleSheetProperties,
            },
            inputText: {
                fontSize: fontSize,
                color: color,
                ...props as StyleSheetProperties,
            },
        });
        return this.styles.inputField.inputField;
    }

    // Define additional style categories and styles here
    // For example, you can add "card", "header", "footer" styles, and more.
}

export default new SharedStyles();
