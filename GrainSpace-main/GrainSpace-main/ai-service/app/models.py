# -*- coding: utf-8 -*-
"""Schema CSDL bản đầu (khớp docs/ERD.md).
Bảng đã có API ở MVP: User, Provider, CreativeSpace, Equipment, Booking.
Bảng mới có schema, chưa có API (giai đoạn sau): Package, Payment, Review, Content."""
from datetime import datetime
from typing import Optional
from sqlalchemy import String, Integer, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base

ROLES = ("photographer", "provider", "expert", "admin")

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    full_name: Mapped[str] = mapped_column(String(120))
    role: Mapped[str] = mapped_column(String(20), default="photographer")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class Provider(Base):
    __tablename__ = "providers"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True)
    business_name: Mapped[str] = mapped_column(String(160))
    phone: Mapped[Optional[str]] = mapped_column(String(30), nullable=True)
    address: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)

class CreativeSpace(Base):
    __tablename__ = "creative_spaces"
    id: Mapped[int] = mapped_column(primary_key=True)
    provider_id: Mapped[int] = mapped_column(ForeignKey("providers.id"), index=True)
    name: Mapped[str] = mapped_column(String(160))
    type: Mapped[str] = mapped_column(String(20))  # "Phòng tối" | "Phòng chụp"
    district: Mapped[str] = mapped_column(String(60), index=True)
    area: Mapped[int] = mapped_column(Integer, default=0)
    capacity: Mapped[int] = mapped_column(Integer, default=1)
    price_per_hour: Mapped[int] = mapped_column(Integer)
    style: Mapped[str] = mapped_column(String(160), default="")
    description: Mapped[str] = mapped_column(Text, default="")
    open_time: Mapped[str] = mapped_column(String(5), default="08:00")
    close_time: Mapped[str] = mapped_column(String(5), default="22:00")
    active: Mapped[bool] = mapped_column(Boolean, default=True)
    equipment: Mapped[list["Equipment"]] = relationship(back_populates="space", cascade="all, delete-orphan")

class Equipment(Base):
    __tablename__ = "equipment"
    id: Mapped[int] = mapped_column(primary_key=True)
    space_id: Mapped[int] = mapped_column(ForeignKey("creative_spaces.id"), index=True)
    name: Mapped[str] = mapped_column(String(160))
    status: Mapped[str] = mapped_column(String(20), default="available")  # available | maintenance
    space: Mapped["CreativeSpace"] = relationship(back_populates="equipment")

class Package(Base):
    __tablename__ = "packages"
    id: Mapped[int] = mapped_column(primary_key=True)
    space_id: Mapped[int] = mapped_column(ForeignKey("creative_spaces.id"))
    name: Mapped[str] = mapped_column(String(160))
    hours: Mapped[int] = mapped_column(Integer)
    price: Mapped[int] = mapped_column(Integer)

class Booking(Base):
    __tablename__ = "bookings"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    space_id: Mapped[int] = mapped_column(ForeignKey("creative_spaces.id"), index=True)
    start_time: Mapped[datetime] = mapped_column(DateTime)
    end_time: Mapped[datetime] = mapped_column(DateTime)
    status: Mapped[str] = mapped_column(String(20), default="pending")  # pending|confirmed|rejected|cancelled
    note: Mapped[str] = mapped_column(Text, default="")
    total_price: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    space: Mapped["CreativeSpace"] = relationship()

class Payment(Base):
    __tablename__ = "payments"
    id: Mapped[int] = mapped_column(primary_key=True)
    booking_id: Mapped[int] = mapped_column(ForeignKey("bookings.id"))
    amount: Mapped[int] = mapped_column(Integer)
    method: Mapped[str] = mapped_column(String(30), default="cash")
    status: Mapped[str] = mapped_column(String(20), default="unpaid")

class Review(Base):
    __tablename__ = "reviews"
    id: Mapped[int] = mapped_column(primary_key=True)
    booking_id: Mapped[int] = mapped_column(ForeignKey("bookings.id"), unique=True)
    rating: Mapped[float] = mapped_column(Float)
    comment: Mapped[str] = mapped_column(Text, default="")

class Content(Base):
    __tablename__ = "contents"
    id: Mapped[int] = mapped_column(primary_key=True)
    author_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    title: Mapped[str] = mapped_column(String(200))
    body: Mapped[str] = mapped_column(Text, default="")
    kind: Mapped[str] = mapped_column(String(20), default="article")  # article | workshop
