import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({
        message: "LogOut Berhasil",
    });

    response.cookies.set("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: new Date(0),
        path: "/"
    })

    return response;
}