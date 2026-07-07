import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const {username, password, email} = await request.json();

    if (!username || !email || !password){
        return NextResponse.json({
            message: "Username, email, dan password wajib diisi",
        },
        {
        status: 400,
        })
    }

    const existingEmail = await prisma.user.findUnique({
        where: {
            email,
        }
    })

    const existingUsername = await prisma.user.findUnique({
        where: {
            username,
        }
    })

    if (existingEmail){
        return NextResponse.json({
            message: "Email sudah di gunakan"
        },
    {
        status:400,
    })
    }

    if (existingUsername){
        return NextResponse.json({
            message: "Username sudah di gunakan"
        },
    {
        status:400,
    })
    }

    if (username.length < 4){
        return NextResponse.json({
            message: "Username minimal 4 karakter"
        },
    {
        status:400,
    })
    }

    if (password.length < 8){
        return NextResponse.json({
            message: "Password minimal 8 karakter"
        },
    {
        status:400,
    })
    }

    if (!email.includes("@")){
        return NextResponse.json({
            message: "Email tidak valid"
        },
    {
        status:400,
    })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            username, 
            email,
            password: hashedPassword, 
        }
    })

    return NextResponse.json({
        message: "Register berhasil",
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
        }
    })

  } catch (error) {
    
    console.log(error)
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}