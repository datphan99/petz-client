import { createContext, useContext, ReactNode } from "react";
import useUserAction from "../_hook/useUserHook";
import { PaginateUser } from "@/types/User";

interface UserContextProps {
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

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
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
    <UserContext.Provider
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
    </UserContext.Provider>
  );
};

// Create a hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
