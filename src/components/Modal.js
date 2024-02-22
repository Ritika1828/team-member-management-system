import React, { useState } from "react";
import crossBtn from "../images/crossBtn.png";

function Modal({
  isOpen,
  onClose,
  children,
  isCloseBtn,
  teamMembers,
  containerClassName = " md:w-[432px] w-full h-[590px] ",
  onAddMember,
  onUpdateMember,
  isEdit,
}) {
  const [newMember, setNewMember] = useState({
    id: null,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    role: "",
  });
  if (!isOpen) return null;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    if (teamMembers.id) {
      console.log('aaya')
      onUpdateMember(newMember);
    } else {
      onAddMember({ ...newMember, id: Date.now() });
    }
  };

  return (
    <div className="z-50 fixed top-0 left-0 w-full h-full flex md:items-center items-end justify-center bg-[#130c3099] backdrop-blur-xl ">
      <div
        className={` relative w-full px-8 py-4  md:w-96 bg-white rounded-2xl ${containerClassName}`}
      >
        {isCloseBtn ? (
          <div className=" absolute top-2 right-2  cursor-pointer">
            <img src={crossBtn} height={40} width={40} onClick={onClose} />
          </div>
        ) : null}
        <h2>Add a team member</h2>
        <div>set email,location and role</div>
        <hr />
        <div>Info</div>
        <div className="w-full">
          <form>
            <div className="md:text-xs text-sm label-faded-black">
              Enter your first name
            </div>
            <input
              className="rounded-lg border border-gray-300 py-3 pl-2  pr-10  w-full mt-2.5"
              type="text"
              name="firstName"
              value={newMember.firstName}
              placeholder="Enter first name"
              onChange={handleInputChange}
              required
            />
            <div>Enter your last name</div>
            <input
              className="rounded-lg border border-gray-300 py-3 pl-2  pr-10  w-full mt-2.5"
              type="text"
              name="lastName"
              value={newMember.lastName}
              placeholder="Enter last name"
              onChange={handleInputChange}
              required
            />
            <div>Enter your phone number</div>
            <input
              className="rounded-lg border border-gray-300 py-3 pl-2  pr-10  w-full mt-2.5"
              type="tel"
              name="phone"
              value={newMember.phone}
              placeholder="Phone"
              onChange={handleInputChange}
              required
            />
            <div>Enter email address</div>
            <input
              className="rounded-lg border border-gray-300 py-3 pl-2  pr-10  w-full mt-2.5"
              type="email"
              name="email"
              value={newMember.email}
              placeholder="Email"
              onChange={handleInputChange}
              required
            />
            <div>select your role</div>
            <div className="mb-2">
              <label htmlFor="regular">Regular: Can't delete members </label>
              <input
                type="radio"
                id="regular"
                name="role"
                value="regular"
                checked={newMember.role === "regular"}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-start">
              <label className="ml-auto" htmlFor="regular">
                Admin: Can delete members{" "}
              </label>
              <input
                className="mr-auto"
                type="radio"
                id="admin"
                name="role"
                value="admin"
                checked={newMember.role === "admin"}
                onChange={handleInputChange}
              />
            </div>
            <button
              className="bg-blue-500 p-2 rounded-lg text-white "
              onClick={handleSaveClick}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Modal;
