from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from random import randint
from datetime import datetime, timedelta
from sqlalchemy.orm import Session

from database import engine, Base, get_db
import models

from schemas import (
    SignUpRequest,
    CreateUserRequest,
    LoginRequest,
    ForgotPasswordRequest,
    VerifyOTPRequest,
    ResetPasswordRequest,
)

from auth import hash_password, verify_password

import os
import resend
from dotenv import load_dotenv


# =========================================================
# ENVIRONMENT
# =========================================================

load_dotenv()

resend.api_key = os.getenv("RESEND_API_KEY")

# Resend sender email
# For testing you can use onboarding@resend.dev
# For production use your verified domain email.
FROM_EMAIL = os.getenv(
    "FROM_EMAIL",
    "onboarding@resend.dev"
)


# =========================================================
# APP
# =========================================================

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://college-placement-management-system-flax.vercel.app",
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    allow_origin_regex=r"https://college-placement-management-system-.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# DATABASE
# =========================================================

Base.metadata.create_all(bind=engine)


# =========================================================
# HOME
# =========================================================

@app.get("/")
def home():
    return {
        "message": "Backend is running successfully"
    }


# =========================================================
# DATABASE TEST
# =========================================================

@app.get("/db-test")
def db_test():

    try:

        with engine.connect():

            return {
                "message": "Database connected successfully"
            }

    except Exception as e:

        return {
            "error": str(e)
        }


# =========================================================
# SEND STUDENT CREDENTIALS EMAIL
# =========================================================

def send_student_credentials(
    student_name: str,
    student_email: str,
    password: str,
):
    if not resend.api_key:
        raise Exception("RESEND_API_KEY is missing")

    params = {
        "from": FROM_EMAIL,
        "to": [student_email],
        "subject": "College Placement Management System - Student Account",
        "html": f"""
            <h2>College Placement Management System</h2>

            <p>Hello {student_name},</p>

            <p>
                Your student account has been created by the administrator.
            </p>

            <h3>Login Details</h3>

            <p>
                <strong>Email:</strong> {student_email}
            </p>

            <p>
                <strong>Password:</strong> {password}
            </p>

            <p>
                You can use these credentials to login
                to the Student Dashboard.
            </p>

            <p>
                Please keep your password secure.
            </p>

            <br>

            <p>
                Regards,<br>
                College Placement Management System
            </p>
        """
    }

    response = resend.Emails.send(params)

    print(
        "Student credentials email sent successfully:",
        response
    )

# =========================================================
# SIGNUP
# =========================================================

