import type { NextApiRequest, NextApiResponse } from 'next';
// import { Secret, sign } from 'jsonwebtoken';
import * as jose from 'jose';
import { serialize } from 'cookie';

import db from '../../../configs/firebase';
import { getDoc, collection, doc } from 'firebase/firestore/lite';

type DataBase = {
    ok: boolean;
    msg?: string;
};

const maxAge = 60 * 60 * 12;

const secret = process.env.NEXT_PUBLIC_SECRET;

async function login(
    req: NextApiRequest,
    res: NextApiResponse<
        DataBase & { data?: { login: string; password: string } }
    >
) {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({
            ok: false,
            msg: 'Provide both login and password',
            data: { login, password },
        });
    }

    const usersCol = collection(db, 'users');
    const docRef = doc(usersCol, login);
    const userSnap = await getDoc(docRef);

    if (!userSnap.exists()) {
        return res.status(404).json({
            ok: false,
            msg: 'User not found or password not match',
            data: { login, password },
        });
    }

    const user = userSnap.data();

    if (user.password !== password) {
        return res.status(404).json({
            ok: false,
            msg: 'User not found or password not match',
            data: { login, password },
        });
    }

    console.log('token - before');

    const token = await new jose.SignJWT({
        _id: user.login,
        login: user.login,
    })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('12h')
        .sign(new TextEncoder().encode(secret));
    console.log('token - after', token);

    const serialized = serialize('affilERP', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge,
        path: '/',
    });

    res.setHeader('Set-Cookie', serialized);
    console.log('return - before');

    return res.status(200).json({
        ok: true,
        msg: 'Logged in successfully',
    });
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<DataBase>
) {
    req.method === 'POST'
        ? login(req, res)
        : res.status(404).json({ ok: false });
}
