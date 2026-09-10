import { useState } from "react";
import ModalRegister from "../components/ModalRegister";
export default function HomePage() {
  //STEP 6 : คุมการเปิด/ปิด modal เอง (useState)
  //STEP 6 - 6.1. : useState คุมการแสดง modal เริ่มที่ false (ปิดอยู่)
  //6.1. useState คุมการแสดง modal เริ่มที่ false (ปิดอยู่)
  const [showModal, setShowModal] = useState(false); // false คือ ตอนแรกไม่popup modal register รอเป็น true ค่อย Popup

  return (
    <div className="col-12 mt-4 p-0">
      <div className="container text-center">
        <h2> Wellcome To CMU Marathon</h2>
        <div>
          <img src="/marathonrun.png" alt="Logo CMU Marathon" />
        </div>
        {/* <button
          type="button"
          className="m-4 btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalregister" // call id = modalregister(==id in modal component)
        >
          Register
        </button> */}
        <button
          type="button"
          className="m-4 btn btn-primary"
          // set showmodal เป็น true เปิดpop upขึ้นมา
          onClick={() => setShowModal(true)} // เปลี่ยนมาใช้การเปลี่ยน State แทน
        >
          Register
        </button>
      </div>
      {/* 6.5. การส่ง Prop onClose เพื่อสั่งปิด */}
      {/* ถ้าเปิดอยู่แล้วมีการกดปุ่มปิด */}
      {
        showModal && <ModalRegister onClose={() => setShowModal(false)} />
      }
      {/* มีการเรียกใช้ฟังก์ชั่น onclose ในหน้านี้หลังจากมีการกดกากบาทปิดในModalRegister
      React จะรู้ว่ามีการเปลี่ยนแปลงstate จะเรนเดอร์หน้าHomapageใหม่ แล้วพบว่า showModal กลายเป็นเท็จ */}
      {/* พอข้างหน้าเป็น false ตัว React จะหยุดอ่านทันที และไม่เรนเดอร์ <ModalRegister /> อีกต่อไป */}
      {/* ถ้า showModal เป็น false React จะไม่เรนเดอร์แท็ก <ModalRegister> ออกมาบน DOM เลย */}
      {/* ถ้า showModal เป็น true React จะเรนเดอร์ Modal ขึ้นมาบนหน้าจอ พร้อมส่ง Prop onClose ที่มีฟังก์ชันสั่ง setShowModal(false) ลงไปให้ Modal ใช้ปิดตัวเอง */}
      {/* onClose={() => setShowModal(false)} : เป็นการส่งปุ่มรีโมตไปให้ Modal โดยบอกว่า "เมื่อไหร่ก็ตามที่ใน Modal เรียกใช้ onClose() 
      ให้ทำการสั่ง setShowModal(false) ในหน้าหลักนะ" เหมือนการรอกดปุ่มคำสั่งปิด ถ้ากดจะปิดmodal โดยส่งฟังก์ชั่น setShoeModalที่มีค่าfalseไปเป็นprops ให้ component ModalRegister*/}
    </div>
  );
}
