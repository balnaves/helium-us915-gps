function Decoder(bytes, port) {
    var decoded = {};
    if (port === 1) {
        decoded.type = "Position";

        switch (bytes[0]) {
            case 0:
                decoded.status = "No Fix";
                break;
            case 1:
                decoded.status = "Estimated";
                break;
            case 2:
                decoded.status = "Time Only";
                break;
            case 3:
                decoded.status = "GPS Fix";
                break;
            case 4:
                decoded.status = "DGPS Fix";
                break;
            case 5:
                decoded.status = "Float Real Time Kinematic";
                break;
            case 6:
                decoded.status = "Real Time Kinematic";
                break;
            case 7:
                decoded.status = "Precise Position System Fix";
                break;
            default:
                decoded.status = "This value is not supported";
        }

        decoded.latitudeDeg = bytes[1] + bytes[2] * 256 +
            bytes[3] * 65536 + bytes[4] * 16777216;
        if (decoded.latitudeDeg >= 0x80000000) { // 2^31
            decoded.latitudeDeg -= 0x100000000; // 2^32
        }
        decoded.latitudeDeg /= 1e7;

        decoded.longitudeDeg = bytes[5] + bytes[6] * 256 +
            bytes[7] * 65536 + bytes[8] * 16777216;
        if (decoded.longitudeDeg >= 0x80000000) { // 2^31
            decoded.longitudeDeg -= 0x100000000; // 2^32
        }
        decoded.longitudeDeg /= 1e7;

        decoded.location = decoded.latitudeDeg + ", " + decoded.longitudeDeg
    }
    return decoded;
}