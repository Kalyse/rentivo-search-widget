import { b64EncodeUnicode } from './base64';

export function generateGooglePlacesPart(data) {
    if (data) {
        return 'geo:' + b64EncodeUnicode(JSON.stringify(data));
    }

    return null;
}
