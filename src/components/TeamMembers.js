import { useState } from "react";
import profile from "../images/profile.png";
import Modal from "./Modal";
function TeamMembers() {
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const initialTeamMembers = [
    {
      id: 1,
      firstName: "Ritika",
      lastName: "Juneja",
      phone: "1234567890",
      email: "john@example.com",
      role: "admin",
    },
    {
      id: 2,
      firstName: "Mahi",
      lastName: "Pathak",
      phone: "0987654321",
      email: "jane@example.com",
      role: "regular",
    },
    {
      id: 3,
      firstName: "Shruti",
      lastName: "Juneja",
      phone: "5555555555",
      email: "alice@example.com",
      role: "regular",
    },
    {
      id: 4,
      firstName: "aryan",
      lastName: "Juneja",
      phone: "7777777777",
      email: "bob@example.com",
      role: "regular",
    },
  ];

  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);

  const handleCloseBtnClick = () => {
    setShowModal(false);
  };

  const handleAddMember = (newMember) => {
    setTeamMembers([...teamMembers, newMember]);
    setShowModal(false);
  };

  const handleAddMemberClick = () => {
    setIsEdit(false);
    setShowModal(true);
  };
  const handleEditMember = (member) => {
    setIsEdit(true);
    setEditingMember(member);
    setShowModal(true);
  };

  const handleUpdateMember = (updatedMember) => {
    setTeamMembers(
      teamMembers.map((member) =>
        member.id === updatedMember?.id ? updatedMember : member
      )
    );
    setShowModal(false);
  };

  const handleDeleteMember = (deletedMember) => {
    setTeamMembers(teamMembers.filter((member) => member.id != deletedMember));
    setShowModal(false);
  };

  return (
    <div className=" bg-gray-200 h-screen w-full text-center flex flex-col justify-center items-center">
      {showModal ? (
        <Modal
          isOpen={true}
          isCloseBtn={true}
          onClose={handleCloseBtnClick}
          containerClassName="' md:w-[500px] w-full h-[780px] '"
          onAddMember={handleAddMember}
          isEdit={isEdit}
          editingMember={editingMember}
          onUpdateMember={handleUpdateMember}
          onDeleteMember={handleDeleteMember}
        />
      ) : null}
      <h1 className="text-5xl mb-10 mt-10">List Screen</h1>
      <div className="bg-white w-screen h-screen text-center rounded-lg">
        <div
          className="cursor-pointer text-5xl text-right mr-4"
          onClick={handleAddMemberClick}
        >
          +
        </div>
        <div className="text-left ml-8 md:ml-20 text-2xl">Team members</div>
        <div className="mb-4 text-left text-1xl text-gray-400 ml-8 md:ml-20">
          you have {teamMembers.length} team members
        </div>
        <hr />
        <div>
          {teamMembers.map((member) => (
            <div className="ml-8 md:ml-16">
              <div
                onClick={() => handleEditMember(member)}
                className="flex flex-row justify-start mt-4 mb-4"
              >
                <div className="mr-4">
                  <img src={profile} height={40} width={40} />
                </div>
                <div className="flex flex-col items-baseline">
                  <h4>
                    {member.firstName} {member.lastName}{" "}
                    {member.role == "admin" && <span>({member?.role})</span>}
                  </h4>
                  <div>{member.phone}</div>
                  <div>{member.email}</div>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default TeamMembers;
