import sys
from sqlalchemy import text
from app.core.database import SessionLocal
from app.models.hospital import Hospital
from app.models.specialty import Specialty
from app.models.time_slot import TimeSlot

def seed_data():
    db = SessionLocal()
    try:
        print("[INFO] Bat dau qua trinh khoi tao du lieu mau (Data Seeding)...")

        # 1. Thuc hien lam sach du lieu cu de dam bao tinh dong bo
        print("[INFO] Dang thuc hien don dep du lieu cu thong qua TRUNCATE CASCADE...")
        db.execute(text("TRUNCATE TABLE time_slots, specialties, hospitals RESTART IDENTITY CASCADE;"))
        db.commit()

        # 2. Khoi tao danh sach benh vien va phong kham tu cau hinh Frontend
        frontend_clinics = [
            {"name": "Benh vien Nhan dan 115", "address": "527 Su Van Hanh, Phuong 12, Quan 10, Thanh pho Ho Chi Minh"},
            {"name": "Benh vien Cho Ray", "address": "201B Nguyen Chi Thanh, Phuong 12, Quan 5, Thanh pho Ho Chi Minh"},
            {"name": "Benh vien Dai hoc Y Duoc TP.HCM", "address": "215 Hong Bang, Phuong 11, Quan 5, Thanh pho Ho Chi Minh"},
            {"name": "Phong kham Da khoa VietSing", "address": "83B Ly Thuong Kiet, Cua Nam, Hoan Kiem, Ha Noi"},
            {"name": "Benh vien Bach Mai", "address": "78 Giai Phong, Phuong Mai, Dong Da, Ha Noi"},
            {"name": "Phong kham Nhi dong Thanh pho", "address": "312 Duong so 7, Binh Tri Dong B, Binh Tan, Thanh pho Ho Chi Minh"}
        ]

        db_hospitals = []
        for clinic in frontend_clinics:
            hospital = Hospital(name=clinic["name"], address=clinic["address"])
            db.add(hospital)
            db_hospitals.append(hospital)
        
        db.commit()
        print(f"[SUCCESS] Da khoi tao thanh cong {len(db_hospitals)} ban ghi vao bang hospitals.")

        # 3. Khoi tao danh sach chuyen khoa mau
        frontend_specialties = [
            "Noi tong quat", "Tim mach", "Nhi khoa", 
            "Tai Mui Hong", "Rang Ham Mat", "Da lieu", "Co xuong khop"
        ]

        db_specialties = []
        for hospital in db_hospitals:
            for spec_name in frontend_specialties:
                # Rang buoc nghiep vu: Phong kham Nhi dong chi phan bo chuyen khoa Nhi khoa
                if "Nhi dong" in hospital.name and spec_name != "Nhi khoa":
                    continue
                
                specialty = Specialty(name=spec_name, hospital_id=hospital.id)
                db.add(specialty)
                db_specialties.append(specialty)
        
        db.commit()
        print(f"[SUCCESS] Da khoi tao thanh cong {len(db_specialties)} ban ghi vao bang specialties.")

        # 4. Khoi tao danh sach khung gio kham co dinh
        frontend_time_slots = [
            "07:30 - 08:30", "08:30 - 09:30", "09:30 - 10:30", "10:30 - 11:30",
            "13:30 - 14:30", "14:30 - 15:30", "15:30 - 16:30"
        ]

        # Phan bo khung gio kham cho ngay 2026-07-10 doi voi tat ca chuyen khoa
        for specialty in db_specialties:
            for time_range in frontend_time_slots:
                slot = TimeSlot(
                    date="2026-07-10",
                    time_range=time_range,
                    total_slots=5,
                    available_slots=5,
                    version=1,
                    specialty_id=specialty.id
                )
                db.add(slot)
        
        db.commit()
        print("[SUCCESS] Da khoi tao thanh cong danh sach cau hinh thoi gian vao bang time_slots.")
        print("[SUCCESS] Hoan thanh quy trinh gieo du lieu he thong.")

    except Exception as e:
        print(f"[ERROR] Quat trinh gieo du lieu that bai. Chi tiet loi: {e}", file=sys.stderr)
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()