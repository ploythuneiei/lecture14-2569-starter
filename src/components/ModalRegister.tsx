import { useState } from "react";

//STEP 1 - 1.0. : การกำหนด Type ด้วย TypeScript (type RegisterForm)
//1.0.การกำหนด Type ด้วย TypeScript (type RegisterForm)
type RegisterForm = {
  fname: string;
  lname: string;
  plan: string;
  gender: string;
};
//STEP 2 - 2.0. : ข้อมูล Array สำหรับ dropdown (plans)
//2.0. ข้อมูล Array สำหรับ dropdown (plans)
const plans = [
  { id: "funrun", label: "Fun run 5.5 Km", price: 500 },
  { id: "mini", label: "Mini Marathon 10 Km", price: 800 },
  { id: "half", label: "Half Marathon 21 Km", price: 1200 },
  { id: "full", label: "Full Marathon 42.195 Km", price: 1500 },
];

//6.4. การรับ Props (Props Destructuring)
export default function ModalRegister({ onClose }: { onClose: () => void }) {
  // รับฟังก์ชันสั่งปิด(onClose) มาจากหน้าหลักผ่าน Props (ทำ Destructuring ดึงเฉพาะ onClose มาใช้)
  // กำหนดว่า onClose ต้องเป็นฟังก์ชันที่ ไม่รับพารามิเตอร์ และไม่มีการคืนค่า (() => void)
  // export default function ModalRegister() {
  // STEP 1 - 1.1. : การสร้าง State สำหรับเก็บข้อมูลฟอร์ม (useState)
  //1.1. การสร้าง State สำหรับเก็บข้อมูลฟอร์ม (useState)
  const [form, setForm] = useState<RegisterForm>({
    fname: "",
    lname: "",
    plan: "",
    gender: "",
  });
  // STEP 5 : Form Submission + โดยมีระบบ Checkbox ยอมรับเงื่อนไข + Form Validation
  // STEP 5 - 5.1. : การประกาศ State สำหรับคุม Checkbox และ Error (useState)
  //5.1. การประกาศ State สำหรับคุม Checkbox และ Error (useState)
  const [agree, setAgree] = useState(false);
  // ตั้งสถานะเริ่มต้นเป็น false คือไม่ได้ติ๊ก

  const [errors, setErrors] = useState({
    fname: false,
    lname: false,
    plan: false,
    gender: false,
  });
  // เก็บสถานะการเกิดerror ของแต่ละfield โดยให้เริ่มต้นเป็น false ทั้งหมด คือไม่มีช่องไหนติด errors

  // STEP 1 - 1.2. : ฟังก์ชันอัปเดตข้อมูลแบบไดนามิก (updateForm)
  //1.2. ฟังก์ชันอัปเดตข้อมูลแบบไดนามิก (updateForm)
  const updateForm = (key: keyof RegisterForm, value: string) => {
    // รับแต่keyที่อยู่ในtype RegisterForm (รับชื่อของฟิลด์ที่ต้องการเปลี่ยน)
    // key: keyof RegisterForm บังคับว่า parameter key ที่ส่งเข้ามา ต้องเป็น 
    // ชื่อฟิลด์ที่มีจริง ใน Type หรือ Interface ที่ชื่อ RegisterForm เท่านั้น(เช่น "firstName", "email", "password") หากพิมพ์ผิดแม้แต่ตัวเดียว TypeScript จะแจ้ง Warning ทันที
    // value: string คือ ค่าใหม่ที่ต้องการนำไปอัปเดตลงในฟิลด์นั้นๆ(มักมาจาก e.target.value ของช่อง Input)
    setForm((prev) => ({ ...prev, [key]: value }));
    // [key]: value คือ ระบุชื่อฟิลด์แบบ Dynamic และแทรกค่าใหม่เข้าไปทับ!!!ฟิลด์นั้นๆ
    // มันคือการ copyค่าเดิมๆคือfiledอื่นๆเก็บไว้ แต่filedที่เราจะแก้ไขอะ มันจะเขียนทับค่าไปเลย
    setErrors((prev) => ({ ...prev, [key]: false }));
    // เมื่อผู้ใช้เริ่มพิมพ์หรือเลือกข้อมูลใหม่ในฟิลด์ใดฟิลด์หนึ่ง (key) โค้ดบรรทัดนี้จะสั่ง ล้างสถานะ Error ของฟิลด์นั้นให้กลับเป็น false ทันที
    // อันนี้ก็เหมือนการcopyค่า errors ของ fieldอื่นๆเก็บไว้ แต่เปลี่ยนแปลงแค่ fieldที่ส่งเข้ามา

  };
  // STEP 5 : Form Submission + โดยมีระบบ Checkbox ยอมรับเงื่อนไข + Form Validation
  // STEP 5 - 5.2. : ระบบยอมรับเงื่อนไขก่อนกดปุ่ม (disabled)
  // STEP 4 : Total Payment (realtime)
  // STEP 4 - 4.1. : ฟังก์ชันคำนวณราคา (computeTotalPayment)
  //4.1. ฟังก์ชันคำนวณราคา (computeTotalPayment)
  const computeTotalPayment = () => {
    let total = 0;
    const selectedPlan = plans.find((p) => p.id === form.plan);
    if (selectedPlan) total += selectedPlan.price;
    return total;
  };
  // STEP 5 : Form Submission + โดยมีระบบ Checkbox ยอมรับเงื่อนไข + Form Validation
  // STEP 5 - 5.3. : ฟังก์ชันตรวจสอบข้อมูลเมื่อกดปุ่ม (registerBtnOnClick)
  //5.3. ฟังก์ชันตรวจสอบข้อมูลเมื่อกดปุ่ม (registerBtnOnClick)
  const registerBtnOnClick = () => {
    const newErrors = {
      fname: form.fname === "",
      lname: form.lname === "",
      plan: form.plan === "",
      gender: form.gender === "",
      // ตรวจสอบความถูกต้อง (Validate) แล้วตั้งค่า Error ให้เป็น true เมื่อฟิลด์นั้นว่างเปล่า
    };
    setErrors(newErrors);
    //ส่ง newerrors ที่มีค่า true/falseกำกับช่อง(ก็คือเช็คแล้วว่าเป็นช่องว่างไหม)
    // แล้วเข้าฟังก์ชั่น seterrors ไปเปลี่ยนค่าstateเดิมทั้งหมด

    // ตรวจสอบว่า "มี Error เกิดขึ้นอย่างน้อย 1 ช่องหรือไม่?"
    const hasError = Object.values(newErrors).some((isError) => isError);
    // Object.values(newErrors) : ดึงค่า true/false ทั้งหมดจาก newErrors ออกมาใส่ Array เช่น [true, false, false, false]
    // EX. Object.values(obj) \ดึงเอาเฉพาะ ค่า (Values) ออกมาเป็น Array
    // EX. Object.keys(obj) ดึงเอาเฉพาะ ชื่อฟิลด์ (Keys) ออกมาเป็น Array
    // .some((isError) => isError): วนลูปเช็กว่าใน Array นี้ มีค่าที่เป็น true โผล่มาสักตัวไหม?
    // มันคือ Arrow Function ที่รับค่าสมาชิกแต่ละตัวใน Array เข้ามาตั้งชื่อว่า isError แล้วส่งค่านั้นกลับไปเช็กตรง
    // เขียนเต็มๆ จะมีความหมายเดียวกับ: function(isError) { return isError === true; }
    // ถ้ามี true อย่างน้อย 1 ตัว hasError จะกลายเป็น true แต่ถ้าเป็น false ทั้งหมด hasError จะกลายเป็น false
    if (hasError) return;
    // ถ้า return ออก ยอดเงินจะไม่ถูกคำนวณ Alert จะไม่เด้งขึ้นมา และหน้าจอจะแสดงขอบสีแดงค้างไว้เพื่อรอให้ผู้ใช้ไปกรอกข้อมูลให้ครบก่อน

    // ถ้าผ่านหมดลงมาคานวนยอดเงิน
    const total = computeTotalPayment();
    alert(
      `Registration complete. Please pay money for ${total.toLocaleString()} THB.`,
    );
  };
  return (
    <>
      {/* มอง <> เป็นroot element ได้เลย */}
      {/* <div
        className="modal fade"
        id="modalregister"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="modalregisterLabel"
        aria-hidden="true"
      > */}
      {/* 6.2. การสร้างและจัดการ UI Modal */}
      <div className="modal fade show d-block" tabIndex={-1} role="dialog">
        {/* การใช้ Bootstrap ปกติ: มันจะใช้ไฟล์ JavaScript ของมันคอยแอบสั่งเปลี่ยนจาก display: none ให้กลายเป็น display: block เมื่อเรากดปุ่ม
        แต่ใน React โค้ดนี้: เราไม่ได้ใช้ไฟล์ JS ของ Bootstrap เราจึงต้องบังคับใส่คลาส d-block (Display: Block) 
        และ show เข้าไปตรงๆ เพื่อสั่งให้เบราว์เซอร์ "วาดหน้าต่าง Modal นี้ขึ้นมาบนจอทันที" ในจังหวะที่ Component นี้ถูกเรนเดอร์ */}
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Register CMU Marathon 🏃‍♂️</h5>
              {/* STEP 6 : useState คุมการเปิด/ปิด modal เอง */}
              {/* STEP 6 - 6.2. : การสร้างและจัดการ UI Modal */}
              {/* <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button> */}
              <button type="button" className="btn-close" onClick={onClose}></button>
              {/* เมื่อผู้ใช้คลิกปุ่มกากบาท (X) จะเรียกใช้ฟังก์ชัน onClose() ซึ่งจะไปสั่ง setShowModal(false) ที่หน้าหลัก ทำให้ Modal ปิดลงทันที */}
            </div>

            <div className="modal-body">
              {/* STEP 1 : First name & Last name */}
              <div className="d-flex gap-2">
                <div>
                  <label className="form-label">First name</label>
                  {/* STEP 1 - 1.3. : สามารถส่งชื่อฟิลด์และค่าจาก input เมื่อพิมพ์ชื่อ*/}
                  {/* 1.3. สามารถส่งชื่อฟิลด์และค่าจาก input เมื่อพิมพ์ชื่อ */}
                  {/* <input
                    value={form.fname}
                    onChange={(e) => updateForm("fname", e.target.value)}
                  /> */}
                  {/* STEP 5 : Form Submission + โดยมีระบบ Checkbox ยอมรับเงื่อนไข + Form Validation  */}
                  {/* STEP 5 - 5.5. : การแสดงสถานะ Error บน Bootstrap Form (is-invalid) */}
                  {/* 5.5. การแสดงสถานะ Error บน Bootstrap Form (is-invalid) */}
                  <input
                    className={`form-control ${errors.fname ? "is-invalid" : ""}`}
                    // ไม่ใช้ ${ ... } Browser จะมองเห็นข้อความทั้งหมดเป็นชื่อ Class ตรงๆ
                    // เอาค่า errors.fname มาใช้เช็คตรงนี้ ถ้าเป็น true จะคืนค่าเป็น is-invalid ให้แสดงขอบสีแดง 
                    onChange={(e) => updateForm("fname", e.target.value)} // เปลี่ยนค่าstateโดยใช้useStateในทุกๆการเปลี่ยนแปลงแบบทุกๆตัวอักษรที่พิมพ์
                    value={form.fname} //การเอาค่า state เอาแสดงผลตรงนีั
                  />

                  <div className="invalid-feedback">Invalid first name</div>
                </div>
                <div>
                  <label className="form-label">Last name</label>
                  {/* STEP 1 - 1.4. : สามารถส่งชื่อฟิลด์และค่าจาก input เมื่อพิมพ์ชื่อ*/}
                  {/* 1.4. สามารถส่งชื่อฟิลด์และค่าจาก input เมื่อพิมพ์ชื่อ */}
                  <input
                    className={`form-control ${errors.lname ? "is-invalid" : ""}`}
                    value={form.lname}
                    onChange={(e) => updateForm("lname", e.target.value)}
                  />

                  <div className="invalid-feedback">Invalid last name</div>
                </div>
              </div>

              {/* STEP 2 : Plan dropdown — เติม .map() วน plans สร้าง <option> (ทุกตัวมี key) */}
              <div className="mt-2">
                <label className="form-label">Plan</label>
                {/* STEP 2 - 2.1 : 2.1 การควบคุม Select element (Controlled Component) & การเรนเดอร์ ตัวเลือก (Option List) */}
                {/* 2.1 การควบคุม Select element (Controlled Component) & การเรนเดอร์ ตัวเลือก (Option List) */}
                {/* <select
                  className="form-select"
                  value={form.plan}
                  onChange={(e) => updateForm("plan", e.target.value)}
                >
                  <option value="">Please select..</option>
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label} ({p.price.toLocaleString()} THB)
                    </option>
                  ))}
                </select> */}
                {/* STEP 5 - 5.6. : สำหรับ Bootstrap Form แสดง Invalid plan */}
                {/* 5.6. สำหรับ Bootstrap Form แสดง Invalid plan */}
                {/* ก้อนของช่องแสดงข้อความ */}
                <select
                  className={"form-select" + (errors.plan ? " is-invalid" : "")}
                  // การต่อ String สลับคลาส:นำคลาสหลัก form-select มาต่อกับคลาสเงื่อนไข
                  onChange={(e) => updateForm("plan", e.target.value)}
                  // เมื่อผู้ใช้คลิกเลือก Option ใหม่ จะดึงค่า value ของ Option นั้น (ซึ่งก็คือ p.id) 
                  // ส่งไปอัปเดต State ผ่านฟังก์ชัน updateForm
                  value={form.plan}
                // แสดงค่าตัวเลือกที่ถูกเปลี่ยนแล้วในช่องแสดงของselect
                >
                  {/* ก้อนตัวเลือก */}
                  <option value="">Please select..</option>
                  {/* ตัวเลือกแรกสุดที่แสดง ให้เป็นค่านี้และ มี value = "" */}
                  {plans.map((p) => (
                    // loop เอา ข้อมูลใน array plans มาmapแสดงเป็น<option>
                    <option key={p.id} value={p.id}>
                      {/* key={p.id} เป็น Attribute ของ react ทำให้แยกแยะได้ว่าelementไหนมีการเปลี่ยน เพิ่ม ลบ
                      เบราว์เซอร์จะไม่มองเห็น attribute นี้บน HTML จริง */}
                      {/* value={p.id} เกำหนด "ข้อมูลจริง" ที่จะถูกส่งออกไปใช้งานเมื่อผู้ใช้คลิกเลือกรายการนั้น 
                      ซึ่งจะกลายเป็น e.target.value ในฟังก์ชัน onChange */}
                      {p.label} ({p.price.toLocaleString()} THB)
                      {/* แปลงตัวเลขนั้นให้กลายเป็น String ที่จัดรูปแบบแล้ว */}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">Please select a Plan</div>
              </div>

              {/* STEP 3 : Gender radio — ผูก checked / onChange กับ form.gender */}
              <div className="mt-2">
                <label className="form-label">Gender</label>
                <div>
                  {/*  STEP 3 - 3.1 : การเช็กสถานะการเลือก (checked) & การอัปเดตค่าเมื่อมีการคลิก (onChange) */}
                  {/* 3.1 การเช็กสถานะการเลือก (checked) & การอัปเดตค่าเมื่อมีการคลิก (onChange) */}
                  {/* ปกติ input type radio ใน HTML จะล็อคค่าแค่อย่างเดียวเมื่อใส่ attribute name="" เหมือนกัน
                  แต่ เรามาใช้ react state แทน */}
                  <div>
                    <input
                      className="me-2 form-check-input"
                      type="radio"
                      checked={form.gender === "male"}
                      // ปุ่ม Male จะติ๊กถูก ก็ต่อเมื่อค่าใน form.gender เท่ากับ "male" เท่านั้น
                      onChange={() => updateForm("gender", "male")}
                    //พอคลิกเลือก male ฟังก์ชัน onChange จะสั่ง updateForm("gender", "male")
                    />
                    Male 👨
                    <input
                      className="mx-2 form-check-input"
                      type="radio"
                      checked={form.gender === "female"}
                      // ปุ่ม Female จะติ๊กถูก ก็ต่อเมื่อค่าใน form.gender เท่ากับ "female" เท่านั้น
                      onChange={() => updateForm("gender", "female")}
                    //พอคลิกเลือก Female ฟังก์ชัน onChange จะสั่ง updateForm("gender", "female")
                    //ค่าใน form.gender เปลี่ยนเป็น "female"
                    //พอ React Re-render:
                    // เงื่อนไข form.gender === "male" จะกลายเป็น false (ติ๊กถูกหายไป)
                    // เงื่อนไข form.gender === "female" จะกลายเป็น true (ขึ้นติ๊กถูกแทน)
                    />
                    Female 👩
                  </div>
                  {/* STEP 5 - 5.7. : สำหรับ Conditional Rendering แยกต่างหาก (เช่น Radio button)*/}
                  {errors.gender &&
                    <div className="text-danger">Please select gender</div>
                  }
                </div>
              </div>

              {/* STEP 4 : Total Payment (realtime) */}
              {/* STEP 4 - 4.2. : การแสดงผลบน UI (Real-time Rendering) */}
              {/* 4.2. การแสดงผลบน UI (Real-time Rendering) */}
              <div className="mt-3">
                Total Payment : {computeTotalPayment().toLocaleString()} THB
              </div>
            </div>

            <div className="modal-footer">
              {/* STEP 5 : Form Submission + โดยมีระบบ Checkbox ยอมรับเงื่อนไข + Form Validation  */}
              {/* STEP 5 - 5.4. : การผูก Checkbox และการเปิด/ปิดปุ่ม Register */}
              {/* 5.4. การผูก Checkbox และการเปิด/ปิดปุ่ม Register */}
              <input
                type="checkbox"
                checked={agree}
                // ถ้า agree เป็น true ช่องจะขึ้นติ๊กถูก / ถ้าเป็น false ช่องจะว่างเปล่า
                onChange={(e) => setAgree(e.target.checked)}
              // ส่งการเปลี่ยนแปลงเข้าไปเปลี่ยนค่า state
              /> I agree to the terms and conditions

              <button
                className="btn btn-success my-2"
                onClick={registerBtnOnClick}
                disabled={!agree}>
                {/* ถ้ายังไม่ได้ติ๊กเงื่อนไข (agree เป็น false) !agree จะกลายเป็น true ส่งผลให้ disabled={true} (ปุ่มจะถูกล็อก กดไม่ได้ และกลายเป็นสีเทา */}
                Register
              </button>
              {/* Terms and conditions */}
            </div>
          </div>
        </div>
      </div>

      {/* 6.3 */}
      {/* 6.3. ฉากหลังสีดำทึบแสง (Backdrop) ด้านล่างสุด */}
      <div className="modal-backdrop fade show"></div>
      {/* เมื่อมีการเรียกใช้ modal พื้นหลังจะมืดลง */}
    </>
  );
}
