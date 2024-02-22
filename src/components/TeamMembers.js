import { useState } from "react";
import profile from "../images/profile.png";
import Modal from "./Modal";
function TeamMembers() {
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  console.log("modal", showModal, isEdit);
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

  const handleEditMember = () => {
    setIsEdit(true);
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

  return (
    <div className=" bg-gray-200 h-full w-full text-center flex flex-col justify-center items-center">
      {showModal ? (
        <Modal
          isOpen={true}
          isCloseBtn={true}
          onClose={handleCloseBtnClick}
          containerClassName="' md:-w-[432px] w-full h-[590px] '"
          onAddMember={handleAddMember}
          teamMembers={teamMembers}
          isEdit={isEdit}
          onUpdateMember={handleUpdateMember}
        />
      ) : null}
      <div>List Screen</div>
      <div className="bg-white w-96 text-center">
        <div className="cursor-pointer" onClick={() => setShowModal(true)}>
          +
        </div>
        <div>Team members</div>
        <div className="mb-4">you have {teamMembers.length} team members</div>
        <hr />
        <div>
          {teamMembers.map((member) => (
            <div className="ml-2">
              <div
                onClick={handleEditMember}
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
