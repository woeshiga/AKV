export default function generateVerifyCode() {
    const code = Math.random() * 999
    if (code < 100) {
        return (parseInt(code + 100))
    }
    return (parseInt(code));
}