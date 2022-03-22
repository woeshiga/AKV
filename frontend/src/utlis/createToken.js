export default function () {
    const generateTokenPart = () => Math.random().toString(36).substr(2);
    return generateTokenPart() + generateTokenPart()
}