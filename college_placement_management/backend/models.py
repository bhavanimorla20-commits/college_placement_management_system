from sqlalchemy import Column, Integer, String, DateTime, Boolean
from datetime import datetime

from database import Base


class User(Base):
    __tablename__ = "users"

    # =====================================================
    # BASIC USER DETAILS
    # =====================================================

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(255),
        unique=True,
        nullable=False,
        index=True
    )

    password = Column(
        String(255),
        nullable=False
    )

    role = Column(
        String(50),
        default="student",
        nullable=False
    )

    # =====================================================
    # STUDENT DETAILS
    # =====================================================

    student_id = Column(
        String(100),
        nullable=True
    )

    phone = Column(
        String(20),
        nullable=True
    )

    department = Column(
        String(100),
        nullable=True
    )

    course = Column(
        String(100),
        nullable=True
    )

    cgpa = Column(
        String(10),
        nullable=True
    )

    graduation_year = Column(
        String(10),
        nullable=True
    )

    skills = Column(
        String(500),
        nullable=True
    )

    resume = Column(
        String,
        nullable=True
    )

    backlogs = Column(
        String(20),
        nullable=True
    )

    placement_status = Column(
        String(50),
        default="Not Placed",
        nullable=True
    )

    # =====================================================
    # OTP / PASSWORD RECOVERY
    # =====================================================

    otp = Column(
        String(10),
        nullable=True
    )

    otp_expiry = Column(
        DateTime,
        nullable=True
    )

    # =====================================================
    # SYSTEM DETAILS
    # =====================================================

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    is_active = Column(
        Boolean,
        default=True,
        nullable=False
    )