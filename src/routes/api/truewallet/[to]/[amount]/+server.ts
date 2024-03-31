import { generate } from 'promptparse'
import qrcode from 'qrcode';

/** @type {import('./$types').RequestHandler} */
// @ts-ignore
export async function GET({ url, params }) {
    const message = url.searchParams.get('message')||'';

    const payload = generate.truemoney({
        mobileNo: params.to,
        amount: +params.amount,
        message: message
    })

    const buf = await qrcode.toBuffer(payload);

    return new Response(buf, {
        headers: {
            'Content-Type': 'image/png'
        }
    });
}
