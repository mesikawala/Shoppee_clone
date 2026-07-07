import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  username: string;
  role: string;
}

export async function GET() {
  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    if (!token) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const decoded = jwt.verify(
      token.value,
      process.env.JWT_SECRET!,
    ) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User Tidak Di temukan",
        },
        {
          status: 401,
        },
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }
}