@app.post("/signup")
def signup(
    user: SignUpRequest,
    db: Session = Depends(get_db)
):

    existing_user = (
        db.query(models.User)
        .filter(models.User.email == user.email)
        .first()
    )

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_password = hash_password(
        user.password
    )

    new_user = models.User(
        name=user.name,
        email=user.email,
        password=hashed_password,
        role=user.role,

        student_id=user.student_id,
        phone=user.phone,
        department=user.department,
        course=user.course,
        cgpa=user.cgpa,
        graduation_year=user.graduation_year,
        skills=user.skills,
        resume=user.resume,
        backlogs=user.backlogs,
        placement_status=user.placement_status,
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {
        "message": "User registered successfully",
        "user_id": new_user.id,
        "name": new_user.name,
        "email": new_user.email,
        "role": new_user.role
    }


# =========================================================
# LOGIN
# =========================================================

@app.post("/login")
def login(
    user: LoginRequest,
    db: Session = Depends(get_db)
):

    existing_user = (
        db.query(models.User)
        .filter(models.User.email == user.email)
        .first()
    )

    if not existing_user:

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not existing_user.is_active:

        raise HTTPException(
            status_code=403,
            detail="Your account is inactive. Please contact the administrator."
        )

    if not verify_password(
        user.password,
        existing_user.password
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return {
        "message": "Login successful",
        "user_id": existing_user.id,
        "name": existing_user.name,
        "email": existing_user.email,
        "role": existing_user.role
    }


# =========================================================
# FORGOT PASSWORD
# =========================================================

@app.post("/forgot-password")
def forgot_password(
    request: ForgotPasswordRequest,
    db: Session = Depends(get_db)
):

    user = (
        db.query(models.User)
        .filter(models.User.email == request.email)
        .first()
    )

    if not user:

        raise HTTPException(
            status_code=404,
            detail="Email not registered"
        )

    # Generate 6 digit OTP
    otp = str(
        randint(100000, 999999)
    )

    # OTP valid for 5 minutes
    otp_expiry = (
        datetime.utcnow()
        + timedelta(minutes=5)
    )

    # Save OTP in database
    user.otp = otp
    user.otp_expiry = otp_expiry

    db.commit()

    # Check Resend API key
    if not resend.api_key:

        raise HTTPException(
            status_code=500,
            detail="RESEND_API_KEY is missing"
        )

    try:

        params = {
            "from": FROM_EMAIL,
            "to": [request.email],
            "subject": "College Placement Management System - OTP",
            "html": f"""
                <h2>College Placement Management System</h2>

                <p>Hello {user.name},</p>

                <p>
                    Your OTP for password reset is:
                </p>

                <h1>{otp}</h1>

                <p>
                    This OTP is valid for
                    <strong>5 minutes</strong>.
                </p>

                <p>
                    Please do not share this OTP with anyone.
                </p>

                <br>

                <p>
                    Regards,<br>
                    College Placement Management System
                </p>
            """
        }

        response = resend.Emails.send(
            params
        )

        print(
            "OTP email sent successfully:",
            response
        )

    except Exception as e:

        print(
            "Resend email sending failed:",
            e
        )

        raise HTTPException(
            status_code=500,
            detail="Failed to send OTP email"
        )

    return {
        "message": "OTP sent successfully"
    }


# =========================================================
# VERIFY OTP
# =========================================================

@app.post("/verify-otp")
def verify_otp(
    request: VerifyOTPRequest,
    db: Session = Depends(get_db)
):

    user = (
        db.query(models.User)
        .filter(models.User.email == request.email)
        .first()
    )

    if not user:

        raise HTTPException(
            status_code=404,
            detail="Email not registered"
        )

    if user.otp != request.otp:

        raise HTTPException(
            status_code=400,
            detail="Invalid OTP"
        )

    if (
        not user.otp_expiry
        or datetime.utcnow() > user.otp_expiry
    ):

        raise HTTPException(
            status_code=400,
            detail="OTP expired"
        )

    return {
        "message": "OTP verified successfully"
    }


# =========================================================
# RESET PASSWORD
# =========================================================

@app.post("/reset-password")
def reset_password(
    request: ResetPasswordRequest,
    db: Session = Depends(get_db)
):

    user = (
        db.query(models.User)
        .filter(models.User.email == request.email)
        .first()
    )

    if not user:

        raise HTTPException(
            status_code=404,
            detail="Email not registered"
        )

    if user.otp != request.otp:

        raise HTTPException(
            status_code=400,
            detail="Invalid OTP"
        )

    if (
        not user.otp_expiry
        or datetime.utcnow() > user.otp_expiry
    ):

        raise HTTPException(
            status_code=400,
            detail="OTP expired"
        )

    # Hash new password
    user.password = hash_password(
        request.new_password
    )

    # Clear OTP after successful reset
    user.otp = None
    user.otp_expiry = None

    db.commit()

    return {
        "message": "Password reset successfully"
    }


# =========================================================
# GET ALL USERS
# =========================================================

@app.get("/users")
def get_users(
    db: Session = Depends(get_db)
):

    users = (
        db.query(models.User)
        .all()
    )

    return [

        {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "is_active": user.is_active,

            "student_id": user.student_id,
            "phone": user.phone,
            "department": user.department,
            "course": user.course,
            "cgpa": user.cgpa,
            "graduation_year": user.graduation_year,
            "skills": user.skills,
            "resume": user.resume,
            "backlogs": user.backlogs,
            "placement_status": user.placement_status,
        }

        for user in users
    ]


# =========================================================
# CREATE USER / ADD STUDENT
# =========================================================

@app.post("/users")
def create_user(
    user: CreateUserRequest,
    db: Session = Depends(get_db)
):

    existing_user = (
        db.query(models.User)
        .filter(models.User.email == user.email)
        .first()
    )

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_password = hash_password(
        user.password
    )

    new_user = models.User(
        name=user.name,
        email=user.email,
        password=hashed_password,
        role=user.role,

        student_id=user.student_id,
        phone=user.phone,
        department=user.department,
        course=user.course,
        cgpa=user.cgpa,
        graduation_year=user.graduation_year,
        skills=user.skills,
        resume=user.resume,
        backlogs=user.backlogs,
        placement_status=user.placement_status,

        is_active=True,
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    # Send credentials email
    try:

        send_student_credentials(
            student_name=new_user.name,
            student_email=new_user.email,
            password=user.password,
        )

    except Exception as e:

        print(
            "Student credentials email failed:",
            repr(e)
        )
        raise HTTPException(
            status_code=500,
            details=f"Student created, but email failed: {str(e)}"
        )

    return {

        "message": "User created successfully",

        "user": {

            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "role": new_user.role,
            "is_active": new_user.is_active,

            "student_id": new_user.student_id,
            "phone": new_user.phone,
            "department": new_user.department,
            "course": new_user.course,
            "cgpa": new_user.cgpa,
            "graduation_year": new_user.graduation_year,
            "skills": new_user.skills,
            "resume": new_user.resume,
            "backlogs": new_user.backlogs,
            "placement_status": new_user.placement_status,
        },
    }


# =========================================================
# UPDATE USER / EDIT STUDENT
# =========================================================

@app.put("/users/{user_id}")
def update_user(
    user_id: int,
    user: CreateUserRequest,
    db: Session = Depends(get_db)
):

    existing_user = (
        db.query(models.User)
        .filter(models.User.id == user_id)
        .first()
    )

    if not existing_user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    existing_user.name = user.name
    existing_user.email = user.email

    existing_user.student_id = user.student_id
    existing_user.phone = user.phone
    existing_user.department = user.department
    existing_user.course = user.course
    existing_user.cgpa = user.cgpa
    existing_user.graduation_year = user.graduation_year
    existing_user.skills = user.skills
    existing_user.resume = user.resume
    existing_user.backlogs = user.backlogs
    existing_user.placement_status = user.placement_status

    if user.password:

        existing_user.password = hash_password(
            user.password
        )

    db.commit()

    db.refresh(existing_user)

    return {

        "message": "Student updated successfully",

        "user": {

            "id": existing_user.id,
            "name": existing_user.name,
            "email": existing_user.email,
            "role": existing_user.role,
            "is_active": existing_user.is_active,

            "student_id": existing_user.student_id,
            "phone": existing_user.phone,
            "department": existing_user.department,
            "course": existing_user.course,
            "cgpa": existing_user.cgpa,
            "graduation_year": existing_user.graduation_year,
            "skills": existing_user.skills,
            "resume": existing_user.resume,
            "backlogs": existing_user.backlogs,
            "placement_status": existing_user.placement_status,
        },
    }


# =========================================================
# ACTIVE / DEACTIVATE USER
# =========================================================

@app.put("/users/{user_id}/status")
def update_user_status(
    user_id: int,
    is_active: bool,
    db: Session = Depends(get_db)
):

    user = (
        db.query(models.User)
        .filter(models.User.id == user_id)
        .first()
    )

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user.is_active = is_active

    db.commit()

    db.refresh(user)

    return {

        "message": "User status updated successfully",
        "id": user.id,
        "is_active": user.is_active
    }


# =========================================================
# DELETE USER
# =========================================================

@app.delete("/users/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db)
):

    user = (
        db.query(models.User)
        .filter(models.User.id == user_id)
        .first()
    )

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    db.delete(user)

    db.commit()

    return {
        "message": "User deleted successfully"
    }