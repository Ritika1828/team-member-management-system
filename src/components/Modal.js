import React, { useState } from "react";
import crossBtn from "../images/crossBtn.png";

function Modal({
  isOpen,
  onClose,
  isCloseBtn,
  containerClassName = " md:w-[500px] w-full h-[690px] ",
  onAddMember,
  onUpdateMember,
  editingMember,
  isEdit,
  onDeleteMember,
}) {
  const [disabled, setDisabled] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [newMember, setNewMember] = useState({
    id: null,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    role: "",
  });
  if (!isOpen) return null;
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const validateForm = () => {
    return (
      newMember.firstName &&
      newMember.lastName &&
      newMember.phone &&
      validateEmail(newMember.email)
    );
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({
      ...prev,
      [name]: value,
    }));
    setDisabled(!validateForm());
    if (name === "email" || !validateEmail(value)) {
      setEmailError("Please enter a valid Email ID");
      return;
    }
    setEmailError("");
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    if (isEdit) {
      onUpdateMember({ ...newMember, id: editingMember.id });
    } else {
      onAddMember({ ...newMember, id: Date.now() });
    }
  };

  const handleDeleteMember = () => {
    onDeleteMember(editingMember?.id);
  };

  return (
    <div className="z-50 fixed top-0 left-0 w-full h-full flex md:items-center items-end justify-center bg-gray-200 backdrop-blur-xl ">
      <div
        className={` relative w-full px-8 py-4  md:w-96 bg-white rounded-2xl ${containerClassName}`}
      >
        {isCloseBtn ? (
          <div className=" absolute top-2 right-2  cursor-pointer">
            <img src={crossBtn} height={40} width={40} onClick={onClose} />
          </div>
        ) : null}
        <h1 className="text-5xl ">{isEdit ? "Edit Screen" : "Add Screen"}</h1>
        <h2 className="text-3xl text-left mt-8">
          {isEdit ? "Edit a team member" : "Add a team member"}
        </h2>
        <div className="mb-4 text-left text-1xl text-gray-400 ">
          {isEdit
            ? "Edit contact info, location and role"
            : "set email,location and role"}
        </div>
        <hr />
        <div className="w-full">
          <form>
            <div className=" label-faded-black text-left mt-4">
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
            <div className=" label-faded-black text-left mt-4">
              Enter your last name
            </div>
            <input
              className="rounded-lg border border-gray-300 py-3 pl-2  pr-10  w-full mt-2.5"
              type="text"
              name="lastName"
              value={newMember.lastName}
              placeholder="Enter last name"
              onChange={handleInputChange}
              required
            />
            <div className=" label-faded-black text-left mt-4">
              Enter your phone number
            </div>
            <input
              className="rounded-lg border border-gray-300 py-3 pl-2  pr-10  w-full mt-2.5"
              type="tel"
              name="phone"
              value={newMember.phone}
              placeholder="Phone"
              onChange={handleInputChange}
              required
            />
            <div className=" label-faded-black text-left mt-4">
              Enter email address
            </div>
            <input
              className="rounded-lg border border-gray-300 py-3 pl-2  pr-10  w-full mt-2.5"
              type="email"
              name="email"
              value={newMember.email}
              placeholder="Email"
              onChange={handleInputChange}
              required
            />
            <div className="text-xs text-red-600">
              {emailError && emailError}
            </div>
            <div className=" label-faded-black text-left mt-4">
              select your role
            </div>
            <div className="flex justify-start">
              <label
                className=" label-faded-black text-left my-2"
                htmlFor="regular"
              >
                Regular: Can't delete members{" "}
              </label>
              <input
                type="radio"
                id="regular"
                name="role"
                value="regular"
                checked={newMember.role === "regular"}
                onChange={handleInputChange}
                required
              />
            </div>
            <hr />
            <div className="flex justify-start">
              <label
                className=" label-faded-black text-left my-2"
                htmlFor="regular"
              >
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
            <hr />
            <div className="flex justify-between mt-4">
              <button
                className={`${
                  disabled
                    ? "bg-gray-200 py-2 px-8 rounded-lg cursor-pointer"
                    : "bg-blue-500 py-2 px-8 rounded-lg text-white cursor-pointer"
                }`}
                onClick={handleSaveClick}
                disabled={disabled}
              >
                Save
              </button>
              {isEdit && editingMember.role == "admin" && (
                <button
                  className="px-8 py-2 border-2 border-gray rounded-lg text-red-500 cursor-pointer"
                  onClick={handleDeleteMember}
                >
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Modal;
