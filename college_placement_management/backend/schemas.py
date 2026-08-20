from pydantic import BaseModel, EmailStr


class SignUpRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "student"

    student_id: str | None = None
    phone: str | None = None
    department: str | None = None
    course: str | None = None
    cgpa: str | None = None
    graduation_year: str | None = None
    skills: str | None = None
    resume: str | None = None
    backlogs: str | None = None
    placement_status: str = "Not Placed"


class CreateUserRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "student"

    student_id: str | None = None
    phone: str | None = None
    department: str | None = None
    course: str | None = None
    cgpa: str | None = None
    graduation_year: str | None = None
    skills: str | None = None
    resume: str | None = None
    backlogs: str | None = None
    placement_status: str = "Not Placed"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class VerifyOTPRequest(BaseModel):
    email: EmailStr
    otp: str


class ResetPasswordRequest(BaseModel):
    email: EmailStr
    otp: str
    new_password: str