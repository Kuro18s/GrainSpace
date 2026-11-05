# -*- coding: utf-8 -*-
from datetime import datetime
from typing import Optional, Literal
from pydantic import BaseModel, EmailStr, Field, ConfigDict

class RegisterIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    full_name: str = Field(min_length=1)
    role: Literal["photographer", "provider"] = "photographer"
    business_name: Optional[str] = None  # dùng khi role=provider

class LoginIn(BaseModel):
    email: EmailStr
    password: str

class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str

class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int; email: str; full_name: str; role: str

class EquipmentIn(BaseModel):
    name: str = Field(min_length=1)
    status: Literal["available", "maintenance"] = "available"

class EquipmentOut(EquipmentIn):
    model_config = ConfigDict(from_attributes=True)
    id: int; space_id: int

class SpaceIn(BaseModel):
    name: str = Field(min_length=1)
    type: Literal["Phòng tối", "Phòng chụp"]
    district: str
    area: int = Field(default=0, ge=0)
    capacity: int = Field(default=1, ge=1)
    price_per_hour: int = Field(gt=0)
    style: str = ""
    description: str = ""
    open_time: str = Field(default="08:00", pattern=r"^\d{2}:\d{2}$")
    close_time: str = Field(default="22:00", pattern=r"^\d{2}:\d{2}$")

class SpaceOut(SpaceIn):
    model_config = ConfigDict(from_attributes=True)
    id: int; provider_id: int; active: bool
    equipment: list[EquipmentOut] = []

class BookingIn(BaseModel):
    space_id: int
    start_time: datetime
    end_time: datetime
    note: str = ""

class BookingOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int; user_id: int; space_id: int
    start_time: datetime; end_time: datetime
    status: str; note: str; total_price: int

class StatusIn(BaseModel):
    status: Literal["confirmed", "rejected", "cancelled"]
