import { createContext, useContext, ReactNode } from "react";
import useUserAction from "../_hook/useUserHook";
import { PaginateUser } from "@/types/User";

interface StaffContextProps {
  userList: PaginateUser | undefined;
  handleClearQueryParams: () => void;
  handleUsernameSearch: (value: string) => void;
  handleSetPage: (page: number) => void;
  page: number;
  totalPages: number;
  UserId: any;
  handleEmailUserSearch: (value: string) => void;
  handleChangeUserRole: (userId: string, newRole: string) => void;
  changeShift: any;
  editUserId: any;
  handleCancelChangeShift: () => void;
  handleChangeShift: (changeShiftUserId: string) => void;
  handleAddUser: () => void;
  addUser: any;
}

const StaffContext = createContext<StaffContextProps | undefined>(undefined);

export const StaffProvider = ({ children }: { children: ReactNode }) => {
  const {
    userList,
    handleClearQueryParams,
    handleUsernameSearch,
    handleSetPage,
    page,
    totalPages,
    UserId,
    handleEmailUserSearch,
    handleChangeUserRole,
    changeShift,
    editUserId,
    handleCancelChangeShift,
    handleChangeShift,
    handleAddUser,
    addUser,
  } = useUserAction({ initialPage: 1 });

  return (
    <StaffContext.Provider
      value={{
        userList,
        handleClearQueryParams,
        handleUsernameSearch,
        handleSetPage,
        page,
        totalPages,
        UserId,
        handleEmailUserSearch,
        handleChangeUserRole,
        changeShift,
        editUserId,
        handleCancelChangeShift,
        handleChangeShift,
        handleAddUser,
        addUser,
      }}
    >
      {children}
    </StaffContext.Provider>
  );
};

// Create a hook to use the StaffContext
export const useStaffContext = () => {
  const context = useContext(StaffContext);
  if (context === undefined) {
    throw new Error("useStaffContext must be used within a UserProvider");
  }
  return context;
};
