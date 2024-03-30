"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = exports.ButtonVariation = exports.ButtonSize = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
const styles = react_native_1.StyleSheet.create({
    container: {
        borderRadius: 6,
        justifyContent: "center",
        flexDirection: "row",
        shadowColor: "#141414",
        shadowOpacity: 0.05,
        shadowRadius: 1,
        shadowOffset: {
            width: 0,
            height: 1,
        },
    },
    containerHover: {
        backgroundColor: "#292929",
    },
    text: {
        fontFamily: "SpaceGrotesk-Medium",
        fontSize: 14,
        lineHeight: 20,
    },
    containerPrimary: {
        backgroundColor: "#0F0F0F",
    },
    containerSecondary: {
        backgroundColor: "#F5F5F5",
    },
    textPrimary: {
        color: "#FFFFFF",
    },
    textSecondary: {
        color: "#424242",
    },
    containerMd: {
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    containerXl: {
        paddingVertical: 12,
        paddingHorizontal: 18,
    },
    textMd: {
        fontSize: 14,
        lineHeight: 20,
    },
    textXl: {
        fontSize: 16,
        lineHeight: 24,
    },
});
var ButtonSize;
(function (ButtonSize) {
    ButtonSize[ButtonSize["SM"] = 0] = "SM";
    ButtonSize[ButtonSize["MD"] = 1] = "MD";
    ButtonSize[ButtonSize["XL"] = 2] = "XL";
    ButtonSize[ButtonSize["XXL"] = 3] = "XXL";
})(ButtonSize || (exports.ButtonSize = ButtonSize = {}));
var ButtonVariation;
(function (ButtonVariation) {
    ButtonVariation[ButtonVariation["Primary"] = 0] = "Primary";
    ButtonVariation[ButtonVariation["Secondary"] = 1] = "Secondary";
})(ButtonVariation || (exports.ButtonVariation = ButtonVariation = {}));
const containerVariationsStyles = new Map([
    [ButtonVariation.Primary, styles.containerPrimary],
    [ButtonVariation.Secondary, styles.containerSecondary],
]);
const containerSizeStyles = new Map([
    [ButtonSize.MD, styles.containerMd],
    [ButtonSize.XL, styles.containerXl],
]);
const textVariationsStyles = new Map([
    [ButtonVariation.Primary, styles.textPrimary],
    [ButtonVariation.Secondary, styles.textSecondary],
]);
const textSizesStyles = new Map([
    [ButtonSize.MD, styles.textMd],
    [ButtonSize.XL, styles.textXl],
]);
function Button({ title, size = ButtonSize.MD, variation = ButtonVariation.Primary, }) {
    const [hovered, setHovered] = (0, react_1.useState)(false);
    return (<react_native_1.Pressable style={[
            styles.container,
            containerSizeStyles.get(size),
            containerVariationsStyles.get(variation),
            hovered && styles.containerHover,
        ]} onPress={() => console.log("lol")} onHoverIn={() => setHovered(true)} onHoverOut={() => setHovered(false)}>
      <react_native_1.Text style={[
            styles.text,
            textSizesStyles.get(size),
            textVariationsStyles.get(variation),
        ]}>
        {title}
      </react_native_1.Text>
    </react_native_1.Pressable>);
}
exports.Button = Button;
//# sourceMappingURL=Button.js.map